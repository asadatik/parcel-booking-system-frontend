import React, { useState, useEffect } from 'react'
import { CheckCircle, Globe, Shield, Truck, Zap, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Service {
  id: number
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  color: string
  glowColor: string
  emoji: string
}

const WhyWe = () => {
  const [activeService, setActiveService] = useState<number>(0)
  const [direction, setDirection] = useState(1)

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55 },
  }

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const slideVariants: any = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      transition: { duration: 0.35, ease: 'easeIn' },
    }),
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setActiveService(prev => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleServiceClick = (index: number) => {
    setDirection(index > activeService ? 1 : -1)
    setActiveService(index)
  }

  const services: Service[] = [
    {
      id: 1,
      title: 'Express Delivery',
      description: 'Lightning-fast delivery for urgent packages with real-time tracking and priority handling.',
      icon: Zap,
      features: ['Same-day delivery', '2-hour time slots', 'Priority handling', 'Live GPS tracking', '24/7 support'],
      color: 'from-orange-500 to-amber-500',
      glowColor: 'rgba(249,115,22,0.25)',
      emoji: '⚡',
    },
    {
      id: 2,
      title: 'Standard Shipping',
      description: 'Reliable and cost-effective shipping solution for everyday needs with full insurance coverage.',
      icon: Truck,
      features: ['3-5 business days', 'Secure packaging', 'Insurance included', 'Proof of delivery', 'Online tracking'],
      color: 'from-emerald-500 to-teal-500',
      glowColor: 'rgba(16,185,129,0.25)',
      emoji: '🚚',
    },
    {
      id: 3,
      title: 'International Delivery',
      description: 'Global reach with customs handling, multi-language support, and international tracking.',
      icon: Globe,
      features: ['Worldwide coverage', 'Customs clearance', 'Multi-language support', 'Currency flexibility', 'International insurance'],
      color: 'from-teal-500 to-cyan-500',
      glowColor: 'rgba(20,184,166,0.25)',
      emoji: '🌍',
    },
    {
      id: 4,
      title: 'Secure Transport',
      description: 'Maximum security for valuable and sensitive deliveries with enhanced protection measures.',
      icon: Shield,
      features: ['Enhanced security', 'Signature required', 'Insurance up to $10K', 'Chain of custody', 'Armored transport'],
      color: 'from-emerald-600 to-emerald-800',
      glowColor: 'rgba(5,150,105,0.25)',
      emoji: '🛡️',
    },
  ]

  const active = services[activeService]

  return (
    <section className="relative py-16 md:py-24  overflow-hidden bg-white dark:bg-[#030f0a]">
      {/* subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-emerald-100/60 dark:bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="inline-block px-5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs uppercase tracking-widest mb-5">
            🎯 Why Choose Us
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.08]">
            Delivery Solutions{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                That Fit You
              </span>
             <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur-sm"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>

          <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Choose from our range of delivery options tailored to meet your specific needs
          </p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-10 items-start"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Left — service list */}
          <motion.div className="space-y-3" variants={fadeInUp}>
            {services.map((service, index) => {
              const isActive = activeService === index
              return (
                <motion.button
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={`w-full text-left group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    isActive
                      ? `bg-gradient-to-r ${service.color} border-transparent text-white`
                      : 'bg-white dark:bg-white/[0.03] border-slate-100 dark:border-white/5 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:shadow-md text-slate-800 dark:text-slate-200'
                  }`}
                  style={isActive ? { boxShadow: `0 8px 32px ${service.glowColor}` } : {}}
                  whileHover={{ scale: isActive ? 1 : 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 p-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive ? 'bg-white/20' : `bg-gradient-to-br ${service.color}`
                      }`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-base mb-0.5 flex items-center gap-2 ${isActive ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                        {service.title}
                        {isActive && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base">
                            {service.emoji}
                          </motion.span>
                        )}
                      </h3>
                      <p className={`text-sm line-clamp-1 ${isActive ? 'text-white/75' : 'text-slate-500 dark:text-slate-400'}`}>
                        {service.description}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="shrink-0">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              )
            })}

            {/* dot indicators */}
            <div className="flex gap-2 pt-4 pl-1">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeService === index
                      ? 'bg-emerald-500 w-8'
                      : 'bg-slate-200 dark:bg-slate-700 w-2 hover:bg-emerald-300 dark:hover:bg-emerald-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — detail panel */}
          <motion.div variants={fadeInUp} className="relative min-h-[480px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeService}
                custom={direction}
                variants={slideVariants}
                className="h-full"
              >
                <div className="h-full rounded-3xl border border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-sm">
                  {/* top color bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${active.color}`} />

                  <div className="p-7 lg:p-9">
                    {/* floating icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.color} flex items-center justify-center mb-6 shadow-lg`}
                      style={{ boxShadow: `0 10px 30px ${active.glowColor}` }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {React.createElement(active.icon, { className: 'w-8 h-8 text-white' })}
                    </motion.div>

                    <motion.h3
                      className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      {active.title}
                    </motion.h3>

                    <motion.p
                      className="text-sm lg:text-base text-slate-500 dark:text-slate-400 mb-7 leading-relaxed"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {active.description}
                    </motion.p>

                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4">
                      ✨ Key Features
                    </p>

                    <motion.div
                      className="space-y-2.5 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {active.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-100 dark:border-white/5 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-200"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.22 + i * 0.05 }}
                          whileHover={{ x: 3 }}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${active.color} flex items-center justify-center shrink-0`}
                            style={{ boxShadow: `0 3px 10px ${active.glowColor}` }}
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.button
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${active.color} flex items-center justify-center gap-2 transition-all duration-300`}
                      style={{ boxShadow: `0 6px 24px ${active.glowColor}` }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Get Started Now
                      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-10  md:mt-16 max-w-4xl mx-auto grid grid-cols-3 divide-x divide-emerald-200/50 dark:divide-white/5 border border-slate-300 dark:border-white/5 rounded-2xl bg-emerald-50/50 dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[
            { value: '50+', label: 'Cities Covered', icon: '🌏' },
            { value: '99.8%', label: 'On-Time Rate', icon: '⏱️' },
            { value: '24/7', label: 'Customer Support', icon: '📞' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-5 px-4 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-200"
            >
              <span className="text-xl mb-1">{stat.icon}</span>
              <p className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyWe