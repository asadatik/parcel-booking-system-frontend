/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";




const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp, { isLoading: sendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: verifyingOtp }] = useVerifyOtpMutation();
  const [timer, setTimer] = useState(60);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // Send OTP handler
  const handleSendOtp = async () => {
    const toastId = toast.loading("Sending OTP...");
    try {
      const res = await sendOtp({ email }).unwrap();

      if (res.success) {
        toast.success("OTP Sent Successfully", { id: toastId });
        setConfirmed(true);
        setTimer(60);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP", { id: toastId });
    }
  };

  // Verify OTP handler
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP...");
    const userInfo = { email, otp: data.pin };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        toast.success("OTP Verified Successfully", { id: toastId });
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid OTP", { id: toastId });
    }
  };

  // // Redirect if no email found
  // useEffect(() => {
  //   if (!email) navigate("/", { replace: true });
  // }, [email]);

  // Timer countdown for resend OTP
  useEffect(() => {
    if (!email || !confirmed) return;

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirmed]);

  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br /> <b>{email}</b>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} aria-label="Digit 1" />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} aria-label="Digit 2" />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} aria-label="Digit 3" />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} aria-label="Digit 4" />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} aria-label="Digit 5" />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} aria-label="Digit 6" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Didn’t get OTP?{" "}
                        <Button
                          onClick={handleSendOtp}
                          type="button"
                          variant="link"
                          disabled={timer !== 0 || sendingOtp}
                          className={cn("p-0 m-0", {
                            "cursor-pointer text-blue-600": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Resend OTP
                        </Button>{" "}
                        {timer > 0 && `in ${timer}s`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              form="otp-form"
              type="submit"
              disabled={verifyingOtp || form.formState.isSubmitting}
            >
              {verifyingOtp ? "Verifying..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> <b>{email}</b>
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleSendOtp}
              disabled={sendingOtp}
              className="w-[300px]"
            >
              {sendingOtp ? "Sending..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
