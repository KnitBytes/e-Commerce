import Hero from "../../Components/Hero";
import FeaturedCategories from "../../Components/FeaturedCategories";
import FeaturedProducts from "../../Components/FeaturedProducts";
import Features from "../../Components/Features";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Features />
    </div>
  );
}
