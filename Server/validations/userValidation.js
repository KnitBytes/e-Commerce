const { body } = require('express-validator');

const registerValidationRules = [
  // Full name - required
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),

  // Email - valid format
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  // Password - strong requirements
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[@$!%*?&]/)
    .withMessage('Password must contain at least one special character'),

  // Confirm password - must match password
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  // Phone number - must start with 98 or 97 and be 10 digits
  body('phone_number')
    .trim()
    .matches(/^(98|97)\d{8}$/)
    .withMessage('Phone number must be a valid 10-digit Nepali number starting with 98 or 97'),

  // Gender - required and must be one of these
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  // Date of birth - valid format and must be 18+
  body('date_of_birth')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Date of birth must be a valid date in YYYY-MM-DD format')
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const hasBirthdayPassed =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
      const actualAge = hasBirthdayPassed ? age : age - 1;

      if (actualAge < 18 || isNaN(dob.getTime()) || dob > today) {
        throw new Error('You must be at least 18 years old');
      }
      return true;
    }),

  // Province - required
  body('province')
    .notEmpty()
    .withMessage('Province is required'),

  // District - required
  body('district')
    .notEmpty()
    .withMessage('District is required')
];

const loginValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
};
