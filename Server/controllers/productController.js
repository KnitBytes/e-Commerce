const productService = require("../services/productService");
const { uploadToCloudinary } = require("../utils/cloudinary");

// ➕ Add a product (Admin Only)
const addProduct = async (req, res) => {
  try {
    const adminName = req.user.name;
    const productData = req.body;

    // Upload images
    const files = req.files || [];
    const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
    );

    const newProduct = await productService.createProduct({
      ...productData,
      images: imageUrls,
      added_by: adminName,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error("Add Product Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✏️ Update product (Admin Only)
const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updates = req.body;

    const files = req.files || [];
    if (files.length > 0) {
      const imageUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file.buffer, file.originalname))
      );
      updates.images = imageUrls;
    }

    const updatedProduct = await productService.updateProduct(productId, updates);

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// 🗑 Delete product (Admin Only)
const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await productService.deleteProduct(productId);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 📄 Get all products (Admin + User)
const getAllProducts = async (req, res) => {
  try {
    const { products, pagination } = await productService.getAllProducts(req.query);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      pagination,
    });
  } catch (err) {
    console.error("Fetch Products Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 📦 Get single product by ID (Admin + User)
const getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    console.log("📦 getProductById called with ID:", productId);
    const product = await productService.getProductById(productId);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error("Fetch Product Error:", err.message);
    res.status(404).json({ success: false, message: err.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await productService.getFeaturedProducts();
    res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      data: featured,
    });
  } catch (err) {
    console.error("Featured Products Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBestSellers = async (req, res) => {
  try {
    const bestSellers = await productService.getBestSellers();
    res.status(200).json({
      success: true,
      message: "Best selling products fetched successfully",
      data: bestSellers,
    });
  } catch (err) {
    console.error("Best Sellers Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getBestSellers,
};
