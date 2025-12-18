import React from 'react';

const PlanCard = ({ plan, onSelect, isSelected }) => {
  return (
    <div
      className={`relative bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${
        isSelected
          ? 'border-airtel-red scale-105'
          : plan.featured
          ? 'border-airtel-yellow'
          : 'border-gray-200'
      }`}
    >
      {/* Badge for Featured Plans */}
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
            Popular
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="text-center mb-6">
        <span className="text-5xl font-bold text-airtel-red">₹{plan.price}</span>
        <p className="text-gray-500 text-sm mt-1">{plan.validity} days validity</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-green-500 font-bold text-lg">✓</span>
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Select Button */}
      <button
        onClick={() => onSelect(plan)}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
          isSelected
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white hover:shadow-lg hover:-translate-y-0.5'
        }`}
      >
        {isSelected ? '✓ Selected' : 'Select Plan'}
      </button>

      {/* Extra Info */}
      {plan.extraInfo && (
        <p className="text-xs text-gray-500 text-center mt-3">{plan.extraInfo}</p>
      )}
    </div>
  );
};

export default PlanCard;
