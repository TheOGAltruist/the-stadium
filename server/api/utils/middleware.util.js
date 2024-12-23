require("dotenv").config()
const prisma = require("../../prisma/index.js")
const jwt = require("jsonwebtoken")

//Middleware function for protected routes
const isLoggedIn = async (req, res, next) => {
    try {
        const receivedToken = (req.headers.authorization).split(" ")[1]
        req.user = await findUserWithToken(receivedToken);
        next();
    } catch (error) {
        next({
            statusCode: 401,
            message: "Unauthorized"
        })
    }
}

//Find user using token
const findUserWithToken = async (token) => {
    let id;
    let issuer;
    
    try {
        const payload = await jwt.verify(token, process.env.JWT);
        id = payload.id
        issuer = payload.iss
    } catch (err) {
        const error = new Error(`Unauthorized. ${err.message}`)
        error.statusCode = 401
        throw error
    }

    try {
        const user = await prisma.user.findUnique({
            where: { 
                id: id
            },
            select: {
                id: true,
                firstname: true,
                lastname:true,
                username: true,
                email: true,
                isAdmin: true,
                address_street1: true,
                address_street2: true,
                address_city: true,
                address_state: true,
                address_country: true,
                address_zipcode: true,
                reviews: true,
                payment_methods: true,
                wishlists: true,
                cartItems: true,
                orders: true
            }
        });

        if (!user || (issuer === "the_stadium") === false) {
            const error = new Error("Unauthorized")
            error.statusCode = 401
            throw error
        }
        
        return user;
    } catch (error) {
        throw error
    }
}

module.exports = {
    isLoggedIn,
    findUserWithToken
}