import { Link } from "react-router-dom";
import { Phone, MessageCircle, Utensils, Leaf, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.jpg";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";
import TodaysMenu from "@/components/TodaysMenu";

import heroFoodDark from "@/assets/hero-food-dark.png";

const Home = () => {
  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your tiffin service.\nArea:\nMeal type:"
  );
  const whatsappUrl = `https://wa.me/917436059291?text=${whatsappMessage}`;

  const benefits = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Home-Style Cooking",
      description: "Authentic recipes just like mom makes, fresh daily",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Fresh Ingredients",
      description: "Only the freshest vegetables and quality ingredients",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-Time Delivery",
      description: "Hot meals delivered right on schedule, every day",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Love",
      description: "Every meal prepared with care and hygiene",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Contact Us",
      description: "Reach out via WhatsApp or call to discuss your meal preferences",
    },
    {
      number: "02",
      title: "Choose Your Plan",
      description: "Select from our flexible daily, weekly, or monthly plans",
    },
    {
      number: "03",
      title: "Enjoy Your Meals",
      description: "Get delicious home-style food delivered to your doorstep",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Light Mode */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:hidden"
          style={{ backgroundImage: `url(${heroFood})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/90 via-warm-brown/70 to-warm-brown/50" />
        </div>

        {/* Background Image - Dark Mode */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden dark:block"
          style={{ backgroundImage: `url(${heroFoodDark})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-24 md:pb-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
              🍱 Local Tiffin Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Home-Style <span className="text-primary">Healthy Food</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Experience the authentic taste of Ghar ka Khana. Pure, hygienic, and prepared with a mother's love.
            </p>
            <p className="text-base text-white/70 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              📍 Serving Gandhinagar Sector 6, 7 & 6A • 100% Pure Veg
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="whatsapp" size="xl" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="tel:+917436059291">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-soft">
          <div className="w-8 h-12 border-2 border-cream/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cream/50 rounded-full animate-pulse-soft" />
          </div>
        </div>
      </section>

      {/* Today's Special Menu Widget */}
      <TodaysMenu />

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              The Mom's Special Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-background p-8 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center text-secondary mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center p-6"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/4 right-0 translate-x-1/2 w-8 h-0.5 bg-primary/30" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Taste Home-Style Goodness?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our family of satisfied customers who enjoy fresh, delicious
            meals every day. Contact us now to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroOutline" size="xl" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/menu">View Our Menu</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
