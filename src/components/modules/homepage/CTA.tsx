

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react";





const CTA = () => {

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }




    return (
        <div>
              {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"></div>
        <div className="absolute inset-0 bg-[url('/delivery-truck-pattern.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 text-balance text-white drop-shadow-lg"
              style={{ color: "#ffffff" }}
            >
              Ready to Ship with <span className="text-orange-400">Confidence?</span>
            </h2>
            <p
              className="text-xl mb-8 text-emerald-50 max-w-2xl mx-auto text-pretty drop-shadow-sm"
              style={{ color: "#f0fdf4" }}
            >
              Join thousands of businesses and individuals who trust us for their delivery needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
                style={{ color: "#ffffff" }}
              >
                Start Shipping Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-300/60 text-white hover:bg-emerald-700/30 hover:text-white hover:border-emerald-300/80 px-8 py-6 text-lg backdrop-blur-sm bg-emerald-800/30 font-semibold"
                style={{ color: "#ffffff", borderColor: "#6ee7b7" }}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
        </div>
    );
};

export default CTA;