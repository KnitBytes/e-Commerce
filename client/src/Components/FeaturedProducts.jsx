export default function FeaturedProducts() {
  const products = [
    { 
      name: "Organic Oranges", 
      category: "Fruits",
      price: "Rs 150/kg",
      status: "new",
      image: "/images/products/organic orange.jpg"
    },
    { 
      name: "Himalayan Pink Salt", 
      category: "Spices and Herbs",
      price: "Rs 150/500g",
      status: "premium",
      image: "/images/products/himalayan pink salt.jpg"
    },
    { 
      name: "Mustang Apples",
      category: "Fruits", 
      price: "Rs 350/kg",
      status: "new",
      image: "/images/products/apple.avif"
    },
    { 
      name: "Buffalo Ghee", 
      category: "Dairy Products",
      price: "Rs 1200/kg",
      status: "premium",
      image: "/images/products/buffalo ghee.webp"
    },
    { 
      name: "Red Lentils", 
      category: "Pulses and Legumes",
      price: "Rs 180/kg",
      status: "outofstock",
      image: "/images/products/red lentil.jpg"
    },
    { 
      name: "Basmati Rice", 
      category: "Grains and Cereals",
      price: "Rs 900/5kg"
    },
    { 
      name: "Cauliflower", 
      category: "Vegetables",
      price: "Rs 60/kg",
      status: "outofstock"
    },
    { 
      name: "Turmeric Powder", 
      category: "Spices and Herbs",
      price: "Rs 400/kg",
      status: "new"
    },
    { 
      name: "Chickpeas", 
      category: "Pulses and Legumes",
      price: "Rs 160/kg"
    },
    { 
      name: "Bananas", 
      category: "Fruits",
      price: "Rs 80/dozen",
      status: "new"
    },
    { 
      name: "Spinach", 
      category: "Vegetables",
      price: "Rs 40/bunch"
    },
    { 
      name: "Raw Honey", 
      category: "Processed Products",
      price: "Rs 800/kg",
      status: "premium"
    },
    { 
      name: "Mangoes", 
      category: "Fruits",
      price: "Rs 200/kg",
      status: "new"
    },
    { 
      name: "Almonds", 
      category: "Dry Fruits",
      price: "Rs 1200/kg"
    },
    { 
      name: "Wheat Flour", 
      category: "Grains and Cereals",
      price: "Rs 80/kg"
    },
    { 
      name: "Tomatoes", 
      category: "Vegetables",
      price: "Rs 30/kg"
    },
    { 
      name: "Green Tea", 
      category: "Beverages",
      price: "Rs 500/kg"
    },
    { 
      name: "Potatoes", 
      category: "Vegetables",
      price: "Rs 25/kg"
    },
    { 
      name: "Cashew Nuts", 
      category: "Dry Fruits",
      price: "Rs 1500/kg"
    },
    { 
      name: "Brown Sugar", 
      category: "Sweeteners",
      price: "Rs 100/kg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left font-serif">
        Featured Products
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow border-4 border-gray-800 flex flex-col h-full">
            
            {/* Image Container */}
            <div className="aspect-square w-full bg-gray-100 rounded-md mb-1 overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Image Coming Soon
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-grow flex flex-col space-y-1">
              <div className="flex justify-between items-start gap-0.5">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                {product.status && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase 
                    ${product.status === 'new' ? 'bg-green-600 text-white' : ''}
                    ${product.status === 'premium' ? 'bg-blue-400 text-black' : ''}
                    ${product.status === 'outofstock' ? 'bg-gray-500 text-white' : ''}`}>
                    {product.status === 'outofstock' ? 'Stock Out' : product.status}
                  </span>
                )}
              </div>
              
              <p className="text-[11px] text-gray-500 line-clamp-1">{product.category}</p>
              
              <div className="flex justify-between items-center mt-0.5">
                <span className="text-sm font-semibold text-gray-900">
                  {product.price}
                </span>
                <button className={`ml-1 py-1 px-2 rounded-md text-[11px] font-medium transition-colors
                  ${product.status === 'outofstock' ? 
                    'bg-gray-300 text-gray-600 cursor-not-allowed' : 
                    'bg-black hover:bg-gray-800 text-white'}`}
                  disabled={product.status === 'outofstock'}>
                  {product.status === 'outofstock' ? 'Unavailable' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}