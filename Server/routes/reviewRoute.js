const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/authMiddleware");

// Add a review
router.post("/:productId", auth(), reviewController.addReview);

// Get reviews for a product
router.get("/:productId", reviewController.getReviews);
router.get("/:productId/average", reviewController.getAverageRating);
router.put("/:productId", auth(), reviewController.updateReview);
router.delete("/:productId", auth(), reviewController.deleteReview);

module.exports = router;
