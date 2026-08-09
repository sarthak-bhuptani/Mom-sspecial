import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
    const reviews: any[] = [];
  // Google reviews (static)
  const googleReviews = [
    {
      name: "Sakshi Panchal",
      role: "Google Review",
      source: "google",
      content: "Sache gar jevu jamvu hoi to chokkas ek var try karjo.. 😊 khub saras anubhav rhayo",
      rating: 5,
    },
    {
      name: "Madhvi 29",
      role: "Google Review",
      source: "google",
      content: "It's really good taste 😊 it's really amazing 😊pure home made food 😋",
      rating: 5,
    },
    {
      name: "Heena Goswami",
      role: "Google Review",
      source: "google",
      content: "As the Name of tiffin says it really has the taste like Moms made home food....\nThe quality and quality both are best......",
      rating: 5,
    },
    {
      name: "Manish Jangid",
      role: "Google Review",
      source: "google",
      content: "Super clean, fresh, and wholesome food. Great portion size and very reliable service. If you miss home-cooked meals in Gandhinagar, this is definitely the right place to get your daily tiffin.",
      rating: 5,
    },
    {
      name: "Dhruv Shingala",
      role: "Google Review",
      source: "google",
      content: "As I was the first customer of this exclusive “Mom’s Tiffin Service”, I would definitely say that I literally found my mom’s food here.",
      rating: 5,
    },
  ];

  const allReviews = [...googleReviews, ...reviews];
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    // Auto-advance reviews every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [activeIndex]);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % allReviews.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
    };

    // Card slide animation variants
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3, ease: "easeIn" }
        })
    };

    const activeReview = allReviews[activeIndex];

    // Generate initials for avatar
    const getInitials = (name: string) => {
        const parts = name.split(" ");
        return parts.map(p => p[0]).join("").toUpperCase();
    };

    return (
        <section className="py-20 bg-primary/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <span className="text-primary font-medium tracking-wide uppercase">Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
                        Mom's Wall of <span className="text-primary">Love</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                        Nothing makes us happier than a full stomach and a happy smile. Here's what our extended family has to say.
                    </p>
                </div>

                {/* Slider Wrapper */}
                <div className="max-w-3xl mx-auto relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center">
                    
                    {/* Left Arrow Button */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 p-3 bg-card hover:bg-muted text-foreground border border-border shadow-md rounded-full transition-all duration-300 z-20 cursor-pointer hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
                        aria-label="Previous review"
                    >
                        <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>

                    {/* Right Arrow Button */}
                    <button
                        onClick={handleNext}
                        className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 p-3 bg-card hover:bg-muted text-foreground border border-border shadow-md rounded-full transition-all duration-300 z-20 cursor-pointer hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
                        aria-label="Next review"
                    >
                        <ChevronRight className="w-5 h-5 text-primary" />
                    </button>

                    {/* Review Card AnimatePresence */}
                    <div className="w-full relative px-2">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="bg-card p-8 sm:p-10 rounded-3xl shadow-card border border-border overflow-hidden relative flex flex-col justify-between min-h-[320px] sm:min-h-[250px]"
                            >
                                {/* Quote Icon Overlay */}
                                <Quote className="absolute top-6 right-6 w-24 h-24 text-primary/5 pointer-events-none transform rotate-180" />

                                <div>
                                    {/* Stars Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(activeReview.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Content Text */}
                                    <p className="text-foreground/90 text-base sm:text-lg italic leading-relaxed mb-8 relative z-10">
                                        {activeReview.content}
                                    </p>
                                </div>

                                {/* Profile info details */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-4">
                                        {/* Colored gradient initials avatar */}
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white font-extrabold shadow-sm">
                                            {getInitials(activeReview.name)}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-foreground text-sm sm:text-base leading-tight">
                                                {activeReview.name}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                                              {activeReview.role}
                                              {activeReview.source === "google" && (
                                                <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                                                  Google
                                                </span>
                                              )}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Location Tag */}
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
                                        {activeReview.location}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Arrows & Indicator Dots */}
                <div className="flex flex-col items-center gap-4 mt-8">
                    {/* Navigation Buttons for small screens */}
                    <div className="flex sm:hidden gap-4">
                        <button
                            onClick={handlePrev}
                            className="p-2.5 bg-card hover:bg-muted border border-border shadow-sm rounded-full transition-all cursor-pointer flex items-center justify-center"
                            aria-label="Previous review mobile"
                        >
                            <ChevronLeft className="w-4 h-4 text-primary" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2.5 bg-card hover:bg-muted border border-border shadow-sm rounded-full transition-all cursor-pointer flex items-center justify-center"
                            aria-label="Next review mobile"
                        >
                            <ChevronRight className="w-4 h-4 text-primary" />
                        </button>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex gap-2">
                        {allReviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                    index === activeIndex ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/60"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Google Review CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto mt-16 p-6 bg-card rounded-3xl border border-border/80 shadow-md text-center flex flex-col items-center gap-4 hover:shadow-lg transition-all duration-300 relative z-10"
                >
                    <div className="flex items-center gap-2">
                        {/* Google Logo SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                        </svg>
                        <span className="font-extrabold text-foreground text-xs uppercase tracking-wider">Google Review</span>
                    </div>

                    <div className="flex flex-col items-center leading-tight">
                        <div className="flex gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-bold">4.9 / 5 Rated by Customers</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                        Loved our healthy home tiffins? Help our local kitchen grow by leaving a quick star rating and review!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-xl font-bold border-primary text-primary hover:bg-primary/5 gap-1.5 cursor-pointer flex-1"
                            asChild
                        >
                            <a href="https://g.page/r/Cbsj8S0lPPJvEBM/review" target="_blank" rel="noopener noreferrer">
                                Rate Us on Google Maps
                            </a>
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            className="rounded-xl font-bold gap-1.5 cursor-pointer flex-1 bg-green-600 hover:bg-green-500 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 border-none"
                            asChild
                        >
                            <a 
                                href={`https://wa.me/917436059291?text=${encodeURIComponent("Hi Mom's Special! 👋 I'd like to share my tiffin review:\n\nReview: \n- Name: ")}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                WhatsApp Review
                            </a>
                        </Button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Testimonials;
