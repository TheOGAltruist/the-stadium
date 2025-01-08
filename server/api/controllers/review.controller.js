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
  const { username } = req.user;
  const { text, rating } = req.body;
  try {
    const newReview = await prisma.review.create({
      data: { product_id: productId, user_name: username, text, rating },
    });
    res.status(201).json(newReview);
  } catch (error) {
    next({ message: "Failed to add review" });
  }
};

// UPDATE a review for a product (USERS ONLY)
const updateReview = async (req, res, next) => {
  const { productId } = req.params;
  const { username } = req.user;
  const { text, rating } = req.body;

  console.log(req.params);
  console.log(req.user);
  console.log(req.body);

  try {
    const existingReview = await prisma.review.findUnique({
      where: {
        user_name_product_id: {
          user_name: username,
          product_id: productId,
        },
      },
    });

    if (!existingReview) {
      return next({ statusCode: 404, message: "Review not found" });
    }

    // Only users are able to update the review
    if (existingReview.user_name !== username) {
      return next({
        statusCode: 403,
        message: "You are not authorized to update this review",
      });
    }

    const updatedReview = await prisma.review.update({
      where: {
        user_name_product_id: {
          user_name: username,
          product_id: productId,
        },
      },
      data: { text, rating },
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    next({ message: "Failed to update review" });
  }
};

// DELETE a review (USERS or ADMIN only)
const deleteReview = async (req, res, next) => {
  const { id } = req.params;
  const { username } = req.user;

  try {
    const existingReview = prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return next({
        statusCode: 404,
        message: "Review not found",
      });
    }

    // only USERS and ADMIN can delete a review
    if (existingReview.user_name !== username) {
      return next({
        statusCode: 403,
        message: "You are not authorized to delete this review",
      });
    }

    await prisma.review.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    next({ message: "Failed to delete review" });
  }
};

module.exports = { getReviews, addReview, updateReview, deleteReview };
