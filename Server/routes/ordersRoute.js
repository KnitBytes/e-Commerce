const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const auth = require("../middlewares/authMiddleware");

// Checkout → create order from cart
router.post("/checkout", auth(), ordersController.checkoutFromCart);

router.get("/", auth(), ordersController.getMyOrders);

router.get("/:id", auth(), ordersController.getOrderById);

router.put("/:id/status", auth(["admin"]), ordersController.updateOrderStatus);

router.put("/:id/cancel", auth(), ordersController.cancelOrder);

router.get("/admin/all", auth(["admin"]), ordersController.getAllOrders);

module.exports = router;
