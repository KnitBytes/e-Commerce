const categoryModel = require('../models/categoryModel');

const getAllCategories = async () => {
  return await categoryModel.getAllCategories();
};

const getUomsByCategoryId = async (categoryId) => {
  const category = await categoryModel.getUomsByCategoryId(categoryId);
  if (!category) throw new Error("Category not found");
  return category;
};

module.exports = {
  getAllCategories,
  getUomsByCategoryId,
};
