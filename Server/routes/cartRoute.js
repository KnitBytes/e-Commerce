// cart/cart.routes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth(), cartController.addToCart);
router.get("/", auth(), cartController.getCartItems);
router.put("/:cartItemId", auth(), cartController.updateCartItem);
router.delete("/:cartItemId", auth(), cartController.removeCartItem);
router.delete("/", auth(), cartController.clearCart);
router.get("/summary", auth(), cartController.getCartSummary);

module.exports = router;
