import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Leaf, Info, MessageCircle, Utensils, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { optionalItems as staticOptional } from "@/data/menuData";

import { API_URL } from "@/config";

const Menu = () => {
  const [optionalItems, setOptionalItems] = useState(staticOptional);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (data && !data.error) {
          if (Array.isArray(data.optional)) setOptionalItems(data.optional);
        }
      })
      .catch(err => console.log("Using static menu data"));
  }, []);


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>Weekly Menu - Mom's Special | Home-Style Tiffin Service</title>
        <meta
          name="description"
          content="Explore our delicious weekly menu featuring fresh, home-style vegetarian and Jain-friendly meals. Lunch and dinner options available."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background text-center relative overflow-hidden">
        {/* Background decorative elements */}
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
              Weekly Menu
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              🍱 Weekly <span className="text-primary">Tiffin Menu</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Fresh, delicious home-style meals prepared daily with love and hygiene.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-semibold text-green-700 shadow-sm"
              >
                <Leaf className="w-4 h-4" /> 100% Vegetarian
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full text-sm font-semibold text-orange-700 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> Jain Options Available
              </motion.span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Tables */}
      <section className="py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-6xl mx-auto space-y-16"
          >

            {/* Tiffin Overview & Live WhatsApp Menu */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Tiffin Explanation Card */}
              <motion.div
                variants={item}
                className="bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    What We Provide In Our Tiffins
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Our meals are prepared using fresh ingredients, minimal oil, and no artificial colors or preservatives.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Basic Tiffin */}
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-base text-foreground">Basic Tiffin</span>
                        <span className="text-sm font-bold text-primary">₹60 / meal</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                        <li>**6** Fresh **Phulka Rotis** (Hot & Soft)</li>
                        <li>Delicious **Seasonal Sabji** (Main Curry)</li>
                        <li>Fresh **Salad** on the side</li>
                        <li className="text-red-500/80 dark:text-red-400/80 font-medium list-none -ml-4">❌ No Rice / No Dal</li>
                      </ul>
                    </div>

                    {/* Full Tiffin */}
                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-base text-foreground flex items-center gap-1.5">
                          Full Tiffin <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Popular</span>
                        </span>
                        <span className="text-sm font-bold text-primary">₹80 / meal</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
                        <li>**6** Fresh **Phulka Rotis** (Hot & Soft)</li>
                        <li>Delicious **Seasonal Sabji** (Main Curry)</li>
                        <li>Wholesome **Dal / Curry**</li>
                        <li>Steaming **Rice / Pulses**</li>
                        <li>Fresh **Salad** on the side</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Live Updates Card */}
              <motion.div
                variants={item}
                className="relative bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent border border-green-500/20 rounded-3xl p-6 md:p-8 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-32 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/30">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live WhatsApp Status Menu
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">
                    Today's Menu is on WhatsApp!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Because we prepare fresh seasonal dishes daily, we update our active daily menu on our **WhatsApp Status every morning**.
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Subscribe or send us a message to check what is cooking today and get daily menu updates directly on your chat!
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/917436059291?text=Hi!%20Please%20share%20today's%20tiffin%20menu%20with%20me."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-full shadow-lg flex items-center justify-center gap-3 transition-colors mt-6 text-base w-full"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  Get Today's Menu on WhatsApp
                </motion.a>
              </motion.div>

            </div>

            {/* Optional Items & Important Notes */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Optional Items */}
              <motion.div variants={item} className="relative group h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-transparent p-6 border-b border-border/60">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white dark:bg-card rounded-lg shadow-sm ring-1 ring-border">
                        <span className="text-2xl">🍱</span>
                      </div>
                      <h2 className="text-xl font-bold text-green-700 dark:text-green-400">SABJI VARIETIES</h2>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground px-6 pt-4">
                    We prepare a rotating selection of traditional curries. Here are examples of the daily sabjis we deliver in our tiffins:
                  </p>
                  
                  {/* Mobile Cards (Optional) */}
                  <div className="md:hidden grid gap-3 p-4">
                    {optionalItems.map((optItem, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground font-semibold uppercase">Sabji</span>
                          <span className="text-sm font-medium">{optItem.sabji}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground font-semibold uppercase">Roti</span>
                          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">{optItem.roti}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table (Optional) */}
                  <div className="hidden md:block overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse h-full">
                      <thead>
                        <tr className="bg-muted/30 text-muted-foreground border-b border-border">
                          <th className="p-4 font-bold uppercase text-xs tracking-wider text-center w-24">Roti</th>
                          <th className="p-4 font-bold uppercase text-xs tracking-wider">Special Sabji</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {optionalItems && Array.isArray(optionalItems) ? optionalItems.map((optItem, index) => (
                          <motion.tr
                            key={index}
                            className="transition-colors hover:bg-muted/20"
                          >
                            <td className="p-4 text-center">
                              <span className={`inline-flex items-center justify-center ${optItem.roti.length > 2 ? 'px-2 py-1 rounded-full text-[10px] font-medium w-auto' : 'w-6 h-6 rounded-full text-[10px]'} bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 shadow-sm`}>
                                {optItem.roti}
                              </span>
                            </td>
                            <td className="p-4 font-medium text-foreground">{optItem.sabji}</td>
                          </motion.tr>
                        )) : <tr><td colSpan={2} className="p-4 text-center">No optional items data.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {/* Notes Card */}
              <motion.div
                variants={item}
                className="bg-accent/40 border border-accent rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-center"
              >
                <div className="flex items-start gap-4 z-10 relative">
                  <div className="p-2 bg-background rounded-full border border-border shadow-sm">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Important Notes</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-snug">Roti is included in all daily meals.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-snug">Lunch is a full meal with Dal & Rice.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-snug">Dinner is lighter: only Roti & Sabji.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-snug">Jain food is available upon request.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Menu;
