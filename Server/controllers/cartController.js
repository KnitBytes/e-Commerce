const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const result = await cartService.addOrUpdateCartItem(userId, product_id, quantity);

    res.status(200).json({
      message: "Item added to cart successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to add item to cart" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await cartService.getCartItems(userId);

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch cart items" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = parseInt(req.params.cartItemId);
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const updatedItem = await cartService.updateCartItem(userId, cartItemId, quantity);

    res.status(200).json({
      message: "Cart item updated successfully",
      data: updatedItem,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update cart item" });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = parseInt(req.params.cartItemId);

    const result = await cartService.removeCartItem(userId, cartItemId);

    res.status(200).json({
      message: "Cart item removed successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to remove cart item" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await cartService.clearCart(userId);

    res.status(200).json({
      message: "Cart cleared successfully",
      deletedCount: result.count,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to clear cart" });
  }
};

const getCartSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await cartService.getCartSummary(userId);

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch cart summary" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
};
