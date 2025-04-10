const adminDashboardService = require("../services/adminDashboardService");

const getAllUsers = async (req, res) => {
  try {
    const filters = req.query;
    const users = await adminDashboardService.getAllUsers(filters);

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch users",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await adminDashboardService.getUserById(userId);

    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || "User not found",
    });
  }
};

const getOrderAnalytics = async (req, res) => {
  try {
    const data = await adminDashboardService.getOrderAnalytics();

    res.status(200).json({
      message: "Order analytics fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch order analytics",
    });
  }
};

const getRevenueAnalytics = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 12;
    const data = await adminDashboardService.getRevenueAnalytics(months);

    res.status(200).json({
      message: "Revenue analytics fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch revenue analytics",
    });
  }
};

const getCustomerAnalytics = async (req, res) => {
  try {
    const data = await adminDashboardService.getCustomerAnalytics();

    res.status(200).json({
      message: "Customer analytics fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch customer analytics",
    });
  }
};

const getTopSellingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = await adminDashboardService.getTopSellingProducts(limit);

    res.status(200).json({
      message: "Top selling products fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch top selling products",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getOrderAnalytics,
  getRevenueAnalytics,
  getCustomerAnalytics,
  getTopSellingProducts,
};
