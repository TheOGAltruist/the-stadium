const {
    getAllUsers,
    getSpecificUser,
} = require("../controllers/user.controller.js")

const { isLoggedIn, isAdmin } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

//All users
router.get("/", isLoggedIn, isAdmin, getAllUsers)

//Single user
router.get("/:userId", isLoggedIn, isAdmin, getSpecificUser)