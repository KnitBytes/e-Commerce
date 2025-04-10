const {
  findUsers,
  findUserById,
  getOrderCounts,
  groupOrdersByStatus,
  getTotalRevenue,
  getDeliveredOrderItems,
  groupTopProducts,
  findProductsByIds,
  getCustomerCounts,
  getTotalCustomers,
} = require("../models/adminDashboardModel");

const { format, subDays, subMonths, startOfDay } = require("date-fns");

const getAllUsers = async (filters) => {
  return await findUsers(filters);
};

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const getOrderAnalytics = async () => {
  const totalOrders = await getOrderCounts();
  const ordersByStatusRaw = await groupOrdersByStatus();

  const ordersByStatus = ordersByStatusRaw.reduce((acc, entry) => {
    acc[entry.status] = entry._count;
    return acc;
  }, {});

  return { totalOrders, ordersByStatus };
};

const getRevenueAnalytics = async (months = 12) => {
  const totalRevenueResult = await getTotalRevenue();
  const totalRevenue = totalRevenueResult._sum.subtotal || 0;

  const monthlyRaw = await getDeliveredOrderItems(subMonths(new Date(), months));
  const monthlyRevenue = {};

  for (const item of monthlyRaw) {
    const month = format(item.order.created_at, "yyyy-MM");
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + Number(item.subtotal);
  }

  const monthlyFormatted = Object.entries(monthlyRevenue).map(([key, value]) => {
    const [year, monthNum] = key.split("-");
    const monthName = format(new Date(`${key}-01`), "MMM");
    return {
      month: monthName,
      year: parseInt(year),
      total: parseFloat(value.toFixed(2)),
    };
  });

  monthlyFormatted.sort((a, b) => new Date(`${a.year}-${a.month}`) - new Date(`${b.year}-${b.month}`));

  const dailyRaw = await getDeliveredOrderItems(subDays(new Date(), 6));
  const dailyRevenue = {};

  for (const item of dailyRaw) {
    const date = format(item.order.created_at, "yyyy-MM-dd");
    dailyRevenue[date] = (dailyRevenue[date] || 0) + Number(item.subtotal);
  }

  const dailyFormatted = Object.entries(dailyRevenue).map(([date, total]) => ({
    date,
    total: parseFloat(total.toFixed(2)),
  }));

  dailyFormatted.sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    monthlyRevenue: monthlyFormatted,
    dailyRevenue: dailyFormatted,
  };
};

const getCustomerAnalytics = async () => {
  const totalCustomers = await getTotalCustomers();

  const today = startOfDay(new Date());
  const oneWeekAgo = subDays(today, 7);
  const twoWeeksAgo = subDays(today, 14);

  const thisWeek = await getCustomerCounts(oneWeekAgo, today);
  const lastWeek = await getCustomerCounts(twoWeeksAgo, oneWeekAgo);

  const growthSinceLastWeek = lastWeek === 0
    ? thisWeek > 0 ? 100 : 0
    : ((thisWeek - lastWeek) / lastWeek) * 100;

  return {
    totalCustomers,
    growthSinceLastWeek: parseFloat(growthSinceLastWeek.toFixed(2)),
  };
};

const getTopSellingProducts = async (limit = 5) => {
  const result = await groupTopProducts(limit);
  const productIds = result.map(r => r.product_id);
  const products = await findProductsByIds(productIds);

  const productsMap = {};
  products.forEach(p => (productsMap[p.id] = p.name));

  return result.map(item => ({
    productId: item.product_id,
    name: productsMap[item.product_id],
    quantitySold: item._sum.quantity,
  }));
};

module.exports = {
  getAllUsers,
  getUserById,
  getOrderAnalytics,
  getRevenueAnalytics,
  getCustomerAnalytics,
  getTopSellingProducts,
};
