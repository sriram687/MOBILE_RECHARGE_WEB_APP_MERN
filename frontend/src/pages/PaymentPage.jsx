import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppContext } from '../context/AppContext';

// Validation Schema - changes based on payment method
const getPaymentSchema = (paymentMethod) => {
  const baseSchema = {
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .test('starts-with-valid', 'Phone number must start with 6-9', (value) => {
        return value && /^[6-9]/.test(value);
      }),
  };

  if (paymentMethod === 'upi') {
    return yup.object().shape({
      ...baseSchema,
      upiId: yup
        .string()
        .required('UPI ID is required')
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/, 'Please enter a valid UPI ID (e.g., example@upi)'),
    });
  }

  if (paymentMethod === 'card') {
    return yup.object().shape({
      ...baseSchema,
      cardNumber: yup
        .string()
        .required('Card number is required')
        .matches(/^[0-9]{16}$/, 'Card number must be exactly 16 digits'),
      cardName: yup
        .string()
        .required('Cardholder name is required')
        .min(3, 'Name must be at least 3 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
      cardExpiry: yup
        .string()
        .required('Expiry date is required')
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry must be in MM/YY format'),
      cardCvv: yup
        .string()
        .required('CVV is required')
        .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
    });
  }

  return yup.object().shape(baseSchema);
};

const PaymentPage = () => {
  const { user, addRecharge, addNotification } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // If no plan selected, show default plan
  const defaultPlan = {
    id: 0,
    name: 'Custom',
    price: 0,
    validity: 0,
    data: 'N/A',
    calls: 'N/A',
    sms: 'N/A'
  };

  const selectedPlan = plan || defaultPlan;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(getPaymentSchema(paymentMethod)),
    mode: 'onChange',
    defaultValues: {
      phoneNumber: user.phoneNumber || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // If user is logged in, save to backend
      if (user.isLoggedIn) {
        // Prepare recharge data for backend
        const rechargeData = {
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          validity: `${selectedPlan.validity} days`,
          data: selectedPlan.data,
          phoneNumber: data.phoneNumber,
          paymentMethod: paymentMethod.toUpperCase(),
          paymentDetails: {
            upiId: data.upiId || undefined,
            cardNumber: data.cardNumber ? `****${data.cardNumber.slice(-4)}` : undefined,
            cardName: data.cardName || undefined,
          },
        };

        // Call backend API
        await addRecharge(rechargeData);
      } else {
        // For non-logged-in users, just show success message
        addNotification('Recharge successful! Sign up to track your history.', 'success');
      }

      reset();
      
      // Redirect to plans page
      setTimeout(() => {
        navigate('/plans');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-airtel-red to-airtel-darkRed shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-airtel-red font-bold text-xl">A</span>
              </div>
              <span className="text-white text-xl font-bold">Airtel Recharge</span>
            </Link>
            <Link
              to="/plans"
              className="text-white hover:text-airtel-yellow transition-colors"
            >
              ← Back to Plans
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Complete Payment</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Plan Name:</span>
                    <span className="font-semibold text-gray-800">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Mobile Number:</span>
                    <span className="font-semibold text-gray-800">{watch('phoneNumber')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Data:</span>
                    <span className="font-semibold text-gray-800">{selectedPlan.data}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Validity:</span>
                    <span className="font-semibold text-gray-800">{selectedPlan.validity} Days</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-xl font-bold text-gray-800">Total Amount:</span>
                  <span className="text-3xl font-bold text-airtel-red">₹{selectedPlan.price}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">✓ Plan Benefits</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {selectedPlan.calls} Voice Calls</li>
                  <li>• {selectedPlan.sms} SMS</li>
                  <li>• {selectedPlan.data} High-Speed Data</li>
                  <li>• Valid for {selectedPlan.validity} Days</li>
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    {...register('phoneNumber')}
                    maxLength="10"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-airtel-red text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-airtel-red text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                        paymentMethod === 'wallet'
                          ? 'bg-airtel-red text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Wallet
                    </button>
                  </div>
                </div>

                {/* UPI Payment */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      {...register('upiId')}
                      placeholder="example@upi"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                        errors.upiId ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                      }`}
                    />
                    {errors.upiId && (
                      <p className="mt-1 text-sm text-red-600">{errors.upiId.message}</p>
                    )}
                  </div>
                )}

                {/* Card Payment */}
                {paymentMethod === 'card' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        {...register('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        {...register('cardName')}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          {...register('cardExpiry')}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                            errors.cardExpiry ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardExpiry.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          {...register('cardCvv')}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-gray-800 ${
                            errors.cardCvv ? 'border-red-500' : 'border-gray-300 focus:border-airtel-red'
                          }`}
                        />
                        {errors.cardCvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardCvv.message}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Wallet Payment */}
                {paymentMethod === 'wallet' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-blue-800 font-semibold">Select your wallet</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button type="button" className="bg-white py-2 px-4 rounded border hover:bg-gray-50">
                        Paytm
                      </button>
                      <button type="button" className="bg-white py-2 px-4 rounded border hover:bg-gray-50">
                        PhonePe
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Pay ₹{selectedPlan.price}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  🔒 Secure payment powered by SSL encryption
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
