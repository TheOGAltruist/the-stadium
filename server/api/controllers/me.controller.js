const { Prisma } = require("@prisma/client");
const prisma = require("../../prisma/index.js")

//Return me object
const getMe = async (req, res, next) => {
    try {
        const me = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user.id
            },
            include: {
                payment_methods: {
                    include: {
                        details: true
                    }
                }
            }
        });

        const {id, password, isAdmin, ...rest} = me;

        res.json(rest)
    } catch (error) {
        next(error)
    }
}

//Edit me object
const editMe = async (req, res, next) => {

    const { firstname, lastname, password, email, address_street1, address_street2, address_city, address_state, address_country, address_zipcode } = req.body

    if(req.body.hasOwnProperty("isAdmin")){
        next({
            statusCode: 403,
            message: "Insufficient permissions to perform this action."
        })
    }

    try {
        const existingAttributes = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        const response = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                firstname: firstname !== undefined ? firstname : existingAttributes.firstname,
                lastname: lastname !== undefined ? lastname : existingAttributes.lastname,
                password: password !== undefined ? bcrypt.hashSync(password, Math.floor(Math.random() * 10) + 1) : existingAttributes.password,
                email: email !== undefined ? email : existingAttributes.email,
                address_street1: address_street1 !== undefined ? address_street1 : existingAttributes.address_street1,
                address_street2: address_street2 !== undefined ? address_street2 : existingAttributes.address_street2,
                address_city: address_city !== undefined ? address_city : existingAttributes.address_city,
                address_state: address_state !== undefined ? address_state : existingAttributes.address_state,
                address_country: address_country !== undefined ? address_country : existingAttributes.address_country,
                address_zipcode: address_zipcode !== undefined ? address_zipcode : existingAttributes.address_zipcode,
                updated_at: new Date()
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Create an order
const newOrder = async (req, res, next) => {
    
    try {
        const createOrder = await prisma.order.create({
            data: {
                order_id: "ORD" + Date.now(),
                user_id: req.user.id,
                paymentMethod: req.body.paymentMethod,
                status: "Created"
            }
        })
        
        const numberOfItems = req.body.products.length
        let arrayOfItems = [];

        for (let index = 0; index < numberOfItems; index++) {
            arrayOfItems.push({
                order_id: createOrder.order_id,
                product_id: req.body.products[index].productId,
                quantity: req.body.products[index].quantity,
            })
        }
        
        const createOrderItems = await prisma.orderItem.createMany({
           data: arrayOfItems
        })

        res.status(200).json({
            Result: "Order Successfully created!",
            OrderId: createOrder.order_id
        })
    } catch (error) {
        next({
            message: "There was a problem in placing the order. Please try again!"
        })
    }
}

//Fetch my orders
const myOrders = async (req, res, next) => {
    try {
        const response = await prisma.order.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                payment: {
                    include: {
                        details: true
                    }
                },
                orderItems: true
            }
        })

        res.json(response)
    } catch (error) {
        next(error)
    }
}

//Fetch my cart
const myCartItems = async (req, res, next) => {
    try {
        const response = await prisma.cartItem.findMany({
            relationLoadStrategy: 'join',
            where: {
                user_id: req.user.id
            },
            include: {
                product: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        image: true
                    }
                }
            }
        })

        const  {created_at, updated_at, ...rest} = response
        res.json(rest)
    } catch (error) {
        next(error)
    }
}

//Add item to cart
const addCartItem = async (req, res, next) => {
    try {
        const response = await prisma.cartItem.create({
            data:{
                user_id: req.user.id,
                product_id: req.params.productId,
                quantity: req.body.quantity
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Remove item from cart
const removeCartItem = async (req, res, next) => {
    try {
        const response = await prisma.cartItem.delete({
            where: {
                id: req.params.cartItemId,
                user_id: req.user.id
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Update cart item
const updateCartItem = async (req, res, next) => {
    try {
        const response = await prisma.cartItem.update({
            where: {
                user_id: req.user.id,
                id: req.params.cartItemId
            },
            data: {
                quantity: req.body.quantity,
                updated_at: new Date()
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Delete cart
const deleteCart = async (req, res, next) => {
    try {
        const response = await prisma.cartItem.deleteMany({
            where: {
                user_id: req.user.id
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Create wishlist
const newWishlist = async (req, res, next) => {
    try {
        const response = await prisma.wishlist.create({
            data: {
                name: req.body.name,
                user_id: req.user.id
            }
        })

        res.status(200).json({
            Result: "Wishlist created successfully!",
            Name: response.name
        })
    } catch (error) {
        next(error)
    }
}

//Get wishlists
const myWishlists = async (req, res, next) => {
    try {
        const response = await prisma.wishlist.findMany({
            where: {
                user_id: req.user.id
            },
            include: {
                items: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                name: true,
                                description: true,
                                price: true,
                                image: true
                            }
                        }
                    }
                }
            }
        })

        res.json(response)
    } catch (error) {
        next(error)
    }
}

//Add item to wishlist
const addWishlistItem = async (req, res, next) => {
    try {
        if(req.permission == "Read"){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to modify the list."
            })
        }
        const response = await prisma.wishlistItem.create({
            data: {
                wishlist_id: req.params.wishlistId,
                product_id: req.params.productId
            }
        })

        res.status(204).send()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//Remove item from wishlist
const removeWishlistItem = async (req, res, next) => {
    try {
        if(req.permission == "Read"){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to modify the list."
            })
        }

        const response = await prisma.wishlistItem.delete({
            where: {
                id: req.params.wishlistItemId,
                wishlist_id: req.params.wishlistId
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Delete wishlist
const deleteWishlist = async (req, res,next) => {
    try {
        if(req.permission !== "Owner"){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to delete the list."
            })
        }

        const response = await prisma.wishlist.delete({
            where: {
                id: req.params.wishlistId
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

//Share wishlist
const shareWishlist = async (req, res, next) => {
    let jsonValue = {}
    try {
        if(req.permission !== "Owner"){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to share this list."
            })
        }
        
        const getWishlist = await prisma.wishlist.findUniqueOrThrow({
            where: {
                id: req.params.wishlistId
            }
        });
        
        if(getWishlist.sharedWith !== null){
            jsonValue = getWishlist.sharedWith
            jsonValue[req.body.email] = req.body.permission
            
        } else {
            jsonValue = {
                [req.body.email]: req.body.permission
            }
        }

        const response = await prisma.wishlist.update({
            where: {
                id: req.params.wishlistId
            },
            data: {
                sharedWith: jsonValue,
                updated_at: new Date()
            }
        })

        res.status(200).json({
            message: "Wishlist shared successfully!"
        })
    } catch (error) {
        next(error)
    }
}

//Get payment methods
const getPaymentMethods = async (req, res, next) => {
    try {
        const response = await prisma.paymentMethod.findMany({
            where: {
                user_id: req.user.id
            },
            select: {
                name: true,
                type: true,
                details: true
            }
        })
        console.log("Done")
        res.json(response).send()
    } catch (error) {
        next(error)
    }
}

//Add Payment method
const addPaymentMethod = async (req, res, next) => {
    try {
        const response = await prisma.paymentMethod.create({
            data: {
                name: req.body.name,
                user_id: req.user.id,
                type: req.body.type
            }
        })

        res.status(204).json({
            Result: "Successfully created payment method",
            Name: response.name,
            "Payment Method": response.type
        })
    } catch (error) {
        if(error.code === "P2002"){
            next({
                statusCode: 409,
                message: "Payment method name is not unique. Please choose another name and try again!"
            })
        } else{
            next(error)
        }
    }
}

//Add payment details
const addPaymentMethodDetails = async (req, res, next) => {
    const {payment_number, expiryMonth, expiryYear, security} = req.body

    try {
        const paymentMethod = await prisma.paymentMethod.findUniqueOrThrow({
            where: {
                id: req.params.paymentMethodId
            }
        })

        if(paymentMethod.user_id !== req.user.id){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to perform this action."
            })
        } else{
            try {
                const response = await prisma.paymentMethodDetails.create({
                    data: {
                        payment_method: req.params.paymentMethodId,
                        payment_number: payment_number,
                        expiryMonth,
                        expiryYear,
                        security: security.toString()
                    }
                })
        
                res.status(204).send()
            } catch (error) {
                next(error)
            }
        }

    } catch (error) {
        next({
            statusCode: 404,
            message: "Payment method not found."
        })
    }
}

//Remove payment method
const deletePaymentMethod = async (req, res, next) => {
    try {
        const paymentMethod = await prisma.paymentMethod.findUniqueOrThrow({
            where: {
                id: req.params.paymentMethodId
            }
        })

        if(paymentMethod.user_id !== req.user.id){
            res.status(403).json({
                message: "Forbidden. Insufficient permissions to perform this action."
            })
        } else{
            try {
                const response = await prisma.paymentMethod.delete({
                    where: {
                        id: req.params.paymentMethodId
                    }
                })
        
                res.status(204).send()
            } catch (error) {
                next(error)
            }
        }

    } catch (error) {
        next({
            statusCode: 404,
            message: "Payment method not found."
        })
    }
}

module.exports = {
    getMe,
    editMe,
    newOrder,
    myOrders,
    myCartItems,
    removeCartItem,
    addCartItem,
    updateCartItem,
    deleteCart,
    newWishlist,
    myWishlists,
    addWishlistItem,
    removeWishlistItem,
    deleteWishlist,
    shareWishlist,
    getPaymentMethods,
    addPaymentMethod,
    addPaymentMethodDetails,
    deletePaymentMethod,
}