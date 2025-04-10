const categoryService = require('../services/categoryService');
const createError = require('../utils/customError');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    next(createError(500, 'Failed to fetch categories'));
  }
};

const getUomsByCategoryId = async (req, res, next) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await categoryService.getUomsByCategoryId(categoryId);
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(createError(404, 'Category not found'));
  }
};

module.exports = {
  getAllCategories,
  getUomsByCategoryId,
};
