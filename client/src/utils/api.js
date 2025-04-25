import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

export const dashboardAPI = {
  getOrderAnalytics: () => api.get('/admin/dashboard/order-analytics'),
  getRevenueAnalytics: (months) => api.get(`/admin/dashboard/revenue?months=${months}`),
  getCustomerAnalytics: () => api.get('/admin/dashboard/customer-analytics'),
  getTopProducts: (limit) => api.get(`/admin/dashboard/top-products?limit=${limit}`),
  getInventory: () => api.get('/admin/dashboard/inventory')
};

