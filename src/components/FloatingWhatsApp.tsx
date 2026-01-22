import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your tiffin service.\nArea:\nMeal type:"
  );
  const whatsappUrl = `https://wa.me/917436059291?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-soft"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default FloatingWhatsApp;
