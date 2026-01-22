import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-warm-brown dark:bg-neutral-900 text-cream dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍱</span>
              <span className="text-2xl font-bold text-primary">
                Mom's Special
              </span>
            </Link>
            <p className="text-cream/80 dark:text-white/80 mb-4 max-w-sm">
              Delicious home-style meals delivered fresh to your doorstep daily.
              Taste the love in every bite.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                  Weekly Menu
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+917436059291" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                    +91 74360 59291
                  </a>
                  <a href="tel:+919712274100" className="text-cream/80 dark:text-white/80 hover:text-primary transition-colors">
                    +91 97122 74100
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-cream/80 dark:text-white/80">
                  Sector-6A, Block No 431/2, <br />Nr. Ambaji Mata Temple, Gandhinagar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-cream/80 dark:text-white/80">
                  Mon - Sat: 8AM - 8PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 dark:border-white/20 mt-10 pt-6 text-center">
          <p className="text-cream/60 dark:text-white/60 text-sm">
            © {new Date().getFullYear()} Mom's Special. Made with by Sarthak for homestyle food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
