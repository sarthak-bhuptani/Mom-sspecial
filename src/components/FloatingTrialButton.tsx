import { Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingTrialButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Constants
    const WHATSAPP_NUMBER = "917436059291";
    const TRIAL_MESSAGE = encodeURIComponent(
        "Hi, I want to book a Trial Meal for today. (₹50 Tiffin)"
    );
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${TRIAL_MESSAGE}`;

    useEffect(() => {
        const handleScroll = () => {
            // Show button after user scrolls down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground 
                     px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                     transition-all duration-300 flex items-center gap-3 group border-2 border-white/20"
                >
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:rotate-12 transition-transform">
                        <Utensils className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-xs font-medium opacity-90 uppercase tracking-wider">Book Trial Meal</span>
                        <span className="text-lg font-bold">₹50 Only</span>
                    </div>
                    {/* Pulse Effect */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default FloatingTrialButton;
