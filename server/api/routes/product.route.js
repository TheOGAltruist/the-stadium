const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
} = require("../controllers/product.controller");
const { isAdmin } = require("../utils/middleware.util");

// **READ** Get all products
router.get("/", getAllProducts);

// Get product by ID
router.get("/:id", getProductById);

// **CREATE** a new product (ADMIN ONLY)
router.post("/", isAdmin, createProduct);

//   **UPDATE** a product (ADMIN ONLY)
router.put("/:id", isAdmin, async (req, res) => {
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
    console.error("Failed to update product", error);
  }
});

// **DELETE** a product (admin only)
router.delete("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete product", error);
  }
});

module.exports = router;
