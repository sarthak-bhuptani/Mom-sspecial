import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CostCalculator from "@/components/CostCalculator";

const Pricing = () => {
  const [mealsPerDay, setMealsPerDay] = useState<1 | 2>(1);

  const plans = [
    {
      name: "Full Tiffin",
      price: mealsPerDay === 1 ? "₹80" : "₹160",
      period: mealsPerDay === 1 ? "per meal" : "per day (2 meals)",
      description: mealsPerDay === 1 ? "Complete wholesome meal" : "Two complete wholesome meals daily",
      features: [
        "6 Roti included",
        "Sabji included",
        "Dal included",
        "Rice included",
        mealsPerDay === 1 ? "Lunch or Dinner" : "Both Lunch & Dinner daily",
      ],
      popular: false,
    },
    {
      name: "Basic Tiffin",
      price: mealsPerDay === 1 ? "₹60" : "₹120",
      period: mealsPerDay === 1 ? "per meal" : "per day (2 meals)",
      description: mealsPerDay === 1 ? "Light meal with essential items" : "Two light meals daily",
      features: [
        "6 Roti included",
        "Sabji included",
        "Salad included",
        "No Rice/Dal",
        mealsPerDay === 1 ? "Lunch or Dinner" : "Both Lunch & Dinner daily",
      ],
      popular: true,
    },
    {
      name: "Monthly Basic",
      price: mealsPerDay === 1 ? "₹1,800" : "₹3,600",
      period: "per month",
      description: mealsPerDay === 1 ? "Daily Basic Tiffin for 30 days" : "Daily Basic Tiffins for 30 days",
      features: [
        "6 Roti + Sabji daily",
        "30 days service",
        "Includes Sundays",
        mealsPerDay === 1 ? "Lunch or Dinner" : "Both Lunch & Dinner daily",
      ],
      popular: false,
    },
    {
      name: "Monthly Full",
      price: mealsPerDay === 1 ? "₹2,400" : "₹4,800",
      period: "per month",
      description: mealsPerDay === 1 ? "Daily Full Tiffin for 30 days" : "Daily Full Tiffins for 30 days",
      features: [
        "Full Thali (6 Roti + Dal/Rice)",
        "30 days service",
        "Best value",
        mealsPerDay === 1 ? "Lunch or Dinner" : "Both Lunch & Dinner daily",
      ],
      popular: false,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your tiffin service.\nArea:\nMeal type:"
  );
  const whatsappUrl = `https://wa.me/917436059291?text=${whatsappMessage}`;

  return (
    <>
      <Helmet>
        <title>Pricing Plans - Mom's Special | Affordable Tiffin Service</title>
        <meta
          name="description"
          content="Affordable tiffin pricing plans starting from ₹1,800/month. Daily, weekly, and monthly options available. Contact us for exact pricing."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Pricing</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Simple & Affordable Plans
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a plan that fits your needs. All prices are starting prices
              - contact us for exact pricing based on your location and
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Meals Per Day Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-muted p-1.5 rounded-2xl inline-flex items-center border border-border shadow-inner">
              <button
                onClick={() => setMealsPerDay(1)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mealsPerDay === 1
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                1 Meal / Day
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">Lunch or Dinner</span>
              </button>
              <button
                onClick={() => setMealsPerDay(2)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  mealsPerDay === 2
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                2 Meals / Day
                <span className="block text-[10px] font-normal opacity-80 mt-0.5">Lunch & Dinner</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl p-6 transition-all duration-300 ${
                  plan.popular
                    ? "ring-2 ring-primary shadow-glow md:scale-105 z-10 hover:scale-[1.08] hover:-translate-y-2"
                    : "shadow-card hover:-translate-y-2 hover:scale-[1.02]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-primary">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {/* Custom Pricing Card */}
            <div className="bg-cream p-8 rounded-3xl border border-primary/10 shadow-sm flex flex-col justify-between items-center text-center">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Need Custom Pricing?
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Prices may vary based on your location, meal preferences, and
                  special requirements. Contact us for an exact quote tailored to
                  your needs.
                </p>
              </div>
              <Button variant="whatsapp" size="lg" asChild className="w-full sm:w-auto mt-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Contact for Custom Quote
                </a>
              </Button>
            </div>

            {/* Special Orders Card */}
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                  Special Orders
                </h3>
                <p className="text-muted-foreground text-center mb-6 text-sm">
                  Place separate individual orders or add extras to your tiffin
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="font-semibold text-foreground">Roti</span>
                    <span className="font-bold text-primary">₹5</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="font-semibold text-foreground">Thepla</span>
                    <span className="font-bold text-primary">₹8</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="font-semibold text-foreground">Bhakhri</span>
                    <span className="font-bold text-primary">₹15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Rotlo</span>
                    <span className="font-bold text-primary">₹20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CostCalculator />

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-background p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  Are there any hidden charges?
                </h4>
                <p className="text-muted-foreground text-sm">
                  No hidden charges. The price includes delivery within our
                  service area.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  Can I pause my subscription?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes, you can pause or skip meals with advance notice. Contact
                  us for details.
                </p>
              </div>
              <div className="bg-background p-6 rounded-xl">
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer Jain food?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer Jain food options. Please mention your
                  requirement when ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
