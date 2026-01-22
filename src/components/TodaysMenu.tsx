import { useState, useEffect } from "react";
import { Utensils, Moon, Sun, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Menu Data
const LUNCH_MENU = {
    Monday: { roti: "✔️", sabji: "Choli Bateta", dal: "Adad ni Dal", rice: "✔️" },
    Tuesday: { roti: "✔️", sabji: "Guvar Bateta", dal: "Dal", rice: "✔️" },
    Wednesday: { roti: "✔️", sabji: "Choli Pulses", dal: "Dal", rice: "✔️" },
    Thursday: { roti: "✔️", sabji: "Ringana Bateta", dal: "Dal", rice: "✔️" },
    Friday: { roti: "✔️", sabji: "Vatana Bateta", dal: "Dal", rice: "✔️" },
    Saturday: { roti: "Bajiri no Rotlo", sabji: "Adad ni Dal", dal: "-", rice: "-" },
    Sunday: { roti: "✔️", sabji: "Bhinda", dal: "Dal", rice: "✔️" },
};

const DINNER_MENU = {
    Monday: { roti: "✔️", sabji: "Sev Tameta" },
    Tuesday: { roti: "Thepla", sabji: "Bateta" },
    Wednesday: { roti: "Bhakhri", sabji: "Dahi Tikhari" },
    Thursday: { roti: "✔️", sabji: "Duddhi Bateta" },
    Friday: { roti: "✔️", sabji: "Bhinda" },
    Saturday: { roti: "Bajri Rotlo", sabji: "Bengan ka Bharta" },
    Sunday: { roti: "✔️", sabji: "Sev Tameta" },
};

import { API_URL } from "@/config";

const TodaysMenu = () => {
    const [currentDay, setCurrentDay] = useState<string>("");
    const [menuData, setMenuData] = useState<any>(null);

    useEffect(() => {
        const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
        setCurrentDay(day);

        // Fetch dynamic menu
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setMenuData(data))
            .catch(err => console.log("Using static data"));
    }, []);

    if (!currentDay) return null;

    const todayLunch = menuData?.lunch?.find((d: any) => d.day === currentDay) || LUNCH_MENU[currentDay as keyof typeof LUNCH_MENU];
    const todayDinner = menuData?.dinner?.find((d: any) => d.day === currentDay) || DINNER_MENU[currentDay as keyof typeof DINNER_MENU];

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
        hidden: { opacity: 0, y: 10 },
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
                            Today's Special
                        </h2>
                        <p className="text-muted-foreground text-xs md:text-sm font-medium mt-1">
                            Fresh & Hot for <span className="text-primary font-bold">{currentDay}</span>
                        </p>
                    </div>
                    <Link
                        to="/menu"
                        className="hidden md:flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-secondary/10 px-4 py-2 rounded-full border border-primary/10 shadow-sm"
                    >
                        View Full Menu <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">

                    {/* Lunch Section */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="p-5 md:p-8 flex flex-col gap-4 hover:bg-orange-50/10 transition-colors duration-300"
                    >
                        <motion.div variants={item} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg shadow-sm">
                                    <Sun className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground leading-none">Lunch</h3>
                                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide font-medium">Full Thali</span>
                                </div>
                            </div>
                            <div className="text-[10px] md:text-xs font-bold bg-background text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full flex items-center gap-1.5 border border-orange-100 dark:border-orange-900/50 shadow-sm">
                                <Clock className="w-3 h-3" />
                                12:00 - 1:30 PM
                            </div>
                        </motion.div>

                        <div className="space-y-2.5 mt-2">
                            <motion.div variants={item} className="p-3 rounded-xl bg-orange-50/50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 flex justify-between items-center group">
                                <span className="text-orange-900/70 dark:text-orange-300/70 text-sm font-medium">Main Sabji</span>
                                <span className="font-bold text-orange-950 dark:text-orange-100 text-base group-hover:scale-105 transition-transform">{todayLunch?.sabji}</span>
                            </motion.div>

                            <motion.div variants={item} className="flex justify-between items-center px-2 py-1 border-b border-dashed border-border/50">
                                <span className="text-muted-foreground text-sm">Dal/Curry</span>
                                <span className="font-medium text-foreground">{todayLunch?.dal}</span>
                            </motion.div>

                            <motion.div variants={item} className="flex justify-between items-center px-2 py-1">
                                <span className="text-muted-foreground text-sm">Breads</span>
                                <span className="font-medium text-foreground">
                                    {todayLunch?.roti === "Bajiri no Rotlo" ? "Bajiri no Rotlo" : "Phulka Roti"}
                                </span>
                            </motion.div>

                            {todayLunch?.rice === "✔️" && (
                                <motion.div variants={item} className="pt-1 text-center md:text-left">
                                    <span className="text-[10px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800 inline-flex items-center gap-1 opacity-80">
                                        Rice Included
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Dinner Section */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="p-5 md:p-8 flex flex-col gap-4 hover:bg-blue-50/10 transition-colors duration-300 relative"
                    >
                        <motion.div variants={item} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm">
                                    <Moon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground leading-none">Dinner</h3>
                                    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide font-medium">Light Meal</span>
                                </div>
                            </div>
                            <div className="text-[10px] md:text-xs font-bold bg-background text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full flex items-center gap-1.5 border border-blue-100 dark:border-blue-900/50 shadow-sm">
                                <Clock className="w-3 h-3" />
                                7:00 - 9:00 PM
                            </div>
                        </motion.div>

                        <div className="space-y-2.5 mt-2">
                            <motion.div variants={item} className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex justify-between items-center group">
                                <span className="text-blue-900/70 dark:text-blue-300/70 text-sm font-medium">Main Sabji</span>
                                <span className="font-bold text-blue-950 dark:text-blue-100 text-base group-hover:scale-105 transition-transform">{todayDinner?.sabji}</span>
                            </motion.div>

                            <motion.div variants={item} className="flex justify-between items-center px-2 py-1 border-b border-dashed border-border/50">
                                <span className="text-muted-foreground text-sm">Breads</span>
                                <span className="font-medium text-foreground">
                                    {todayDinner?.roti === "✔️" ? "Phulka Roti" : todayDinner?.roti}
                                </span>
                            </motion.div>

                            <motion.div variants={item} className="pt-2 text-center md:text-left">
                                <span className="text-[10px] text-muted-foreground italic bg-muted/30 px-2 py-1 rounded-full">
                                    * No Rice/Dal in dinner
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile View Full Menu Link */}
                <Link
                    to="/menu"
                    className="block md:hidden bg-muted/20 p-3 text-center text-primary text-xs font-bold border-t border-border/50 active:bg-muted/50 transition-colors"
                >
                    View Full Week Menu →
                </Link>
            </motion.div>
        </section>
    );
};

export default TodaysMenu;
