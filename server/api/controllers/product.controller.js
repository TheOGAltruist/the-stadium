const prisma = require("../../prisma/index");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

// Get product by ID

// Create a new product (ADMIN ONLY)

// Update a product (ADMIN ONLY)

// DELETE a product (ADMIN only)

module.exports = { getAllProducts };
