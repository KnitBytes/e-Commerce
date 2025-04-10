const CartModel = require("../models/cartModel");

const addOrUpdateCartItem = async (userId, productId, quantity) => {
  const product = await CartModel.findProductById(productId);
  if (!product) throw new Error("Product not found");

  const existingItem = await CartModel.findCartItem(userId, productId);

  if (existingItem) {
    const updatedQty = existingItem.quantity + quantity;
    return await CartModel.updateCartItem(userId, productId, updatedQty);
  } else {
    return await CartModel.createCartItem(userId, productId, quantity, product.price);
  }
};

const getCartItems = async (userId) => {
  const items = await CartModel.getCartItemsWithProduct(userId);

  const data = items.map(item => ({
    id: item.id,
    product_id: item.product.id,
    product_name: item.product.name,
    unit_price: item.unit_price,
    quantity: item.quantity,
    subtotal: (item.unit_price * item.quantity).toFixed(2),
    added_at: item.created_at,
  }));

  const total = data.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  return {
    items: data,
    total: total.toFixed(2),
  };
};

const updateCartItem = async (userId, cartItemId, newQuantity) => {
  const cartItem = await CartModel.findCartItemById(cartItemId);

  if (!cartItem) throw new Error("Cart item not found");
  if (cartItem.user_id !== userId) throw new Error("Unauthorized to update this item");

  return await CartModel.updateCartItemById(cartItemId, newQuantity);
};

const removeCartItem = async (userId, cartItemId) => {
  const cartItem = await CartModel.findCartItemById(cartItemId);

  if (!cartItem) throw new Error("Cart item not found");
  if (cartItem.user_id !== userId) throw new Error("Unauthorized to delete this item");

  return await CartModel.deleteCartItemById(cartItemId);
};

const clearCart = async (userId) => {
  return await CartModel.deleteAllCartItems(userId);
};

const getCartSummary = async (userId) => {
  const items = await CartModel.getCartSummary(userId);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * parseFloat(item.unit_price), 0);

  return {
    totalItems,
    totalPrice: totalPrice.toFixed(2),
  };
};

module.exports = {
  addOrUpdateCartItem,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
};
