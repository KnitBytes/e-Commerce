const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const allowedFields = [
  'full_name',
  'phone_number',
  'gender',
  'date_of_birth',
  'province',
  'district',
  'tole',
  'street',
  'landmark'
];

const updateUserProfileService = async (userId, data) => {
  const updates = {};

  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('No valid fields to update.');
  }

  const updatedUser = await prisma.users.update({
    where: { id: userId },
    data: updates,
  });

  return updatedUser;
};

module.exports = {
  updateUserProfileService
};
