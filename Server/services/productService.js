const productModel = require("../models/productModel");
const { formatPricePerUnit } = require("../utils/priceFormatter");
const { getAvailability } = require("../utils/availability");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ✅ Create a new product
const createProduct = async (productData) => {
  const { category_id, uoms, low_stock_threshold } = productData;

  await productModel.validateCategoryAndUOM(category_id, uoms);

  const newProduct = await productModel.addProduct(productData);

  const priceAfterDiscount = newProduct.price - (newProduct.price * (newProduct.discount_percentage || 0) / 100);

  return {
    ...newProduct,
    category_name: newProduct.category.name,
    availability: getAvailability(newProduct.quantity),
    pricePerUnit: formatPricePerUnit(priceAfterDiscount, newProduct.uoms),
    original_price: newProduct.price,
    discount_percentage: newProduct.discount_percentage || 0,
  };
};

// ✅ Update product
const updateProduct = async (productId, updates) => {
  if (updates.category_id && updates.uoms) {
    await productModel.validateCategoryAndUOM(updates.category_id, updates.uoms);
  }

  const updated = await productModel.updateProduct(productId, updates);
  if (!updated) throw new Error("Product not found or nothing to update");

  const priceAfterDiscount = updated.price - (updated.price * (updated.discount_percentage || 0) / 100);

  return {
    ...updated,
    category_name: updated.category.name,
    availability: getAvailability(updated.quantity),
    pricePerUnit: formatPricePerUnit(priceAfterDiscount, updated.uoms),
    original_price: updated.price,
    discount_percentage: updated.discount_percentage || 0,
  };
};

// ✅ Delete product
const deleteProduct = async (productId) => {
  const deleted = await productModel.deleteProduct(productId);
  if (!deleted) throw new Error("Product not found");
  return deleted;
};

// ✅ Get all products with filters, pagination
const getAllProducts = async (query) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    minQuantity,
    sortBy,
    sortOrder,
    page = 1,
    limit = 12,
  } = query;

  const filters = {
    search,
    category,
    minPrice,
    maxPrice,
    minQuantity,
    sortBy,
    sortOrder,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const { products, pagination } = await productModel.getAllProducts(filters);

  const mappedProducts = products.map((p) => {
    const priceAfterDiscount = p.price - (p.price * (p.discount_percentage || 0) / 100);
    return {
      ...p,
      category_name: p.category.name,
      availability: getAvailability(p.quantity),
      pricePerUnit: formatPricePerUnit(priceAfterDiscount, p.uoms),
      original_price: p.price,
      discount_percentage: p.discount_percentage || 0,
    };
  });

  return {
    products: mappedProducts,
    pagination,
  };
};

// ✅ Get single product by ID
const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) throw new Error("Product not found");

  // ⭐ Fetch review stats
  const reviews = await prisma.review.findMany({
    where: { product_id: id },
    select: { rating: true },
  });

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  const priceAfterDiscount = product.price - (product.price * (product.discount_percentage || 0) / 100);

  return {
    ...product,
    category_name: product.category.name,
    availability: getAvailability(product.quantity),
    pricePerUnit: formatPricePerUnit(priceAfterDiscount, product.uoms),
    original_price: product.price,
    discount_percentage: product.discount_percentage || 0,
    average_rating: parseFloat(averageRating.toFixed(2)),
    total_reviews: totalReviews,
  };
};

// ✅ Get featured products
const getFeaturedProducts = async () => {
  const featuredProducts = await prisma.product.findMany({
    where: { is_featured: true, quantity: { gt: 0 } },
    include: { category: true },
    take: 10,
    orderBy: { created_at: 'desc' },
  });

  return featuredProducts.map((p) => {
    const priceAfterDiscount = p.price - (p.price * (p.discount_percentage || 0) / 100);
    return {
      ...p,
      category_name: p.category.name,
      availability: getAvailability(p.quantity),
      pricePerUnit: formatPricePerUnit(priceAfterDiscount, p.uoms),
      original_price: p.price,
      discount_percentage: p.discount_percentage || 0,
    };
  });
};

// ✅ Get best sellers
const getBestSellers = async () => {
  const products = await prisma.product.findMany({
    where: {
      quantity: { gt: 0 },
      sales_count: { gt: 0 },
    },
    orderBy: {
      sales_count: 'desc',
    },
    take: 10,
    include: { category: true },
  });

  return products.map((p) => {
    const priceAfterDiscount = p.price - (p.price * (p.discount_percentage || 0) / 100);
    return {
      ...p,
      category_name: p.category.name,
      availability: getAvailability(p.quantity),
      pricePerUnit: formatPricePerUnit(priceAfterDiscount, p.uoms),
      original_price: p.price,
      discount_percentage: p.discount_percentage || 0,
    };
  });
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getAvailability,
  getFeaturedProducts,
  getBestSellers,
};
