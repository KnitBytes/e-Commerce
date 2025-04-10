const { getTrendingProducts } = require("../services/trendingService");

exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await getTrendingProducts();
    res.status(200).json({
      success: true,
      message: "Trending products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error("Trending fetch error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
    