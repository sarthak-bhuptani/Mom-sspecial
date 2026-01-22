import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Leaf, Clock, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { lunchMenu as staticLunch, dinnerMenu as staticDinner, optionalItems as staticOptional } from "@/data/menuData";

import { API_URL } from "@/config";

const Menu = () => {
  const [lunchMenu, setLunchMenu] = useState(staticLunch);
  const [dinnerMenu, setDinnerMenu] = useState(staticDinner);
  const [optionalItems, setOptionalItems] = useState(staticOptional);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (data && !data.error) {
          if (Array.isArray(data.lunch)) setLunchMenu(data.lunch);
          if (Array.isArray(data.dinner)) setDinnerMenu(data.dinner);
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

            {/* Mobile View: Combined Daily Cards */}
            <div className="md:hidden space-y-6">
              {lunchMenu && Array.isArray(lunchMenu) ? lunchMenu.map((lunchItem, index) => {
                const dinnerItem = dinnerMenu.find(d => d.day === lunchItem.day);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                  >
                    {/* Card Header (Day) */}
                    <div className="bg-primary/5 border-b border-border/50 py-2 px-4 flex items-center justify-between">
                      <span className="font-bold text-lg text-primary">{lunchItem.day}</span>
                      <div className="flex gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">Lunch</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary px-2 py-0.5 rounded">Dinner</span>
                      </div>
                    </div>

                    {/* Split Layout */}
                    <div className="flex divide-x divide-border/50">
                      {/* Left Side: Lunch */}
                      <div className="flex-1 p-3 space-y-3 bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sabji</span>
                          <span className="text-sm font-semibold leading-tight">{lunchItem.sabji}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Dal</span>
                          <span className="text-sm font-medium leading-tight">{lunchItem.dal}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {lunchItem.roti !== "✔️" && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-background border border-border rounded text-muted-foreground whitespace-nowrap">
                              {lunchItem.roti}
                            </span>
                          )}
                          {lunchItem.rice !== "✔️" && lunchItem.rice !== "-" && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-background border border-border rounded text-muted-foreground whitespace-nowrap">
                              Rice: {lunchItem.rice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Side: Dinner */}
                      <div className="flex-1 p-3 space-y-3 bg-gradient-to-b from-secondary/5 to-transparent">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sabji</span>
                          <span className="text-sm font-semibold leading-tight">{dinnerItem?.sabji || "-"}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Roti</span>
                          <div className="text-sm font-medium leading-tight">
                            {dinnerItem?.roti === "✔️" ? (
                              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <CheckCircle2 className="w-3 h-3" /> Standard
                              </span>
                            ) : (
                              <span>{dinnerItem?.roti}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }) : <p className="text-center py-4">Menu loading...</p>}
            </div>

            {/* Desktop View: Lunch Menu Table */}
            <motion.div variants={item} className="hidden md:block relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-green-400 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6 md:p-8 border-b border-border/60">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-card rounded-xl shadow-sm ring-1 ring-border">
                        <span className="text-3xl">🥗</span>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">LUNCH MENU</h2>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">Full Thali Format</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-accent/50 px-4 py-1.5 rounded-full border border-border">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>12:00 PM - 1:30 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2 text-xs md:text-sm font-medium text-muted-foreground flex-wrap">
                    <span className="bg-background px-2 py-1 rounded border border-border">Roti included</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">+</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">Sabji</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">+</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">Dal</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">+</span>
                    <span className="bg-background px-2 py-1 rounded border border-border">Rice</span>
                  </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-muted/30 text-muted-foreground border-b border-border">
                        <th className="p-3 md:p-5 font-bold uppercase text-xs tracking-wider">Day</th>
                        <th className="p-3 md:p-5 font-bold uppercase text-xs tracking-wider text-center">Roti (Daily)</th>
                        <th className="p-3 md:p-5 font-bold uppercase text-xs tracking-wider">Sabji</th>
                        <th className="p-3 md:p-5 font-bold uppercase text-xs tracking-wider">Dal</th>
                        <th className="p-3 md:p-5 font-bold uppercase text-xs tracking-wider text-center">Rice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {lunchMenu.map((dayItem, index) => (
                        <motion.tr
                          key={index}
                          whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                          className="transition-colors hover:bg-muted/20"
                        >
                          <td className="p-3 md:p-5 font-semibold text-primary text-sm md:text-base">{dayItem.day}</td>
                          <td className="p-3 md:p-5 text-center px-2 md:px-4">
                            <span className={`inline-flex items-center justify-center ${dayItem.roti.length > 2 ? 'px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium w-auto' : 'w-6 h-6 md:w-8 md:h-8 rounded-full text-[10px] md:text-xs'} bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 shadow-sm`}>
                              {dayItem.roti}
                            </span>
                          </td>
                          <td className="p-3 md:p-5 font-medium text-sm md:text-base">{dayItem.sabji}</td>
                          <td className="p-3 md:p-5 text-balance text-sm md:text-base">{dayItem.dal}</td>
                          <td className="p-3 md:p-5 text-center px-2 md:px-4">
                            <div className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-[10px] md:text-xs shadow-sm">
                              {dayItem.rice}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Dinner Menu & Optional Items Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

              {/* Desktop View: Dinner Menu Table */}
              <motion.div variants={item} className="hidden md:flex relative group flex-col h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-orange-400 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden flex-1 flex flex-col">
                  <div className="bg-gradient-to-r from-secondary/5 via-secondary/10 to-transparent p-6 border-b border-border/60">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white dark:bg-card rounded-xl shadow-sm ring-1 ring-border">
                        <span className="text-3xl">🍽️</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">DINNER MENU</h2>
                        <p className="text-sm text-muted-foreground mt-1">Light & Healthy</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground bg-accent/50 px-3 py-1 rounded-full border border-border">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>7:00 PM - 9:00 PM</span>
                      </div>
                      <div className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded">
                        Only Roti + Sabji
                      </div>
                    </div>
                  </div>

                  {/* Mobile Cards (Dinner) - This section is now redundant as combined cards are used */}
                  {/* <div className="md:hidden grid gap-3 p-4">
                    {dinnerMenu.map((dayItem, index) => (
                      <div key={index} className="bg-card/50 rounded-xl p-4 border border-border shadow-sm flex flex-col gap-3">
                        <div className="flex justify-between items-center pb-2 border-b border-border/40">
                          <span className="font-bold text-lg text-secondary">{dayItem.day}</span>
                          <span className="text-xs font-medium bg-secondary/10 text-secondary px-2 py-0.5 rounded">Roti + Sabji</span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Sabji</span>
                            <span className="text-sm font-medium">{dayItem.sabji}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm bg-orange-50 dark:bg-orange-950/30 px-3 py-2 rounded-lg border border-orange-100 dark:border-orange-900/50">
                              <span className="text-orange-700 dark:text-orange-400 font-medium text-xs uppercase">Roti:</span>
                              <span className="font-bold text-orange-800 dark:text-orange-300">{dayItem.roti}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}

                  {/* Desktop Table (Dinner) */}
                  <div className="hidden md:flex flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse h-full">
                      <thead>
                        <tr className="bg-muted/30 text-muted-foreground border-b border-border">
                          <th className="p-4 font-bold uppercase text-xs tracking-wider">Day</th>
                          <th className="p-4 font-bold uppercase text-xs tracking-wider text-center">Roti</th>
                          <th className="p-4 font-bold uppercase text-xs tracking-wider">Sabji</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {dinnerMenu && Array.isArray(dinnerMenu) ? dinnerMenu.map((dayItem, index) => (
                          <motion.tr
                            key={index}
                            className="transition-colors hover:bg-muted/20"
                          >
                            <td className="p-4 font-semibold text-secondary">{dayItem.day}</td>
                            <td className="p-4 text-center">
                              <span className={`inline-flex items-center justify-center ${dayItem.roti.length > 2 ? 'px-2 py-1 rounded-full text-[10px] font-medium w-auto' : 'w-6 h-6 rounded-full text-[10px]'} bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 shadow-sm`}>
                                {dayItem.roti}
                              </span>
                            </td>
                            <td className="p-4 font-medium">{dayItem.sabji}</td>
                          </motion.tr>
                        )) : <tr><td colSpan={3} className="p-4 text-center">No dinner data available.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {/* Optional Items & Notes */}
              <div className="space-y-8">
                {/* Optional Items */}
                <motion.div variants={item} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
                  <div className="relative bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500/5 via-green-500/10 to-transparent p-6 border-b border-border/60">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white dark:bg-card rounded-lg shadow-sm ring-1 ring-border">
                          <span className="text-2xl">🌟</span>
                        </div>
                        <h2 className="text-xl font-bold text-green-700 dark:text-green-400">OPTIONAL ITEMS</h2>
                      </div>
                    </div>
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
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse">
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
                  className="bg-accent/40 border border-accent rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4 z-10 relative">
                    <div className="p-2 bg-background rounded-full border border-border shadow-sm">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-3">Important Notes</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
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
            </div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Menu;
