import React from 'react';

const Hero = ({ onRechargeClick }) => {
  return (
    <section className="relative bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white py-24 px-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Airtel Recharge
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in-delay">
            Fast, Secure, and Reliable Mobile Recharge Solutions
          </p>
          <button
            onClick={onRechargeClick}
            className="bg-gradient-to-r from-airtel-yellow to-yellow-400 text-airtel-red px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-bounce-slow"
          >
            Recharge Now →
          </button>
        </div>

        {/* Features Quick View */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <p className="font-semibold text-lg">Instant</p>
            <p className="text-sm text-gray-200">Recharge</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">100% Secure</p>
            <p className="text-sm text-gray-200">Payments</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">Multiple</p>
            <p className="text-sm text-gray-200">Payment Options</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg">Exclusive</p>
            <p className="text-sm text-gray-200">Offers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
