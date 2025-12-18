import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { adminAPI } from '../services/api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  CreditCard,
  TrendingUp,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Home,
  LogOut,
  Phone,
  Wifi,
  Calendar,
  X,
  MessageSquare,
  Star,
  Zap,
  CheckCircle,
  Save
} from 'lucide-react';

const AdminPage = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecharges: 0,
    totalRevenue: 0,
    recentRecharges: 0
  });
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editingNameId, setEditingNameId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');
  const [tempName, setTempName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: 'prepaid',
    validity: '',
    data: '',
    price: '',
    description: ''
  });

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, plansRes, rechargesRes] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getAllPlans(),
        adminAPI.getAllRecharges()
      ]);

      console.log('API Responses:', { usersRes, plansRes, rechargesRes });

      setUsers(usersRes.users || []);
      setPlans(plansRes.plans || []);
      setRecharges(rechargesRes.data || []);

      // Calculate stats
      const totalRevenue = (rechargesRes.data || []).reduce((sum, r) => sum + (r.amount || 0), 0);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentRecharges = (rechargesRes.data || []).filter(
        r => new Date(r.createdAt) > thirtyDaysAgo
      ).length;

      setStats({
        totalUsers: usersRes.users?.length || 0,
        totalRecharges: rechargesRes.data?.length || 0,
        totalRevenue,
        recentRecharges
      });
      
      console.log('Updated Stats:', {
        totalUsers: usersRes.users?.length || 0,
        totalRecharges: rechargesRes.data?.length || 0,
        totalRevenue,
        recentRecharges
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error details:', error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await adminAPI.deletePlan(planId);
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting plan:', error);
        alert('Failed to delete plan');
      }
    }
  };

  const handlePriceSave = async (planId) => {
    try {
      const plan = plans.find(p => p._id === planId);
      await adminAPI.updatePlan(planId, { ...plan, price: parseFloat(tempPrice) });
      setEditingPriceId(null);
      setTempPrice('');
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update price');
    }
  };

  const handleNameSave = async (planId) => {
    try {
      const plan = plans.find(p => p._id === planId);
      await adminAPI.updatePlan(planId, { ...plan, name: tempName });
      setEditingNameId(null);
      setTempName('');
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Failed to update plan name');
    }
  };

  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        await adminAPI.updatePlan(editingPlan._id, formData);
      } else {
        await adminAPI.createPlan(formData);
      }
      setShowModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan');
    }
  };

  // Chart data preparation
  const paymentMethodData = recharges.reduce((acc, recharge) => {
    const method = recharge.paymentMethod || 'Unknown';
    const existing = acc.find(item => item.name === method);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: method, value: 1 });
    }
    return acc;
  }, []);

  const revenueByMethodData = recharges.reduce((acc, recharge) => {
    const method = recharge.paymentMethod || 'Unknown';
    const existing = acc.find(item => item.name === method);
    if (existing) {
      existing.revenue += recharge.amount;
    } else {
      acc.push({ name: method, revenue: recharge.amount });
    }
    return acc;
  }, []);

  const monthlyRevenueData = recharges.reduce((acc, recharge) => {
    const date = new Date(recharge.createdAt);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const existing = acc.find(item => item.month === monthYear);
    if (existing) {
      existing.revenue += recharge.amount;
    } else {
      acc.push({ month: monthYear, revenue: recharge.amount });
    }
    return acc;
  }, []).slice(-6);

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6366F1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.name || 'Admin'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-5 h-5 inline-block mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'plans'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wifi className="w-5 h-5 inline-block mr-2" />
            Plans
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            Users
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Recharges</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalRecharges}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalRevenue}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-lg">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recent (30d)</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.recentRecharges}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-lg">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recharges by Payment Method</h3>
                {paymentMethodData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 py-20">No data available</p>
                )}
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Payment Method</h3>
                {revenueByMethodData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueByMethodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 py-20">No data available</p>
                )}
              </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
              {monthlyRevenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 py-20">No data available</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Manage <span className="bg-gradient-to-r from-airtel-red to-pink-600 bg-clip-text text-transparent">Recharge Plans</span>
              </h1>
              <p className="text-gray-600">Click on plan name or price to edit • Changes reflect instantly on user's page</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => {
                const isDark = plan.name?.includes('REDX') || plan.name?.includes('Max 1201');
                const isEditingPrice = editingPriceId === plan._id;
                const isEditingName = editingNameId === plan._id;
                
                return (
                  <div
                    key={plan._id}
                    className={`group relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 ${
                      isDark
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'
                        : 'bg-white border-2 border-gray-200 hover:border-airtel-red'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeletePlan(plan._id)}
                      className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Benefits Header */}
                    {plan.category && (
                      <div className={`py-3 px-6 font-bold text-sm text-center ${
                        isDark
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900'
                          : 'bg-gradient-to-r from-airtel-yellow to-yellow-400 text-gray-900'
                      }`}>
                        {plan.category} Plan
                      </div>
                    )}

                    <div className="p-8">
                      {/* 5G Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-sm font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                          unlimited 5G
                        </span>
                      </div>

                      {/* Editable Plan Name */}
                      {isEditingName ? (
                        <div className="mb-4">
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="w-full px-3 py-2 text-2xl font-bold border-2 border-airtel-red rounded-lg focus:outline-none text-gray-900"
                            autoFocus
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleNameSave(plan._id);
                            }}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleNameSave(plan._id)}
                              className="flex-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium"
                            >
                              <Save className="w-4 h-4 inline mr-1" />
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingNameId(null);
                                setTempName('');
                              }}
                              className="flex-1 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <h3
                          onClick={() => {
                            setEditingNameId(plan._id);
                            setTempName(plan.name);
                          }}
                          className={`text-3xl font-bold mb-2 cursor-pointer hover:text-airtel-red transition-colors ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900'}`}
                          title="Click to edit plan name"
                        >
                          {plan.name}
                        </h3>
                      )}

                      {/* Editable Price */}
                      <div className="mb-6">
                        {isEditingPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">₹</span>
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-32 px-3 py-2 text-2xl font-bold border-2 border-airtel-red rounded-lg text-gray-900 focus:outline-none"
                              autoFocus
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handlePriceSave(plan._id);
                                }
                              }}
                            />
                            <button
                              onClick={() => handlePriceSave(plan._id)}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingPriceId(null);
                                setTempPrice('');
                              }}
                              className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingPriceId(plan._id);
                              setTempPrice(plan.price.toString());
                            }}
                            className="group/price hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1 rounded-lg transition-all"
                            title="Click to edit price"
                          >
                            <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-airtel-red'}`}>
                              ₹{plan.price}
                            </span>
                            <Edit2 className="w-4 h-4 inline-block ml-2 opacity-0 group-hover/price:opacity-100 transition-opacity" />
                          </button>
                        )}
                        <span className={`text-lg ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
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
                              {plan.calls || 'Unlimited'}
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
                              {plan.sms || '100/day'}
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              Local, STD, National Roaming
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Benefits Icons */}
                      <div className="flex gap-3 mt-6">
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
                    </div>
                  </div>
                );
              })}
            </div>

            {plans.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No plans found. Add some plans to get started.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Joined
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.phone || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitPlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Validity (days)</label>
                <input
                  type="number"
                  value={formData.validity}
                  onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input
                  type="text"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1.5GB/day"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Optional description"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md"
                >
                  {editingPlan ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
