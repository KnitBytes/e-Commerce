import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mockProducts from "../../Data/products.json";
import { useCart } from "../Cart/CartContext"; // Import useCart hook

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Use the cart context

  useEffect(() => {
    // Keep your existing data fetching approach
    const foundProduct = mockProducts.find((item) => item.id === Number.parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  const handleAddToCart = () => {
    // Add the selected product to the cart with the selected quantity
    // The quantity state is already set by the +/- buttons
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // No navigation - stays on the product detail page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image and Gallery */}
        <div className="md:w-1/2">
          <div className="bg-white from-sky-200 to-purple-300 rounded-lg p-6 flex items-center justify-center">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-contain max-h-[400px]"
            />
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
            {product.gallery &&
              product.gallery.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>★</span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews || 0} Reviews)</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-800 mt-4">RS {product.price}</p>

          {/* Quantity Selector */}
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

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-3 rounded-md font-medium"
            >
              Add to Cart
            </button>
            <button className="border border-black px-6 py-3 rounded-md font-medium">Buy Now</button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Product Description */}
          <div>
            <h2 className="text-xl font-bold">Product Description</h2>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">{product.description}</p>

            {/* Product Features - If your data has features */}
            {product.features && (
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-black mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Shipping and Return */}
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