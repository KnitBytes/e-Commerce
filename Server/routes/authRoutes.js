const express = require('express');
const router = express.Router();

const { registerValidationRules } = require('../validations/userValidation');
const { loginValidationRules } = require('../validations/userValidation');
const { validate } = require('../middlewares/validate');
const { registerUser } = require('../controllers/authController');
const { loginUser } = require('../controllers/authController');
const {
    forgotPassword,
    resetPassword,
  } = require('../controllers/authController');

// 🧾 Registration Route
router.post('/register', registerValidationRules, validate, registerUser);
router.post('/login', loginValidationRules, validate, loginUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
