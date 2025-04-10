import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedCategories() {
  const categories = [
    { 
      name: "Fruits",
      image: "/images/category/fruits.jpg"
    },
    { 
      name: "Vegetables",
      image: "/images/category/vegetables.jpg"
    },
    { 
      name: "Grains and Cereals",
      image: "/images/category/grains and cereals.jpg"
    },
    { 
      name: "Pulses and Legumes",
      image: "/images/category/pulses and legumes.jpg"
    },
    { 
      name: "Dairy Products",
      image: "/images/category/dairy products.jpg"
    },
    { 
      name: "Spices and Herbs",
      image: "/images/category/spice and herbs.jpg"
    },
    { 
      name: "Oils and Seeds",
      image: "/images/category/oils and seeds.jpg"
    },
    { 
      name: "Processed Foods",
      image: "/images/category/processed food.jpg"
    }
  ];

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
    <section className="bg-[#f8faf7] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Featured Categories
          </h2>
          <div className="max-w-2xl mx-auto mb-8">
            <hr className="border-t-2 border-green-600 w-16 mx-auto" />
          </div>
        </div>

        <Slider {...sliderSettings} className="category-slider">
          {categories.map((category, index) => (
            <div key={index} className="px-2">
              <div className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Category Image */}
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-black/30">
                  <h3 className="text-2xl font-semibold text-white drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom Slider Styles */}
        <style jsx global>{`
          .category-slider .slick-dots li button:before {
            color: #4a7c59;
            font-size: 12px;
          }
          .category-slider .slick-dots li.slick-active button:before {
            color: #2d5a3d;
          }
          .category-slider .slick-prev:before,
          .category-slider .slick-next:before {
            color: #2d5a3d;
            font-size: 24px;
          }
          .category-slider .slick-prev {
            left: -35px;
          }
          .category-slider .slick-next {
            right: -35px;
          }
        `}</style>
      </div>
    </section>
  )
}