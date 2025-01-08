const prisma = require("../../prisma/index");

// GET reviews for a product
const getReviews = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { product_id: productId },
      include: { user: true },
    });
    res.status(200).json(reviews);
  } catch (error) {
    next({ message: "Failed to fetch reviews" });
  }
};

module.exports = { getReviews };
