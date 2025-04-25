import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const API_URL = 'http://localhost:5000/api';
  
  // Fetch user addresses from backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Try to fetch addresses from backend first
        try {
          const response = await axios.get(`${API_URL}/users/addresses`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const addressesData = response.data.data || response.data || [];
          
          if (addressesData.length > 0) {
            setAddresses(addressesData);
            setSelectedAddress(addressesData[0].id);
          } else {
            // Fallback to mock data if no addresses returned
            setAddresses([
              {
                id: 1,
                name: "Jit Bahadur Gurung",
                street: "Sanepa, Lalitpur",
                area: "Bagmati Province-Lalitpur Metro 15 - Godawari - Santaneshwor -Bahadur tole",
                phone: "(+977) 9843628711"
              }
            ]);
            setSelectedAddress(1);
          }
        } catch (apiError) {
          console.warn('Could not fetch addresses from API, using mock data:', apiError);
          // Fallback to mock data
          setAddresses([
            {
              id: 1,
              name: "Jit Bahadur Gurung",
              street: "Sanepa, Lalitpur",
              area: "Bagmati Province-Lalitpur Metro 15 - Godawari - Santaneshwor -Bahadur tole",
              phone: "(+977) 9843628711"
            }
          ]);
          setSelectedAddress(1);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setIsLoading(false);
      }
    };
    
    fetchAddresses();
  }, [API_URL]);
  
  // Calculate shipping and total
  const shippingFee = 100;
  const total = getSubtotal() + shippingFee;
  
  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
  };
  
  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };
  
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Order data to send to backend
      const orderData = {
        addressId: selectedAddress,
        paymentMethod,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: getSubtotal(),
        shipping: shippingFee,
        total
      };
      
      console.log("Processing order:", orderData);
      
      // Get the token for authentication
      const token = localStorage.getItem('token');
      
      // Send order to backend
      const response = await axios.post(`${API_URL}/orders/checkout`, orderData, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("Order placed successfully:", response.data);
      
      // Show success toast
      toast.success("Order Placed Successfully");
      
      // Clear the cart
      clearCart();
      
      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/products');
      }, 2000);
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  // If cart is empty, redirect to products
  useEffect(() => {
    if (cartItems.length === 0 && !isLoading) {
      navigate('/products');
    }
  }, [cartItems, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6">Order Information</h1>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Address and Payment Options */}
        <div className="md:col-span-2 space-y-6">
          {/* Address Book */}
          <div className="bg-[#f5f0e6] rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Address Book</h2>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
            <hr className="border-gray-300 mb-4" />
            
            {addresses.length === 0 ? (
              <div className="p-4 bg-yellow-50 text-yellow-700 rounded">
                No addresses found. Please add a delivery address.
                <button className="ml-2 text-blue-600 hover:underline">Add Address</button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div 
                    key={address.id} 
                    className={`border p-4 rounded cursor-pointer ${selectedAddress === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handleAddressSelect(address.id)}
                  >
                    <div className="flex items-start">
                      <input 
                        type="radio" 
                        name="address"
                        checked={selectedAddress === address.id}
                        onChange={() => handleAddressSelect(address.id)}
                        className="mt-1"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.area}</p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <button className="mt-4 text-blue-600 hover:underline flex items-center">
              + Add New Address
            </button>
          </div>
          
          {/* Order Option */}
          <div className="bg-[#f5f0e6] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Order Option</h2>
            <hr className="border-gray-300 mb-4" />
            
            <div className="space-y-3">
              <button 
                className={`w-full py-3 px-4 flex items-center justify-center rounded transition ${paymentMethod === 'cod' ? 'bg-[#b5a76e] text-white' : 'bg-[#c9bc84] text-white hover:bg-[#b5a76e]'}`}
                onClick={() => handlePaymentMethodSelect('cod')}
              >
                <span className="mr-2">💰</span>
                Cash On Delivery
              </button>
              
              <button 
                className={`w-full py-3 px-4 flex items-center justify-center rounded transition ${paymentMethod === 'online' ? 'bg-[#2e7d56] text-white' : 'bg-[#3a9d6b] text-white hover:bg-[#2e7d56]'}`}
                onClick={() => handlePaymentMethodSelect('online')}
              >
                <span className="mr-2">💳</span>
                Online Payment
              </button>
              
              {!paymentMethod && (
                <p className="text-red-500 text-sm pt-2">Please select a payment method</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column: Order Summary */}
        <div className="bg-[#f5f0e6] p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          {/* Cart items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">Rs {item.price}</p>
              </div>
            ))}
          </div>
          
          {/* Summary calculations */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
              <span className="font-medium">Rs {getSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Rs {shippingFee}</span>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs {total}</span>
            </div>
          </div>
          
          <button 
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className={`w-full mt-6 ${isProcessing ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} text-white text-center py-3 rounded-md font-medium transition`}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;