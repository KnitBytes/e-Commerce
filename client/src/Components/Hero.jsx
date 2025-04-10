import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Hero() {
  return (
    <div className="relative bg-[#f8faf7] overflow-hidden pb-20">
      {/* Swiper Slider Container */}
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="h-[85vh] min-h-[500px] max-h-[800px] w-screen"
        loop={true}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full w-full overflow-hidden">
            <img 
              src="/images/image1.jpg" 
              alt="Organic Products"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full w-full overflow-hidden">
            <img 
              src="/images/image2.jpg" 
              alt="Fresh Vegetables"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full w-full overflow-hidden">
            <img 
              src="/images/image3.jpg" 
              alt="Natural Products"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Text Content Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 z-[999]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-serif drop-shadow-lg">
            Premium Quality <br className="hidden md:block"/>Food Products
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto drop-shadow-md">
            Discover our selection of finest organic and natural foods
          </p>

          {/* Shop Now Button Container */}
          <div className="flex justify-center">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}