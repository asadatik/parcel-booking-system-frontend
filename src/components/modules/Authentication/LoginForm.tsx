/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Shield, Loader2 } from "lucide-react";

// form validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  admin: { email: "admin123@gmail.com", password: "Pa$$w0rd!" },
  sender: { email: "asadatik709@gmail.com", password: "Pa$$w0rd!" },
  receiver: { email: "reciver@gmail.com", password: "Pa$$w0rd!" },
} as const;

export function LoginForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const fillDemoCredentials = (role: keyof typeof DEMO_CREDENTIALS) => {
    const creds = DEMO_CREDENTIALS[role];
    form.setValue("email", creds.email);
    form.setValue("password", creds.password);
    toast.info(`${role.toUpperCase()} credentials loaded!`);
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
     
      const errorMessage = err?.data?.message || "Something went wrong";
      
      if (errorMessage === "User is not verified") {
        toast.error("Account not verified. Redirecting...");
        navigate("/verify", { state: data.email });
      } else {
        toast.error(errorMessage);
      }
      console.error("Login Error:", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Demo login buttons with UI separation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3 justify-center mb-4 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-emerald-500/30"
      >
        <DemoButton icon={<Shield size={16}/>} label="Admin" onClick={() => fillDemoCredentials("admin")} color="from-emerald-500 to-teal-600" />
        <DemoButton icon={<Mail size={16}/>} label="Sender" onClick={() => fillDemoCredentials("sender")} color="from-orange-500 to-amber-600" />
        <DemoButton icon={<User size={16}/>} label="Receiver" onClick={() => fillDemoCredentials("receiver")}   color="from-[#1ECECA] to-[#3DD8D8]"/>
      </motion.div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Login to your account</h1>
        <p className="text-sm text-muted-foreground">Enter your credentials to access your dashboard</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
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
                    <Input type={showPassword ? "text" : "password"} className="pr-10" {...field} />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            disabled={isLoading} 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-emerald-600 to-orange-500 hover:opacity-90 transition-all text-white font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-emerald-600 hover:underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}


function DemoButton({ label, onClick, color, icon }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        className={cn("gap-2 border-none text-white shadow-md", `bg-gradient-to-r ${color}`)}
      >
        {icon}
        {label}
      </Button>
    </motion.div>
  );
}