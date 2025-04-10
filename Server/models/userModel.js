const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 🔍 Find user by email
const findUserByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

// 🧾 Find user by ID (optional)
const findUserById = async (id) => {
  return await prisma.users.findUnique({
    where: { id },
  });
};

// ➕ Create new user
const createUser = async (userData) => {
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
    landmark,
  } = userData;

  return await prisma.users.create({
    data: {
      full_name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth: new Date(date_of_birth),
      province,
      district,
      tole,
      street,
      landmark,
      role: 'user', // default role
    },
    select: {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      gender: true,
      province: true,
      district: true,
      role: true,
      created_at: true,
    },
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
};
