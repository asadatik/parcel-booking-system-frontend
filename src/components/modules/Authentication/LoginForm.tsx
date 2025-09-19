
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
            import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // icons



export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm();
  const [login] = useLoginMutation();
 const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

    
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      } 
      
      console.log(res);


    } catch (err) {
      console.error(err);
   //
      if (err.data.message === "Password does not match") {
        toast.error("Invalid credentials");
      }

      if (err.data.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      }

     //  

    }
  };



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
  render={({ field }) => <FormItem>
    <FormLabel>Password</FormLabel>
    <div className="relative">
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="********"
          {...field}
          value={field.value || ""}
          className="pr-10" // space for the icon
        />
      </FormControl>

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    <FormMessage />
  </FormItem>}
/>

           
              <button type="submit" className="w-full">
                <div className="bg-gradient-to-r from-emerald-600 to-orange-400 hover:from-emerald-700 hover:to-orange-500  text-xl text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-emerald-200 dark:hover:shadow-emerald-900/50">
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
