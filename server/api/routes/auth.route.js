const {
    login,
    register,
    logout,
    forgotPassword,
    passwordReset,
    oauthRegister,
} = require("../controllers/auth.controller.js")
const { isLoggedIn } = require("../middleware/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.post("/login", login)
router.post("/register", register)
router.post("/logout", isLoggedIn, logout)
router.post("/forgotpassword", forgotPassword)
router.post("/passwordreset", passwordReset)
router.post("/register/oauth", oauthRegister)