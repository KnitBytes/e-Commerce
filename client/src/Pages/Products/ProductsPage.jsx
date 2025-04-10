import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import mockProducts from "../../Data/products.json"; // Replace with API call later
import { useCart } from "../Cart/CartContext"; // Import useCart hook

export default function ProductPage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedRating, setSelectedRating] = useState(0);

  const { addToCart } = useCart();
  const productsPerPage = 16;

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let result = [...products];


    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }


    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }


    if (priceRange.min !== "") {
      result = result.filter(
        (product) => product.price >= Number(priceRange.min)
      );
    }
    if (priceRange.max !== "") {
      result = result.filter(
        (product) => product.price <= Number(priceRange.max)
      );
    }

    
    if (selectedRating > 0) {
      result = result.filter((product) => product.rating >= selectedRating);
    }


    if (sort === "price_low_high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high_low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "popularity") {
      result.sort((a, b) => b.likes - a.likes);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, selectedCategories, selectedBrands, priceRange, selectedRating, sort]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
  };

  const handleFilter = () => {};

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col md:flex-row">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 md:mr-8 bg-gray-100 p-4 rounded-md mb-6 md:mb-0">
        <h2 className="text-xl font-bold mb-4">Shop By Categories</h2>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-1">
            {[
              "Fruits",
              "Vegetables",
              "Grains and Cereals",
              "Pulses and Legumes",
              "Dairy Products",
              "Spices and Herbs",
              "Oils and Seeds",
              "Processed Products",
            ].map((category) => (
              <li key={category} className="text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
          <button className="text-blue-500 text-xs mt-1">VIEW MORE</button>
        </div>


        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brand</h3>
          <ul className="space-y-1">
            {["Organic", "Natural", "Local", "Imported"].map((brand) => (
              <li key={brand} className="text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>


        <div className="mb-6">
          <h3 className="font-semibold mb-2">Pricing</h3>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              placeholder="Min"
              className="w-20 p-1 border rounded text-sm"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-20 p-1 border rounded text-sm"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
            />
          </div>
        </div>


        <div className="mb-6">
          <h3 className="font-semibold mb-2">Rating</h3>
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center cursor-pointer"
                onClick={() => handleRatingChange(rating)}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-1 rounded text-sm"
        >
          Filter
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Featured Products</h1>
          <div className="relative">
            <select
              onChange={handleSortChange}
              value={sort}
              className="border p-2 rounded pr-8 appearance-none bg-white"
            >
              <option value="popularity">Sort By: Popularity</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-md overflow-hidden transition-shadow border border-gray-200 hover:shadow-md"
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative">
                    <img
                      src={
                        product.image ||
                        "/placeholder.svg?height=200&width=200"
                      }
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded">
                      Organic food
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">Rs {product.price}</span>
                      <div className="flex items-center gap-1">
                        <button className="text-gray-400 hover:text-red-500">
                          <Heart size={16} />
                        </button>
                        <span className="text-xs">{product.likes || 0}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium mb-2">
                      {product.name}
                    </h3>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-black hover:bg-gray-800 text-white text-xs py-1 rounded transition"
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              No products available
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button
                onClick={() =>
                  paginate(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className="border px-2 py-1 rounded"
              >
                &lt;
              </button>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                  if (index === 4) pageNumber = totalPages;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                  if (index === 0) pageNumber = 1;
                  if (index === 4) pageNumber = totalPages;
                } else {
                  pageNumber = currentPage - 2 + index;
                  if (index === 0) pageNumber = 1;
                  if (index === 4) pageNumber = totalPages;
                }

                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNumber)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === pageNumber
                      ? "bg-black text-white"
                      : "border"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-1">...</span>
              )}

              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className="border px-2 py-1 rounded"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );


}
