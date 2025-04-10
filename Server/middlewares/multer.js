const multer = require("multer");

const storage = multer.memoryStorage(); // or diskStorage if you want local temp
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB per file
});

module.exports = upload;
