/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";

// Particle System Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 15));

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        targetOpacity: Math.random() * 0.5 + 0.2,
        vx: 0,
        vy: 0,
        connection: [],
      });
    }
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (e : any) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(2, 44, 34, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          particle.vx = (dx / distance) * 2;
          particle.vy = (dy / distance) * 2;
        } else {
          particle.vx *= 0.95;
          particle.vy *= 0.95;
        }

        particle.x += particle.speedX + particle.vx;
        particle.y += particle.speedY + particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Opacity oscillation
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.05;
        if (Math.random() < 0.01) {
          particle.targetOpacity = Math.random() * 0.5 + 0.2;
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (distance2 < 120) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${
              (1 - distance2 / 120) * 0.15 * particle.opacity
            })`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10"
      style={{ pointerEvents: "none" }}
    />
  );
};

// Animated Gradient bg
const AnimatedGradientBg = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
  
      <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#0a3a2e] to-[#021f1a]" />

      {/* Animated gradient orbs */}
      <div
        className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{
          animation: "blob 7s infinite",
        }}
      />
      <div
        className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{
          animation: "blob 7s infinite 2s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"
        style={{
          animation: "blob 9s infinite 4s",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(16, 185, 129, 0.05) 25%, rgba(16, 185, 129, 0.05) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.05) 75%, rgba(16, 185, 129, 0.05) 76%, transparent 77%, transparent),
                            linear-gradient(90deg, transparent 24%, rgba(16, 185, 129, 0.05) 25%, rgba(16, 185, 129, 0.05) 26%, transparent 27%, transparent 74%, rgba(16, 185, 129, 0.05) 75%, rgba(16, 185, 129, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial light effect */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.8);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};

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
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
 
      <AnimatedGradientBg />
      <ParticleBackground />

   {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-10 md:py-16 w-full">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >

          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <Badge className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-500/30 transition-all duration-300 backdrop-blur-xl px-4 py-2 text-sm font-medium tracking-wide rounded-full shadow-lg shadow-emerald-500/10">
              🚀 Now serving 50+ cities nationwide
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-center text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight text-white drop-shadow-lg"
            variants={fadeInUp}
          >
            Deliver{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                Anything,
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-400/80 to-emerald-500/0 blur-sm" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Anywhere
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-center text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            variants={fadeInUp}
          >
            Fast, secure, and affordable parcel delivery service that connects
            your world — tracked in real time, every step of the way.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={handleBookParcel}
                disabled={isLoading || isChecking}
                className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white border-0 shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 px-9 py-6 text-base font-semibold rounded-xl group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                {isLoading || isChecking ? (
                  <span className="flex items-center gap-2 relative z-10">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Parcel
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={handleTrackParcel}
                className="border border-emerald-400/50 text-emerald-100 hover:bg-emerald-500/20 hover:border-emerald-300/70 hover:text-white px-9 py-6 text-base backdrop-blur-xl bg-white/5 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/10"
              >
                Track Parcel
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-0 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/15 bg-white/8 backdrop-blur-2xl rounded-2xl max-w-xl mx-auto overflow-hidden shadow-2xl shadow-emerald-900/20"
            variants={fadeInUp}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex-1 text-center px-6 py-6 hover:bg-white/10 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text tracking-tight group-hover:from-white group-hover:to-emerald-100 transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-xs text-emerald-300/70 mt-1 font-medium tracking-widest uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-24 left-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400/15 rounded-full blur-3xl animate-pulse z-0" style={{ animationDuration: "4s" }} />
    </section>
  );
};

export default HeroSection;
