const {
    login,
    register,
    me
} = require("../controllers/auth.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.post("/login", login)
router.post("/register", register)
router.get("/me", isLoggedIn, me)