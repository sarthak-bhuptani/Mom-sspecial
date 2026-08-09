import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MapPin, Phone, UtensilsCrossed, CalendarClock, Info, FileText, Check, CheckCheck, X, MessageSquare } from "lucide-react";

const OrderNow = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    tiffinType: "Full Tiffin (₹80)",
    mealTime: "Lunch",
    quantity: "1",
    instructions: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(0); // 0: closed, 1: user msg sent, 2: typing, 3: bot message sent
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [structuredMessage, setStructuredMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Set WhatsApp chat time format (HH:MM)
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, address, tiffinType, mealTime, quantity, instructions } = formData;
    
    // Create the structured message
    const message = `*New Tiffin Order* 🍱\n------------------------\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Tiffin Type:* ${tiffinType}\n*Meal Time:* ${mealTime}\n*Quantity:* ${quantity}\n*Special Instructions:* ${instructions || "None"}\n\nHi, I would like to place this order.`;
    
    setStructuredMessage(message);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/917436059291?text=${encodedMessage}`;
    setWhatsappUrl(url);
    
    // Show Modal and begin sequencing
    setShowModal(true);
    setModalStep(1); // User message sent instantly
    
    // Step 2: Show "typing..." after 900ms
    setTimeout(() => {
      setModalStep(2);
      
      // Step 3: Bot message sent after another 1600ms
      setTimeout(() => {
        setModalStep(3);
      }, 1600);
    }, 900);
  };

  return (
    <>
      <Helmet>
        <title>Order Now - Mom's Special | Tiffin Service</title>
        <meta name="description" content="Place your tiffin order online and get fresh home-style meals delivered to your doorstep in Gandhinagar." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 pb-6 sm:pb-10 bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 tracking-wide uppercase">
              Quick Order
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Place Your <span className="text-primary">Order</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4 text-balance">
              Fill out the form below and we'll process your order instantly via WhatsApp!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-6 sm:py-10 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto bg-card rounded-3xl shadow-lg border border-border p-4 sm:p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <User className="w-5 h-5 text-primary" /> Personal Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="w-4 h-4" />
                      </div>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">WhatsApp Number *</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="10-digit number"
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Delivery Address *</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <textarea 
                      name="address" 
                      required 
                      value={formData.address} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="Enter complete delivery address in Gandhinagar"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-2">
                  <UtensilsCrossed className="w-5 h-5 text-primary" /> Menu Selection
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Tiffin Type *</label>
                    <div className="relative">
                      <select 
                        name="tiffinType" 
                        value={formData.tiffinType} 
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                      >
                        <option value="Basic Tiffin (₹60)">Basic Tiffin (₹60) - 6 Roti, Sabji, Salad</option>
                        <option value="Full Tiffin (₹80)">Full Tiffin (₹80) - 6 Roti, Sabji, Dal, Rice, Salad</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Meal Time *</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <CalendarClock className="w-4 h-4" />
                      </div>
                      <select 
                        name="mealTime" 
                        value={formData.mealTime} 
                        onChange={handleChange}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                      >
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Lunch & Dinner">Both (Lunch & Dinner)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Quantity (Tiffins) *</label>
                    <input 
                      type="number" 
                      name="quantity" 
                      min="1"
                      required 
                      value={formData.quantity} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Special Instructions (Optional)</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-muted-foreground">
                      <FileText className="w-4 h-4" />
                    </div>
                    <textarea 
                      name="instructions" 
                      value={formData.instructions} 
                      onChange={handleChange}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      placeholder="E.g., Jain Food, Less Spicy, No Onion/Garlic"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex gap-3 text-sm text-muted-foreground items-start">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p>By clicking "Send via WhatsApp", your order details will be formatted and you will be redirected to WhatsApp to send the message to us directly. We will confirm your order shortly.</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-colors mt-6 text-base"
              >
                <Send className="w-5 h-5" />
                Send Order via WhatsApp
              </motion.button>
              
            </form>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Chat Simulation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="bg-[#efeae2] dark:bg-[#0b141a] rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border-t sm:border border-border flex flex-col h-[85vh] sm:h-[580px] relative font-sans text-foreground"
            >
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] dark:bg-[#202c33] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-white text-lg border border-white/20 shadow-inner relative overflow-hidden bg-gradient-to-tr from-primary to-orange-400">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight text-white">Mom's Special Tiffin</h4>
                    <p className="text-[11px] text-green-300 dark:text-emerald-400 font-medium min-h-[16px] flex items-center gap-1">
                      {modalStep === 2 ? (
                        <span className="italic animate-pulse">typing...</span>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          Online
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col bg-[#efeae2] dark:bg-[#0b141a] bg-opacity-40 bg-[radial-gradient(#dfdfdf_1px,transparent_1px)] dark:bg-[radial-gradient(#202c33_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* System Notification */}
                <div className="self-center bg-[#ffeec7]/90 dark:bg-[#182229]/90 text-[#514327] dark:text-[#ffd279] text-[11px] px-3 py-1.5 rounded-xl shadow-sm text-center max-w-[85%] border border-[#ffeec7] dark:border-[#182229]">
                  🔒 Messages are end-to-end encrypted. No third party can read them.
                </div>

                {/* User Sent Order Message */}
                {modalStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    className="bg-[#d9fdd3] dark:bg-[#005c4b] text-foreground dark:text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] self-end shadow-md text-sm relative"
                  >
                    <p className="whitespace-pre-line leading-relaxed font-sans">{structuredMessage}</p>
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-muted-foreground dark:text-gray-300/80">
                      <span>{currentTime}</span>
                      {modalStep >= 2 ? (
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Bot Typing Indicator */}
                {modalStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    className="bg-white dark:bg-[#202c33] text-foreground p-3 rounded-2xl rounded-tl-none max-w-[85%] self-start shadow-md flex items-center gap-1.5 py-4 px-5"
                  >
                    <span className="w-2.5 h-2.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </motion.div>
                )}

                {/* Bot Response Message */}
                {modalStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    className="bg-white dark:bg-[#202c33] text-foreground dark:text-white p-3.5 rounded-2xl rounded-tl-none max-w-[85%] self-start shadow-md text-sm relative"
                  >
                    <p className="leading-relaxed font-sans">
                      Namaste <b>{formData.name}</b>! 🙏<br/><br/>
                      Thank you for contacting <b>Mom's Special Tiffin Service Gandhinagar</b>. 😊<br/><br/>
                      We have received your order request for <b>{formData.tiffinType}</b> ({formData.mealTime}).<br/><br/>
                      🟢 To complete your booking, please click the <b>"Send on WhatsApp"</b> button below. This will send the details to us directly, and we will confirm your delivery! 🚚💨
                    </p>
                    <div className="flex items-center justify-end mt-1 text-[10px] text-muted-foreground dark:text-gray-400">
                      <span>{currentTime}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input / Action Bar */}
              <div className="bg-[#f0f2f5] dark:bg-[#111b21] p-4 pb-6 sm:pb-4 border-t border-border/40 shrink-0 flex flex-col gap-3">
                {modalStep < 3 ? (
                  <div className="text-center text-xs text-muted-foreground italic py-2 flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Connecting to Mom's Special automated assistant...
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        window.open(whatsappUrl, "_blank");
                        setShowModal(false);
                      }}
                      className="w-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-sm md:text-base cursor-pointer animate-pulse-soft"
                    >
                      <MessageSquare className="w-5 h-5 fill-white" />
                      Send on WhatsApp & Complete
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Edit details / Go back
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderNow;
