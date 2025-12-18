import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, rechargeAPI, getToken } from '../services/api';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  // Theme state (light/dark mode)
  const [theme, setTheme] = useState('light');
  
  // User state
  const [user, setUser] = useState({
    id: '',
    name: '',
    phoneNumber: '',
    email: '',
    isLoggedIn: false,
  });
  
  // Recharge state
  const [rechargeHistory, setRechargeHistory] = useState([]);
  
  // Cart state
  const [cart, setCart] = useState([]);
  
  // Notification state
  const [notifications, setNotifications] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Fetch user's recharge history if logged in
      fetchRechargeHistory();
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Signup user
  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(userData);
      setUser({
        id: response.user.id,
        name: response.user.name,
        phoneNumber: response.user.phoneNumber,
        email: response.user.email,
        isLoggedIn: true,
      });
      addNotification('Account created successfully!', 'success');
      return response;
    } catch (error) {
      addNotification(error.message || 'Signup failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (phoneNumber, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ phoneNumber, password });
      setUser({
        id: response.user.id,
        name: response.user.name,
        phoneNumber: response.user.phoneNumber,
        email: response.user.email,
        role: response.user.role || 'USER',
        isLoggedIn: true,
      });
      addNotification('Successfully logged in!', 'success');
      // Fetch recharge history after login
      await fetchRechargeHistory();
      return response;
    } catch (error) {
      addNotification(error.message || 'Login failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authAPI.logout();
    setUser({ id: '', name: '', phoneNumber: '', email: '', role: 'USER', isLoggedIn: false });
    setRechargeHistory([]);
    setCart([]);
    addNotification('Logged out successfully', 'info');
  };

  // Fetch recharge history
  const fetchRechargeHistory = async () => {
    try {
      const response = await rechargeAPI.getHistory();
      setRechargeHistory(response.recharges || []);
    } catch (error) {
      console.error('Failed to fetch recharge history:', error);
    }
  };

  // Add to recharge history
  const addRecharge = async (rechargeData) => {
    try {
      setLoading(true);
      const response = await rechargeAPI.createRecharge(rechargeData);
      setRechargeHistory((prev) => [response.recharge, ...prev]);
      addNotification('Recharge successful!', 'success');
      return response;
    } catch (error) {
      addNotification(error.message || 'Recharge failed', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add to cart
  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, id: Date.now() }]);
    addNotification('Added to cart', 'success');
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addNotification('Removed from cart', 'info');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add notification
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    setNotifications((prev) => [...prev, notification]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const value = {
    theme,
    toggleTheme,
    user,
    signup,
    login,
    logout,
    rechargeHistory,
    addRecharge,
    fetchRechargeHistory,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    notifications,
    addNotification,
    removeNotification,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
