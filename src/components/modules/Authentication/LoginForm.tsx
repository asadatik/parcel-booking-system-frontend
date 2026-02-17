/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // ADD: Import shadcn Button for demo buttons
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; // ADD: For animations
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Shield } from "lucide-react"; 

// Demo credentials 
const DEMO_CREDENTIALS = {
  admin: { email: "admin123@gmail.com", password: "Pa$$w0rd!" },
  sender: { email: "asadatik709@gmail.com", password: "Pa$$w0rd!" },
  receiver: { email: "reciver@gmail.com", password: "Pa$$w0rd!" },
} as const;



export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm(); 
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);


  const fillDemoCredentials = (role: keyof typeof DEMO_CREDENTIALS) => {
    const creds = DEMO_CREDENTIALS[role];
    form.setValue("email", creds.email);
    form.setValue("password", creds.password);
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials loaded!`);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      } 
      
      console.log(res);
    } catch (err) {
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as any).data === "object" &&
        (err as any).data !== null &&
        "message" in (err as any).data
      ) {
        const message = (err as any).data.message;
        console.log(message);
        toast.warning("something is going wrong");
        if (message === "Invalid Password") {
          toast.error("Invalid credentials");
        }
        if (message === "User is not verified") {
          toast.error("Your account is not verified");
          navigate("/verify", { state: data.email });
        }
      } else {
        toast.warning("Something went wrong");
        console.log(err);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
 {/*  */}
    <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-wrap gap-3 justify-center mb-8 p-6 bg-gradient-to-br from-white/20 to-slate-100/40 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500"
>
  {/* ADMIN - Purple/Shield */}
  <motion.div
    className="group"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button
      type="button"
      onClick={() => fillDemoCredentials("admin")}
      className="gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-purple-500/50 border-transparent hover:border-emerald-400/50 backdrop-blur-sm font-medium px-6 py-3 rounded-2xl transition-all duration-500 group-hover:bg-opacity-100"
    >
      <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
      Admin Demo
    </Button>
  </motion.div>

  {/* SENDER - Emerald/Mail */}
  <motion.div
    className="group"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button
      type="button"
      onClick={() => fillDemoCredentials("sender")}
      className="gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white shadow-xl hover:shadow-emerald-500/50 border-transparent hover:border-emerald-400/50 backdrop-blur-sm font-medium px-6 py-3 rounded-2xl transition-all duration-500 group-hover:bg-opacity-100"
    >
      <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
      Sender Demo
    </Button>
  </motion.div>

  {/* RECEIVER - Orange/User (Fixed function call) */}
  <motion.div
    className="group"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Button
      type="button"
      onClick={() => fillDemoCredentials("receiver")} 
      className="gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-orange-500/50 border-transparent hover:border-orange-400/50 backdrop-blur-sm font-medium px-6 py-3 rounded-2xl transition-all duration-500 group-hover:bg-opacity-100"
    >
      <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      Receiver Demo
    </Button>
  </motion.div>
</motion.div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        value={field.value || ""}
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="w-full">
              <div className="bg-gradient-to-r from-emerald-600 to-orange-400 hover:from-emerald-700 hover:to-orange-500 text-xl text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-emerald-200 dark:hover:shadow-emerald-900/50">
                Login
              </div>
            </button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}