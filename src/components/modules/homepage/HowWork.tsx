import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Package, Truck, MapPin, CheckCircle } from "lucide-react"
import { useState } from "react"

const HowWork = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
      accentDark: "from-emerald-600 to-teal-600",
      glow: "rgba(16,185,129,0.4)",
      details: "Fast & secure booking",
      emoji: "📦",
    },
    {
      icon: Truck,
      title: "We Pickup",
      description: "Our delivery partner collects your parcel from your location",
      accent: "from-orange-500 to-amber-500",
      accentDark: "from-orange-600 to-amber-600",
      glow: "rgba(249,115,22,0.4)",
      details: "Professional collection",
      emoji: "🚚",
    },
    {
      icon: MapPin,
      title: "Track in Transit",
      description: "Real-time tracking updates throughout the delivery journey",
      accent: "from-blue-500 to-cyan-500",
      accentDark: "from-blue-600 to-cyan-600",
      glow: "rgba(59,130,246,0.4)",
      details: "Live GPS tracking",
      emoji: "📍",
    },
    {
      icon: CheckCircle,
      title: "Safe Delivery",
      description: "Your parcel reaches its destination securely and on time",
      accent: "from-green-500 to-emerald-600",
      accentDark: "from-green-600 to-emerald-700",
      glow: "rgba(22,163,74,0.4)",
      details: "100% guarantee",
      emoji: "✅",
    },
  ]

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#030f0a] dark:via-[#0a1810] dark:to-[#030f0a]">
      {/* Animated background*/}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
     
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.2] "
          style={{
            backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Gradient top blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-emerald-200/20 dark:from-emerald-900/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50 hover:from-emerald-200 hover:to-teal-200 dark:hover:from-emerald-900/70 dark:hover:to-teal-900/70 px-6 py-2 rounded-full text-sm font-semibold tracking-wide inline-flex gap-2 backdrop-blur-sm shadow-lg shadow-emerald-500/10 transition-all duration-300">
              <span className="text-lg">⚡</span>
              Simple Process
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            variants={fadeInUp}
          >
            How It{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Works
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Get your parcels delivered in four seamless steps with real-time tracking and complete transparency
          </motion.p>
        </motion.div>

        {/* Steps Container */}
        <motion.div
          className="relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Animated SVG connecting line */}
          <svg
            className="absolute top-32 left-0 right-0 w-full h-px hidden lg:block pointer-events-none"
            viewBox="0 0 1200 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1200"
              y2="1"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="1200"
              strokeDashoffset="1200"
              initial={{ strokeDashoffset: 1200 }}
              whileInView={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                <stop offset="20%" stopColor="rgba(16,185,129,0.6)" />
                <stop offset="50%" stopColor="rgba(34,197,94,0.8)" />
                <stop offset="80%" stopColor="rgba(16,185,129,0.6)" />
                <stop offset="100%" stopColor="rgba(16,185,129,0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Glow background on hover */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-all duration-500 -z-10"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${step.glow}, transparent)`,
                  }}
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                />

                <Card
                  className="relative h-full border border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-white/[0.05] backdrop-blur-lg hover:border-emerald-300/50 dark:hover:border-emerald-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group"
                >
                  {/* Top gradient bar */}
                  <motion.div
                    className={`h-1.5 w-full bg-gradient-to-r ${step.accent}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />

                  <CardContent className="p-8 text-center flex flex-col items-center h-full justify-between">
                    {/* Step number circle */}
                    <div className="relative mb-8 w-full flex justify-center">
                      <motion.div
                        className="relative"
                        animate={{
                          y: hoveredIndex === index ? -8 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {/* Icon background */}
                        <motion.div
                          className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.accent} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                          style={{
                            boxShadow: `0 20px 40px ${step.glow}`,
                          }}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ["0%", "100%"],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                          <step.icon className="h-10 w-10 text-white relative z-10" strokeWidth={1.5} />
                        </motion.div>

                        {/* Step indicator */}
                        <motion.div
                          className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 border-3 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.2 }}
                        >
                          {index + 1}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="w-full">
                      <motion.h3
                        className="text-xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200"
                        animate={{
                          color: hoveredIndex === index ? "#059669" : "currentColor",
                        }}
                      >
                        {step.title}
                      </motion.h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Detail tag */}
                      <motion.div
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${step.accent} text-white shadow-md`}
                        animate={{
                          scale: hoveredIndex === index ? 1.05 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {step.details}
                      </motion.div>
                    </div>

                    {/* Bottom emoji indicator */}
                    <motion.div
                      className="mt-6 text-4xl"
                      animate={{
                        y: hoveredIndex === index ? -4 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {step.emoji}
                    </motion.div>
                  </CardContent>

                  {/* Border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 0.5 : 0,
                    }}
                    style={{
                      background: `linear-gradient(135deg, ${step.glow}, transparent)`,
                      filter: "blur(12px)",
                    }}
                  />
                </Card>

                {/* Connection dots for mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block lg:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-emerald-400 to-transparent opacity-30"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block">
            <div className="px-8 py-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 backdrop-blur-lg shadow-xl">
              <p className="text-slate-700 dark:text-slate-200 text-lg font-medium">
                Ready to get started?{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Book your first parcel today</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  )
}

export default HowWork