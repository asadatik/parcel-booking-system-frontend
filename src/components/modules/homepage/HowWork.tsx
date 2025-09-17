
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
        staggerChildren: 0.1,
      },
    },
  }

 const steps = [
    {
      icon: Package,
      title: "Book Your Parcel",
      description: "Enter pickup and delivery details with just a few clicks",
    },
    {
      icon: Truck,
      title: "We Pickup",
      description: "Our delivery partner collects your parcel from your location",
    },
    {
      icon: MapPin,
      title: "Track in Transit",
      description: "Real-time tracking updates throughout the delivery journey",
    },
    {
      icon: CheckCircle,
      title: "Safe Delivery",
      description: "Your parcel reaches its destination securely and on time",
    },
  ]

    return (
        <div>
             {/* How It Works Section */}
      <section className="  py-10   ">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Simple Process</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              How It <span className="text-emerald-600">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Get your parcels delivered in just four simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="relative h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50/50">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">{step.title}</h3>
                    <p className=" text-gray-800  text-balance ">{step.description}</p>
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

export default HowWork;