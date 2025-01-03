const prisma = require("../../prisma/index");

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    next({ message: "Failed to fetch all products" });
  }
};

// Get product by ID
const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next({ message: "Failed to fetch a product by ID" });
  }
};

// Create a new product (ADMIN ONLY)
const createProduct = async (req, res, next) => {
  const { name, description, price, quantity, skuId } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price.toFixed(2)),
        quantity,
        skuId,
      },
    });
    res.status(201).json({
      id: newProduct.id,
      newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    next({ message: "Failed to create a product" });
  }
};

// Update a product (ADMIN ONLY)
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, quantity, skuId } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price.toFixed(2)),
        quantity,
        skuId,
      },
    });
    res.status(200).json({
      id: product.id,
      product,
      message: "Product updated successfully",
    });
  } catch (error) {
    next({ message: "Failed to update product" });
  }
};

// DELETE a product (ADMIN only)
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next({ message: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
