import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        province_id: "",
        district_id: "",
        tole: "",
        street: "",
        landmark: "",
        agreeTerms: false,
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch provinces on component mount
        const fetchProvinces = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/provinces");
                if (response.data.success) {
                    setProvinces(response.data.data);
                }
            } catch (err) {
                console.error("Error fetching provinces:", err);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        // Fetch districts when a province is selected
        const fetchDistricts = async () => {
            if (formData.province_id) {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/provinces/${formData.province_id}/districts`
                    );
                    if (response.data.success) {
                        setDistricts(response.data.data);
                    }
                } catch (err) {
                    console.error("Error fetching districts:", err);
                }
            } else {
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [formData.province_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.confirmPassword, formData.password);
    
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        const { confirmPassword, agreeTerms, province_id, district_id, ...restData } = formData;
        
        const dataToSubmit = {
            ...restData,
            province: province_id, 
            district: district_id, 
            confirmPassword: formData.confirmPassword,
        };
    
        console.log("About to send this data to server:", JSON.stringify(dataToSubmit, null, 2));
        
        setLoading(true);
        setError("");
    
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                dataToSubmit
            );
            console.log("Signup successful:", response.data);
            navigate("/login", {
                state: { message: "Registration successful! Please login." },
            });
        } catch (err) {
            console.error("Full error object:", err);
            console.error("Response data:", err.response?.data);
            
            setError(
                err.response?.data?.message || 
                err.response?.data?.error ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-6">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-14 mx-auto mb-3"
                    />
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        Create your account
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Join us and start your journey
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Personal Information */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Full Name*
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Enter your full name"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Email Address*
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Phone Number*
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                placeholder="Enter your phone number"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Gender*
                            </label>
                            <select
                                name="gender"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="ther">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Date of Birth*
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Password*
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <FaEyeSlash size={16} />
                                    ) : (
                                        <FaEye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Confirm Password*
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <FaEyeSlash size={16} />
                                    ) : (
                                        <FaEye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Province*
                            </label>
                            <select
                                name="province_id"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.province_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Province</option>
                                {provinces.map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}
                                    >
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                District*
                            </label>
                            <select
                                name="district_id"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.district_id}
                                onChange={handleChange}
                                required
                                disabled={!formData.province_id}
                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option
                                        key={district.id}
                                        value={district.id}
                                    >
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Tole/Area*
                            </label>
                            <input
                                type="text"
                                name="tole"
                                placeholder="Enter your tole/area"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.tole}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Street
                            </label>
                            <input
                                type="text"
                                name="street"
                                placeholder="Enter your street"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.street}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                placeholder="Enter a nearby landmark"
                                className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none"
                                value={formData.landmark}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="h-3.5 w-3.5 text-green-500 rounded border-gray-300 focus:ring-green-500"
                            required
                        />
                        <label
                            htmlFor="agreeTerms"
                            className="ml-2 text-xs text-gray-600"
                        >
                            I agree to the{" "}
                            <a
                                href="#"
                                className="text-green-500 hover:text-green-600"
                            >
                                Terms & Conditions
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-md text-sm font-medium transition-colors disabled:bg-gray-300"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white text-gray-400">
                                or continue with
                            </span>
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
                        <Link
                            to="/login"
                            className="text-green-500 hover:text-green-600 font-medium"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;