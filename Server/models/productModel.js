const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Validate Category & UOM
const validateCategoryAndUOM = async (categoryId, uoms) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(categoryId), // Ensure integer
    },
    select: {
      uoms: true,
    },
  });

  if (!category || !category.uoms.includes(uoms)) {
    throw new Error("Invalid unit of measurement for the selected category.");
  }
};

// ✅ Add New Product
const addProduct = async (data) => {
  const newProduct = await prisma.product.create({
    data: {
      name: data.name,
      category_id: parseInt(data.category_id),
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      description: data.description,
      uoms: data.uoms,
      images: data.images,
      added_by: data.added_by,
      low_stock_threshold: parseInt(data.low_stock_threshold),
      is_featured: data.is_featured || false,
      low_stock_threshold: parseInt(data.low_stock_threshold),
     discount_percentage: parseFloat(data.discount_percentage) || 0, // ✅ added here
    },
    include: { category: true }
  });

  return newProduct;
};

// ✅ Update Product
const updateProduct = async (id, updates) => {
  const data = {
    updated_at: new Date(),
  };

  if (updates.name) data.name = updates.name;
  if (updates.category_id) data.category_id = parseInt(updates.category_id);
  if (updates.price) data.price = parseFloat(updates.price);
  if (updates.quantity) data.quantity = parseInt(updates.quantity);
  if (updates.description) data.description = updates.description;
  if (updates.uoms) data.uoms = updates.uoms;
  if (updates.images) data.images = updates.images;
  if (updates.added_by) data.added_by = updates.added_by;
  if (updates.low_stock_threshold) {
    data.low_stock_threshold = parseInt(updates.low_stock_threshold);
  }
  if (updates.is_featured !== undefined) data.is_featured = updates.is_featured;

  // ✅ Fix: Move this up so it's part of `data` before updating
  if (updates.discount_percentage !== undefined) {
    data.discount_percentage = parseFloat(updates.discount_percentage);
  }

  const updated = await prisma.product.update({
    where: { id: parseInt(id) },
    data,
    include: { category: true }
  });

  return updated;
};

// ✅ Delete Product
const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id: parseInt(id) }
  });
};

// ✅ Get All Products with Filters + Pagination
const getAllProducts = async (filters) => {
  const {
    page = 1,
    limit = 12,
    search,
    category,
    minPrice,
    maxPrice,
    minQuantity,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = filters;

  const where = {
    quantity: { gt: 0 },
    ...(search && {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    }),
    ...(category && { category_id: parseInt(category) }),
    ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
    ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
    ...(minQuantity && { quantity: { gte: parseInt(minQuantity) } })
  };

  const totalItems = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { [sortBy]: sortOrder },
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit)
  });

  const totalPages = Math.ceil(totalItems / limit);

  return {
    products,
    pagination: {
      totalItems,
      totalPages,
      currentPage: parseInt(page),
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

// ✅ Get Single Product by ID
const getProductById = async (id) => {
  console.log("⛔️ getProductById called with:", id);
  if (!id || isNaN(id)) {
    throw new Error("Valid product ID must be provided");
  }

  return await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true }
  });
};


module.exports = {
  validateCategoryAndUOM,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
