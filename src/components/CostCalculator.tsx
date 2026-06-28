import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  ArrowLeft, 
  MessageSquare, 
  RotateCcw, 
  Heart, 
  Leaf, 
  Utensils,
  IndianRupee,
  Flame,
  Check,
  ChevronRight
} from "lucide-react";

const CostCalculator = () => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    
    // States
    const [mealsPerDay, setMealsPerDay] = useState<1 | 2>(1);
    const [mealType, setMealType] = useState<"basic" | "full">("basic");
    const [duration, setDuration] = useState<number>(30);
    const [dietPreferences, setDietPreferences] = useState({
        jain: false,
        noOnionGarlic: false,
        lessSpicy: false,
        lowOil: false,
    });

    // Prices
    const BASIC_PRICE = 60;
    const FULL_PRICE = 80;

    const basePrice = mealType === "full" ? FULL_PRICE : BASIC_PRICE;
    const totalCost = duration * basePrice * mealsPerDay;

    const nextStep = () => {
        setDirection(1);
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    const resetWizard = () => {
        setDirection(-1);
        setStep(1);
        setMealsPerDay(1);
        setMealType("basic");
        setDuration(30);
        setDietPreferences({
            jain: false,
            noOnionGarlic: false,
            lessSpicy: false,
            lowOil: false,
        });
    };

    const togglePreference = (key: keyof typeof dietPreferences) => {
        setDietPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Generate pre-filled WhatsApp order link
    const getWhatsAppUrl = () => {
        const preferencesList = [];
        if (dietPreferences.jain) preferencesList.push("Jain Food");
        if (dietPreferences.noOnionGarlic) preferencesList.push("No Onion & Garlic");
        if (dietPreferences.lessSpicy) preferencesList.push("Less Spicy");
        if (dietPreferences.lowOil) preferencesList.push("Low Oil");

        const message = `Hello! I configured a plan using your Pricing Wizard:\n\n` +
            `• Meals per Day: ${mealsPerDay} Meal${mealsPerDay > 1 ? "s" : ""} (Lunch/Dinner)\n` +
            `• Tiffin Type: ${mealType === "full" ? "Full Thali (₹80/meal)" : "Basic Tiffin (₹60/meal)"}\n` +
            (preferencesList.length > 0 ? `• Preferences: ${preferencesList.join(", ")}\n` : "") +
            `• Duration: ${duration} Day${duration > 1 ? "s" : ""}\n` +
            `• Price per Meal: ₹${basePrice}\n` +
            `• Total Estimated Cost: ₹${totalCost}\n\n` +
            `Please confirm my order subscription!`;

        return `https://wa.me/917436059291?text=${encodeURIComponent(message)}`;
    };

    // Motion animation variants
    const stepVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 120 : -120,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.35, ease: "easeOut" }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 120 : -120,
            opacity: 0,
            transition: { duration: 0.25, ease: "easeIn" }
        }),
    };

    const hasPreferences = dietPreferences.jain || dietPreferences.noOnionGarlic || dietPreferences.lessSpicy || dietPreferences.lowOil;

    return (
        /* Wizard Container */
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border overflow-hidden relative min-h-[460px] flex flex-col justify-between">
            
            {/* Progress Bar */}
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-8 flex">
                <motion.div 
                    className="bg-primary h-full rounded-full"
                    initial={{ width: "25%" }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Steps Area with AnimatePresence */}
            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1 leading-snug">
                                    How many meals do you need daily?
                                </h3>
                                <p className="text-xs text-muted-foreground">Select how many times we deliver per day</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => { setMealsPerDay(1); nextStep(); }}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${mealsPerDay === 1 ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/40"}`}
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Sun className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-foreground">1 Meal / Day</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Either Lunch or Dinner delivered hot</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => { setMealsPerDay(2); nextStep(); }}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${mealsPerDay === 2 ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/40"}`}
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Utensils className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-foreground">2 Meals / Day</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Both Lunch and Dinner delivered daily</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1 leading-snug">
                                    Select your meal size
                                </h3>
                                <p className="text-xs text-muted-foreground">Select your tiffin type</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => { setMealType("basic"); nextStep(); }}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${mealType === "basic" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/40"}`}
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Leaf className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-foreground">Basic Tiffin (₹60)</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Standard meal: 5 Roti + Sabji (No waste size)</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => { setMealType("full"); nextStep(); }}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${mealType === "full" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/40"}`}
                                >
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                        <Heart className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm sm:text-base text-foreground">Full Thali (₹80)</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Heavy meal: 6 Roti + Sabji + Dal + Rice</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            custom={direction}
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1 leading-snug">
                                    Any dietary preferences?
                                </h3>
                                <p className="text-xs text-muted-foreground">Select custom preparation options (Optional)</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => togglePreference('jain')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${dietPreferences.jain ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-accent/40 text-foreground"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
                                            <Leaf className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs sm:text-sm">Jain Food</h4>
                                            <p className="text-[9px] text-muted-foreground mt-0.5">No root vegetables</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${dietPreferences.jain ? "border-primary bg-primary text-primary-foreground" : "border-muted"}`}>
                                        {dietPreferences.jain && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                </button>

                                <button
                                    onClick={() => togglePreference('noOnionGarlic')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${dietPreferences.noOnionGarlic ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-accent/40 text-foreground"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-xl text-primary">
                                            <Sun className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs sm:text-sm">No Onion & Garlic</h4>
                                            <p className="text-[9px] text-muted-foreground mt-0.5">Satvik style preparation</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${dietPreferences.noOnionGarlic ? "border-primary bg-primary text-primary-foreground" : "border-muted"}`}>
                                        {dietPreferences.noOnionGarlic && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                </button>

                                <button
                                    onClick={() => togglePreference('lessSpicy')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${dietPreferences.lessSpicy ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-accent/40 text-foreground"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-500/10 rounded-xl text-orange-500">
                                            <Flame className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs sm:text-sm">Less Spicy</h4>
                                            <p className="text-[9px] text-muted-foreground mt-0.5">Mild spices for digestion</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${dietPreferences.lessSpicy ? "border-primary bg-primary text-primary-foreground" : "border-muted"}`}>
                                        {dietPreferences.lessSpicy && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                </button>

                                <button
                                    onClick={() => togglePreference('lowOil')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer ${dietPreferences.lowOil ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-accent/40 text-foreground"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-500/10 rounded-xl text-red-500">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xs sm:text-sm">Low Oil</h4>
                                            <p className="text-[9px] text-muted-foreground mt-0.5">Prepared with minimal oil</p>
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${dietPreferences.lowOil ? "border-primary bg-primary text-primary-foreground" : "border-muted"}`}>
                                        {dietPreferences.lowOil && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                    </div>
                                </button>
                            </div>

                            <Button 
                                onClick={nextStep}
                                className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl font-bold shadow-md cursor-pointer text-sm"
                            >
                                Continue to Duration <ChevronRight className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            custom={direction}
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-1 leading-snug">
                                    For how many days do you want to order?
                                </h3>
                                <p className="text-xs text-muted-foreground">Select your customized duration</p>
                            </div>
                            
                            {/* Slider Input */}
                            <div className="space-y-4 px-2 py-4">
                                <div className="text-center">
                                    <span className="text-3xl font-extrabold text-primary">{duration}</span>
                                    <span className="text-sm font-semibold text-foreground ml-1">Days</span>
                                </div>
                                <input 
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                                />
                                <div className="flex justify-between text-[10px] text-muted-foreground font-bold px-1">
                                    <span>1 Day</span>
                                    <span>15 Days</span>
                                    <span>30 Days</span>
                                </div>
                            </div>

                            {/* Real-time price summary box */}
                            <div className="bg-primary text-primary-foreground rounded-2xl p-5 shadow-lg relative overflow-hidden mt-4">
                                <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <span className="text-[10px] font-semibold uppercase opacity-85 tracking-wide">Estimated Price</span>
                                        <div className="flex items-center gap-0.5 mt-0.5">
                                            <IndianRupee className="w-5 h-5 opacity-80" />
                                            <span className="text-2xl font-extrabold">{totalCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="text-right text-[11px] opacity-90 leading-tight">
                                        <div>{mealsPerDay} Meal{mealsPerDay > 1 ? "s" : ""}/Day</div>
                                        <div>{mealType === "full" ? "Full Thali" : "Basic Tiffin"}</div>
                                        {hasPreferences && <div>Custom Preferences</div>}
                                        <div>{duration} Days Duration</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button 
                                    variant="whatsapp"
                                    className="w-full flex items-center justify-center gap-2 py-6 rounded-2xl font-bold shadow-md cursor-pointer text-sm"
                                    asChild
                                >
                                    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                                        <MessageSquare className="w-5 h-5 fill-white" />
                                        Order via WhatsApp
                                    </a>
                                </Button>
                                <button 
                                    onClick={resetWizard}
                                    className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold cursor-pointer"
                                >
                                    <RotateCcw className="w-4 h-4" /> Reset / Start Over
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Back Button Footer (Only for step 2, 3, 4) */}
            {step > 1 && (
                <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-6">
                    <button
                        onClick={prevStep}
                        className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <span className="text-xs font-semibold text-muted-foreground">Step {step} of 4</span>
                </div>
            )}
        </div>
    );
};

export default CostCalculator;
