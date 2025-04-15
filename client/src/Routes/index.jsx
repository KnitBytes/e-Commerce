import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import LoginPage from "../Pages/Login/LoginPage";
import SignupPage from "../Pages/Signup/SignupPage";
import ProductsPage from "../Pages/Products/ProductsPage";
import ProductDetailPage from "../Pages/Products/ProductDetailPage";
import CartPage from "../Pages/Cart/CartPage";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
