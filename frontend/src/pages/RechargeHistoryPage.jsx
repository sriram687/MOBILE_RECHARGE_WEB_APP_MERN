import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Home, Calendar, CreditCard, Smartphone, TrendingUp, CheckCircle } from 'lucide-react';

const RechargeHistoryPage = () => {
  const { rechargeHistory, fetchRechargeHistory, user, loading } = useAppContext();

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchRechargeHistory();
    }
  }, [user.isLoggedIn, fetchRechargeHistory]);

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-airtel-red to-airtel-darkRed flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-white/80 mb-6">You need to be logged in to view your recharge history</p>
          <Link
            to="/login"
            className="inline-block bg-airtel-yellow text-airtel-red px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-airtel-red to-airtel-darkRed shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Recharge History</h1>
              <p className="text-white/80 mt-1">View all your past transactions</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-airtel-yellow transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center text-white text-xl">Loading...</div>
        ) : rechargeHistory.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
              <TrendingUp className="w-24 h-24 text-airtel-yellow mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">No Recharge History</h2>
              <p className="text-white/80 mb-6">
                You haven't made any recharges yet. Start recharging to see your history here.
              </p>
              <Link
                to="/plans"
                className="inline-block bg-airtel-yellow text-airtel-red px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all"
              >
                Browse Plans
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {rechargeHistory.map((recharge, index) => {
              // Calculate end date based on validity
              const calculateEndDate = () => {
                const startDate = new Date(recharge.createdAt);
                const validityDays = parseInt(recharge.validity.match(/\d+/)?.[0] || '0');
                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + validityDays);
                return endDate;
              };

              const endDate = calculateEndDate();
              const isExpired = endDate < new Date();

              return (
              <div
                key={recharge._id || index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-airtel-yellow to-orange-400 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{recharge.planName}</h3>
                      <p className="text-white/70">{recharge.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-airtel-yellow">₹{recharge.amount}</div>
                    <div className="flex items-center gap-1 text-green-400 text-sm mt-1">
                      <CheckCircle className="w-4 h-4" />
                      {recharge.status || 'Success'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                    <div className="text-white font-medium">
                      {new Date(recharge.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <TrendingUp className="w-4 h-4" />
                      Validity
                    </div>
                    <div className="text-white font-medium">{recharge.validity}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Ends On
                    </div>
                    <div className={`font-medium ${isExpired ? 'text-red-400' : 'text-green-400'}`}>
                      {endDate.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <Smartphone className="w-4 h-4" />
                      Data
                    </div>
                    <div className="text-white font-medium">{recharge.data}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <CreditCard className="w-4 h-4" />
                      Payment
                    </div>
                    <div className="text-white font-medium">{recharge.paymentMethod}</div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default RechargeHistoryPage;
