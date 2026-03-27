import { Package,  Phone, Mail, MapPin, ArrowRight, Heart, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [, setHoveredLink] = useState<string | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const handleSubscribe = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const services = [
    { label: "Express Delivery", icon: "⚡" },
    { label: "Same Day", icon: "🚀" },
    { label: "International", icon: "🌍" },
    { label: "Bulk Orders", icon: "📦" },
  ]

  const support = [
    { label: "Track Package", icon: "📍" },
    { label: "Help Center", icon: "❓" },
    { label: "Contact Us", icon: "💬" },
    { label: "Claims", icon: "✅" },
  ]

  const socials = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", color: "hover:text-sky-500" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-600" },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl -z-10" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Newsletter Section */}
        <motion.div
          className="mb-16 p-8 lg:p-12 rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-orange-50/40 to-transparent backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-3">
                Stay Updated
              </h3>
              <p className="text-slate-600">
                Get the latest updates on delivery tips, special offers, and new features directly in your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 px-4 rounded-xl border-2 border-emerald-200 bg-white/80 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  required
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </motion.div>
            </form>

            {subscribed && (
              <motion.p
                className="md:col-span-2 text-emerald-600 font-semibold flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>✓</span> Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Brand Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <motion.div className="flex items-center space-x-3 mb-6" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Package className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                ParcelPro
              </span>
            </motion.div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Fast, reliable, and secure parcel delivery service connecting you worldwide with real-time tracking.
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    className={`h-10 w-10 rounded-lg border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 ${social.color} transition-all duration-300 hover:border-emerald-400 hover:shadow-md`}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  onMouseEnter={() => setHoveredLink(`service-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ x: 4 }}
                >
                  <a
                    href="#"
                    className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {service.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {service.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <div className="h-1 w-1 rounded-full bg-orange-500" />
              Support
            </h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <motion.li
                  key={index}
                  onMouseEnter={() => setHoveredLink(`support-${index}`)}
                  onMouseLeave={() => setHoveredLink(null)}
                  whileHover={{ x: 4 }}
                >
                  <a
                    href="#"
                    className="text-slate-600 hover:text-orange-600 transition-colors duration-200 flex items-center gap-2 group text-sm"
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              Contact & Hours
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Contact Items */}
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent border border-emerald-200/60 hover:border-emerald-300 hover:shadow-md transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Phone className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</span>
                </div>
                <a href="tel:+15551234567" className="text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                  +1 (555) 123-4567
                </a>
              </motion.div>

              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-transparent border border-orange-200/60 hover:border-orange-300 hover:shadow-md transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Mail className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</span>
                </div>
                <a href="mailto:support@parcelpro.com" className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors break-all">
                  support@parcelpro.com
                </a>
              </motion.div>

              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent border border-emerald-200/60 hover:border-emerald-300 hover:shadow-md transition-all md:col-span-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg flex-shrink-0">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">Location</span>
                    <p className="text-sm font-semibold text-slate-900">
                      123 Delivery St, Dhaka 1205, Bangladesh
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Mon-Sun: 8:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Copyright & Links */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              © 2024 ParcelPro. Made with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              </motion.span>
              in Bangladesh
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-emerald-600 transition-colors duration-200 font-medium">
                Privacy Policy
              </a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-emerald-600 transition-colors duration-200 font-medium">
                Terms of Service
              </a>
              <span className="text-slate-300">•</span>
              <a href="#" className="hover:text-emerald-600 transition-colors duration-200 font-medium">
                Cookie Policy
              </a>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200/60 bg-gradient-to-r from-emerald-50/80 to-transparent"
          >
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold text-slate-600">All systems operational</span>
          </motion.div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          className="mt-8 pt-8 border-t border-slate-200"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-4">We Accept</p>
          <div className="flex flex-wrap gap-3">
            {["💳 Credit/Debit", "🏦 Bank Transfer", "📱 Mobile Wallet", "💰 Cash on Delivery"].map((method, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-full border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50 transition-all text-sm font-medium text-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {method}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl flex items-center justify-center z-40 hidden lg:flex group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-xl group-hover:-translate-y-1 transition-transform"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↑
        </motion.span>
      </motion.button>
    </footer>
  )
}