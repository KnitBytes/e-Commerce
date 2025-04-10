const ordersService = require("../services/ordersService");

const checkoutFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await ordersService.checkoutCart(userId, req);
    res.status(201).json({
      message: "Order placed successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Checkout failed" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await ordersService.getOrdersByUser(userId, page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);
    const order = await ordersService.getOrderDetailById(orderId, userId);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message || "Order not found" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    const updatedOrder = await ordersService.updateOrderStatus(orderId, status, userId, role);
    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update order status" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    const updatedOrder = await ordersService.cancelOrder(orderId, userId);
    res.status(200).json({
      message: "Order canceled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to cancel order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await ordersService.getAllOrders(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch all orders" });
  }
};

module.exports = {
  checkoutFromCart,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
};
