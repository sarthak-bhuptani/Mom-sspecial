import { useState, useEffect } from "react";
import { Utensils, MessageCircle, Clock, ChevronRight, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TodaysMenu = () => {
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
        setCurrentDay(day);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative z-20 container mx-auto px-4 mb-16 -mt-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-background/95 backdrop-blur-md rounded-3xl shadow-2xl border border-border/50 overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 md:p-6 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                            <Utensils className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                            Today's Daily Menu
                        </h2>
                        <p className="text-muted-foreground text-xs md:text-sm font-medium mt-1">
                            Fresh, Home-Style Cooking for <span className="text-primary font-bold">{currentDay || "Today"}</span>
                        </p>
                    </div>
                    <Link
                        to="/menu"
                        className="flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-full border border-primary/10 shadow-sm"
                    >
                        View Menu Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
                    
                    {/* Tiffin Options Overview (7 cols) */}
                    <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-4">
                                Choose Your Tiffin Style
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                We prepare delicious, hygienic home-style Gujarati meals with premium quality ingredients and no preservatives.
                            </p>
                        </div>

                        <motion.div 
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {/* Basic Tiffin Card */}
                            <motion.div 
                                variants={item}
                                className="bg-muted/30 p-5 rounded-2xl border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="font-bold text-base text-foreground">Basic Tiffin</span>
                                        <span className="text-base font-bold text-primary">₹60 <span className="text-xs text-muted-foreground font-normal">/meal</span></span>
                                    </div>
                                    <ul className="text-xs text-muted-foreground space-y-2.5">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Fresh Phulka Rotis</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Seasonal Sabji (Guvar, Bhinda, etc.)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Fresh Salad</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-muted-foreground/60 border-t border-border/40 pt-2">
                                            <X className="w-4 h-4 text-red-500/70 shrink-0" />
                                            <span className="line-through">No Rice / No Dal</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4 pt-3 border-t border-border/30 text-[10px] text-muted-foreground flex items-center gap-1.5 font-medium">
                                    <Clock className="w-3.5 h-3.5 text-primary/70" />
                                    Lunch & Dinner available
                                </div>
                            </motion.div>

                            {/* Full Tiffin Card */}
                            <motion.div 
                                variants={item}
                                className="bg-primary/5 p-5 rounded-2xl border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-base text-foreground flex items-center gap-1">
                                                Full Tiffin
                                                <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Best Value</span>
                                            </span>
                                        </div>
                                        <span className="text-base font-bold text-primary">₹80 <span className="text-xs text-muted-foreground font-normal">/meal</span></span>
                                    </div>
                                    <ul className="text-xs text-muted-foreground space-y-2.5">
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Fresh Phulka Rotis</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Seasonal Sabji (Main Curry)</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Wholesome Dal / Curry</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Steaming Rice / Pulses</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                                            <span>Fresh Salad</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4 pt-3 border-t border-border/30 text-[10px] text-muted-foreground flex items-center gap-1.5 font-medium">
                                    <Clock className="w-3.5 h-3.5 text-primary/70" />
                                    Lunch (Full) / Dinner (Roti-Sabji)
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* WhatsApp Live CTA (5 cols) */}
                    <div className="lg:col-span-5 p-6 md:p-8 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-24 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10"></div>
                        
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-500/30">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Live Menu Updates
                            </span>
                            <h3 className="text-xl font-bold text-foreground">
                                Daily Specials on WhatsApp Status!
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Since we cook fresh seasonal dishes daily, we update our active daily menu on our <strong className="text-foreground">WhatsApp Status every morning</strong>.
                            </p>
                            <p className="text-muted-foreground text-xs leading-relaxed bg-background/50 backdrop-blur-sm p-3 rounded-xl border border-green-500/10">
                                💡 Save our number and check our status or send a message to see today's Lunch and Dinner details!
                            </p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="https://wa.me/917436059291?text=Hi!%20Please%20share%20today's%20tiffin%20menu%20with%20me."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-5 rounded-full shadow-lg flex items-center justify-center gap-2.5 transition-colors text-sm w-full animate-pulse-soft"
                            >
                                <MessageCircle className="w-5 h-5 fill-white" />
                                Check Today's Live Menu
                            </motion.a>

                            {/* Ordering Deadlines */}
                            <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] text-muted-foreground">
                                <div className="flex flex-col p-2 bg-background/40 rounded-lg border border-border/30">
                                    <span className="font-bold text-foreground">Lunch Orders</span>
                                    <span>Before 11:00 AM</span>
                                </div>
                                <div className="flex flex-col p-2 bg-background/40 rounded-lg border border-border/30">
                                    <span className="font-bold text-foreground">Dinner Orders</span>
                                    <span>Before 6:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TodaysMenu;
