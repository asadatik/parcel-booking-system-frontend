import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Shield, Clock } from "lucide-react"

const CTA = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }


  const features = [
    {
      icon: Zap,
      text: "Instant booking & updates",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Shield,
      text: "100% secure & insured",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Clock,
      text: "24/7 customer support",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/20 to-orange-50/20" />

        {/* Animated orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 lg:w-96 h-80 lg:h-96 bg-emerald-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 lg:w-96 h-80 lg:h-96 bg-orange-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Main heading */}
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 lg:mb-8 leading-[1.1]"
            variants={fadeInUp}
          >
            <span className="text-slate-900 block mb-3 lg:mb-4">Upgrade Your  
</span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">

           Parcel Experience
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

          {/* Subtitle */}
          <motion.p
            className="text-center text-base lg:text-xl text-slate-600 max-w-2xl mx-auto mb-8 lg:mb-12 px-2"
            variants={fadeInUp}
          >
            Join thousands of businesses experiencing faster, smarter, and more reliable parcel delivery. Start your free trial today—no credit card required.
          </motion.p>

          {/* Features row */}
          <motion.div
            className="grid sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-16"
            variants={fadeInUp}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50/30 hover:to-orange-50/30 transition-all duration-300 group"
                whileHover={{ scale: 1.05, translateY: -4 }}
              >
                <div
                  className={`flex-shrink-0 w-12 lg:w-14 h-12 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-6 lg:h-7 w-6 lg:w-7 text-white" />
                </div>
                <span className="text-sm lg:text-base text-slate-700 font-semibold text-center sm:text-left">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 lg:mb-16"
            variants={fadeInUp}
          >
            {/* Primary button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-xl lg:rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-300" />
              <Button
                size="lg"
                className="relative w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white border-0 shadow-xl px-8 lg:px-10 py-6 lg:py-7 text-base lg:text-lg font-bold rounded-xl lg:rounded-2xl overflow-hidden group/btn transition-all"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2 lg:gap-3">
                  Start Free Trial
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 lg:h-6 w-5 lg:w-6" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            {/* Secondary button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 px-8 lg:px-10 py-6 lg:py-7 text-base lg:text-lg font-bold rounded-xl lg:rounded-2xl backdrop-blur-sm transition-all duration-300 bg-white"
              >
                <span className="flex items-center justify-center gap-2 lg:gap-3">
                  Schedule Demo
                  <ArrowRight className="h-5 lg:h-6 w-5 lg:w-6" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust section */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            variants={fadeInUp}
          >
            <p className="text-slate-600 text-xs lg:text-sm mb-4 font-medium">Trusted by leading companies worldwide</p>
            <div className="flex justify-center items-center gap-4 lg:gap-6 flex-wrap">
              {["TechCorp", "GlobalTrade", "SmartLogistics", "FastShip"].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-3 lg:px-4 py-2 rounded-lg border-2 border-slate-200 text-slate-600 text-xs lg:text-sm font-medium hover:border-emerald-300 hover:text-slate-700 transition-all group cursor-pointer"
                  whileHover={{ scale: 1.05, borderColor: "#059669" }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom highlight */}
          <motion.div
            className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-orange-50/40 to-emerald-50/80 backdrop-blur-lg text-center hover:border-emerald-300 hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-slate-900 text-base lg:text-lg font-bold mb-2">
              💰 Special Offer: Get 30% off on your first 3 months
            </p>
            <p className="text-slate-600 text-xs lg:text-sm">
              Use code <span className="font-bold text-emerald-600">PARCEL30</span> at checkout
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA