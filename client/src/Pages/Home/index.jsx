import Hero from "../../Components/Hero";
import FeaturedCategories from "../../Components/FeaturedCategories";
import BestSellers from "../../Components/BestSeller";
import FeaturedProducts from "../../Components/FeaturedProducts";
import TrendingProducts from "../../Components/TrendingProducts";
import Features from "../../Components/Features";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <FeaturedProducts />
      <TrendingProducts />
      <Features />
    </div>
  );
}
