const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { subDays, subMonths, format, startOfDay } = require("date-fns");

const findUsers = (filters) => {
  const { role, province, district } = filters;

  return prisma.users.findMany({
    where: {
      ...(role && { role }),
      ...(province && { province }),
      ...(district && { district }),
    },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      gender: true,
      role: true,
      province: true,
      district: true,
      created_at: true,
    },
  });
};

const findUserById = (id) => {
  return prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      gender: true,
      role: true,
      province: true,
      district: true,
      tole: true,
      street: true,
      landmark: true,
      created_at: true,
    },
  });
};

const getOrderCounts = () => prisma.order.count();

const groupOrdersByStatus = () =>
  prisma.order.groupBy({
    by: ["status"],
    _count: true,
  });

const getDeliveredOrderItems = (sinceDate) =>
  prisma.orderItem.findMany({
    where: {
      order: {
        status: "DELIVERED",
        created_at: {
          gte: sinceDate,
        },
      },
    },
    include: {
      order: {
        select: { created_at: true },
      },
    },
  });

const getTotalRevenue = () =>
  prisma.orderItem.aggregate({
    where: {
      order: {
        status: "DELIVERED",
      },
    },
    _sum: {
      subtotal: true,
    },
  });

const groupTopProducts = (limit) =>
  prisma.orderItem.groupBy({
    by: ["product_id"],
    where: {
      order: {
        status: "DELIVERED",
      },
    },
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: limit,
  });

const findProductsByIds = (ids) =>
  prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true },
  });

const getCustomerCounts = (start, end) =>
  prisma.users.count({
    where: {
      role: "user",
      created_at: {
        gte: start,
        lt: end,
      },
    },
  });

const getTotalCustomers = () =>
  prisma.users.count({ where: { role: "user" } });

module.exports = {
  findUsers,
  findUserById,
  getOrderCounts,
  groupOrdersByStatus,
  getDeliveredOrderItems,
  getTotalRevenue,
  groupTopProducts,
  findProductsByIds,
  getCustomerCounts,
  getTotalCustomers,
};
