import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, MessageCircle, Clock, MapPin, Search, CheckCircle, XCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [areaInput, setAreaInput] = useState("");
  const [checkResult, setCheckResult] = useState<{ allowed: boolean; message: string } | null>(null);

  const whatsappMessage = encodeURIComponent(
    "Hello, I am interested in your tiffin service.\nArea:\nMeal type:"
  );
  const whatsappUrl = `https://wa.me/917436059291?text=${whatsappMessage}`;
  const whatsappGroupUrl = "https://chat.whatsapp.com/BFPtmPCoc2UDWNOV0RDukA";

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us (Primary)",
      description: "Main contact number",
      action: "tel:+917436059291",
      buttonText: "+91 74360 59291",
      buttonVariant: "phone" as const,
    },
    {
      // Using secondary phone for alternative contact
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us (Secondary)",
      description: "Alternative contact number",
      action: "tel:+919712274100",
      buttonText: "+91 97122 74100",
      buttonVariant: "phone" as const,
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Chat",
      description: "Quick chat on WhatsApp",
      action: whatsappUrl,
      buttonText: "Chat Now",
      buttonVariant: "whatsapp" as const,
    },
    // Added WhatsApp Group option
    // {
    //   icon: <Users className="w-8 h-8" />,
    //   title: "WhatsApp Group",
    //   description: "Join our daily updates group",
    //   action: whatsappGroupUrl,
    //   buttonText: "Join Group",
    //   buttonVariant: "whatsapp" as const,
    // },
  ];

  const handleAreaCheck = () => {
    if (!areaInput.trim()) return;

    const lowerInput = areaInput.toLowerCase();
    // Logic: Sector 6 or Sector 7 allowed for delivery
    if (lowerInput.includes("sector 6") || lowerInput.includes("sector 7")) {
      setCheckResult({
        allowed: true,
        message: "✅ Yes! Delivery is available in your area (Lunch Only).",
      });
    } else {
      setCheckResult({
        allowed: false,
        message: "❌ Sorry, delivery not available. Please visit us at Sector-6A for Self-Service/Pickup.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Mom's Special | Get in Touch</title>
        <meta
          name="description"
          content="Contact Mom's Special for home-style tiffin service. Located at Sector-6A, Block No 431/2, Nr. Ambaji Mata Temple, Gandhinagar. Self-service and limited delivery options available."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-12 md:pb-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">Contact Us</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 md:mb-6">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Visit us at Sector-6A, Block No 431/2, Nr. Ambaji Mata Temple, Gandhinagar.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Check Tool */}
      <section className="py-8 md:py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-accent/30 p-6 md:p-8 rounded-2xl border border-accent">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
              Check Delivery Availability 🚚
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter your Sector (e.g., Sector 6)"
                  className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAreaCheck()}
                />
                <Button onClick={handleAreaCheck} className="px-6 w-full sm:w-auto mt-2 sm:mt-0">
                  <Search className="w-4 h-4 mr-2" /> Check
                </Button>
              </div>

              {checkResult && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 text-sm font-medium animate-fade-in ${checkResult.allowed
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
                    }`}
                >
                  {checkResult.allowed ? (
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  {checkResult.message}
                </div>
              )}
              <p className="text-xs text-muted-foreground text-center mt-2">
                Note: Delivery is only available for Lunch in select sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="bg-card p-6 md:p-8 rounded-2xl shadow-card text-center hover:shadow-soft transition-all duration-300 border border-border"
              >
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center text-secondary mx-auto mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {method.description}
                </p>
                <Button
                  variant={method.buttonVariant}
                  className="w-full whitespace-normal h-auto py-3 text-sm md:text-base"
                  asChild
                >
                  <a
                    href={method.action}
                    target={method.title === "WhatsApp" ? "_blank" : undefined}
                    rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  >
                    {method.icon}
                    {method.buttonText}
                  </a>
                </Button>
              </div>
            ))}
          </div>

          {/* WhatsApp Group QR Code Section */}
          <div className="max-w-2xl mx-auto mt-12 p-6 md:p-8 bg-card rounded-2xl shadow-card text-center border border-border">
            <div className="flex flex-col items-center gap-6">
              <MessageCircle className="w-12 h-12 text-primary" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">Join our WhatsApp Community</h3>
                <p className="text-muted-foreground text-sm md:text-base">Scan the QR code to join our group for daily menu updates!</p>
              </div>

              <div className="p-4 bg-white rounded-xl shadow-lg border border-border inline-block max-w-full">
                <QRCodeSVG
                  value={whatsappGroupUrl}
                  size={200}
                  className="max-w-full h-auto"
                  level="H"
                  includeMargin={true}
                />
              </div>

              <Button className="bg-[#25D366] hover:bg-[#1fb855] text-white w-full sm:w-auto" size="lg" asChild>
                <a href={whatsappGroupUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Join Group via Link
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Service Locations */}
            <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  Our Location
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-accent/20 rounded-xl border border-accent/50">
                  <h4 className="font-bold text-foreground mb-1">Sector-6A, Block No 431/2</h4>
                  <p className="text-sm font-medium text-foreground mb-1">Nr. Ambaji Mata Temple, Gandhinagar</p>
                  <p className="text-sm text-muted-foreground">Main Kitchen & Self-Service Pickup Point</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Delivery Areas (Dinner Only):</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Sector 6</li>
                    <li>Sector 7</li>
                  </ul>
                  <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-medium">
                    * Other areas: Self-service pickup only.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Hours */}
            <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  Service Hours
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-foreground font-medium">
                    Self Service (Pickup)
                  </span>
                  <span className="text-muted-foreground">All Day</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-foreground font-medium">
                    Dinner Delivery
                  </span>
                  <span className="text-muted-foreground">7:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-foreground font-medium">
                    Lunch
                  </span>
                  <span className="text-muted-foreground text-right">Pickup Only<br />(12:00 PM - 1:30 PM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
            Ready to Order?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Visit us at Sector 6A or order lunch delivery in Sector 6 & 7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto" asChild>
              <a href="tel:+917436059291">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
            <Button
              size="xl"
              className="bg-[#25D366] hover:bg-[#1fb855] text-primary-foreground w-full sm:w-auto"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
