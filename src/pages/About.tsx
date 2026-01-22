import { Helmet } from "react-helmet-async";
import { Heart, Leaf, Shield, Users, UtensilsCrossed, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Prepared with Love",
      description:
        "Every roti is hand-rolled, and every sabji is seasoned with patience and love, just like Mom makes it.",
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: "Garden Fresh",
      description:
        "We wake up early to source the freshest vegetables and premium ingredients. No frozen shortcuts.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "100% Hygiene",
      description:
        "Our kitchen is a sanctuary of cleanliness. We adhere to strict hygiene standards for your safety.",
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />,
      title: "Authentic Taste",
      description:
        "We use secret family spice blends (masalas) ground at home, ensuring that distinct, authentic flavor.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Mom's Special | Authentic Home-Style Meals</title>
        <meta
          name="description"
          content="Discover the heart behind Mom's Special. We deliver authentic, home-cooked vegetarian meals prepared with motherly love and the freshest ingredients."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-cream to-orange-50 dark:from-background dark:to-muted relative overflow-hidden">
        {/* Decorative Circles */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"
        />

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                Welcome to our Family
              </span>
              <h1 className="text-4xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
                Where Every Meal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                  Feels Like Home
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                "Mom's Special" isn't just a brand; it's a promise. A promise to feed you meals that warm your soul and remind you of home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                A Mother's Touch in <span className="text-primary italic">Every Bite</span>
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p>
                  It all started with a simple realization: in the hustle of modern life, people have forgotten the taste of genuine, slow-cooked homemade food. We saw students missing their mom's cooking and professionals surviving on unhealthy fast food.
                </p>
                <p>
                  <strong className="text-foreground">Mom's Special</strong> was born from a home kitchen, not a commercial factory. We wanted to bridge that gap. We believe that food cooked with love nourishes not just the body, but the spirit.
                </p>
                <p>
                  Our recipes are family heirlooms, passed down through generations. We don't use readymade purees or artificial preservatives. Each curry is cooked slowly to let the flavors marry, each roti is puffed to perfection on the tavva.
                </p>
                <div className="p-6 bg-accent/20 rounded-xl border-l-4 border-primary italic text-foreground font-medium">
                  "We don't serve anything we wouldn't serve to our own children."
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/10 flex items-center justify-center p-10 relative">
                <div className="absolute inset-0 pattern-grid opacity-10"></div>
                <div className="text-center">
                  <span className="text-9xl mb-4 block">👩‍🍳</span>
                  <h3 className="text-3xl font-bold text-foreground">Authentic flavors</h3>
                  <p className="text-muted-foreground mt-2">Crafted by moms, for you.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-primary font-medium tracking-wide">WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-foreground mt-2">
              The "Mom's Special" Standard
            </h2>
            <p className="text-muted-foreground mt-4">
              We stick to traditional methods. No shortcuts, just pure, wholesome goodness in every tiffin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-card p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="mb-6 bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Ready to Taste the Difference?
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <a href="/menu">Order Your First Meal</a>
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default About;
