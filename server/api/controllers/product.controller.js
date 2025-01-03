const prisma = require("../../prisma/index");

// Get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

// Create a new product (ADMIN ONLY)
const createProduct = async (req, res, next) => {
  const { name, description, price, quantity, tags, categories } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        tags: { create: tags.map((tag) => ({ name: tag })) },
        categories: {
          create: categories.map((category) => ({ name: category })),
        },
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Update a product (ADMIN ONLY)
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, quantity, tags, categories } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        quantity,
        tags: { set: tags?.map((tag) => ({ name: tag })) },
        categories: {
          set: categories?.map((category) => ({ name: category })),
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// DELETE a product (ADMIN only)
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
