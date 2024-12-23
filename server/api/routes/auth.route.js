const {
    login,
    register,
    me
} = require("../controllers/auth.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.post("/auth/login", login)
router.post("/auth/register", register)
router.get("/auth/me", isLoggedIn, me)