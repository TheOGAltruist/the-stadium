const {
    getAllUsers,
    getSpecificUser,
    modifySpecificUser,
} = require("../controllers/user.controller.js")

const {
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller.js")

const {
    getAllProducts,
    getAllOrders,
    changeOrderStatus,
    createNewTag,
    deleteTag,
    createNewCategory,
    deleteCategory,
    getAllWishlists
} = require("../controllers/admin.controller.js")

const { isAdmin } = require("../middleware/middleware.util.js")

const router = require("express").Router()
module.exports = router

//User related routes
router.get("/users", isAdmin, getAllUsers) //Get All users
router.post("/users", isAdmin) //Add new user
router.get("/users/:userId", isAdmin, getSpecificUser) //Get specific user
router.patch("/users/:userId", isAdmin, modifySpecificUser) //Update specific user

//Product routes
router.get("/products", isAdmin, getAllProducts)
router.post("/products", isAdmin, createProduct); //Add new product
router.patch("products/:id", isAdmin, updateProduct); //Update specific product
router.delete("products/:id", isAdmin, deleteProduct); //Remove a product

//Order routes
router.get("/orders", isAdmin, getAllOrders) //Get all orders
router.patch("/orders/:orderId", isAdmin, changeOrderStatus) //Change order status

//Review routes

//Tag routes
router.post("/tags", isAdmin, createNewTag)
router.delete("/tags/:tagId", isAdmin, deleteTag)

//Category routes
router.post("/categories", isAdmin, createNewCategory)
router.delete("/categories/:categoryId", isAdmin, deleteCategory)

//Wishlist routes
router.get("/wishlists", isAdmin, getAllWishlists)