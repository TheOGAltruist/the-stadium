const {
    getAllUsers,
} = require("../controllers/user.controller.js")

const { isLoggedIn, isAdmin } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

router.get("/", isLoggedIn, isAdmin, getAllUsers)