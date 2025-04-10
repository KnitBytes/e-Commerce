const locationService = require('../services/locationService');
const CustomError = require('../utils/customError');

const getProvinces = async (req, res, next) => {
  try {
    const provinces = await locationService.getAllProvinces();
    res.status(200).json({
      success: true,
      data: provinces,
    });
  } catch (err) {
    next(err);
  }
};

const getDistricts = async (req, res, next) => {
  try {
    const { provinceId } = req.params;
    const districts = await locationService.getDistrictsByProvince(provinceId);
    if (!districts.length) {
      throw new CustomError('Districts not found for given province', 404);
    }
    res.status(200).json({ success: true, data: districts });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProvinces,
  getDistricts,
};
