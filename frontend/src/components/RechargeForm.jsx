import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const RechargeForm = ({ selectedPlan, onClose }) => {
  const { user, addRecharge, addNotification } = useAppContext();
  const [formData, setFormData] = useState({
    phoneNumber: user.phoneNumber || '',
    operator: 'Airtel',
    amount: selectedPlan?.price || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user.isLoggedIn) {
      addNotification('Please login to continue', 'error');
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      addNotification('Please enter a valid 10-digit phone number', 'error');
      return;
    }

    // Add recharge to history
    addRecharge({
      phoneNumber: formData.phoneNumber,
      operator: formData.operator,
      amount: formData.amount,
      plan: selectedPlan?.name || 'Custom',
      status: 'Success',
    });

    // Reset form
    setFormData({
      phoneNumber: '',
      operator: 'Airtel',
      amount: '',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Complete Recharge
          </h2>
          {selectedPlan && (
            <p className="text-sm text-gray-600">
              {selectedPlan.name} - ₹{selectedPlan.price}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone Number */}
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

          {/* Operator */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Operator
            </label>
            <select
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-airtel-red focus:outline-none transition-colors"
            >
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
              min="10"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-airtel-red focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white py-3 px-6 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Proceed to Pay ₹{formData.amount}
          </button>
        </form>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 Secure payment powered by SSL encryption
        </p>
      </div>
    </div>
  );
};

export default RechargeForm;
