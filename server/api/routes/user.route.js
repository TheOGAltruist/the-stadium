const {
    getAllUsers,
} = require("../controllers/user.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.get("/", isLoggedIn, getAllUsers)