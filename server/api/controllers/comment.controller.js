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

module.exports = { getComments };
