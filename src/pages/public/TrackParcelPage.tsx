'use client'

import { useState } from "react"
import { useNavigate } from "react-router"
import { motion , type Variants } from "framer-motion"
import { Package, Search, Zap, Lock, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

const demoTrackingIds = [
  "TRK-20251005-5ED885",
  "TRK-20251007-093E30",
  "TRK-20251010-1D7330",
  "TRK-20251013-CC5B8C",
  "TRK-20251016-48A45F",
  "TRK-20251017-28041A",
  "TRK-20251017-9F591D",
  "TRK-20251025-AB49D8",
  "TRK-20260313-B2E80A",
]

const TrackParcelPage  = () => {
  const [trackingId, setTrackingId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId.trim()) {
      setError("Please enter a tracking code")
      return
    }
    setError("")
    navigate(`/track/${trackingId}`)
  }

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrackingId(e.target.value)
    setError("")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants : Variants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-orange-50 overflow-hidden relative">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-200 to-emerald-100 rounded-full opacity-20 blur-3xl"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full opacity-20 blur-3xl"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: "2s" }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Package className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Track Your Parcel
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            Enter your tracking ID to get real-time updates on your delivery
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-emerald-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Dropdown Section */}
              <motion.div
                variants={itemVariants}
                className="space-y-3"
              >
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                    Select Demo Tracking ID
                  </span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-emerald-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-slate-700 font-medium cursor-pointer hover:border-emerald-300"
                  value={trackingId}
                  onChange={handleDropdownChange}
                >
                  <option value="">Choose a tracking ID...</option>
                  {demoTrackingIds.map((id) => (
                    <option key={id} value={id}>
                      {id.slice(-6)} - {id}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Input Section */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    Or Enter Tracking Code
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., TRK-20260313-B2E80A"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value.toUpperCase())
                    setError("")
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-slate-50 to-emerald-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 text-slate-700 font-medium placeholder-slate-400"
                />
              </motion.div>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: error ? 1 : 0,
                  height: error ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {error}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Track Parcel Now
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* XTRA Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid md:grid-cols-3 gap-6 w-full max-w-2xl"
        >
          {[
            {
              icon: Zap,
              title: "Real-Time Updates",
              description: "Get instant notifications on your parcel status",
            },
            {
              icon: Lock,
              title: "Secure Tracking",
              description: "Your tracking data is encrypted and protected",
            },
            {
              icon: Smile,
              title: "Easy to Use",
              description: "Simple and intuitive tracking experience",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-emerald-100 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-emerald-500 to-orange-400 rounded-lg mb-3">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TrackParcelPage
