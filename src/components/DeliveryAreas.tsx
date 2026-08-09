import { motion } from "framer-motion";
import { MapPin, Navigation, Compass, AlertCircle, ShieldAlert } from "lucide-react";

interface Area {
  name: string;
  landmark: string;
  status: "Free Delivery" | "Standard Delivery" | "Contact Us";
  color: string;
}

const DeliveryAreas = () => {
  const primaryAreas: Area[] = [
    { name: "Sector 6 & 6A", landmark: "Ambaji Mata Temple & surrounding block", status: "Free Delivery", color: "border-green-500/30 bg-green-500/5 dark:bg-green-500/10" },
    { name: "Sector 7", landmark: "Sector 7 Market / Residential", status: "Free Delivery", color: "border-green-500/30 bg-green-500/5 dark:bg-green-500/10" },
    { name: "Sector 2", landmark: "Sector 2 Market / Residential Area", status: "Free Delivery", color: "border-green-500/30 bg-green-500/5 dark:bg-green-500/10" },
    { name: "Sector 3", landmark: "Sector 3 Gardens / Residential Area", status: "Free Delivery", color: "border-green-500/30 bg-green-500/5 dark:bg-green-500/10" },
  ];

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider rounded-full">
            <Compass className="w-3.5 h-3.5" /> Service Locations
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-4">
            Our Delivery Areas in <span className="text-primary">Gandhinagar</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base">
            We cook with hygiene and deliver hot tiffins to key locations in Gandhinagar. Check if your sector is within our delivery zone!
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 items-start">
          
          {/* Main Delivery Zones (7 cols) */}
          <div className="md:col-span-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" /> Active Delivery Zones
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {primaryAreas.map((area, idx) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className={`p-5 rounded-2xl border ${area.color} shadow-sm transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-extrabold text-foreground text-sm sm:text-base leading-tight">
                          {area.name}
                        </h4>
                        <span className="shrink-0 text-[10px] font-bold bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                          {area.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {area.landmark}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Policy / Map Info (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-md flex flex-col justify-between">
              <h3 className="text-lg font-bold text-foreground mb-4">Delivery Schedule</h3>
              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-border">
                  <div className="font-bold text-foreground flex justify-between">
                    <span>🍱 Lunch Delivery</span>
                    <span className="text-primary font-extrabold">11:30 AM - 1:30 PM</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-[11px]">Best for office workers and students.</p>
                </div>
                <div className="pb-3 border-b border-border">
                  <div className="font-bold text-foreground flex justify-between">
                    <span>🌙 Dinner Delivery</span>
                    <span className="text-primary font-extrabold">6:30 PM - 8:30 PM</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-[11px]">Freshly made hot rotis served at your PG/Home.</p>
                </div>
                <div className="flex gap-2 text-[11px] text-muted-foreground items-start bg-primary/5 p-3 rounded-xl border border-primary/10">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p>Sunday Lunch is available (Dinner is CLOSED). Please check weekly status broadcasts for timing details.</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border shadow-md">
              <h3 className="text-lg font-bold text-foreground mb-3">Outside our zone?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                If you are a group of 5+ members, we can customize a special route to deliver fresh tiffins to your location. Contact us directly to set up!
              </p>
              <a
                href="https://wa.me/917436059291?text=Hi!%20My%20delivery%20location%20is%20outside%20your%20regular%20zones.%20We%20want%20to%20inquire%20about%20tiffin%20deliveries."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-colors"
              >
                Inquire Special Route
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default DeliveryAreas;
