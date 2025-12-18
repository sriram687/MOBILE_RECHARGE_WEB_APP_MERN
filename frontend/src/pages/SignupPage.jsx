import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../context/AppContext';
import { User, Phone, Mail, Lock, CheckCircle, ArrowRight, Home, LogIn } from 'lucide-react';

// Validation Schema
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .test('starts-with-valid', 'Phone number must start with 6-9', (value) => {
      return value && /^[6-9]/.test(value);
    }),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must not exceed 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignupPage = () => {
  const { signup, addNotification } = useAppContext();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...signupData } = data;
      await signup(signupData);
      reset();
      navigate('/plans');
    } catch (error) {
      // Error notification is already handled in the context
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-airtel-red/90 to-purple-900/95"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-airtel-yellow/10 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-80 h-80 bg-airtel-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Signup Container */}
      <div className="max-w-lg w-full relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block group">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-airtel-red text-3xl font-black shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 border-2 border-white/20">
                A
              </div>
            </div>
          </Link>
          <div className="mb-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl font-black text-white tracking-tight mb-1.5">
              Join Airtel
            </h2>
            <div className="h-0.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-white/80 text-sm font-medium animate-fade-in" style={{animationDelay: '0.2s'}}>
            Create your account in seconds
          </p>
        </div>

        {/* Signup Form Card with Glassmorphism */}
        <div className="relative bg-white/15 backdrop-blur-3xl rounded-2xl shadow-2xl p-6 border border-white/20 animate-fade-in overflow-hidden" style={{animationDelay: '0.3s'}}>
          {/* Card Decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Full Name */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                Full Name
              </label>
              <input
                type="text"
                {...register('name')}
                onFocus={() => setIsFocused({ ...isFocused, name: true })}
                onBlur={() => setIsFocused({ ...isFocused, name: false })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                  errors.name 
                    ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                    : isFocused.name 
                    ? 'border-purple-400 bg-white/30 shadow-purple-400/40 scale-[1.02]' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
              {errors.name && (
                <div className="mt-2 animate-fade-in">
                  <div className="text-xs text-red-200 bg-red-500/20 backdrop-blur-xl px-3 py-2 rounded-lg flex items-center gap-2 border border-red-400/30 shadow-lg">
                    <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </span>
                    <span className="font-medium">{errors.name.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-airtel-yellow to-orange-400 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                Mobile Number
              </label>
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

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </div>
                Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                  errors.email 
                    ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                    : isFocused.email 
                    ? 'border-blue-400 bg-white/30 shadow-blue-400/40 scale-[1.02]' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
              {errors.email && (
                <div className="mt-2 animate-fade-in">
                  <div className="text-xs text-red-200 bg-red-500/20 backdrop-blur-xl px-3 py-2 rounded-lg flex items-center gap-2 border border-red-400/30 shadow-lg">
                    <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </span>
                    <span className="font-medium">{errors.email.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                placeholder="Create strong password"
                className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                  errors.password 
                    ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                    : isFocused.password 
                    ? 'border-green-400 bg-white/30 shadow-green-400/40 scale-[1.02]' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
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

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-xs font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wide">
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                Confirm Password
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                onFocus={() => setIsFocused({ ...isFocused, confirmPassword: true })}
                onBlur={() => setIsFocused({ ...isFocused, confirmPassword: false })}
                placeholder="Confirm your password"
                className={`w-full px-4 py-3 bg-white/25 backdrop-blur-xl border-2 rounded-xl focus:outline-none transition-all duration-500 text-white text-base font-medium placeholder-white/60 shadow-lg ${
                  errors.confirmPassword 
                    ? 'border-red-400 bg-red-500/10 shadow-red-500/30' 
                    : isFocused.confirmPassword 
                    ? 'border-indigo-400 bg-white/30 shadow-indigo-400/40 scale-[1.02]' 
                    : 'border-white/30 hover:border-white/50'
                }`}
              />
              {errors.confirmPassword && (
                <div className="mt-2 animate-fade-in">
                  <div className="text-xs text-red-200 bg-red-500/20 backdrop-blur-xl px-3 py-2 rounded-lg flex items-center gap-2 border border-red-400/30 shadow-lg">
                    <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </span>
                    <span className="font-medium">{errors.confirmPassword.message}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative group w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-bold text-base shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden mt-2 bg-size-200 bg-pos-0 hover:bg-pos-100"
              style={{
                backgroundSize: '200% 100%',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center gap-2 uppercase tracking-wider">
                Create Account Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 text-white font-bold backdrop-blur-xl rounded-full border border-white/20 shadow-lg uppercase tracking-wider">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="relative group block text-center text-white bg-white/20 backdrop-blur-xl py-3 px-6 rounded-xl font-bold hover:bg-white/30 transition-all duration-500 border-2 border-white/30 hover:border-white/50 overflow-hidden shadow-lg hover:shadow-2xl text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="relative flex items-center justify-center gap-2 uppercase tracking-wide">
              <LogIn className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Sign In to Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Feature Cards Below Form */}
        <div className="grid grid-cols-3 gap-3 mt-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-airtel-yellow to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-airtel-red" />
            </div>
            <p className="text-white font-bold text-sm">Welcome Bonus</p>
            <p className="text-white/70 text-xs mt-1">Get ₹50 on signup</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-bold text-sm">Join Community</p>
            <p className="text-white/70 text-xs mt-1">10M+ users</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-bold text-sm">Easy Process</p>
            <p className="text-white/70 text-xs mt-1">Quick setup</p>
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
    </div>
  );
};

export default SignupPage;
