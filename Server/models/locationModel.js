const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProvinces = async () => {
  return await prisma.provinces.findMany({
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
    },
  });
};

const getDistrictsByProvince = async (provinceId) => {
  return await prisma.districts.findMany({
    where: { province_id: parseInt(provinceId) },
    orderBy: { id: 'asc' },
    select: {
      id: true,
      name: true,
      province_id: true,
    },
  });
};

module.exports = {
  getAllProvinces,
  getDistrictsByProvince,
};
