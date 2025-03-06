import React from 'react';
import { TicketIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center text-green-400">
              <TicketIcon className="h-6 w-6 mr-2 text-orange-500" />
              Ticketing System
            </h3>
            <p className="text-gray-400">
               support solutions since 2025.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Product</h4>
            <ul className="space-y-3">
              {['Features','Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">support@ticketsys.com</li>
              <li className="text-gray-400"> +2519 123-4567</li>
              <li className="flex space-x-4 mt-4">
                {['🐦', '💼', '📘'].map((icon, index) => (
                  <a
                    key={index}
                    href="#" 
                    className="text-gray-400 hover:text-orange-400 transition duration-300 text-xl"
                  >
                    {icon}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ticketing System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;