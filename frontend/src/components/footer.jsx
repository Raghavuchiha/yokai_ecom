import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-40">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr_1fr] gap-10 px-6 sm:px-10 py-10">
        {/* Brand / About */}
        <div>
          <p className="text-2xl font-semibold mb-5">YOKAI</p>
          <p className="text-gray-600 max-w-sm">
            Quality fashion, delivered fast. Shop the latest trends with easy exchanges and reliable support.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/delivery" className="hover:text-black">Delivery</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-black">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="text-xl font-medium mb-5">SUPPORT</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li><Link to="/faqs" className="hover:text-black">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact Us</Link></li>
            <li><Link to="/help-center" className="hover:text-black">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-black">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300">
        <p className="py-4 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} YOKAI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
