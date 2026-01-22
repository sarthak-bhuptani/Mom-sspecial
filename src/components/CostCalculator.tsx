import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, Utensils, IndianRupee, Plus } from "lucide-react";
import { motion } from "framer-motion";

const CostCalculator = () => {
    const [days, setDays] = useState([26]);
    const [isFullMeal, setIsFullMeal] = useState(false); // false = Basic, true = Full
    const [addons, setAddons] = useState({
        extraRoti: false,
        extraSabji: false,
    });

    // Prices
    const BASIC_PRICE = 50;
    const FULL_PRICE = 70;

    // Add-on Prices
    const EXTRA_ROTI_PRICE = 5;
    const EXTRA_SABJI_PRICE = 30;

    const basePrice = isFullMeal ? FULL_PRICE : BASIC_PRICE;

    // Calculate total per meal cost
    const pricePerMeal = basePrice +
        (addons.extraRoti ? EXTRA_ROTI_PRICE : 0) +
        (addons.extraSabji ? EXTRA_SABJI_PRICE : 0);

    const totalCost = days[0] * pricePerMeal;

    const toggleAddon = (key: keyof typeof addons) => {
        setAddons(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section className="py-16 bg-background border-b border-border transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-primary font-medium tracking-wide uppercase">Plan Your Budget</span>
                        <h2 className="text-3xl font-bold text-foreground mt-2">
                            Subscription Calculator
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            See exactly how much you'll spend based on your needs.
                        </p>
                    </div>

                    <div className="bg-muted/30 rounded-3xl p-6 md:p-12 shadow-sm border border-border">
                        <div className="grid md:grid-cols-2 gap-12 items-start">

                            {/* Controls */}
                            <div className="space-y-8">
                                {/* Meal Type Switch */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="meal-type" className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                            <Utensils className="w-5 h-5 text-primary" />
                                            Meal Type
                                        </Label>
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {isFullMeal ? `Full Thali (₹${FULL_PRICE})` : `Basic Tiffin (₹${BASIC_PRICE})`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-input shadow-sm">
                                        <span className={`text-sm font-medium transition-colors ${!isFullMeal ? "text-primary" : "text-muted-foreground"}`}>Basic</span>
                                        <Switch
                                            id="meal-type"
                                            checked={isFullMeal}
                                            onCheckedChange={setIsFullMeal}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <span className={`text-sm font-medium transition-colors ${isFullMeal ? "text-primary" : "text-muted-foreground"}`}>Full Thali</span>
                                    </div>
                                </div>

                                {/* Add-ons Section */}
                                <div className="space-y-4">
                                    <Label className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                        <Plus className="w-5 h-5 text-primary" />
                                        Add-ons & Extras
                                    </Label>
                                    <div className="bg-card p-4 rounded-xl border border-input shadow-sm space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="extra-roti"
                                                    checked={addons.extraRoti}
                                                    onCheckedChange={() => toggleAddon('extraRoti')}
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor="extra-roti"
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Extra Roti
                                                    </label>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-muted-foreground">+₹{EXTRA_ROTI_PRICE}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="extra-sabji"
                                                    checked={addons.extraSabji}
                                                    onCheckedChange={() => toggleAddon('extraSabji')}
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor="extra-sabji"
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Extra Sabji
                                                    </label>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-muted-foreground">+₹{EXTRA_SABJI_PRICE}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Days Slider */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                            <CalendarDays className="w-5 h-5 text-primary" />
                                            Number of Days
                                        </Label>
                                        <span className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">
                                            {days[0]} Days
                                        </span>
                                    </div>
                                    <Slider
                                        value={days}
                                        onValueChange={setDays}
                                        max={30}
                                        step={1}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground font-medium px-1">
                                        <span>1 Day</span>
                                        <span>15 Days</span>
                                        <span>30 Days</span>
                                    </div>
                                </div>
                            </div>

                            {/* Result Card */}
                            <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl text-center relative overflow-hidden self-stretch flex flex-col justify-center">
                                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <h3 className="text-lg font-medium opacity-90 mb-6 relative z-10">Estimated Monthly Cost</h3>

                                <div className="relative z-10 flex items-center justify-center gap-1 mb-2">
                                    <IndianRupee className="w-8 h-8 md:w-10 md:h-10 opacity-80" />
                                    <motion.span
                                        key={totalCost}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-5xl md:text-6xl font-bold tracking-tight"
                                    >
                                        {totalCost.toLocaleString()}
                                    </motion.span>
                                </div>

                                <p className="text-primary-foreground/80 text-sm mb-8 relative z-10">
                                    for {days[0]} days of {isFullMeal ? "Full Thali" : "Basic Tiffin"}
                                    {(addons.extraRoti || addons.extraSabji) && " + Add-ons"}
                                </p>

                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left relative z-10 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="opacity-80">Base Plan:</span>
                                        <span className="font-bold">₹{basePrice}</span>
                                    </div>
                                    {(addons.extraRoti || addons.extraSabji) && (
                                        <div className="flex justify-between text-sm">
                                            <span className="opacity-80">Extras:</span>
                                            <span className="font-bold">
                                                ₹{pricePerMeal - basePrice}
                                            </span>
                                        </div>
                                    )}
                                    <div className="my-2 border-t border-white/20"></div>
                                    <div className="flex justify-between text-base">
                                        <span className="opacity-90 font-medium">Total per Meal:</span>
                                        <span className="font-bold">₹{pricePerMeal}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CostCalculator;
