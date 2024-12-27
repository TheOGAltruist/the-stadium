const {
    getMe,
    editMe,
} = require("../controllers/me.controller.js")

const { isLoggedIn } = require("../utils/middleware.util.js")

const router = require("express").Router()
module.exports = router

//Get me object
router.get("/", isLoggedIn, getMe)

//Edit me object
router.patch("/", isLoggedIn, editMe)