import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Package, Truck, MapPin, CheckCircle } from "lucide-react"

const HowWork = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const steps = [
    {
      icon: Package,
      title: "Book Your Parcel",
      description: "Enter pickup and delivery details with just a few clicks",
      accent: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.25)",
    },
    {
      icon: Truck,
      title: "We Pickup",
      description: "Our delivery partner collects your parcel from your location",
      accent: "from-orange-500 to-amber-500",
      glow: "rgba(249,115,22,0.25)",
    },
    {
      icon: MapPin,
      title: "Track in Transit",
      description: "Real-time tracking updates throughout the delivery journey",
      accent: "from-teal-500 to-cyan-500",
      glow: "rgba(20,184,166,0.25)",
    },
    {
      icon: CheckCircle,
      title: "Safe Delivery",
      description: "Your parcel reaches its destination securely and on time",
      accent: "from-emerald-600 to-green-500",
      glow: "rgba(22,163,74,0.25)",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#030f0a]">
      {/* subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Badge className="mb-4 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 hover:bg-emerald-200 px-4 py-1 rounded-full text-sm font-medium">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
            How It{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Get your parcels delivered in just four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
        
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800/60 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div key={index} variants={fadeInUp} className="relative z-10">
              <Card
                className="group h-full border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.03] hover:border-emerald-200 dark:hover:border-emerald-700/50 shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden"
                style={{ "--glow": step.glow } as React.CSSProperties}
              >
              
                <div className={`h-1 w-full bg-gradient-to-r ${step.accent}`} />

                <CardContent className="p-8 text-center flex flex-col items-center">
              
                  <div className="relative mb-7">
                    <div
                      className={`w-16 h-16 mx-auto bg-gradient-to-br ${step.accent} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      style={{ boxShadow: `0 8px 24px ${step.glow}` }}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs shadow">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowWork;