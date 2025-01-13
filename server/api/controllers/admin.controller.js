const prisma = require("../../prisma/index.js");

//Get all orders
const getAllOrders = async (req, res, next) => {
    const response = await prisma.order.findMany({
        relationLoadStrategy: 'join',
        include: {
            user: true,
            orderItems: true,
            payment: true
        }
    });

    if(response){
        res.status(200).json(response)
    } else {
        res.status(404).json({ message: "No orders found" })
    }
}

//Change order status
const changeOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    try {
        const response = await prisma.order.update({
            where: {
                id: req.params.orderId,
            },
            data: {
                status
            }
        })
        
        res.status(204).send()
    } catch (error) {
        next({
            message: "There was a problem updating the order status."
        })
    }
}

//Create a new tag
const createNewTag = async (req, res, next) => {
    try {
        const response = await prisma.tag.create({
            relationLoadStrategy: "join",
            data: {
                name: req.body.name,
                product_id: req.body.productId
            },
            select: {
                name: true,
                product: true
            }
        })

        res.status(201).json(response)
    } catch (error) {
        next({
            message: "Unable to create the tag at this moment. Please try again later!"
        })
    }
}

//Delete tag
const deleteTag = async (req, res, next) => {
    const { tagId } = req.params
    try {
        const response = await prisma.tag.delete({
            where: {
                id: tagId
            }
        })

        res.status(204).send()
    } catch (error) {
        next({
            message: "Unable to delete tag at this moment. Try again later!"
        })
    }
}

//Create a new tag
const createNewCategory = async (req, res, next) => {
    try {
        const response = await prisma.category.create({
            relationLoadStrategy: "join",
            data: {
                name: req.body.name,
                product_id: req.body.productId
            },
            select: {
                name: true,
                product: true
            }
        })

        res.status(201).json(response)
    } catch (error) {
        next({
            message: "Unable to create the category at this moment. Please try again later!"
        })
    }
}

//Delete tag
const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params
    try {
        const response = await prisma.category.delete({
            where: {
                id: categoryId
            }
        })

        res.status(204).send()
    } catch (error) {
        next({
            message: "Unable to delete category at this moment. Try again later!"
        })
    }
}

//View all wishlists
const getAllWishlists = async (req, res, next) => {
    const response = await prisma.wishlist.findMany({
        relationLoadStrategy: 'join',
        include: {
            user: true,
            items: true
        }
    });

    if(response){
        res.status(200).json(response)
    } else {
        res.status(404).json({ message: "No wishlists found" })
    }
}

module.exports = {
    getAllOrders,
    changeOrderStatus,
    createNewTag,
    deleteTag,
    createNewCategory,
    deleteCategory,
    getAllWishlists
}