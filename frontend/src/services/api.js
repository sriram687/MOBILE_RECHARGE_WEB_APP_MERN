const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Set token in localStorage
const setToken = (token) => localStorage.setItem('token', token);

// Remove token from localStorage
const removeToken = () => localStorage.removeItem('token');

// API Headers with authentication
const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
});

// AUTH APIs
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    if (data.token) setToken(data.token);
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    if (data.token) setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
  },
};

// RECHARGE APIs
export const rechargeAPI = {
  createRecharge: async (rechargeData) => {
    const response = await fetch(`${API_BASE_URL}/recharge`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(rechargeData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Recharge failed');
    return data;
  },

  getHistory: async () => {
    const response = await fetch(`${API_BASE_URL}/recharge/history`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch history');
    return data;
  },
};

// PLANS APIs (Public)
export const plansAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/plans`, {
      method: 'GET',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch plans');
    return data;
  },
};

// ADMIN APIs
export const adminAPI = {
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch stats');
    return data;
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  getAllPlans: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/plans`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch plans');
    return data;
  },

  createPlan: async (planData) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(planData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create plan');
    return data;
  },

  updatePlan: async (id, planData) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(planData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update plan');
    return data;
  },

  deletePlan: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/plans/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete plan');
    return data;
  },

  getAllRecharges: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/recharges`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch recharges');
    return data;
  },
};

export { getToken, setToken, removeToken };
