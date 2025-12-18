import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { plansAPI } from '../services/api';
import { Phone, Wifi, MessageSquare, Calendar, CheckCircle, ArrowRight, Zap, Star, Home, History, LogOut } from 'lucide-react';

const PlansPage = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('individual');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await plansAPI.getAll();
      console.log('Plans API Response:', response);
      console.log('Plans data:', response.plans);
      setPlans(response.plans || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const individualPlans = plans.filter(p => p.category === 'Individual');
  const familyPlans = plans.filter(p => p.category === 'Family');
  const displayPlans = activeTab === 'individual' ? individualPlans : familyPlans;

  const handlePlanSelect = (plan) => {
    // Navigate to payment with plan details
    navigate('/payment', { state: { plan } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-airtel-red mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-airtel-red to-airtel-darkRed shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-airtel-red font-bold text-xl">A</span>
              </div>
              <span className="text-white text-xl font-bold">Airtel Recharge</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {user.isLoggedIn && (
                <>
                  <div className="text-white font-semibold">
                    Welcome, {user.name}
                  </div>
                  <Link
                    to="/history"
                    className="flex items-center gap-2 bg-airtel-yellow text-airtel-red px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
                  >
                    <History className="w-4 h-4" />
                    <span>View History</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
              <Link
                to="/"
                className="flex items-center gap-2 bg-white text-airtel-red px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Choose Your <span className="bg-gradient-to-r from-airtel-red to-pink-600 bg-clip-text text-transparent">Perfect Plan</span>
          </h1>
          <p className="text-gray-600 text-xl">Unlock unlimited possibilities with our premium recharge plans</p>
          
          {/* Plan Tabs */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setActiveTab('individual')}
              className={`px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                activeTab === 'individual'
                  ? 'bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Individual plans
            </button>
            <button 
              onClick={() => setActiveTab('family')}
              className={`px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                activeTab === 'family'
                  ? 'bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Family plans
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayPlans.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No plans available at the moment.</p>
            </div>
          ) : (
            displayPlans.map((plan, index) => {
              const isDark = plan.name?.includes('REDX') || plan.name?.includes('Max 1201');
              return (
            <div
              key={plan._id}
              className={`group relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden perspective-1000 hover:-translate-y-3 animate-fade-in ${
                isDark
                  ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-airtel-red'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 5G Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900'
                    : 'bg-gradient-to-r from-airtel-red to-pink-600 text-white'
                }`}>
                  5G
                </div>
              </div>

              <div className="p-8">
                {/* Plan Name */}
                <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-airtel-red'}`}>
                    ₹{plan.price}
                  </span>
                  <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {plan.validity} days validity
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-px mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

                {/* Features List */}
                <div className="space-y-5 mb-8">
                  {/* Calls */}
                  <div className="flex items-start gap-3">
                    <Phone className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.calls}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Local, STD, National Roaming
                      </p>
                    </div>
                  </div>

                  {/* Data */}
                  <div className="flex items-start gap-3">
                    <Wifi className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.data}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        High speed data
                      </p>
                      <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        isDark 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        unlimited 5G data in 5G coverage area
                      </div>
                    </div>
                  </div>

                  {/* SMS */}
                  <div className="flex items-start gap-3">
                    <MessageSquare className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.sms}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Local, STD, National Roaming
                      </p>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 mt-1 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {plan.validity} days validity
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits Icons */}
                <div className="flex gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <Zap className="w-6 h-6 text-airtel-red" />
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  }`}>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isDark
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                  }`}
                >
                  proceed with ₹{plan.price} plan
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-airtel-red/0 to-pink-600/0 group-hover:from-airtel-red/5 group-hover:to-pink-600/5 transition-all duration-500 pointer-events-none"></div>
            </div>
              );
            })
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <Zap className="w-12 h-12 text-airtel-red mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6">
              Our experts are here to help you find the perfect plan for your needs. 
              Get personalized recommendations based on your usage patterns.
            </p>
            <button className="bg-gradient-to-r from-airtel-red to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Talk to an Expert
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Airtel Recharge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PlansPage;
