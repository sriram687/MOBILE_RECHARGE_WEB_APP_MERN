import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Zap, Shield, CreditCard, Gift, Phone, Wifi, MessageSquare, Clock, Users, Award, TrendingUp, CheckCircle, Star, Rocket, Heart, Target, ChevronRight, Play, ArrowRight, LogOut } from 'lucide-react';

const LandingPage = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&h=400&fit=crop'
  ];

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Airtel Recharge</span>
            </div>
            <div className="flex items-center space-x-4">
              {user.isLoggedIn ? (
                <>
                  <span className="text-gray-700 hidden sm:block">Hi, {user.name}</span>
                  <Link
                    to="/history"
                    className="text-airtel-red text-sm font-semibold hover:text-airtel-darkRed transition-colors hidden sm:inline-block"
                  >
                    History
                  </Link>
                  <Link
                    to="/plans"
                    className="bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    My Plans
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="flex items-center gap-1 text-red-600 text-sm font-semibold hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-airtel-red text-sm font-semibold hover:text-airtel-darkRed transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Image Carousel Palette */}
      <section className="relative h-[500px] overflow-hidden bg-gray-900">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-airtel-red/20 via-purple-900/30 to-blue-900/20 animate-pulse" style={{animationDuration: '8s'}}></div>
        
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-airtel-red/40 to-purple-900/60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
          </div>
        ))}
        
        {/* Floating Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-airtel-yellow/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
          
          {/* Floating Stars */}
          <Star className="absolute bottom-32 left-40 w-6 h-6 text-white/40 animate-pulse" style={{animationDuration: '3s'}} />
        </div>
        
        {/* Premium Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-white px-4 max-w-5xl mx-auto">
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-5 animate-fade-in leading-tight">
              <span className="bg-gradient-to-r from-white via-airtel-yellow to-white bg-clip-text text-transparent drop-shadow-2xl">
                Recharge Reimagined
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">For The Digital Era</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-gray-100 font-light leading-relaxed animate-fade-in max-w-3xl mx-auto drop-shadow-lg" style={{animationDelay: '0.2s'}}>
              Experience <span className="font-bold text-airtel-yellow">lightning-fast recharges</span>, exclusive rewards, and premium service - all at your fingertips
            </p>
            
            {/* CTA Buttons with Advanced Animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link
                to="/plans"
                className="group relative bg-gradient-to-r from-airtel-yellow via-yellow-400 to-airtel-yellow text-airtel-red px-10 py-4 rounded-full text-lg font-black overflow-hidden transition-all duration-500 shadow-2xl shadow-airtel-yellow/50 hover:shadow-airtel-yellow hover:-translate-y-2 hover:scale-110 animate-pulse"
                style={{animationDuration: '3s'}}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Now
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-airtel-yellow to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
              </Link>
              
              <Link
                to="/plans"
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 hover:border-white hover:-translate-y-1 shadow-xl"
              >
                View All Plans
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Live Stats Ticker */}
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-5 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">10M+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-5 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">99.9% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-5 py-2 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-2 h-2 bg-airtel-yellow rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">&lt;3s Avg Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Progress Indicators */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentImageIndex
                    ? 'w-12 bg-gradient-to-r from-airtel-red to-airtel-yellow shadow-lg shadow-airtel-red/50'
                    : 'w-8 bg-white/40 hover:bg-white/70'
                }`}></div>
                {index === currentImageIndex && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-airtel-red text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Slide {index + 1}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-airtel-red via-airtel-darkRed to-red-900 text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-airtel-yellow rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-20 h-20 border-4 border-white/20 rounded-lg rotate-45 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-40 right-32 w-16 h-16 border-4 border-airtel-yellow/30 rounded-full animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-60 right-20 w-12 h-12 bg-white/10 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-semibold">Trusted by 10 Million+ Users Worldwide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight animate-fade-in">
              Recharge Made
              <br />
              <span className="bg-gradient-to-r from-airtel-yellow via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                Effortless
              </span>
            </h1>
            <p className="text-base md:text-lg mb-8 text-gray-100 font-light leading-relaxed animate-fade-in-delay max-w-2xl mx-auto">
              Experience lightning-fast mobile recharges with <span className="font-bold text-airtel-yellow">exclusive offers</span> and instant activation.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/plans"
                className="group relative bg-airtel-yellow text-airtel-red px-8 py-3 rounded-full text-base font-bold overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-airtel-yellow/50 hover:-translate-y-2 hover:scale-105"
              >
                <span className="relative z-10">View Recharge Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <Link
                to="/plans"
                className="group bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-8 py-3 rounded-full text-base font-bold hover:bg-white/20 transition-all duration-300 hover:border-white hover:-translate-y-1"
              >
                Browse Plans →
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <Users className="w-10 h-10 text-airtel-yellow" />
                </div>
                <div className="text-2xl font-bold mb-1">10M+</div>
                <div className="text-xs text-gray-200">Happy Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <Shield className="w-10 h-10 text-green-400" />
                </div>
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-xs text-gray-200">Secure Payments</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-2">
                  <Clock className="w-10 h-10 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-1">&lt;5 Sec</div>
                <div className="text-sm text-gray-200">Instant Activation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section with Staggered Animation */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-airtel-red/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-airtel-yellow/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-airtel-red/10 to-purple-500/10 rounded-full px-6 py-2 mb-4">
              <span className="text-sm font-bold text-airtel-red uppercase tracking-wide">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight">
              Why <span className="bg-gradient-to-r from-airtel-red to-purple-600 bg-clip-text text-transparent">10 Million+</span> Users Trust Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience unparalleled service quality with features designed for your convenience
            </p>
          </div>

          {/* Feature Cards Grid - 3 Rows x 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {/* Card 1 - Instant Recharge */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-airtel-red/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-airtel-red relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-airtel-red/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-airtel-red/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-airtel-red via-red-500 to-airtel-darkRed rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-airtel-red/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Zap className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-airtel-red transition-colors">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Recharge activated in under 3 seconds. Fastest in the industry.</p>
                <div className="inline-flex items-center text-airtel-red font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2 - 100% Secure */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-green-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-green-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Bank-Grade Security</h3>
                <p className="text-gray-600 leading-relaxed mb-4">256-bit SSL encryption. Your data is always protected.</p>
                <div className="inline-flex items-center text-green-600 font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3 - Multiple Payments */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Flexible Payments</h3>
                <p className="text-gray-600 leading-relaxed mb-4">UPI, Cards, Wallets - 20+ payment options available.</p>
                <div className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 4 - Best Offers */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-yellow-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-airtel-yellow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-airtel-yellow/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-airtel-yellow/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-airtel-yellow to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-airtel-yellow/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Gift className="w-10 h-10 text-white animate-bounce" style={{animationDuration: '2s'}} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Exclusive Rewards</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Up to 15% cashback and special offers every day.</p>
                <div className="inline-flex items-center text-yellow-600 font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 5 - 24/7 Support */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Always here to help. Live chat, email, and phone support.</p>
                <div className="inline-flex items-center text-purple-600 font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 6 - Smart Recommendations */}
            <div className="group bg-white p-8 rounded-3xl shadow-2xl hover:shadow-indigo-500/20 transition-all duration-700 hover:-translate-y-4 hover:scale-105 text-center border-2 border-gray-100 hover:border-indigo-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">AI Recommendations</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Smart suggestions based on your usage patterns.</p>
                <div className="inline-flex items-center text-indigo-600 font-bold text-sm group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-pink-500/50">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-cyan-500/50">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">10M+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-emerald-500/50">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-600">Industry Awards</div>
            </div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl group-hover:shadow-amber-500/50">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Plans Preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Popular Recharge Plans
            </h2>
            <p className="text-base text-gray-600">Choose from our most loved plans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Plan 1 */}
            <div className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-airtel-red hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden perspective-1000 hover:rotate-y-5">
              <div className="absolute inset-0 bg-gradient-to-br from-airtel-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-center relative z-10">
                <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">STARTER</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Basic</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-airtel-red to-airtel-darkRed bg-clip-text text-transparent">₹99</span>
                  <span className="text-gray-500 text-sm">/28 days</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">1 GB/day Data</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">Unlimited Calls</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">100 SMS/day</span>
                  </li>
                </ul>
                <Link
                  to="/plans"
                  className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-lg text-sm font-bold hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Select Plan
                </Link>
              </div>
            </div>

            {/* Plan 2 - Featured */}
            <div className="bg-gradient-to-br from-airtel-red via-red-600 to-airtel-darkRed text-white rounded-2xl p-6 shadow-2xl transform scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -top-5 -right-5 w-32 h-32 bg-airtel-yellow/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-airtel-yellow to-yellow-400 text-airtel-red px-8 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse flex items-center gap-2">
                  <Star className="w-4 h-4 fill-airtel-red" />
                  MOST POPULAR
                  <Star className="w-4 h-4 fill-airtel-red" />
                </div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 mt-2">RECOMMENDED</div>
                <h3 className="text-2xl font-bold mb-3">Popular</h3>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold">₹199</span>
                  <span className="text-gray-200 text-sm">/28 days</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-airtel-yellow rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-airtel-red" />
                    </span>
                    <span className="font-semibold">1.5 GB/day Data</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-airtel-yellow rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-airtel-red" />
                    </span>
                    <span className="font-semibold">Unlimited Calls</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-6 h-6 bg-airtel-yellow rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-airtel-red" />
                    </span>
                    <span className="font-semibold">Unlimited SMS</span>
                  </li>
                </ul>
                <Link
                  to="/plans"
                  className="block w-full bg-gradient-to-r from-airtel-yellow to-yellow-400 text-airtel-red py-3 rounded-lg text-sm font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Select Plan
                </Link>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 hover:border-airtel-red hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden perspective-1000 hover:rotate-y-5">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-center relative z-10">
                <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">PREMIUM</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₹299</span>
                  <span className="text-gray-500 text-sm">/56 days</span>
                </div>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">2 GB/day Data</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">Unlimited Calls</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </span>
                    <span className="text-sm font-medium">Unlimited SMS</span>
                  </li>
                </ul>
                <Link
                  to="/plans"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg text-sm font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Select Plan
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/plans"
              className="inline-block bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all"
            >
              View All Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-airtel-red rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-airtel-yellow rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-4">
              <Star className="w-5 h-5 text-airtel-yellow" />
              <span className="text-sm font-bold text-white uppercase tracking-wide">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Loved by <span className="text-airtel-yellow">Millions</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See what our customers have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-airtel-yellow fill-airtel-yellow" />
                ))}
              </div>
              <p className="text-white text-lg mb-6 leading-relaxed italic">
                "Absolutely the fastest recharge service I've ever used! My recharge was activated in literally 2 seconds. The interface is so smooth and professional."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-airtel-red to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  P
                </div>
                <div>
                  <div className="text-white font-bold">Priya Sharma</div>
                  <div className="text-gray-400 text-sm">Mumbai, Maharashtra</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-airtel-yellow fill-airtel-yellow" />
                ))}
              </div>
              <p className="text-white text-lg mb-6 leading-relaxed italic">
                "The cashback offers are incredible! I've already saved ₹500 in just 3 months. Plus, the payment options are so convenient. Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  R
                </div>
                <div>
                  <div className="text-white font-bold">Rahul Verma</div>
                  <div className="text-gray-400 text-sm">Delhi, NCR</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-airtel-yellow fill-airtel-yellow" />
                ))}
              </div>
              <p className="text-white text-lg mb-6 leading-relaxed italic">
                "Customer support is outstanding! Had a query at 2 AM and got instant help via chat. The whole experience feels premium and trustworthy."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  A
                </div>
                <div>
                  <div className="text-white font-bold">Anjali Patel</div>
                  <div className="text-gray-400 text-sm">Bangalore, Karnataka</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-airtel-yellow fill-airtel-yellow" />
                <span className="text-2xl font-bold text-white">4.9/5</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-left">
                <div className="text-white font-bold">Rated Excellent</div>
                <div className="text-gray-400 text-sm">Based on 50,000+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-airtel-yellow via-yellow-400 to-orange-400 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-airtel-red/20 rounded-full blur-3xl"></div>
          <Star className="absolute bottom-32 left-40 w-10 h-10 text-white/40 animate-pulse" style={{animationDuration: '2s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2 mb-6">
                  <Gift className="w-5 h-5 text-airtel-red animate-bounce" />
                  <span className="text-sm font-bold text-airtel-red uppercase tracking-wide">Exclusive Perks</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Unbeatable Benefits <br />
                  <span className="text-airtel-red">Just for You</span>
                </h2>
                
                <ul className="space-y-5">
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-2xl shadow-pink-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl mb-1">Welcome Bonus</h4>
                      <p className="text-gray-800 leading-relaxed">Get instant ₹100 cashback on your first recharge. Limited time offer!</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-2xl shadow-green-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl mb-1">Refer & Earn Big</h4>
                      <p className="text-gray-800 leading-relaxed">Earn ₹100 for every friend you refer. Unlimited earning potential!</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-2xl shadow-yellow-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl mb-1">Loyalty Rewards</h4>
                      <p className="text-gray-800 leading-relaxed">Exclusive tier-based rewards. More recharges = More benefits!</p>
                    </div>
                  </li>

                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-2xl shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Star className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xl mb-1">Surprise Deals</h4>
                      <p className="text-gray-800 leading-relaxed">Get personalized offers and flash deals delivered to your inbox!</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-3xl p-10 shadow-2xl hover:shadow-airtel-red/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-4 border-white/50">
                  <div className="text-center">
                    <Rocket className="w-16 h-16 text-airtel-red mx-auto mb-4 animate-bounce" />
                    <h3 className="text-3xl font-black text-gray-900 mb-3">Ready to Experience It?</h3>
                    <p className="text-gray-700 mb-6 text-lg">Join 10 million+ happy customers and start saving today!</p>
                    <Link
                      to="/signup"
                      className="group inline-flex items-center gap-3 w-full justify-center bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white py-5 rounded-2xl text-lg font-black text-center hover:shadow-2xl hover:shadow-airtel-red/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                      Create Free Account
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>No credit card required</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Setup in 30 seconds</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-xl">
                    <div className="text-4xl font-black text-airtel-red mb-2">₹50Cr+</div>
                    <div className="text-gray-700 font-semibold">Cashback Paid</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-xl">
                    <div className="text-4xl font-black text-airtel-red mb-2">100M+</div>
                    <div className="text-gray-700 font-semibold">Recharges Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-xl font-bold">Airtel Recharge</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for fast and secure mobile recharges.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/plans" className="hover:text-white transition-colors">Recharge Plans</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Airtel Recharge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
