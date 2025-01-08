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

// ADD a review for a product (USERS ONLY)
const addReview = async (req, res, next) => {
  const { productId } = req.params;
  const { id: userId } = req.user;
  const { text, rating } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { product_id: productId, user_name: userId, text, rating },
    });
    res.status(201).json(newReview);
  } catch (error) {
    next({ message: "Failed to add review" });
  }
};

// UPDATE a review for a product ()

module.exports = { getReviews, addReview };
