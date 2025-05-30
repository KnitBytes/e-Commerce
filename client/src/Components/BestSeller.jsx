import React, { useEffect, useState } from 'react';
import productsData from '../Data/products.json';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const sorted = [...productsData]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);
    setBestSellers(sorted);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <section className="p-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading aligned with first card using px-4 */}
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left font-serif">
            Best Sellers
          </h2>
        </div>

        <Slider {...sliderSettings} className="bestseller-slider">
          {bestSellers.map(product => (
            <div key={product.id} className="px-4">
              <div className="border-2 border-gray-300 rounded-xl p-3 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white min-h-[340px] flex flex-col justify-between overflow-hidden">
                
                {/* Image Container */}
                <div className="h-55 w-full bg-gray-100 rounded-md mb-2 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      Image Coming Soon
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">{product.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{product.category}</p>

                  {/* Price and Add to Cart Button aligned */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-black">Rs {product.price}/kg</p>
                    {/* Add to Cart Button moved next to price */}
                    <button className="ml-2 w-[100px] h-8 bg-black text-white text-[12px] font-bold rounded-md hover:bg-gray-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Slider Custom Styling */}
        <style jsx global>{`
          .bestseller-slider .slick-dots li button:before {
            color: #4a7c59;
            font-size: 14px;
          }
          .bestseller-slider .slick-dots li.slick-active button:before {
            color: #2d5a3d;
          }
          .bestseller-slider .slick-prev:before,
          .bestseller-slider .slick-next:before {
            color: #2d5a3d;
            font-size: 24px;
          }
          .bestseller-slider .slick-prev {
            left: -35px;
          }
          .bestseller-slider .slick-next {
            right: -35px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default BestSellers;
