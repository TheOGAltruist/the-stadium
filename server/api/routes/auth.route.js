const {
    login,
    register
} = require("../controllers/auth.controller.js")

const router = require("express").Router()
module.exports = router

router.post("/login", login)
router.post("/register", register)