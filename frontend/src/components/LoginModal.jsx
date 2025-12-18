import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    login(formData.name, formData.phoneNumber);
    setFormData({ name: '', phoneNumber: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            A
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Login to continue with Airtel Recharge</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-airtel-red focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-airtel-red focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white py-3 px-6 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          By logging in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
