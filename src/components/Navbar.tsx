import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { lunchMenu, dinnerMenu } from "@/data/menuData";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Menu", path: "/menu" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/admin" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  const todaysLunch = lunchMenu.find((m) => m.day === today);
  const todaysDinner = dinnerMenu.find((m) => m.day === today);

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

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-primary-foreground text-center text-sm font-medium py-2 px-4 relative z-[60]"
          >
            <span>
              🎉 Today's Special: <strong>{todaysLunch?.sabji}</strong> (Lunch) & <strong>{todaysDinner?.sabji}</strong> (Dinner)
            </span>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !showBanner
          ? "top-0"
          : showBanner ? "top-[36px]" : "top-0"
          } ${isScrolled || isOpen
            ? "bg-background shadow-md"
            : "bg-transparent"
          }`}
        style={{
          marginTop: showBanner && !isScrolled ? 0 : 0
        }}
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
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
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

            {/* Mobile Actions & Menu Toggle */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="tel:+917436059291"
                className="p-2 text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                aria-label="Call Now"
              >
                <Phone className="w-5 h-5" />
              </a>
              <ModeToggle />
              <button
                className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu - Side Drawer */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background border-l border-border shadow-2xl z-[70] md:hidden flex flex-col"
                >
                  <div className="flex items-center justify-between p-5 border-b border-border/50">
                    <span className="text-lg font-bold text-foreground">Menu</span>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                          ? "bg-primary/10 text-primary translate-x-2"
                          : "text-foreground/80 hover:bg-accent hover:text-foreground hover:translate-x-1"
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="p-5 border-t border-border/50 bg-muted/20 space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>Hungry? Order now!</span>
                    </div>
                    <Button variant="whatsapp" className="w-full justify-center shadow-sm" asChild>
                      <a
                        href="https://wa.me/917436059291?text=Hello,%20I%20am%20interested%20in%20your%20tiffin%20service."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="mr-2">💬</span> WhatsApp Order
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
