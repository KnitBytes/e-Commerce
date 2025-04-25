import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import LoginPage from "../Pages/Login/LoginPage";
import SignupPage from "../Pages/Signup/SignupPage";
import ProductsPage from "../Pages/Products/ProductsPage";
import ProductDetailPage from "../Pages/Products/ProductDetailPage";
import CartPage from "../Pages/Cart/CartPage";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UserDashboard from "../Pages/User/UserDashboard";
import AddProduct from "../Pages/Admin/AddProduct";
// import ForgetPasswordPage from "./Pages/password/ForgetPasswordPage";
// import ResetPasswordPage from "./Pages/password/ResetPasswordPage";
import CheckoutPage from "../Pages/Checkout/CheckoutPage";

export default function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/Admin/add-product" element={<AddProduct />} />
          {/* <Route path="/password/forget" element={<ForgetPasswordPage />} /> */}
          {/* <Route path="/password/reset" element={<ResetPasswordPage />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
