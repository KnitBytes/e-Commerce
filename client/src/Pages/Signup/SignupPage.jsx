import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="h-3.5 w-3.5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              required
            />
            <label className="ml-2 text-xs text-gray-600">
              I agree the <a href="#" className="text-blue-500 hover:text-blue-600">Terms & Conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Create Account
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-400">or continue with</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              <FcGoogle className="h-4 w-4" />
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              <FaFacebook className="h-4 w-4 text-blue-600" />
              Facebook
            </button>
          </div>

          <p className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 hover:text-green-600 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;