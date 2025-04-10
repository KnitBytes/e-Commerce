const express = require('express');
const router = express.Router();

const { updateUserProfile } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware'); // JWT auth middleware

// ✅ PUT: Update user profile
router.put('/update-profile',auth(),updateUserProfile);

module.exports = router;
