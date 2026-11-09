import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-ink text-cream mt-0">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[2fr_1fr_1fr] gap-10 px-6 sm:px-10 py-10">
        {/* Brand / About */}
        <div>
          <p className="font-display text-4xl mb-5 text-cream">YOKAI</p>
          <p className="text-cream/60 max-w-sm">
            Quality fashion, delivered fast. Shop the latest trends with easy exchanges and reliable support.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-sm font-semibold tracking-widest mb-5 text-cream">COMPANY</p>
          <ul className="flex flex-col gap-2 text-cream/60">
            <li><Link to="/" className="hover:text-cream">Home</Link></li>
            <li><Link to="/about" className="hover:text-cream">About Us</Link></li>
            <li><Link to="/delivery" className="hover:text-cream">Delivery</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-cream">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="text-sm font-semibold tracking-widest mb-5 text-cream">SUPPORT</p>
          <ul className="flex flex-col gap-2 text-cream/60">
            <li><Link to="/faqs" className="hover:text-cream">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact Us</Link></li>
            <li><Link to="/help-center" className="hover:text-cream">Help Center</Link></li>
            <li><Link to="/terms" className="hover:text-cream">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <p className="py-4 text-sm text-center text-cream/40">
          © {new Date().getFullYear()} YOKAI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
