const {
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
} = require("../controllers/me.controller.js")

const { isLoggedIn, wishlistPermission } = require("../middleware/middleware.util.js")

const router = require("express").Router()
module.exports = router

//Get me object
router.get("/", isLoggedIn, getMe)

//Edit me object
router.patch("/", isLoggedIn, editMe)

//Create a new order
router.post("/orders", isLoggedIn, newOrder)

//Fetch orders
router.get("/orders", isLoggedIn, myOrders)

//Fetch cart
router.get("/cart", isLoggedIn, myCartItems)

//Add cart item
router.post("/cart/:productId", isLoggedIn, addCartItem)

//Delete cart item
router.delete("/cart/:cartItemId", isLoggedIn, removeCartItem)

//Update cart item
router.patch("/cart/:cartItemId", isLoggedIn, updateCartItem)

//Delete cart
router.delete("/cart", isLoggedIn, deleteCart)

//Create a new wishlist
router.post("/wishlists", isLoggedIn, newWishlist)

//Fetch wishlists
router.get("/wishlists", isLoggedIn, myWishlists)

//Add wishlist item
router.post("/wishlists/:wishlistId/:productId", isLoggedIn, wishlistPermission, addWishlistItem)

//Remove wishlist item
router.delete("/wishlists/:wishlistId/:wishlistItemId", isLoggedIn, wishlistPermission, removeWishlistItem)

//Delete wishlist
router.delete("/wishlists/:wishlistId", isLoggedIn, wishlistPermission, deleteWishlist)

//Share a wishlist
router.patch("/wishlists/:wishlistId", isLoggedIn, wishlistPermission, shareWishlist)

//Get payment methods
router.get("/payments", isLoggedIn, getPaymentMethods)

//Add payment method
router.post("/payments", isLoggedIn, addPaymentMethod)

//Add payment details
router.post("/payments/:paymentMethodId", isLoggedIn, addPaymentMethodDetails)

//Delete payment method
router.delete("/payments/:paymentMethodId", isLoggedIn, deletePaymentMethod)