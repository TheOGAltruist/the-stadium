const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/index");

// **READ** Get all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Failed to fetch product", error);
  }
});

// **CREATE** a new product (ADMIN ONLY)
router.post("/", async (req, res) => {
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
    console.error("Failed to create product", error);
  }
});

