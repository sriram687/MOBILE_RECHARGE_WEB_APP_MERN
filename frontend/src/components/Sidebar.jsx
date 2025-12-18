import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, theme, rechargeHistory } = useAppContext();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', href: '#dashboard' },
    { id: 'recharge', icon: '📱', label: 'Mobile Recharge', href: '#recharge' },
    { id: 'dataplan', icon: '📊', label: 'Data Plans', href: '#plans' },
    { id: 'offers', icon: '🎁', label: 'Special Offers', href: '#offers' },
    { id: 'cashback', icon: '💰', label: 'Cashback', href: '#cashback' },
    { id: 'profile', icon: '👤', label: 'My Profile', href: '#profile' },
    { id: 'history', icon: '📜', label: 'History', href: '#history' },
    { id: 'help', icon: '❓', label: 'Help Center', href: '#help' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="bg-gradient-to-r from-airtel-red to-airtel-darkRed p-4 flex justify-between items-center lg:justify-center">
          <h2 className="text-white text-xl font-bold">Quick Menu</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl lg:hidden hover:text-airtel-yellow transition-colors"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        {user.isLoggedIn && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {user.name}
                </p>
                <p className="text-sm text-gray-500">{user.phoneNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-airtel-red to-airtel-darkRed text-white shadow-lg'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recharge History Summary */}
        {user.isLoggedIn && rechargeHistory.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              Recent Recharges
            </h3>
            <div className="space-y-2">
              {rechargeHistory.slice(0, 3).map((recharge) => (
                <div
                  key={recharge.id}
                  className="text-xs bg-gray-50 p-2 rounded"
                >
                  <p className="font-medium text-gray-800">₹{recharge.amount}</p>
                  <p className="text-gray-500">{recharge.plan}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
