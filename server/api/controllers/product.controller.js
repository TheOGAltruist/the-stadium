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
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
};

// Create a new product (ADMIN ONLY)

// Update a product (ADMIN ONLY)

// DELETE a product (ADMIN only)

module.exports = { getAllProducts, getProductById };
