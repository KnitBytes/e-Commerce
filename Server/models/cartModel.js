// cart/cart.model.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.findCartItem = (userId, productId) => {
  return prisma.cartItem.findUnique({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
  });
};

exports.createCartItem = (userId, productId, quantity, unitPrice) => {
  return prisma.cartItem.create({
    data: {
      user_id: userId,
      product_id: productId,
      quantity,
      unit_price: unitPrice,
    },
  });
};

exports.updateCartItem = (userId, productId, newQuantity) => {
  return prisma.cartItem.update({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId,
      },
    },
    data: {
      quantity: newQuantity,
      updated_at: new Date(),
    },
  });
};

exports.getCartSummary = (userId) => {
  return prisma.cartItem.findMany({
    where: { user_id: userId },
    select: {
      quantity: true,
      unit_price: true,
    },
  });
};

exports.getCartItemsWithProduct = (userId) => {
    return prisma.cartItem.findMany({
      where: { user_id: userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });
  };

  exports.findCartItemById = (cartItemId) => {
    return prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });
  };
  
  exports.updateCartItemById = (cartItemId, quantity) => {
    return prisma.cartItem.update({
      where: { id: cartItemId },
      data: {
        quantity,
        updated_at: new Date(),
      },
    });
  };

  exports.deleteCartItemById = (cartItemId) => {
    return prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  };

  exports.deleteAllCartItems = (userId) => {
    return prisma.cartItem.deleteMany({
      where: { user_id: userId },
    });
  };
  

exports.findProductById = (productId) => {
  return prisma.product.findUnique({
    where: { id: productId },
  });
};
