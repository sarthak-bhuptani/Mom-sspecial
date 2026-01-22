import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
    const reviews = [
        {
            name: "Rahul Mehta",
            role: "Student",
            content: "Living away from home, I missed my mom's cooking the most. 'Mom's Special' literally filled that void. The Dal Dhokli on Sundays is just...",
            rating: 5,
        },
        {
            name: "Priya Patel",
            role: "Banker",
            content: "Most tiffin services are too oily or spicy. This one is perfect. It's light, healthy, and the Bajri no Rotlo on Saturdays is a must-try!",
            rating: 5,
        },
        {
            name: "Amit Shah",
            role: "Engineer",
            content: "Hygiene was my biggest concern, but after visiting their kitchen once, I was convinced. It's cleaner than most restaurants. Highly recommended.",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-medium tracking-wide uppercase">Testimonials</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-2">
                        Mom's Wall of <span className="text-primary">Love</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Nothing makes us happier than a full stomach and a happy smile. Here's what our extended family has to say.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="bg-background p-8 rounded-2xl shadow-card border border-border relative"
                        >
                            <div className="absolute -top-4 right-8 bg-primary text-primary-foreground p-2 rounded-full">
                                <Quote className="w-4 h-4" />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-foreground/80 mb-6 italic leading-relaxed">
                                "{review.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">{review.name}</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
