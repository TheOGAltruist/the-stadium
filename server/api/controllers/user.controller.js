const prisma = require("../../prisma/index.js")

const getAllUsers = async (req, res, next) => {

    if(req.user.isAdmin === false) { 
        next({
            statusCode: 401,
            message: "Insufficient permissions to perform this action."
        }) 
    }

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

module.exports = {
    getAllUsers,
}