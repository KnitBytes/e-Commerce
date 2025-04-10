const { updateUserProfileService } = require('../services/userService');

const updateUserProfile = async (req, res) => {
  try {
    console.log("Update profile route hit ✅");
    const userId = req.user.id;
    const updatedUser = await updateUserProfileService(userId, req.body);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  updateUserProfile
};
