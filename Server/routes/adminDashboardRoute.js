const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const adminDashboardController = require("../controllers/adminDashboardController");

// Get all users (admin only)
router.get("/users", auth(["admin"]), adminDashboardController.getAllUsers);
router.get("/users/:id", auth(["admin"]), adminDashboardController.getUserById);
router.get("/analytics/orders", auth(["admin"]), adminDashboardController.getOrderAnalytics);
router.get("/analytics/revenue", auth(["admin"]), adminDashboardController.getRevenueAnalytics);
router.get("/analytics/customers", auth(["admin"]), adminDashboardController.getCustomerAnalytics);
router.get("/analytics/top-products", auth(["admin"]), adminDashboardController.getTopSellingProducts);
module.exports = router;
