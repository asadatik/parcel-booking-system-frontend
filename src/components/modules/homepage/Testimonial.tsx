


import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

import {  Star, Quote } from "lucide-react"




const Testimonial = () => {
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
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "ParcelExpress has transformed how I ship products to my customers. Fast, reliable, and affordable!",
      rating: 5,
      avatar: "/professional-woman-smiling.png",
    },
    {
      name: "Michael Chen",
      role: "E-commerce Manager",
      content: "The tracking system is incredible. My customers always know exactly where their packages are.",
      rating: 5,
      avatar: "/professional-man-glasses.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Freelancer",
      content: "I've tried many delivery services, but ParcelExpress consistently delivers on time, every time.",
      rating: 5,
      avatar: "/young-professional-woman.png",
    },
  ]




    return (
        <div>
              {/* Testimonials Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Customer Stories</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              What Our <span className="text-emerald-600">Customers</span> Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of satisfied customers who trust us with their deliveries
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <Quote className="h-8 w-8 text-emerald-500 mr-2" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 text-pretty italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
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

export default Testimonial;