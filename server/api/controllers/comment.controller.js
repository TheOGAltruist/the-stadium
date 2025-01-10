const prisma = require("../../prisma/index");

// GET comments for a review
const getComments = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { review_id: reviewId },
      include: { user: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    next({ message: "Failed to fetch comments" });
  }
};

// ADD comments to a review
const addComment = async (req, res, next) => {
  const { reviewId } = req.params;
  const { userId } = req.user;
  const { text } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        review_id: reviewId,
        user_name: userId,
        text,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    next({ message: "Failed to add a comment" });
  }
};

module.exports = { getComments, addComment };
