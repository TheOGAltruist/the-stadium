const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/product.controller");
const { isAdmin } = require("../middleware/middleware.util");

// **READ** Get all products
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

module.exports = router;
