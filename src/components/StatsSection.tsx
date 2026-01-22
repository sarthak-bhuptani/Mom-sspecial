import { motion } from "framer-motion";
import { Users, UtensilsCrossed, Star, Heart } from "lucide-react";

const stats = [
    {
        icon: <Users className="w-6 h-6" />,
        value: "50+",
        label: "Happy Families",
    },
    {
        icon: <UtensilsCrossed className="w-6 h-6" />,
        value: "10k+",
        label: "Meals Delivered",
    },
    {
        icon: <Star className="w-6 h-6" />,
        value: "4.9",
        label: "Average Rating",
    },
    {
        icon: <Heart className="w-6 h-6" />,
        value: "100%",
        label: "Homemade Taste",
    },
];

const StatsSection = () => {
    return (
        <section className="py-12 bg-primary/5 border-y border-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center space-y-2"
                        >
                            <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm text-primary mb-1">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
