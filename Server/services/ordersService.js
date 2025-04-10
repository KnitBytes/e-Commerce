const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createNotification } = require('../services/notificationService');

// 1. Checkout Cart → Place Order
const checkoutCart = async (userId, req) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { user_id: userId },
    include: { product: true },
  });

  if (!cartItems.length) throw new Error("Cart is empty");

  let total = 0;
  const orderItems = [];

  for (const item of cartItems) {
    const product = item.product;
    if (item.quantity > product.quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    const originalPrice = parseFloat(product.price);
    const discount = product.discount_percentage || 0;
    const unitPrice = originalPrice - (originalPrice * discount / 100);
    const subtotal = unitPrice * item.quantity;
    total += subtotal;

    orderItems.push({
      product_id: product.id,
      product_name: product.name,
      original_price: originalPrice,
      discount_applied: discount,
      unit_price: unitPrice,
      quantity: item.quantity,
      subtotal,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        user_id: userId,
        total_price: total,
        status: "PENDING",
        orderItems: {
          create: orderItems,
        },
      },
      include: { orderItems: true },
    });

    for (const item of orderItems) {
      await tx.product.update({
        where: { id: item.product_id },
        data: {
          quantity: { decrement: item.quantity },
        },
      });

      const updatedProduct = await tx.product.findUnique({
        where: { id: item.product_id },
        select: {
          name: true,
          quantity: true,
          uoms: true,
          low_stock_threshold: true,
        },
      });

      if (updatedProduct.quantity <= updatedProduct.low_stock_threshold) {
        const alertMsg = `⚠️ Low stock alert: '${updatedProduct.name}' has only ${updatedProduct.quantity}${updatedProduct.uoms} left!`;

        await createNotification({ user_id: null, message: alertMsg });

        const io = req.app.get('io');
        io.to('admins').emit('notification', { message: alertMsg });
      }
    }

    await tx.cartItem.deleteMany({ where: { user_id: userId } });

    return newOrder;
  });

  const io = req.app.get('io');
  const userName = req.user.name;

  for (const item of cartItems) {
    const productName = item.product.name;
    const quantity = item.quantity;
    const uom = item.product.uoms;

    await createNotification({
      user_id: userId,
      message: `Your order for '${productName}' has been placed.`
    });
    io.to(`user_${userId}`).emit('notification', {
      message: `Your order for '${productName}' has been placed.`,
    });

    await createNotification({
      user_id: null,
      message: `New order for '${productName}' – ${quantity}${uom} by '${userName}'`
    });
    io.to('admins').emit('notification', {
      message: `New order for '${productName}' – ${quantity}${uom} by '${userName}'`,
    });
  }

  return order;
};

// 2. User Orders with Pagination
const getOrdersByUser = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      skip,
      take,
      include: {
        orderItems: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    }),
    prisma.order.count({ where: { user_id: userId } }),
  ]);

  const formattedOrders = orders.map(order => ({
    id: order.id,
    total_price: order.total_price,
    status: order.status,
    created_at: order.created_at,
    items: order.orderItems.map(item => ({
      product_name: item.product.name,
      quantity: item.quantity,
      original_price: item.original_price,
      discount_applied: item.discount_applied,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      saved: (item.original_price - item.unit_price) * item.quantity,
    })),
  }));

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: formattedOrders,
  };
};

// 3. Get Specific Order
const getOrderDetailById = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  });

  if (!order) throw new Error("Order not found");
  if (order.user_id !== userId) throw new Error("Unauthorized access");

  return {
    id: order.id,
    status: order.status,
    total_price: order.total_price,
    created_at: order.created_at,
    items: order.orderItems.map(item => ({
      product_name: item.product.name,
      quantity: item.quantity,
      original_price: item.original_price,
      discount_applied: item.discount_applied,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      saved: (item.original_price - item.unit_price) * item.quantity,
    })),
  };
};

// 4. Update Order Status
const updateOrderStatus = async (orderId, status, userId, role) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: true },
  });

  if (!order) throw new Error("Order not found");
  if (order.user_id !== userId && role !== "admin") {
    throw new Error("Unauthorized to update this order");
  }

  const validStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  if (status === "DELIVERED") {
    await prisma.$transaction(async (tx) => {
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { sales_count: { increment: item.quantity } },
        });
      }
      await tx.order.update({
        where: { id: orderId },
        data: { status, updated_at: new Date() },
      });
    });

    return { ...order, status: "DELIVERED" };
  }

  if (status === "CANCELLED") {
    await prisma.$transaction(async (tx) => {
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { quantity: { increment: item.quantity } },
        });
      }
      await tx.order.update({
        where: { id: orderId },
        data: { status, updated_at: new Date() },
      });
    });

    return { ...order, status: "CANCELLED" };
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status, updated_at: new Date() },
  });
};

// 5. Cancel Order
const cancelOrder = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: true },
  });

  if (!order) throw new Error("Order not found");
  if (order.user_id !== userId) throw new Error("Unauthorized to cancel this order");

  if (order.status !== "PENDING" && order.status !== "CONFIRMED") {
    throw new Error("Only PENDING or CONFIRMED orders can be canceled");
  }

  await prisma.$transaction(async (tx) => {
    for (const item of order.orderItems) {
      await tx.product.update({
        where: { id: item.product_id },
        data: { quantity: { increment: item.quantity } },
      });
    }

    await tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED", updated_at: new Date() },
    });
  });

  return order;
};

// 6. Admin View – All Orders with Pagination
const getAllOrders = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      orderBy: { created_at: "desc" },
      skip,
      take,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        orderItems: {
          include: {
            product: { select: { name: true } },
          },
        },
      },
    }),
    prisma.order.count(),
  ]);

  const formattedOrders = orders.map(order => ({
    id: order.id,
    user: order.user,
    total_price: order.total_price,
    status: order.status,
    created_at: order.created_at,
    items: order.orderItems.map(item => ({
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
    })),
  }));

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: formattedOrders,
  };
};

// ✅ Final Export
module.exports = {
  checkoutCart,
  getOrdersByUser,
  getOrderDetailById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
};
