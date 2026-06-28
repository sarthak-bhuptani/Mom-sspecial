import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, XCircle, Home, Utensils, ClipboardCheck, IndianRupee, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Order", path: "/order" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const bottomLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Menu", path: "/menu", icon: Utensils },
  { name: "Order", path: "/order", icon: ClipboardCheck },
  { name: "Pricing", path: "/pricing", icon: IndianRupee },
  { name: "Contact", path: "/contact", icon: MessageSquare },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const isHomeTransparent = location.pathname === "/" && !isScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const html = window.document.documentElement;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
        <AnimatePresence>
          {showBanner && !isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary text-primary-foreground text-center text-sm font-medium py-2 px-8 flex justify-center items-center relative z-10"
            >
              <a
                href="https://wa.me/917436059291?text=Hi!%20Please%20share%20today's%20tiffin%20menu%20with%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center justify-center gap-1.5"
              >
                <span>📢 Today's Menu is updated on WhatsApp daily! Click to view today's special dishes. 🟢</span>
              </a>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          className={`transition-all duration-300 ${isScrolled
            ? "bg-[#fdfcfb]/90 dark:bg-[#1f1c1a]/90 backdrop-blur-md shadow-sm border-b border-border/40"
            : isOpen
              ? "bg-[#fdfcfb] dark:bg-[#1f1c1a] shadow-md"
              : "bg-transparent"
            }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl">🍱</span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  Mom's Special
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm font-medium transition-colors hover:text-primary relative py-1 ${isActive
                        ? "text-primary"
                        : isHomeTransparent
                          ? "text-white/80 hover:text-white"
                          : "text-foreground/80"
                        }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-3">
                <ModeToggle />
                <Button variant="outline" size="sm" asChild>
                  <a href="tel:+917436059291">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center gap-3">
                <a
                  href="tel:+917436059291"
                  className="p-2 text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                  aria-label="Call Now"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <ModeToggle />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Tab Bar (Instagram Style) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fdfcfb]/95 dark:bg-[#1f1c1a]/95 backdrop-blur-md border-t border-border/60 z-[140] md:hidden flex items-center justify-around py-2 px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-4 sm:pb-2">
        {bottomLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center gap-1 py-1 flex-1 transition-all duration-300 relative ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110 stroke-[2.2px]" : "stroke-[1.8px]"}`} />
              <span className="text-[10px] font-semibold tracking-wide">{link.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeBottomTab"
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
