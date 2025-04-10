const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Public
router.get('/', categoryController.getAllCategories);

// Fetch UOMs for a specific category
router.get('/:id/uoms', categoryController.getUomsByCategoryId);

module.exports = router;
