import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState } from "react"

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const testimonials = [
    {
      name: "Sarah Anderson",
      role: "E-commerce Business Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      content: "ParcelPro has completely transformed how we manage deliveries. The real-time tracking keeps our customers informed and our business running smoothly.",
      rating: 5,
      company: "The Fashion Hub",
      icon: "🎯",
    },
    {
      name: "Michael Chen",
      role: "Logistics Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      content: "The integration with our existing systems was seamless. Reliability and speed are unmatched. We've reduced delivery time by 30% since switching.",
      rating: 5,
      company: "Global Trade Solutions",
      icon: "⚡",
    },
    {
      name: "Emma Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      content: "Best investment for my growing business. Customer support is incredible and the pricing is transparent. Highly recommended to all entrepreneurs!",
      rating: 5,
      company: "Artisan Crafts Co.",
      icon: "💎",
    },
    {
      name: "David Kumar",
      role: "Fulfillment Center Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      content: "The automation features save us hours every week. ParcelPro's analytics help us optimize our operations and improve customer satisfaction.",
      rating: 5,
      company: "Prime Logistics Ltd.",
      icon: "🚀",
    },
  ]

  return (
    <section className="relative py-14 md:py-20  overflow-hidden bg-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 lg:w-96 h-80 lg:h-96 bg-orange-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 lg:w-96 h-80 lg:h-96 bg-emerald-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(to right, #10b981 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
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
            className="mb-6"
          >
            <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-orange-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200 px-4 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-semibold uppercase tracking-wider">
              ⭐ Loved by Businesses
            </Badge>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 lg:mb-6 tracking-tight text-slate-900 leading-[1.1]"
            variants={fadeInUp}
          >
            What Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Customers Say
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
            className="text-base lg:text-xl text-slate-600 max-w-2xl mx-auto px-2"
            variants={fadeInUp}
          >
            Join thousands of satisfied businesses already enjoying the ParcelPro advantage
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative mb-16 lg:mb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-emerald-300/20 to-orange-300/20 rounded-2xl lg:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
              />

              <Card className="h-full border-2 border-slate-200 bg-white hover:border-emerald-300 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xl lg:rounded-2xl overflow-hidden group">
                <CardContent className="p-4 lg:p-6 h-full flex flex-col justify-between">
                  {/* Header with quote icon */}
                  <div>
                    <motion.div
                      animate={{
                        y: hoveredIndex === index ? -4 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className="h-6 lg:h-8 w-6 lg:w-8 text-emerald-500/30 mb-3 lg:mb-4" />
                    </motion.div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3 lg:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-4 lg:h-5 w-4 lg:w-5 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-slate-700 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-5">
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* User info */}
                  <div className="border-t border-slate-200 pt-4 lg:pt-6">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <motion.div
                        className="relative flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 lg:w-12 h-10 lg:h-12 rounded-full object-cover border-2 border-emerald-200"
                        />
                        <span className="absolute -bottom-1 -right-1 text-base lg:text-lg">{testimonial.icon}</span>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs lg:text-sm truncate group-hover:text-emerald-600 transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-emerald-600 font-semibold mt-0.5 lg:mt-1 truncate">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust metrics */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {[
            { value: "4.9/5", label: "Average Rating", icon: "⭐" },
            { value: "2,500+", label: "Happy Customers", icon: "😊" },
            { value: "99.9%", label: "Satisfaction Rate", icon: "✅" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-4 lg:p-6 rounded-xl lg:rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 hover:border-emerald-300 hover:shadow-md transition-all text-center"
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <p className="text-2xl lg:text-3xl mb-2">{metric.icon}</p>
              <p className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent mb-1 lg:mb-2">
                {metric.value}
              </p>
              <p className="text-xs lg:text-sm text-slate-600 font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials