import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">ChadGlobal Market</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your reliable source for quality general goods. We connect markets and deliver quality products with honesty, efficiency, and professionalism.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-slate-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-300">
                <Mail className="h-5 w-5 mt-0.5 text-secondary shrink-0" />
                <span>info@chadglobalmarket.com</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <Phone className="h-5 w-5 mt-0.5 text-secondary shrink-0" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <MessageCircle className="h-5 w-5 mt-0.5 text-secondary shrink-0" />
                <span>WhatsApp Available</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-300">
                <Clock className="h-5 w-5 mt-0.5 text-secondary shrink-0" />
                <span>Mon – Sat | 8:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} ChadGlobal Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
