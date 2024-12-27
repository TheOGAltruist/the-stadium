require("dotenv").config()
const prisma = require("../../prisma/index.js")
const bcrypt = require("bcrypt")

//Get all users (Admin only)
const getAllUsers = async (req, res, next) => {

    try{
        const response = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
                email: true,
                isAdmin: true,
            }
        })

        res.status(200).json(response)
    } catch (error){
        next(error)
    }
}

//Get single user (Admin only)
const getSpecificUser = async (req, res, next) => {
    try {
        const response = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.params.userId
            }
        });

        const {password, ...rest} = response;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

//Modify specific user (Admin only)
const modifySpecificUser = async (req, res, next) => {

    const { firstname, lastname, username, password, email, isAdmin, address_street1, address_street2, address_city, address_state, address_country, address_zipcode } = req.body

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: req.params.userId
            }
        })

        if(!existingUser){
            next({
                statusCode: 404,
                message: "User not found."
            })
        }
        
        const response = await prisma.user.update({
            where: {
                id: req.params.userId
            },
            data: {
                firstname: firstname !== undefined ? firstname : existingUser.firstname,
                lastname: lastname !== undefined ? lastname : existingUser.lastname,
                username: username !== undefined ? username : existingUser.username,
                password: password !== undefined ? bcrypt.hashSync(password, Math.floor(Math.random() * 10) + 1) : existingUser.password,
                email: email !== undefined ? email : existingUser.email,
                isAdmin: isAdmin !== undefined ? isAdmin : existingUser.isAdmin,
                address_street1: address_street1 !== undefined ? address_street1 : existingUser.address_street1,
                address_street2: address_street2 !== undefined ? address_street2 : existingUser.address_street2,
                address_city: address_city !== undefined ? address_city : existingUser.address_city,
                address_state: address_state !== undefined ? address_state : existingUser.address_state,
                address_country: address_country !== undefined ? address_country : existingUser.address_country,
                address_zipcode: address_zipcode !== undefined ? address_zipcode : existingUser.address_zipcode,
                updated_at: new Date()
            }
        })

        res.status(204).send()

    } catch (error) {
        next({
            statusCode: 400,
            message: "Bad Request. " + error.meta?.cause
        })
    }
}

module.exports = {
    getAllUsers,
    getSpecificUser,
    modifySpecificUser,
}