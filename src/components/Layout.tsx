import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingTrialButton from "./FloatingTrialButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <FloatingTrialButton isChatOpen={isChatOpen} />
    </div>
  );
};

export default Layout;
