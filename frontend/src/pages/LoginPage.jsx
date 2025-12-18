import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../context/AppContext';
import { Lock, Phone, ArrowRight, Home, Zap, Shield, Clock } from 'lucide-react';

// Validation Schema
const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
});

const LoginPage = () => {
  const { login, addNotification } = useAppContext();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState({ phone: false, password: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data.phoneNumber, data.password);
      reset();
      // Redirect to admin page if user is admin
      if (response.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/plans');
      }
    } catch (error) {
      // Error notification is already handled in the context
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-airtel-red/90 to-airtel-darkRed/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-airtel-yellow/10 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-airtel-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Login Container */}
      <div className="max-w-lg w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block group">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-airtel-yellow to-orange-400 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-airtel-red text-3xl font-black shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-2 border-white/20">
                A
              </div>
            </div>
          </Link>
          <div className="mb-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl font-black text-white mb-1.5 tracking-tight">
              Welcome Back
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-airtel-yellow to-orange-400 mx-auto rounded-full"></div>
          </div>
          <p className="text-white/80 text-sm font-medium animate-fade-in" style={{animationDelay: '0.2s'}}>
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Form Card with Glassmorphism */}
        <div className="relative bg-white/15 backdrop-blur-3xl rounded-2xl shadow-2xl p-6 border border-white/20 animate-fade-in overflow-hidden" style={{animationDelay: '0.3s'}}>
          {/* Card Decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-airtel-yellow/20 to-orange-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Number */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-airtel-yellow to-orange-400 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  onFocus={() => setIsFocused({ ...isFocused, phone: true })}
                  onBlur={() => setIsFocused({ ...isFocused, phone: false })}
                  placeholder="Enter your 10-digit number"
                  maxLength="10"
                  className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                    errors.phoneNumber 
                      ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                      : isFocused.phone 
                      ? 'border-airtel-yellow bg-white/30 shadow-airtel-yellow/40 scale-[1.02]' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                />
                {isFocused.phone && !errors.phoneNumber && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              {errors.phoneNumber && (
                <div className="mt-2 animate-fade-in">
                  <div className="text-xs text-red-200 bg-red-500/20 backdrop-blur-xl px-3 py-2 rounded-lg flex items-center gap-2 border border-red-400/30 shadow-lg">
                    <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </span>
                    <span className="font-medium">{errors.phoneNumber.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock className="w-3.5 h-3.5 text-white" />
                  </div>
                  Password
                </label>
                <a href="#" className="text-xs text-airtel-yellow hover:text-yellow-300 font-semibold transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  {...register('password')}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => setIsFocused({ ...isFocused, password: false })}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                    errors.password 
                      ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                      : isFocused.password 
                      ? 'border-airtel-yellow bg-white/30 shadow-airtel-yellow/40 scale-[1.02]' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                />
                {isFocused.password && !errors.password && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              {errors.password && (
                <div className="mt-2 animate-fade-in">
                  <div className="text-xs text-red-200 bg-red-500/20 backdrop-blur-xl px-3 py-2 rounded-lg flex items-center gap-2 border border-red-400/30 shadow-lg">
                    <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </span>
                    <span className="font-medium">{errors.password.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-airtel-yellow via-yellow-400 to-airtel-yellow text-airtel-red py-3 px-6 rounded-xl font-black text-base shadow-2xl hover:shadow-airtel-yellow/60 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-2 mt-6 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-airtel-yellow to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Sign In Securely
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </button>
          </form>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 py-1.5 bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-xl text-white font-bold rounded-full border border-white/30 shadow-lg">
                New to Airtel?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            to="/signup"
            className="group relative block text-center text-white bg-white/15 backdrop-blur-xl py-3 px-6 rounded-xl font-bold hover:bg-white/25 transition-all duration-500 border-2 border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl overflow-hidden text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Create New Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
        </div>

        {/* Feature Cards Below Form */}
        <div className="grid grid-cols-3 gap-4 mt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-airtel-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-airtel-red" />
            </div>
            <p className="text-white font-bold text-sm">Instant Access</p>
            <p className="text-white/70 text-xs mt-1">Quick recharge</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-bold text-sm">Secure Login</p>
            <p className="text-white/70 text-xs mt-1">Protected data</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-bold text-sm">24/7 Support</p>
            <p className="text-white/70 text-xs mt-1">Always here</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-all duration-300 hover:gap-3 group"
          >
            <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
