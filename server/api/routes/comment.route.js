const express = require("express");
const router = express.Router();
const { getComments, addComment } = require("../controllers/comment.controller");
const { isLoggedIn } = require("../middleware/middleware.util");

// GET comments for a product review
router.get("/:reviewId", getComments);

// Add a comment to a product review (USERS only)
router.post('/:reviewId', isLoggedIn, addComment);

// Update a comment to a product review (USERS only)

// Delete a comment (USERS or ADMIN only)

module.exports = router;
