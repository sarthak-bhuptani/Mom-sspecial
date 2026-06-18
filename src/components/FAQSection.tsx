import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Can I pause my tiffin subscription if I travel?",
            answer: "Yes, absolutely! We understand schedules can change. You can pause or skip any day's delivery by simply sending us a message on WhatsApp 24 hours in advance. Skipped meals are automatically credited and carried forward to your next billing cycle so you never lose your money."
        },
        {
            question: "Is Jain food prepared separately?",
            answer: "Yes. We take religious and dietary rules very seriously. Jain meals are prepared in a separate cooking zone using dedicated utensils. We strictly exclude root vegetables (onions, garlic, potatoes, ginger) and follow rigorous sanitization standards."
        },
        {
            question: "What are your delivery areas and timing slots?",
            answer: "We currently deliver to Gandhinagar Sector 6, 7, and 6A. Lunch is delivered between 12:00 PM and 1:30 PM (order deadlines are before 11:00 AM). Dinner is delivered between 7:00 PM and 9:00 PM (order deadlines are before 6:00 PM)."
        },
        {
            question: "How do I make payments for my subscription?",
            answer: "We support flexible, hassle-free payments via all major UPI applications (GPay, PhonePe, Paytm, BHIM). You can pay on a weekly basis for short trials or book a monthly plan. Billing is fully transparent with zero contracts or sign-up fees."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-28 bg-muted/20 border-t border-border/40 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl -z-10 translate-x-1/3" />

            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                        Have Questions?
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm md:text-base">
                        Quick answers to help you understand how our tiffin plans, Jain options, and delivery schedules work.
                    </p>
                </div>

                {/* FAQ Cards Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div 
                                key={index}
                                className={`bg-card rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${isOpen ? 'border-primary bg-card' : 'border-border/60 hover:border-border'}`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                                >
                                    <span className="flex items-start gap-3">
                                        <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <span className="font-bold text-sm md:text-base text-foreground leading-snug">
                                            {faq.question}
                                        </span>
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`p-1 rounded-full bg-muted transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                                    >
                                        <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                        >
                                            <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0 border-t border-border/20 text-xs md:text-sm text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
