const express = require("express");
const router = express.Router();
const { getReviews } = require("../controllers/review.controller");

// GET reviews for a product
router.get("/:productId", getReviews);

// Add a review for a product

// Update a review

// Delete a review

module.exports = router;
