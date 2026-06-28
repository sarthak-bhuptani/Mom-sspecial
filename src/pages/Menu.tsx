import { Helmet } from "react-helmet-async";
import { MessageCircle, Bell, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Menu = () => {
  const whatsappUrl = "https://wa.me/917436059291?text=Hi!%20Please%20add%20me%20to%20your%20WhatsApp%20group%20for%20daily%20menu%20updates.";

  return (
    <>
      <Helmet>
        <title>Daily Menu Updates - Mom's Special | Tiffin Service Gandhinagar</title>
        <meta
          name="description"
          content="Get today's fresh home-style tiffin menu updates directly on WhatsApp. We cook fresh seasonal dishes daily."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 sm:pt-40 md:pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse-soft" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-xs mb-4 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              Live Updates
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Today's Tiffin Menu
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We cook fresh, seasonal dishes daily. To check what's cooking today, join our WhatsApp group or view our status updates!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mock Chat & CTA Section */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto space-y-8">
            
            {/* Simulated Chat Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden flex flex-col h-[400px] relative"
            >
              {/* Chat Header */}
              <div className="bg-[#075E54] text-white px-5 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                    🍱
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm leading-tight">Mom's Special Menu Channel</h3>
                    <span className="text-[10px] text-white/80 font-semibold flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Active status updates
                    </span>
                  </div>
                </div>
                <Bell className="w-5 h-5 opacity-90" />
              </div>

              {/* Chat Body (Simulated Messages) */}
              <div className="flex-1 bg-[#ECE5DD] dark:bg-neutral-900 p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto flex flex-col">
                
                {/* System Message */}
                <div className="bg-white/70 dark:bg-neutral-800 text-[10px] text-muted-foreground py-1 px-3 rounded-md mx-auto shadow-sm uppercase tracking-wider font-bold">
                  Today's Broadcast
                </div>

                {/* Received Message 1 */}
                <div className="bg-white dark:bg-neutral-800 text-foreground rounded-2xl rounded-tl-none p-3 sm:p-3.5 max-w-[85%] self-start shadow-sm border border-border/10 text-xs sm:text-sm leading-relaxed">
                  👋 Good morning! Today's fresh home-style tiffin menu is ready. Cooked with minimal oil and motherly care!
                </div>

                {/* Received Message 2 */}
                <div className="bg-white dark:bg-neutral-800 text-foreground rounded-2xl rounded-tl-none p-3 sm:p-3.5 max-w-[85%] self-start shadow-sm border border-border/10 text-xs sm:text-sm leading-relaxed relative">
                  <span className="font-extrabold text-primary block mb-1">🍱 TODAY'S SPECIAL</span>
                  • <strong className="text-foreground">Sabji:</strong> Bhindi Masala / Aloo Gobi<br />
                  • <strong className="text-foreground">Roti:</strong> 6 Soft Phulka Rotis<br />
                  • <strong className="text-foreground">Dal & Rice:</strong> Included in Full Tiffin<br />
                  • <strong className="text-foreground">Salad:</strong> Fresh salad included
                  <span className="block text-[9px] text-muted-foreground text-right mt-2 font-semibold">9:15 AM • Prepared Fresh</span>
                </div>
              </div>
            </motion.div>

            {/* Main Action Button */}
            <div className="text-center space-y-4">
              <Button 
                variant="whatsapp"
                size="lg"
                className="w-full py-5 sm:py-7 px-4 sm:px-8 rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-bold flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base whitespace-normal text-center h-auto"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0" />
                  <span>View Today's Menu on WhatsApp</span>
                </a>
              </Button>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                ⚡ Tap to join our broadcast list for daily menu alerts
              </p>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              <div className="bg-card p-5 rounded-2xl border border-border flex items-start gap-4 shadow-sm">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-foreground mb-1">Why WhatsApp updates?</h4>
                  <p className="text-xs text-muted-foreground leading-normal">
                    We buy fresh vegetables every morning and cook whatever is best and fresh in the local market. WhatsApp status is the fastest way to show you what is cooking live!
                  </p>
                </div>
              </div>

              <div className="bg-card p-5 rounded-2xl border border-border flex items-start gap-4 shadow-sm">
                <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary flex-shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-foreground mb-1">How do I order?</h4>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Click the button above to view today's menu. Send us a quick text to confirm if you want basic or full tiffin, and share your delivery sector.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
