require("dotenv").config()
const prisma = require("../../prisma")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//Login function
const login = async (req, res, next) => {
    try {
        const response = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: req.body.username
                    },
                    {
                        email: req.body.email
                    }
                ]
            }
        })

        if(!response || (await bcrypt.compare(req.body.password, response.password)) === false) {
            next({
                statusCode: 401,
                message: "Unauthorized. Incorrect username or password. Try again!"
            })
        } else {
            const token = await jwt.sign({ id: response.id, username: response.username, iss: "the_stadium" }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({
                token: token,
                token_type: "Bearer"
            })
        }
    } catch (error) {
        next({
            statusCode: 401,
            message: "Unauthorized. Username or password is incorrect. Try again!"
        })
    }
}

//Register function
const register = async (req, res, next) => {
    try {
        const response = await prisma.user.create({
            data: {
                firstname: req.body.firstname,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, Math.floor(Math.random() * 10) + 1),
                email: req.body.email
            }
        })
        
        const token = await jwt.sign({ id: response.id, username: response.username, iss: "the_stadium" }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({
            Id: response.id,
            token: token,
            token_type: "Bearer"
        })
    } catch (error) {
        next({
            statusCode: 409,
            message: "Username is not unique. Please choose another username and try again!"
        })
    }
}

//Return me object
const me = async (req, res, next) => {
    try {
        const me = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user.id
            }
        });

        const {password, ...rest} = me;

        res.json(rest)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register,
    me,
}