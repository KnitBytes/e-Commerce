const express = require('express');
const router = express.Router();
const trendingController = require('../controllers/trendingController');

router.get('/trending', trendingController.getTrendingProducts);

module.exports = router;
