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

module.exports = {
    getAllUsers,
}