import React from 'react';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useAppContext();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-gray-900 to-gray-800'} text-white py-12 mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-airtel-yellow text-xl font-bold border-b-2 border-airtel-red pb-2">
              About Airtel Recharge
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for seamless mobile recharge solutions. Get instant plans, unbeatable offers, and 24/7 customer support.
            </p>
            <div className="flex space-x-3 mt-4">
              <a
                href="#facebook"
                className="w-10 h-10 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="#instagram"
                className="w-10 h-10 bg-gradient-to-r from-airtel-red to-airtel-darkRed rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                title="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-airtel-yellow text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#plans" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Mobile Plans
                </a>
              </li>
              <li>
                <a href="#data" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Data Plans
                </a>
              </li>
              <li>
                <a href="#international" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  International Roaming
                </a>
              </li>
              <li>
                <a href="#broadband" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Broadband
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="text-airtel-yellow text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#billing" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Billing Help
                </a>
              </li>
              <li>
                <a href="#track" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-airtel-yellow text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#refund" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-300 hover:text-airtel-yellow transition-colors duration-300 text-sm">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">
            &copy; {currentYear} Airtel Recharge. All rights reserved. | Designed with ❤️ for better connectivity
          </p>
          <div className="text-gray-500 text-xs">
            <span>Made with React & Vite + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
