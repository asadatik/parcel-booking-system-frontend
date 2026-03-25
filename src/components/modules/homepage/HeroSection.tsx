import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  useUserInfoQuery,
  useLogoutMutation,
  authAPi,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useState } from "react";
import Swal from "sweetalert2";

const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const [isChecking, setIsChecking] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleBookParcel = async () => {
    if (isChecking || isLoading) return;
    setIsChecking(true);
    try {
      if (!user?.data) {
        toast.error("👤 Must be a Sender! Please login first");
        navigate("/login");
        return;
      }
      if (user.data.role !== "SENDER") {
        const result = await Swal.fire({
          title: "🚚 Sender Account Required!",
          text: "Only Sender accounts can book parcels",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ef4444",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Logout & Login as Sender",
          cancelButtonText: "Cancel",
          customClass: { popup: "animate__animated animate__shakeX" },
        });
        if (!result.isConfirmed) return;
        await logout(undefined).unwrap();
        dispatch(authAPi.util.resetApiState());
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      navigate("/sender");
    } catch (error) {
      console.error("Error while booking parcel:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleTrackParcel = () => {
    navigate("/track-parcel");
  };

  const stats = [
    { value: "50+", label: "Cities Covered" },
    { value: "99.8%", label: "On-Time Rate" },
    { value: "2M+", label: "Parcels Delivered" },
  ];

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#022c22]">
     
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#022c22] to-teal-950" />


      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/3" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-teal-400/8 rounded-full blur-2xl -translate-y-1/2" />

   
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

  
      <div className="absolute -right-32 top-0 h-full w-[500px] bg-gradient-to-l from-emerald-800/20 to-transparent skew-x-[-12deg] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-20 container mx-auto px-4 py-24 lg:py-36 w-full">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
      
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors backdrop-blur-sm px-4 py-1.5 text-sm font-medium tracking-wide rounded-full">
              🚀 Now serving 50+ cities nationwide
            </Badge>
          </motion.div>

        
          <motion.h1
            className="text-center text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight text-white"
            variants={fadeInUp}
          >
            Deliver{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Anything,
              </span>
        
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-emerald-500/0" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Anywhere
            </span>
          </motion.h1>

  
          <motion.p
            className="text-center text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeInUp}
          >
            Fast, secure, and affordable parcel delivery service that connects your world — tracked in real time, every step of the way.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={handleBookParcel}
                disabled={isLoading || isChecking}
                className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white border-0 shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] transition-all duration-300 px-9 py-6 text-base font-semibold rounded-xl"
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

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={handleTrackParcel}
                className="border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/10 hover:border-emerald-400/60 hover:text-white px-9 py-6 text-base backdrop-blur-sm bg-white/5 font-semibold rounded-xl transition-all duration-300"
              >
                Track Parcel
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl max-w-xl mx-auto overflow-hidden"
            variants={fadeInUp}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 text-center px-6 py-5 hover:bg-white/5 transition-colors duration-200"
              >
                <p className="text-2xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-300/70 mt-0.5 font-medium tracking-widest uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating ambient orbs */}
      <div className="absolute top-16 left-8 w-20 h-20 bg-orange-400/15 rounded-full blur-2xl animate-bounce" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-16 right-8 w-28 h-28 bg-emerald-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: "3s" }} />
      <div className="absolute top-1/2 right-16 w-14 h-14 bg-teal-300/10 rounded-full blur-xl animate-bounce" style={{ animationDuration: "5s", animationDelay: "1s" }} />
    </section>
  );
};

export default HeroSection;