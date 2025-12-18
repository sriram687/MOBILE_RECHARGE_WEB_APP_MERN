import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, theme, toggleTheme } = useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Plans', href: '#plans' },
    { name: 'Offers', href: '#offers' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-airtel-red to-airtel-darkRed'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-airtel-red font-bold text-xl">A</span>
            </div>
            <span className="text-white text-xl font-bold tracking-wide">
              Airtel Recharge
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-white hover:text-airtel-yellow transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white hover:text-airtel-yellow transition-colors duration-300 p-2"
              title="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* User Section */}
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-white font-medium">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-white text-airtel-red px-4 py-2 rounded-lg font-semibold hover:bg-airtel-yellow transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-gradient-to-r from-airtel-yellow to-yellow-400 text-airtel-red px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-airtel-darkRed">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-white hover:bg-airtel-red rounded-md transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-white/20 pt-2 mt-2">
              {user.isLoggedIn ? (
                <>
                  <div className="px-3 py-2 text-white">Hi, {user.name}</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-airtel-red rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-white hover:bg-airtel-red rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
