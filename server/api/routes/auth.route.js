const {
    login,
    register,
    logout,
    forgotPassword,
    passwordReset,
} = require("../controllers/auth.controller.js")
const { isLoggedIn } = require("../middleware/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.post("/login", login)
router.post("/register", register)
router.post("/logout", isLoggedIn, logout)
router.post("/forgotpassword", forgotPassword)
router.get("/passwordreset", passwordReset)