const reviewService = require("../services/reviewService");

exports.addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.productId);
    const { rating, review_text } = req.body;

    const review = await reviewService.addReview(userId, productId, rating, review_text);

    res.status(201).json({
      message: "Review added successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to add review" });
  }
};

exports.getReviews = async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
  
      const reviews = await reviewService.getReviews(productId);
  
      res.status(200).json({
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || "Failed to fetch reviews" });
    }
  };

  exports.getAverageRating = async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      const avgRating = await reviewService.getAverageRating(productId);
  
      res.status(200).json({ average_rating: avgRating });
    } catch (error) {
      res.status(500).json({ message: error.message || "Failed to get average rating" });
    }
  };

  exports.updateReview = async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = parseInt(req.params.productId);
      const { rating, review_text } = req.body;
  
      const updated = await reviewService.updateReview(userId, productId, rating, review_text);
  
      res.status(200).json({
        message: "Review updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to update review" });
    }
  };

  exports.deleteReview = async (req, res) => {
    try {
      const userId = req.user.id;
      const role = req.user.role;
      const productId = parseInt(req.params.productId);
  
      await reviewService.deleteReview(userId, productId, role);
  
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message || "Failed to delete review" });
    }
  };