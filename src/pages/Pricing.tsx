import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CostCalculator from "@/components/CostCalculator";

const Pricing = () => {
  const plans = [
    {
      name: "Basic Tiffin",
      price: "₹50",
      period: "per meal",
      description: "Light meal with essential items",
      features: [
        "Roti included",
        "Sabji included",
        "Salad included",
        "No Rice/Dal",
      ],
      popular: false,
    },
    {
      name: "Full Tiffin",
      price: "₹70",
      period: "per meal",
      description: "Complete wholesome meal",
      features: [
        "Roti included",
        "Sabji included",
        "Dal included",
        "Rice included",
      ],
      popular: true,
    },
    {
      name: "Monthly Basic",
      price: "₹1,500",
      period: "per month",
      description: "Daily Basic Tiffin for 30 days",
      features: [
        "Roti + Sabji daily",
        "30 days service",
        "Includes Sundays",
        "Perfect for dinner",
      ],
      popular: false,
    },
    {
      name: "Monthly Full",
      price: "₹2,100",
      period: "per month",
      description: "Daily Full Tiffin for 30 days",
      features: [
        "Full Thali daily",
        "30 days service",
        "Lunch or Dinner",
        "Best value",
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
          content="Affordable tiffin pricing plans starting from ₹2,000/month. Daily, weekly, and monthly options available. Contact us for exact pricing."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl p-6 ${plan.popular
                  ? "ring-2 ring-primary shadow-glow"
                  : "shadow-card"
                  } hover:shadow-soft transition-all duration-300 hover:-translate-y-1`}
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

          <div className="text-center mt-12 p-8 bg-cream rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Need Custom Pricing?
            </h3>
            <p className="text-muted-foreground mb-6">
              Prices may vary based on your location, meal preferences, and
              special requirements. Contact us for an exact quote tailored to
              your needs.
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Contact for Exact Pricing
              </a>
            </Button>
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
