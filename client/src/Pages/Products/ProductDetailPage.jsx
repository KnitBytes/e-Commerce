import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import axios from "axios";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const productData = response.data.data || response.data;

        const sanitizedProduct = { ...productData };
        Object.keys(sanitizedProduct).forEach(key => {
          if (typeof sanitizedProduct[key] === 'object' && sanitizedProduct[key] !== null) {
            if (key === 'uoms' || key === 'gallery') {
              sanitizedProduct[key] = Array.isArray(sanitizedProduct[key]) 
                ? sanitizedProduct[key] 
                : JSON.stringify(sanitizedProduct[key]);
            } else {
              sanitizedProduct[key] = JSON.stringify(sanitizedProduct[key]);
            }
          }
        });
        
        setProduct(sanitizedProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const safeRender = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <p className="text-center text-gray-600">Loading product...</p>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64">
      <p className="text-center text-red-600">{error}</p>
    </div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-64">
      <p className="text-center text-gray-600">Product not found</p>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white from-sky-200 to-purple-300 rounded-lg p-6 flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={safeRender(product.name)}
              className="object-contain max-h-[400px]"
            />
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
            {Array.isArray(product.gallery) &&
              product.gallery.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                  <img
                    src={img || "/placeholder.svg?height=96&width=96"}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold">{safeRender(product.name)}</h1>

          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={`${index < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({safeRender(product.reviews_count) || 0} Reviews)</span>
          </div>

          <p className="text-2xl font-bold text-gray-800 mt-4">RS {safeRender(product.price)}</p>

          {product.category_name && (
            <p className="text-sm text-gray-600 mt-2">Category: {safeRender(product.category_name)}</p>
          )}

          <div className="mt-6">
            <p className="font-medium mb-2">Quantity</p>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
              >
                -
              </button>
              <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-md font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border border-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition"
            >
              Buy Now
            </button>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div>
            <h2 className="text-xl font-bold">Product Description</h2>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">{safeRender(product.description)}</p>

            {product.features && (
              <ul className="mt-4 space-y-2">
                {(Array.isArray(product.features) ? product.features : []).map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-black mr-2">•</span>
                    <span>{safeRender(feature)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div>
            <h2 className="text-xl font-bold">Shipping and Return</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center text-sm">
                <span className="mr-2">🚚</span>
                <span>Same day delivery</span>
              </li>
              <li className="flex items-center text-sm">
                <span className="mr-2">🔄</span>
                <span>Free Return</span>
              </li>
              <li className="text-xs text-gray-500 ml-6">30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
