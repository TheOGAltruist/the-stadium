const prisma = require("../../prisma/index.js")

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

module.exports = {
    getAllUsers,
    getSpecificUser,
}