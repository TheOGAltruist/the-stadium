require("dotenv").config();
const prisma = require("../../prisma/index.js");
const jwt = require("jsonwebtoken");

//Middleware function for protected routes
const isLoggedIn = async (req, res, next) => {
  try {
    const receivedToken = req.headers.authorization.split(" ")[1];
    req.user = await findUserWithToken(receivedToken);
    next();
  } catch (error) {
    next({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

//Middleware function for admin-only routes
const isAdmin = async (req, res, next) => {
  try {
    const receivedToken = req.headers.authorization.split(" ")[1];
    req.user = await findUserWithToken(receivedToken);

    if (req.user.isAdmin === true) {
      next();
    } else {
      next({
        statusCode: 403,
        message: "Insufficient permissions to perform this action.",
      });
    }
  } catch (error) {
    next({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

//Find user using token
const findUserWithToken = async (token) => {
  let id;
  let issuer;

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    id = payload.id;
    issuer = payload.iss;
  } catch (err) {
    const error = new Error(`Unauthorized. ${err.message}`);
    error.statusCode = 401;
    throw error;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    if (!user || (issuer === "the_stadium") === false) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

//Wishlist permissions
const wishlistPermission = async (req, res,next) => {
  try {
    const owner = await prisma.wishlist.findUnique({
        where: {
            id: req.params.wishlistId,
            user_id: req.user.id
        }
    })
    
    if(!owner){
        try {
            const sharedWith = await prisma.wishlist.findUniqueOrThrow({
                where: {
                    id: req.params.wishlistId
                }
            });
            console.log(req.user)
            if(sharedWith.sharedWith === null){
              next({
                statusCode: 403,
                message: "Forbidden. Insufficient Access. Please ask wishlist owner to share the list."
              })
            } else if(!(req.user.email in sharedWith.sharedWith)){
              next({
                statusCode: 403,
                message: "Forbidden. Insufficient Access. Please ask wishlist owner to share the list."
              })
            } else{
                req.permission = sharedWith.sharedWith[req.user.email]
            }

            next();
        } catch (error) {
            console.log(error)
            next({
                statusCode: 404,
                message: error.meta?.cause
            })
        }
    } else{
        req.permission = "Owner"
        next();
    }


} catch (error) {
    next(error)
}
}

module.exports = {
  isLoggedIn,
  findUserWithToken,
  isAdmin,
  wishlistPermission,
};
