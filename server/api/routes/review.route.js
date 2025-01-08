const express = require("express");
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require("../controllers/review.controller");
const { isLoggedIn } = require("../middleware/middleware.util");

// GET reviews for a product
router.get("/:productId", getReviews);

// Add a review for a product
router.post("/:productId", isLoggedIn, addReview);

// Update a review
router.put('/:productId', isLoggedIn, updateReview);

// Delete a review
router.delete(':id', isLoggedIn, deleteReview);

module.exports = router;
