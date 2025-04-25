import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

// Mock data function to use until backend is ready
const getMockUserProfile = () => {
  return {
    id: '5',
    full_name: 'Jit Bahadur Gurung',
    email: 'khanalsuraj2200@gmail.com',
    phone_number: '(+977) 9843628711',
    gender: 'Male',
    birth_date: '1998-02-20',
    address: {
      full_name: 'Jit Bahadur Gurung',
      tole: 'Godawari - Santanesshwor',
      street: 'Apartment 3B',
      district: 'Lalitpur',
      province: 'Bagmati Province-Lalitpur Metro 15 -',
      landmark: 'Sanepa, Lalitpur',
      phone_number: '(+977) 9843628711'
    },
    created_at: '2025-04-20 03:23:55.548',
    role: 'user'
  };
};

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    // Try the API call first
    try {
      const response = await axios.get(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User profile data received:', response.data);
      return response.data;
    } catch (apiError) {
      console.warn('API not available, using mock data:', apiError);
      // If API call fails, return mock data
      return getMockUserProfile();
    }
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return getMockUserProfile(); // Return mock data as fallback
  }
};

const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/api/users/update`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (apiError) {
      console.warn('API not available for update, returning mock response:', apiError);
      // Mock successful update by merging changes with mock data
      const mockUser = getMockUserProfile();
      return { ...mockUser, ...userData };
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

const fetchOrders = async (status = '') => {
  try {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        params: { status: status, page: 1, limit: 10 },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (apiError) {
      console.warn('Orders API not available, using mock data:', apiError);
      // Return mock orders
      return {
        data: [
          {
            id: 'ORD-MOCK-001',
            status: 'PENDING',
            total_price: 1200,
            created_at: new Date().toISOString(),
            items: [
              {
                product_name: 'Bananas',
                image_url: '/api/placeholder/100/100',
                quantity: 2,
                price: 600,
                category: 'Fruits'
              }
            ]
          },
          {
            id: 'ORD-MOCK-002',
            status: 'DELIVERED',
            total_price: 2200,
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Tomatoes',
                image_url: '/api/placeholder/100/100',
                quantity: 4,
                price: 550,
                category: 'Vegetables'
              }
            ]
          },
          {
            id: 'ORD-MOCK-003',
            status: 'CONFIRMED',
            total_price: 1800,
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Basmati Rice',
                image_url: '/api/placeholder/100/100',
                quantity: 1,
                price: 1800,
                category: 'Grains and Cereals'
              }
            ]
          },
          {
            id: 'ORD-MOCK-004',
            status: 'SHIPPED',
            total_price: 750,
            created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Red Lentils',
                image_url: '/api/placeholder/100/100',
                quantity: 1,
                price: 750,
                category: 'Pulses and Legumes'
              }
            ]
          },
          {
            id: 'ORD-MOCK-005',
            status: 'DELIVERED',
            total_price: 950,
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Milk Pack',
                image_url: '/api/placeholder/100/100',
                quantity: 5,
                price: 190,
                category: 'Dairy Products'
              }
            ]
          },
          {
            id: 'ORD-MOCK-006',
            status: 'PENDING',
            total_price: 480,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Turmeric Powder',
                image_url: '/api/placeholder/100/100',
                quantity: 1,
                price: 480,
                category: 'Spices and Herbs'
              }
            ]
          },
          {
            id: 'ORD-MOCK-007',
            status: 'CANCELLED',
            total_price: 1050,
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Mustard Oil',
                image_url: '/api/placeholder/100/100',
                quantity: 2,
                price: 525,
                category: 'Oils and Seeds'
              }
            ]
          },
          {
            id: 'ORD-MOCK-008',
            status: 'DELIVERED',
            total_price: 1600,
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            items: [
              {
                product_name: 'Instant Noodles (Pack of 10)',
                image_url: '/api/placeholder/100/100',
                quantity: 1,
                price: 1600,
                category: 'Processed Products'
              }
            ]
          }
        ]
      };
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { data: [] };
  }
};

const cancelOrderRequest = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (apiError) {
      console.warn('Cancel order API not available, returning mock success:', apiError);
      return { success: true, message: 'Order cancelled successfully' };
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

const Profile = ({ user, onUpdate, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedUser(user || {});
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);
    try {
      // Map fields according to your backend API expectations
      const userData = {
        full_name: editedUser.name,
        phone_number: editedUser.phone,
      };
      
      const updatedUser = await updateUserProfile(userData);
      
      // Transform the response to match our frontend user object structure
      const transformedUser = {
        ...user,
        name: updatedUser.full_name || user?.name,
        phone: updatedUser.phone_number || user?.phone,
      };
      
      onUpdate(transformedUser);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Safe rendering to prevent null errors
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all hover:shadow-lg">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4 relative">
              <img
                src={editedUser?.avatar || '/api/placeholder/100/100'}
                alt={editedUser?.name || 'User'}
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    avatar: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
            <input
              type="text"
              value={editedUser?.name || ''}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
              placeholder="Full Name"
            />
            <input
              type="email"
              value={editedUser?.email || ''}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
              disabled
              placeholder="Email"
            />
            <input
              type="tel"
              value={editedUser?.phone || ''}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Phone"
            />
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 transition"
                disabled={updateLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                disabled={updateLoading}
              >
                {updateLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
            <img
              src={user?.avatar || '/api/placeholder/100/100'}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name || 'User'}</h2>
          <p className="text-gray-600 my-1">{user?.email || 'No email'}</p>
          <p className="text-gray-600 mb-4">{user?.phone || 'No phone'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white py-2 px-4 rounded w-full hover:bg-gray-800 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

const AddressBook = ({ address, onUpdate, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address || {});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEditedAddress(address || {});
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);
    
    try {
      // Send flat structure matching backend expectations
      const addressData = {
        full_name: editedAddress.name,
        tole: editedAddress.street,
        street: editedAddress.addressLine2,
        district: editedAddress.city,
        province: editedAddress.area,
        phone_number: editedAddress.phone,
        landmark: editedAddress.landmark || ''
      };
      
      const updatedUser = await updateUserProfile(addressData);
      
      const transformedAddress = {
        ...address,
        name: updatedUser.address?.full_name || address?.name,
        street: updatedUser.address?.tole || address?.street,
        addressLine2: updatedUser.address?.street || address?.addressLine2,
        city: updatedUser.address?.district || address?.city,
        area: updatedUser.address?.province || address?.area,
        phone: updatedUser.address?.phone_number || address?.phone,
        landmark: updatedUser.address?.landmark || address?.landmark
      };
      
      onUpdate(transformedAddress);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update address. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <p>Loading address...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Address Book</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={editedAddress?.name || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, name: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Full Name"
          />
          <input
            type="text"
            value={editedAddress?.street || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, street: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Street Address"
          />
          <input
            type="text"
            value={editedAddress?.addressLine2 || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, addressLine2: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Apartment, suite, unit, etc. (optional)"
          />
          <input
            type="text"
            value={editedAddress?.city || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, city: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="City"
          />
          <input
            type="text"
            value={editedAddress?.area || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, area: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Area"
          />
          <input
            type="tel"
            value={editedAddress?.phone || ''}
            onChange={(e) =>
              setEditedAddress({ ...editedAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Phone"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            disabled={updateLoading}
          >
            {updateLoading ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-2">Default Shipping Address</p>
          <div className="space-y-1 text-gray-600">
            {address?.name ? (
              <>
                <p>{address.name}</p>
                <p>{address.street}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}</p>
                <p>{address.area}</p>
                <p>{address.phone}</p>
              </>
            ) : (
              <p className="text-gray-500 italic">No address information available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const OrderTable = ({ orders, onCancelOrder, isLoading }) => {
  const statusStyles = {
    PENDING: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-purple-100 text-purple-800',
    SHIPPED: 'bg-yellow-100 text-yellow-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 && (
        <p className="text-center text-gray-500 py-10">No orders found.</p>
      )}
      {orders.map((order) => (
        <div key={order.id || order._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                {order.items && order.items[0] && (
                  <img
                    src={order.items[0].image_url || `/api/placeholder/100/100`}
                    alt={order.items[0].product_name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-800">
                  {order.items && order.items[0] 
                    ? order.items[0].product_name 
                    : 'Order Item'}
                </h3>
                <p className="text-sm text-gray-500">
                  Items: {order.items ? order.items.length : 0}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  Rs {order.total_price || order.totalPrice}
                </p>
                <p className="text-xs text-gray-400">Order ID: {order.id || order._id}</p>
                <p className="text-xs text-gray-400">
                  Placed On: {new Date(order.created_at || order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-4 md:text-right space-y-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  statusStyles[order.status] || 'bg-gray-100 text-gray-800'
                }`}
              >
                {(order.status && order.status.charAt(0) + order.status.slice(1).toLowerCase()) || 'Processing'}
              </span>
              <p className="text-sm text-gray-500">
                Est. Delivery: {
                  order.status === 'DELIVERED' 
                    ? 'Delivered' 
                    : order.status === 'CANCELLED' 
                      ? 'Cancelled'
                      : order.deliveryDate || '5-7 business days'
                }
              </p>

              <div className="flex space-x-2 mt-2">
                {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                  <button
                    onClick={() => onCancelOrder(order.id || order._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  className="px-3 py-1 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-700 transition"
                  onClick={() => alert(`View details for order ${order.id || order._id}`)}
                >
                  {order.status === 'CANCELLED' ? 'View Report' : 'View Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('Recent');
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState({
    user: true,
    orders: true
  });
  const [error, setError] = useState(null);

  // Function to check token
  const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token ? 'Token exists' : 'No token found');
    if (!token) {
      setError('Authentication token not found. Please log in.');
    }
    if (token && error) {
      console.log('Token might be invalid or expired. Try logging out and logging back in.');
    }
    return token;
  };

  // Function to transform backend user data to frontend format
  const transformUserData = (backendUser) => {
    if (!backendUser) return null;
    
    console.log('Transforming backend user data:', backendUser);
    
    return {
      id: backendUser.id || backendUser._id,
      name: backendUser.full_name || backendUser.name,
      email: backendUser.email,
      phone: backendUser.phone_number || backendUser.phone,
      avatar: backendUser.avatar || '/api/placeholder/100/100'
    };
  };

  // Function to transform backend address data to frontend format
  const transformAddressData = (backendUser) => {
    if (!backendUser || !backendUser.address) return null;
    
    console.log('Transforming backend address data:', backendUser);

    const addressData = backendUser.address;
    
    return {
      name: addressData.full_name || addressData.name,
      street: addressData.tole || addressData.street || '',
      addressLine2: addressData.street || addressData.addressLine2 || '',
      city: addressData.district || addressData.city || '',
      area: addressData.province || addressData.area || '',
      phone: addressData.phone_number || addressData.phone || ''
    };
  };

  // Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(prev => ({ ...prev, user: true }));
        const token = checkToken(); // Check token before API call
        
        if (!token) {
          setLoading(prev => ({ ...prev, user: false }));
          return;
        }
        
        const userData = await fetchUserProfile();
        
        console.log('Raw user data from API:', userData);
        
        if (!userData) {
          setError('Failed to load user profile. Please refresh or log in again.');
          setLoading(prev => ({ ...prev, user: false }));
          return;
        }
        
        // Transform the backend data to match our frontend structure
        const transformedUser = transformUserData(userData);
        const transformedAddress = transformAddressData(userData);
        
        setUser(transformedUser);
        setAddress(transformedAddress);
        setError(null); // Clear error if successful
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error in loadUserProfile:', err);
      } finally {
        setLoading(prev => ({ ...prev, user: false }));
      }
    };

    loadUserProfile();
  }, []);

  // Load orders based on active tab
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(prev => ({ ...prev, orders: true }));
        const token = checkToken();
        
        if (!token) {
          setLoading(prev => ({ ...prev, orders: false }));
          return;
        }
        
        let statusFilter = '';
        switch (activeTab) {
          case 'Recent':
            statusFilter = 'active'; 
            break;
          case 'Past':
            statusFilter = 'DELIVERED';
            break;
          case 'Cancelled':
            statusFilter = 'CANCELLED';
            break;
          default:
            statusFilter = '';
        }
        
        const response = await fetchOrders(statusFilter);
        console.log('Orders response:', response);
        
        if (response && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Error loading orders:', err);
        setOrders([]);
      } finally {
        setLoading(prev => ({ ...prev, orders: false }));
      }
    };

    loadOrders();
  }, [activeTab]);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrderRequest(orderId);
      
      // Update the local state to reflect changes
      setOrders(
        orders.map((order) =>
          (order.id || order._id) === orderId ? { ...order, status: 'CANCELLED' } : order
        )
      );
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {error && (
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6">
          {error}
          <button 
            onClick={checkToken}
            className="ml-2 underline hover:text-yellow-900"
          >
            Check Authentication
          </button>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
          <Profile 
            user={user} 
            onUpdate={setUser} 
            isLoading={loading.user} 
          />
          <AddressBook 
            address={address} 
            onUpdate={setAddress} 
            isLoading={loading.user} 
          />
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-2 mb-6">
            <div className="flex">
              {['Recent', 'Past', 'Cancelled'].map((tab) => {
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-gray-800 text-white rounded-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab} Order{tab !== 'Past' ? 's' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <OrderTable 
            orders={orders} 
            onCancelOrder={handleCancelOrder} 
            isLoading={loading.orders} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;