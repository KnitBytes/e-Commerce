"use client"
import { useState, useEffect, useRef } from "react"
import { Bell, User, Search, Truck, Box, AlertCircle, DollarSign, Menu, X } from "lucide-react"
import axios from "axios"
import statsData from "../../Data/stats.json"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [DashboardData, setDashboardData] = useState({
    orders: [],
    products: [],
    revenue: { total: 0, monthly: [], daily: [] },
    customers: { total: 0, growth: 0 },
    topProducts: [],
    inventory: [],
    loading: true,
    error: null
  })

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topSellingProducts, setTopSellingProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [viewAll, setViewAll] = useState(false)
  const stats = useState(statsData)

  const sidebarRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
  
        const [ordersRes, revenueRes, customersRes, productsRes, topProductRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/analytics/orders`, config),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/analytics/revenue?months=12`, config),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/analytics/customers`, config),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/products?limit=20`, config),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard/analytics/top-products?limit=10`, config)
        ]);
        
           
  
        setDashboardData(prev => ({
          ...prev,
          orders: ordersRes.data?.data || [],
          revenue: revenueRes.data?.data || { total: 0, monthly: [], daily: [] },
          customers: customersRes.data?.data || { total: 0, growth: 0 },
          products: productsRes.data?.data || [],
          topProducts: topProductRes.data?.data || [],
          loading: false,
          error: null
        }));
        console.log(productsRes.data.data)
      } catch (err) {
        setDashboardData(prev => ({
          ...prev,
          error: err.response?.data?.message || 'Failed to fetch data',
          loading: false
        }));
      }
    };
  
    fetchData();
  }, []);
  
 

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarOpen])

  useEffect(() => {
    const sortedProducts = (DashboardData.products || []).sort((a, b) => b.sold - a.sold).slice(0, 10)
    setTopSellingProducts(sortedProducts)
  }, [DashboardData.products])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 2) % topSellingProducts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [topSellingProducts.length])

  const totalProducts = (DashboardData.products || []).length
  const lowStockProducts = (DashboardData.products || []).filter((p) => p.status === "Low Stock").length
  const totalOrders = (DashboardData.orders.totalOrders)
  const totalValue = (DashboardData.products || []).reduce((sum, product) => sum + (product.price || 0) * (product.sold || 0), 0)

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`${i < rating ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))
  }

  const renderStatusBadge = (status) => {
    const statusStyles = {
      "In Stock": "bg-emerald-100 text-emerald-700",
      "Low Stock": "bg-amber-100 text-amber-700",
      "Critical": "bg-rose-100 text-rose-700",
      "Pending": "bg-sky-100 text-sky-700",
      "Delivered": "bg-emerald-100 text-emerald-700"
    }
    return <span className={`px-2.5 py-1 text-xs rounded-full ${statusStyles[status]}`}>{status}</span>
  }

  const feedback = [
    { id: 1, username: "User 1", productName: "Product 1", feedback: "Great product!", rating: 5 },
    { id: 2, username: "User 2", productName: "Product 2", feedback: "Could be better", rating: 3 },
    { id: 3, username: "User 3", productName: "Product 3", feedback: "Amazing quality", rating: 5 },
    { id: 4, username: "User 4", productName: "Product 4", feedback: "Not what I expected", rating: 2 }
  ];

  // The rest of the JSX remains the same, just make sure to update all instances of:
  // DashboardData.products -> (DashboardData.products || [])
  // In all the table mappings and other product-related operations

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Inventory Management</h1>
        <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <User className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="relative flex flex-col w-64 h-full bg-white border-r border-gray-100">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h1 className="text-lg font-semibold text-gray-800">Inventory Management</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {["dashboard", "products", "orders", "lowStock", "feedback"].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      setActiveTab(tab)
                      setSidebarOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === tab ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r border-gray-100 bg-white">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-lg font-semibold text-gray-800">Inventory Management</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {["dashboard", "products", "orders", "lowStock", "feedback"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === tab ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <div className="w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {/* Header icons */}
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="p-4 md:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {[
                { title: "Total Products", value: totalProducts, icon: Box, bg: "bg-blue-50", color: "text-blue-600" },
                { title: "Low Stock", value: lowStockProducts, icon: AlertCircle, bg: "bg-amber-50", color: "text-amber-600" },
                { title: "Total Orders", value: totalOrders, icon: Truck, bg: "bg-emerald-50", color: "text-emerald-600" },
                { title: "Total Value", value: `Rs ${totalValue.toLocaleString()}`, icon: DollarSign, bg: "bg-purple-50", color: "text-purple-600" }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm text-gray-500 font-medium">{stat.title}</h3>
                      <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.bg} p-3 rounded-lg`}>
                      <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
                <div className="bg-gray-50 h-48 md:h-64 rounded-lg flex items-center justify-center border border-gray-100">
                  <div className="text-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">Revenue Chart</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: "Total Revenue", value: DashboardData.revenue.total || 0 },
                    { label: "Monthly Revenue", value: DashboardData.revenue.monthly?.reduce((a, b) => a + b, 0) || 0 },
                    { label: "Daily Revenue", value: DashboardData.revenue.daily?.reduce((a, b) => a + b, 0) || 0 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-800">Rs{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {(topSellingProducts || []).slice(0, viewAll ? 10 : 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">Rs {product.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="text-xs text-gray-500">({product.sold} sold)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {topSellingProducts.length > 5 && (
                <div className="text-right mt-2">
                  <button
                    onClick={() => setViewAll(!viewAll)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    {viewAll ? "Show Less" : "View All"}
                  </button>
                </div>
              )}
            </div>

            {/* Inventory Overview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Inventory Overview</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Product", "Category", "Quantity", "Status", "Price", "Action", "Update"].map((header) => (
                        <th
                          key={header}
                          className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(DashboardData.products || []).slice(0, 4).map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4 text-sm text-gray-800">{product.name}</td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{product.snp}</td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                <td className="px-4 md:px-6 py-4">{renderStatusBadge(product.status)}</td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-600">Rs {product.price}</td>
                <td className="px-4 md:px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <button className="text-emerald-600 hover:text-emerald-800 text-sm">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


{/* Products Tab */}
{activeTab === "products" && (
  <div className="p-5 space-y-6">
    {/* Stats Cards and Action Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 items-stretch">
      {[
        { title: "Total Products", value: totalProducts, icon: Box, bg: "bg-blue-50", color: "text-blue-600" },
        { title: "Low Stock", value: lowStockProducts, icon: AlertCircle, bg: "bg-amber-50", color: "text-amber-600" },
        { title: "Total Value", value: `Rs ${totalValue.toString()}`, icon: DollarSign, bg: "bg-purple-50", color: "text-purple-600" }
      ].map((stat, index) => (
        <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm text-gray-500 font-medium">{stat.title}</h3>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.bg} p-3 rounded-lg`}>
              <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
      
      {/* Action Buttons Container */}
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
  <div className="flex flex-col items-center justify-center gap-3 h-full">
    <button
     onClick={() => navigate("/Admin/add-product")}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
      Add Product
    </button>
    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
      Remove Product
    </button>
  </div>
</div>
</div>

    {/* Header */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
      <div className="w-full md:w-64">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>

    {/* Table */}
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Product", "Category","Quantity", "Status", "Price", "Edit", "Update"].map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {DashboardData.products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-sm text-gray-800">{product.name}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{product.snp}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{product.stock}</td>
                <td className="px-5 py-4">{renderStatusBadge(product.status)}</td>
                <td className="px-5 py-4 text-sm text-gray-600">Rs {product.price}</td>

                {/* Edit button */}
                <td className="px-5 py-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                    Edit
                  </button>
                </td>

                {/* Update button */}
                <td className="px-5 py-4">
                  <button className="text-green-600 hover:text-green-800 text-sm px-2 py-1 rounded-md hover:bg-green-50 transition-colors">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="p-5 space-y-6">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
  {[
    { title: "Total Orders", value: totalProducts, icon: Box, bg: "bg-blue-50", color: "text-blue-600" },
    { title: "Total Value", value: `Rs ${totalValue.toString()}`, icon: DollarSign, bg: "bg-purple-50", color: "text-purple-600" }
  ].map((stat, index) => (
    <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-cente  r">
        <div>
          <h3 className="text-sm text-gray-500 font-medium">{stat.title}</h3>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
        </div>
        <div className={`${stat.bg} p-3 rounded-lg`}>
          <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color}`} />
        </div>
      </div>
    </div>
  ))}
</div>

       
     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["User", "Product", "Order #", "Qty", "Contact", "Address", "Status"].map((header) => (
                        <th
                          key={header}
                          className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {DashboardData.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 text-sm text-gray-800">{order.username}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.productName}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.orderNumber}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.quantity}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.number}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.address}</td>
                        <td className="px-5 py-4">{renderStatusBadge(order.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Low Stock Tab */}
        {activeTab === "lowStock" && (
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Alerts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Products</p>
                        <p className="text-2xl font-semibold text-gray-800">{totalProducts}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Box className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Value</p>
                        <p className="text-2xl font-semibold text-gray-800">Rs {totalValue.toString()}</p>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-rose-500" />
                  Critical Stock
                </h3>
                <ul className="space-y-3">
                  {statsData.criticalProducts.map((product, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                      <span className="text-sm text-gray-700">{product.name}</span>
                      <span className="text-sm font-medium text-rose-700">{product.left} left</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-800">Low Stock Items</h3>
                <div className="w-full md:w-64">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Product", "SNP", "Stock", "Status", "Price", "Actions"].map((header) => (
                        <th
                          key={header}
                          className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {statsData.criticalProducts
                      .filter((p) => p.status === "Low Stock" || p.status === "Critical")
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4 text-sm text-gray-800">{product.name}</td>
                          <td className="px-5 py-4 text-sm text-gray-600">{product.snp}</td>
                          <td className="px-5 py-4 text-sm text-gray-600">{product.stock}</td>
                          <td className="px-5 py-4">{renderStatusBadge(product.status)}</td>
                          <td className="px-5 py-4 text-sm text-gray-600">Rs {product.price}</td>
                          <td className="px-5 py-4 flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded-md hover:bg-blue-50 transition-colors">
                              Restock
                            </button>
                            <button className="text-emerald-600 hover:text-emerald-800 text-sm px-2 py-1 rounded-md hover:bg-emerald-50 transition-colors">
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="p-5 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Customer Feedback</h2>
              <div className="w-full md:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["User", "Product", "Feedback", "Rating"].map((header) => (
                        <th
                          key={header}
                          className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {feedback.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 text-sm text-gray-800">{item.username}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{item.productName}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{item.feedback}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            {renderStars(item.rating)}
                            <span className="text-xs text-gray-500">({item.rating})</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard