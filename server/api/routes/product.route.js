const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { isAdmin } = require("../utils/middleware.util");

// **READ** Get all products
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// **CREATE** a new product (ADMIN ONLY)
router.post("/", isAdmin, createProduct);

// **UPDATE** a product (ADMIN ONLY)
router.put("/:id", isAdmin, updateProduct);

// **DELETE** a product (admin only)
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
