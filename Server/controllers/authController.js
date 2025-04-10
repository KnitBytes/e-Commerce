const bcrypt = require('bcrypt');
const { findUserByEmail, createUser } = require('../models/userModel');
const CustomError = require('../utils/customError');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 📝 Register User Controller
const registerUser = async (req, res, next) => {
  try {
    const {
      full_name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      province,
      district,
      tole,
      street,
      landmark
    } = req.body;

    // 🔍 Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new CustomError('Email already in use', 400);
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧩 Create the user
    const newUser = await createUser({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      province,
      district,
      tole,
      street,
      landmark
    });

    // ✅ Respond with success (no password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser
    });

  } catch (err) {
    next(err); // Pass to centralized error handler
  }
};

// 🔐 Login User Controller
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      throw new CustomError('Invalid email or password', 401);
    }

    // 🔐 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid email or password', 401);
    }

    // 🎟 Generate JWT with role & ID
    const token = generateToken({ 
      id: user.id,
      role: user.role,
      name: user.full_name // ✅ include admin name!
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};


// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'No user found with that email.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await prisma.users.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;

    // DEV MODE: Log reset link to console
    console.log('Password reset link (DEV):', resetURL);

    return res.status(200).json({
      message: 'Password reset link has been generated (check console).',
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
