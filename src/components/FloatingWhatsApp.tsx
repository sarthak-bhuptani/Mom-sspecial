import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface FloatingWhatsAppProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FloatingWhatsApp = ({ isOpen, setIsOpen }: FloatingWhatsAppProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2.5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false); // Hide tooltip once clicked
  };

  const quickLinks = [
    {
      label: "🥗 Today's Special Menu",
      text: "Hi! Please share today's tiffin menu with me.",
    },
    {
      label: "🍱 Book Trial Meal (₹60)",
      text: "Hello! I would like to book a Trial Tiffin for ₹60.",
    },
    {
      label: "📅 Weekly Tiffin Plan",
      text: "Hi! I want to know more about your Weekly Tiffin Plan.",
    },
    {
      label: "💬 Custom Inquiry",
      text: "Hello, I have a custom inquiry about your tiffin service.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Simulated Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-80 sm:w-85 bg-card rounded-2xl shadow-2xl border border-border/80 overflow-hidden mb-4 select-none"
            style={{ originX: 1, originY: 1 }}
          >
            {/* Header */}
            <div className="bg-[#075E54] dark:bg-[#128C7E] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-xl">🍱</span>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#075E54] dark:border-[#128C7E] animate-pulse"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Mom's Special</h4>
                  <span className="text-[10px] text-white/80 font-medium flex items-center gap-1">
                    Active Now
                  </span>
                </div>
              </div>
              <button 
                onClick={handleToggle} 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="bg-[#efeae2] dark:bg-zinc-950 p-4 space-y-4 max-h-72 overflow-y-auto relative">
              {/* Decorative wallpaper tint (optional overlay) */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

              {/* Message Bubble (Mom) */}
              <div className="flex items-start gap-2 max-w-[85%] relative z-10">
                <div className="bg-white dark:bg-zinc-900 text-foreground text-xs p-3 rounded-2xl rounded-tl-sm shadow-sm border border-border/30">
                  <p className="leading-relaxed font-medium">
                    Namaste! 🙏 Welcome to Mom's Special Gandhinagar.
                  </p>
                  <p className="leading-relaxed mt-1.5 font-medium">
                    How can we serve you hot and healthy meals today? Please select an option below:
                  </p>
                  <span className="text-[8px] text-muted-foreground block text-right mt-1 font-bold uppercase tracking-wider">
                    Mom's Kitchen • Just Now
                  </span>
                </div>
              </div>

              {/* Action Buttons list */}
              <div className="space-y-2 relative z-10">
                {quickLinks.map((link, index) => {
                  const targetUrl = `https://wa.me/917436059291?text=${encodeURIComponent(link.text)}`;
                  return (
                    <motion.a
                      key={index}
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="block p-2.5 bg-white dark:bg-zinc-900 border border-border/60 hover:border-green-500 hover:bg-green-500/5 rounded-xl text-xs font-semibold text-foreground hover:text-green-700 dark:hover:text-green-400 transition-all shadow-sm flex items-center justify-between group cursor-pointer"
                    >
                      <span>{link.label}</span>
                      <Send className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:text-green-600 transition-opacity" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Input placeholder footer */}
            <div className="bg-card p-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
              <span>Choose an option to chat on WhatsApp</span>
              <span className="text-lg">💬</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Tooltip Bubble */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="absolute bottom-20 right-0 mr-1 bg-primary text-primary-foreground text-xs font-bold py-2 px-4 rounded-xl shadow-lg border border-primary/20 flex items-center gap-2 max-w-[250px] whitespace-nowrap cursor-pointer z-40 select-none animate-bounce-soft"
            onClick={handleToggle}
          >
            <span>Need today's menu? Chat here! 👋</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-0.5 rounded-full hover:bg-white/20 transition-colors ml-1"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center ${!isOpen ? "animate-bounce-soft" : ""}`}
        aria-label={isOpen ? "Close Chat Menu" : "Chat on WhatsApp"}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7 fill-white" />
        )}
      </motion.button>

    </div>
  );
};

export default FloatingWhatsApp;
