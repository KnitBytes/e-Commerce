const locationModel = require('../models/locationModel');

const getAllProvinces = async () => {
  return await locationModel.getAllProvinces();
};

const getDistrictsByProvince = async (provinceId) => {
  return await locationModel.getDistrictsByProvince(provinceId);
};

module.exports = {
  getAllProvinces,
  getDistrictsByProvince,
};
