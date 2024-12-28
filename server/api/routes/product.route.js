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

