import { Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface FloatingTrialButtonProps {
    isChatOpen: boolean;
}

const FloatingTrialButton = ({ isChatOpen }: FloatingTrialButtonProps) => {
    const [isVisible, setIsVisible] = useState(false);

    // Constants
    const WHATSAPP_NUMBER = "917436059291";
    const TRIAL_MESSAGE = encodeURIComponent(
        "Hi, I want to book a Trial Meal for today. (₹60 Tiffin)"
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
            {isVisible && !isChatOpen && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-20 md:bottom-6 left-6 md:left-1/2 md:-translate-x-1/2 z-[120]"
                >
                    {/* Pulsing Glow Ring behind the button */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-primary/45 rounded-full z-0 pointer-events-none"
                    />
                    
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 bg-primary text-primary-foreground 
                         px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 
                         transition-all duration-300 flex items-center gap-2 sm:gap-3 group border-2 border-white/20 whitespace-nowrap"
                    >
                        <div className="bg-white/20 p-1 sm:p-1.5 rounded-full group-hover:rotate-12 transition-transform">
                            <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[9px] sm:text-xs font-medium opacity-90 uppercase tracking-wider">Book Trial Meal</span>
                            <span className="text-sm sm:text-lg font-bold">₹60 Only</span>
                        </div>
                        {/* Pulse Effect */}
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingTrialButton;
