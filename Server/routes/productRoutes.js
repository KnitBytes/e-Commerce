const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middlewares/authMiddleware"); // 👈 auth(roles) middleware
const upload = require("../middlewares/multer"); // multer with memoryStorage

const productController = require("../controllers/productController");

// 🔎 Field validation for add
const validateProductFields = [
  check("name").notEmpty().withMessage("Name is required"),
  check("category_id").isInt({ min: 1 }).withMessage("Valid category_id is required"),
  check("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  check("quantity").isInt({ min: 0 }).withMessage("Quantity must be zero or more"),
  check("description").isLength({ min: 10 }).withMessage("Description is too short"),
  check("uoms").notEmpty().withMessage("UOM is required")

];

// 🔍 Validation error middleware
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

//
// ➕ Add Product (Admin Only)
//
router.post(
  "/add",
  auth(["admin"]),
  upload.array("images", 5),
  validateProductFields,
  handleValidation,
  productController.addProduct
);

//
// ✏️ Update Product (Admin Only)
//
router.put(
  "/update/:id",
  auth(["admin"]),
  upload.array("images", 5),
  [
    check("category_id").optional().isInt({ min: 1 }),
    check("price").optional().isFloat({ gt: 0 }),
    check("quantity").optional().isInt({ min: 0 }),
    check("description").optional().isLength({ min: 10 }),
    check("uoms").optional().notEmpty(),
    check("name").optional().notEmpty(),
  ],
  handleValidation,
  productController.updateProduct
);

//
// 🗑 Delete Product (Admin Only)
//
router.delete("/delete/:id", auth(["admin"]), productController.deleteProduct);

//
// 📄 Get All Products (Admin + User)
//
router.get("/", auth(["admin", "user"]), productController.getAllProducts);

router.get("/featured", auth(["admin", "user"]), productController.getFeaturedProducts);

router.get("/best-sellers", auth(["admin", "user"]), productController.getBestSellers);


//
// 📦 Get Single Product by ID (Admin + User)
//
router.get("/:id", auth(["admin", "user"]), (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ success: false, message: "Product ID must be a valid number" });
  }
  req.params.id = id; // Replace it with parsed integer for controller use
  next();
}, productController.getProductById);



module.exports = router;
