import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="backdrop-blur-lg bg-white/40 border-t border-gray-200 transition-all duration-300 shadow-xl pt-4 pb-4 relative">
      {/* Bakery purple accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-xl shadow-md" style={{ zIndex: 2 }} />
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Brand Section */}
          <div className="space-y-3">
            <div>
              <span className="text-lg font-medium text-black tracking-wide">
                HAVRE
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Premium artisan bakery crafting fresh, quality baked goods daily with passion and tradition.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-4">Shop</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/products"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                All Products
              </Link>
              <Link
                to="/products?category=bread"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Bread
              </Link>
              <Link
                to="/products?category=cakes"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Cakes
              </Link>
              <Link
                to="/products?category=pastries"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Pastries
              </Link>
            </nav>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-4">Help</h3>
            <div className="space-y-2">
              <Link
                to="/contact"
                className="block text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="block text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/orders"
                className="block text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Order Status
              </Link>
              <Link
                to="/shipping"
                className="block text-gray-600 text-sm hover:text-primary transition-colors duration-200"
              >
                Shipping Info
              </Link>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-black uppercase tracking-wide mb-4">Company</h3>
            <div className="space-y-2">
              <div className="text-gray-600 text-sm">
                123 Bakery Street<br />
                New York, NY 10001
              </div>
              <div className="text-gray-600 text-sm">
                <a href="tel:+1234567890" className="hover:text-primary transition-colors duration-200">
                  (123) 456-7890
                </a>
              </div>
              <div className="text-gray-600 text-sm">
                <a href="mailto:hello@havre.com" className="hover:text-primary transition-colors duration-200">
                  hello@havre.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 mt-2 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-600">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Use
            </Link>
            <Link
              to="/cookies"
              className="hover:text-primary transition-colors duration-200"
            >
              Cookie Settings
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} HAVRE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
