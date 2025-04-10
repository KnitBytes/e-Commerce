const { PrismaClient } = require("@prisma/client");
const { formatPricePerUnit } = require("../utils/priceFormatter");
const { getAvailability } = require("../utils/availability");

const prisma = new PrismaClient();

exports.getTrendingProducts = async () => {
  // 1. Find top-selling product IDs in last 24 hours
  const trendingData = await prisma.orderItem.groupBy({
    by: ['product_id'],
    where: {
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // last 24 hours
      },
      order: {
        status: 'DELIVERED'
      }
    },
    _sum: {
      quantity: true
    },
    orderBy: {
      _sum: {
        quantity: 'desc'
      }
    },
    take: 20
  });

  const productIds = trendingData.map(item => item.product_id);

  if (!productIds.length) return [];

  // 2. Fetch product details
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      quantity: { gt: 0 }
    },
    include: { category: true }
  });

  // 3. Map and format
  return products.map((p) => {
    const priceAfterDiscount = parseFloat(p.price) - (parseFloat(p.price) * (p.discount_percentage || 0) / 100);
    return {
      ...p,
      category_name: p.category.name,
      availability: getAvailability(p.quantity),
      pricePerUnit: formatPricePerUnit(priceAfterDiscount, p.uoms),
      original_price: parseFloat(p.price),
      discount_percentage: p.discount_percentage || 0,
    };
  });
};
