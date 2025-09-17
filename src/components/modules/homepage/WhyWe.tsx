"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { motion } from "framer-motion"

import {  Clock, Shield, DollarSign, Star} from "lucide-react"


const WhyWe = () => {
    
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
    }}

  const benefits = [
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Same-day and next-day delivery options available",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "End-to-end insurance and tracking for peace of mind",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description: "Competitive rates with no hidden fees or charges",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Star,
      title: "Highly Rated",
      description: "Trusted by thousands with 4.9/5 customer satisfaction",
      color: "from-orange-500 to-red-500",
    },
  ]




    return (
        <div>
                 {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Built for <span className="text-orange-600">Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Experience the difference with our premium delivery service
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
                  <CardContent className="p-8 text-center relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    ></div>
                    <div className="relative">
                      <div
                        className={`w-16 h-16 mx-auto bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg mb-6`}
                      >
                        <benefit.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-slate-800">{benefit.title}</h3>
                      <p className="text-muted-foreground text-pretty">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
        </div>
    );
};

export default WhyWe;