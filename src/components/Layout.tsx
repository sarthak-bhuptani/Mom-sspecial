import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import FloatingTrialButton from "./FloatingTrialButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <FloatingTrialButton isChatOpen={isChatOpen} />
    </div>
  );
};

export default Layout;
