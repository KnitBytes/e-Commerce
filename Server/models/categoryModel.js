const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      uoms: true,
    },
  });
};

const getUomsByCategoryId = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: {
      id: true,
      name: true,
      uoms: true,
    },
  });

  return category;
};

module.exports = {
  getAllCategories,
  getUomsByCategoryId,
};
