import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useUserInfoQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { authAPi } from "@/redux/features/auth/auth.api"
import { useState } from "react"
import Swal from 'sweetalert2'

const HeroSection = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data: user, isLoading } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const [isChecking, setIsChecking] = useState(false)

  console.log(user);

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

  const handleBookParcel = async () => {
    if (isChecking || isLoading) return
    
    setIsChecking(true)

    if (!user?.data) {
      toast.error("👤 Must be a Sender! Please login first")
      navigate("/login")
      setIsChecking(false)
      return
    }

    // Check if user is a sender
    if (user.data.role !== "SENDER") {
      Swal.fire({
        title: "🚚 Sender Account Required!",
        text: "Only Sender accounts can book parcels",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Logout & Login as Sender",
        cancelButtonText: "Cancel",
        customClass: {
          popup: 'animate__animated animate__shakeX'
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
      
          try {
            await logout(undefined).unwrap()
            dispatch(authAPi.util.resetApiState())
            localStorage.removeItem("user")
          
            navigate("/login")
          } catch (error) {
            console.error("Logout failed:", error)
            localStorage.removeItem("user")
            navigate("/login")
          }
        }
      })
      setIsChecking(false)
      return
    }
    navigate("/sender")
    setIsChecking(false)
  }

  const handleTrackParcel = () => {
    navigate("/track-parcel")
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <section
        className="relative overflow-hidden min-h-[80vh] flex items-center"
        style={{ backgroundColor: "#047857" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"></div>
        <div className="absolute inset-0 bg-[url('/abstract-delivery-pattern.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-20 container mx-auto px-4 py-20 lg:py-32 text-white w-full">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-emerald-800/60 text-white border-emerald-600/70 hover:bg-emerald-800/80 transition-colors backdrop-blur-sm">
                🚀 Now serving 50+ cities nationwide
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight text-white drop-shadow-lg"
              variants={fadeInUp}
              style={{ color: "#ffffff" }}
            >
              Deliver Anything,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Anywhere
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-emerald-50 max-w-2xl mx-auto text-pretty drop-shadow-sm"
              variants={fadeInUp}
              style={{ color: "#f0fdf4" }}
            >
              Fast, secure, and affordable parcel delivery service that connects your world
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={fadeInUp}>
              {/* Primary Book Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  onClick={handleBookParcel}
                  disabled={isLoading || isChecking}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
                  style={{ color: "#ffffff" }}
                >
                  {isLoading || isChecking ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <>
                      Book a Parcel
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Track Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleTrackParcel}
                  className="border-emerald-300/60 text-white hover:bg-emerald-700/30 hover:text-white hover:border-emerald-300/80 px-8 py-6 text-lg backdrop-blur-sm bg-emerald-800/30 font-semibold"
                  style={{ color: "#ffffff", borderColor: "#6ee7b7" }}
                >
                  Track Parcel
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-orange-400/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <div className="w-24 h-24 bg-emerald-400/20 rounded-full blur-xl"></div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
