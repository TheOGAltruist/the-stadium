require("dotenv").config();
const prisma = require("../../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../middleware/email.util.js");

//Dynamic import of nanoid due to module compatibility
const nanoid = async () => {
  const { nanoid } = await import("nanoid");
  return nanoid();
};

//Login function
const login = async (req, res, next) => {
  console.log(req.hostname);
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {
        OR: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      },
    });

        if((await bcrypt.compare(req.body.password, response.password)) === false) {
            next({
                statusCode: 401,
                message: "Unauthorized. Incorrect password. Try again!"
            })
        } else {
            const token = await jwt.sign({ id: response.id, username: response.username, iss: "the_stadium" }, process.env.JWT_SECRET, { expiresIn: '1h', notBefore: 0 })
            const {id, password, isAdmin, resetPassToken, currentToken, resetPassTokenExpiry,  ...rest} = response;

      try {
        await addTempToken(id, token);

        res
          .cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(Date.now() + 3600000),
          })
          .json({
            user: rest,
          });
      } catch (error) {
        const addError = new Error(
          "Unable to sign-in at this moment. Please try again later!"
        );
        addError.statusCode = 401;
        throw addError;
      }
    }
  } catch (error) {
    next({
      statusCode: 404,
      message: "User not found in the system!",
    });
  }
};

//Register function
const register = async (req, res, next) => {
  try {
    const response = await prisma.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: await bcrypt.hash(
          req.body.password,
          Math.floor(Math.random() * 10) + 1
        ),
        email: req.body.email,
      },
    });

    const token = await jwt.sign(
      { id: response.id, username: response.username, iss: "the_stadium" },
      process.env.JWT_SECRET,
      { expiresIn: "1h", notBefore: 0 }
    );
    const {
      id,
      password,
      isAdmin,
      resetPassToken,
      currentToken,
      resetPassTokenExpiry,
      ...rest
    } = response;

    try {
      await addTempToken(id, token);

      res
        .cookie("token", `Bearer ${token}`, {
          httpOnly: true,
          sameSite: "strict",
          expires: new Date(Date.now() + 3600000),
        })
        
        const token = await jwt.sign({ id: response.id, username: response.username, iss: "the_stadium" }, process.env.JWT_SECRET, { expiresIn: '1h', notBefore: 0 })
        const {id, password, isAdmin, resetPassToken, currentToken, resetPassTokenExpiry, ...rest} = response;
        
        try{
            await addTempToken(id, token)
            
            res
            .cookie("token", `Bearer ${token}`, { httpOnly: true, sameSite: "strict", expires: new Date(Date.now() + 3600000) })
            .json({
                user: rest
            })

//Register using OAuth
const oauthRegister = async (req, res, next) => {
  try {
    const response = await prisma.user.create({
      data: {
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: await bcrypt.hash(
            await nanoid(20),
            Math.floor(Math.random() * 10) + 1
          ),
          email: req.body.email,
        },
      },
    });

    const token = await jwt.sign(
      { id: response.id, username: response.username, iss: "the_stadium" },
      process.env.JWT_SECRET,
      { expiresIn: "1h", notBefore: 0 }
    );
    const {
      id,
      password,
      isAdmin,
      resetPassToken,
      currentToken,
      resetPassTokenExpiry,
      ...rest
    } = response;

    try {
      await addTempToken(id, token);

      res
        .cookie("token", `Bearer ${token}`, {
          httpOnly: true,
          sameSite: "strict",
          expires: new Date(Date.now() + 3600000),
        })
        .json({
          user: rest,
        });
    } catch {
      const error = new Error(
        "Registration successful. Unable to sign-in at the moment. Please try after some time with the newly registered account!"
      );
      error.statusCode = 500;
      throw error;
    }
  } catch (error) {}
};

//Register using OAuth
const oauthRegister = async (req, res, next) => {
    try {
        const response = await prisma.user.create({
            data: {
                data: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: await bcrypt.hash(await nanoid(20), Math.floor(Math.random() * 10) + 1),
                    email: req.body.email
                }
            }
        })

        const token = await jwt.sign({ id: response.id, username: response.username, iss: "the_stadium" }, process.env.JWT_SECRET, { expiresIn: '1h', notBefore: 0 })
        const {id, password, isAdmin, resetPassToken, currentToken, resetPassTokenExpiry, ...rest} = response;
        
        try{
            await addTempToken(id, token)
            
            res
            .cookie("token", `Bearer ${token}`, { httpOnly: true, sameSite: "strict", expires: new Date(Date.now() + 3600000) })
            .json({
                user: rest
            })

        }
        catch{
            const error = new Error("Registration successful. Unable to sign-in at the moment. Please try after some time with the newly registered account!");
            error.statusCode = 500;
            throw error;
        }
    } catch (error) {
        
    }
}

//Logout route
const logout = async (req, res, next) => {
  try {
    const { id } = req.user;

    await removeTempToken(id, req.cookies["token"].split(" ")[1]);

    res.clearCookie("token", { httpOnly: true, sameSite: "strict" }).send();
  } catch (error) {
    next({
      message: "There was an error during logout!",
    });
  }
};

//Add temp token
const addTempToken = async (Id, token) => {
  try {
    const response = await prisma.user.update({
      where: {
        id: Id,
      },
      data: {
        currentToken: {
          push: token,
        },
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

//Remove temp token
const removeTempToken = async (Id, token) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Id,
      },
    });

    const removeToken = await prisma.user.update({
      where: {
        id: Id,
      },
      data: {
        currentToken: user.currentToken.filter(
          (eachToken) => eachToken !== token
        ),
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

//Reset password
const forgotPassword = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        OR: [
          {
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      },
      select: {
        id: true,
        username: true,
      },
    });

    const updateUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPassword: true,
        resetPassToken: await nanoid(),
        resetPassTokenExpiry: new Date(Date.now() + 600000),
      },
      select: {
        resetPassToken: true,
      },
    });

    await sendEmail(user.username, updateUser.resetPassToken);

    res.status(200).json({
      status: "Success!",
      message:
        "You will receive an email with instructions to reset your password.",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      next({
        statusCode: 200,
        message:
          "If your email address exists in the system, you will receive an email with instructions to reset your password.",
      });
    } else {
      next({
        message:
          "Unknown Error. Unable to request password reset at this moment. Try again later!",
      });
    }
  }
};

const passwordReset = async (req, res, next) => {
  const { tempToken, newPassword } = req.body;

  try {
    const response = await prisma.user.findFirst({
      where: {
        resetPassToken: req.query.token,
      },
    });

    if (response) {
      if (response.resetPassTokenExpiry < Date.now()) {
        res.status(401).json({
          message: "Password reset request has expired. Please try again!",
        });
      } else {
        const changePassword = await prisma.user.update({
          where: {
            id: response.id,
          },
          data: {
            password: await bcrypt.hash(
              newPassword,
              Math.floor(Math.random() * 10) + 1
            ),
            resetPassToken: null,
            resetPassTokenExpiry: null,
          },
        });

        res.status(200).json({
          message:
            "Password has been succesfully reset. Please login with your new password.",
        });
      }
    } else {
      res.status(404).json({
        message: "Invalid token!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
    login,
    register,
    logout,
    forgotPassword,
    passwordReset,
    oauthRegister,
}