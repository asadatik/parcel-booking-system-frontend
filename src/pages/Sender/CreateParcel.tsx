/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Package, MapPin, User, Weight, FileText, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useGetAllReceiverQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";

// 
const parcelSchema = z.object({
  type: z.string().min(1, "Type is required"),
  weight: z.number().min(0.1, "Weight must be positive"),

  deliveryAddress: z.string().min(1, "Delivery address is required"),
  receiver: z.object({
    name: z.string().min(1, "Receiver name is required"),
    phone: z.string().min(1, "Receiver phone is required"),
    address: z.string().min(1, "Receiver address is required"),

  }),

    DeliveryDate: z.string().min(1, "Delivery date is required"),
 parcelFee: z.number().min(1, "Parcel fee is required"),
  couponCode: z.string().optional(),
});

//  Component
const CreateParcel = () => {
  const [createParcel] = useCreateParcelMutation();
  const { data: user } = useUserInfoQuery(undefined);
  const { data: receiver } = useGetAllReceiverQuery(undefined);

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      type: "",
      weight: 0,
      deliveryAddress: "",
  
     receiver: { name: "", phone: "", address: "" },
           parcelFee: 0,
      DeliveryDate: "",

      couponCode: "50",
    },
  });

  const allReceiver = receiver?.data?.data;
  console.log("receiver", allReceiver);

  // const onSubmit = async (data: any) => {
  //   data.sender = user?.data?._id;

  //   console.log("Parcel form submitted:", data);
  //   const toastId = toast.loading("Parcel creating...");

  //   try {
  //     const res = await createParcel(data).unwrap();
  //     console.log(res);
  //     toast.success("Parcel created", { id: toastId });
  //   } catch (error) {
  //     toast.error("Parcel creating failed", { id: toastId });

  //     console.log(error);
  //   }
  // };
 const onSubmit = async (data: any) => {
    data.sender = user?.data?._id;

    // Ensure proper date format
    data.DeliveryDate = new Date(data.DeliveryDate).toISOString();

    console.log("Final Parcel Data:", data);

    const toastId = toast.loading("Parcel creating...");

    try {
      const res = await createParcel(data).unwrap();
      console.log(res);
      toast.success("Parcel created successfully", { id: toastId });
    } catch (error) {
      toast.error("Parcel creation failed", { id: toastId });
      console.error(error);
    }
  };



  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .slide-in { animation: slideIn 0.5s ease-out; }
        .scale-in { animation: scaleIn 0.4s ease-out; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .float { animation: float 3s ease-in-out infinite; }
        .glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .gradient-border {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(45deg, #10b981, #f97316) border-box;
          border: 2px solid transparent;
        }
        .input-enhanced {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 16px 20px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.8);
        }
        .input-enhanced:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
        }
        .input-enhanced:hover {
          border-color: #34d399;
          background: rgba(255, 255, 255, 0.9);
        }
        .label-enhanced {
          font-weight: 600;
          font-size: 15px;
          color: #374151;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .select-enhanced {
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 16px 20px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .select-enhanced:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
          background: rgba(255, 255, 255, 1);
        }
        .select-enhanced:hover {
          border-color: #34d399;
          background: rgba(255, 255, 255, 0.9);
        }
        .button-enhanced {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 16px;
          padding: 18px 32px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .button-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .button-enhanced:hover::before {
          left: 100%;
        }
        .button-enhanced:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }
        .button-enhanced:active {
          transform: translateY(-1px);
        }
        .form-field-enhanced {
          margin-bottom: 28px;
          position: relative;
        }
        .icon-container {
          width: 20px;
          height: 20px;
          color: #10b981;
        }
        .error-message {
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          animation: slideIn 0.3s ease-out;
        }
        .success-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 float"></div>
          <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="w-full max-w-2xl mx-auto relative z-10">
          <div className="glass rounded-3xl shadow-2xl p-8 fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl glow">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
                  Create New Parcel
                </h2>
              </div>
              <p className="text-gray-600 text-lg">Fill in the details to create your parcel shipment</p>
            </div>

            <Form {...form}>
              <div className="space-y-6">
                {/* Parcel Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="form-field-enhanced scale-in">
                      <FormLabel className="label-enhanced">
                        <FileText className="icon-container" />
                        Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="select-enhanced">
                            <SelectValue placeholder="Select parcel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-2 border-emerald-200 rounded-xl">
                          <SelectItem value="Document" className="hover:bg-emerald-50 rounded-lg m-1">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-emerald-600" />
                              Document
                            </div>
                          </SelectItem>
                          <SelectItem value="Package" className="hover:bg-emerald-50 rounded-lg m-1">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-emerald-600" />
                              Package
                            </div>
                          </SelectItem>
                          <SelectItem value="Fragile" className="hover:bg-emerald-50 rounded-lg m-1">
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-emerald-600" />
                              Fragile
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="error-message" />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="form-field-enhanced scale-in" style={{animationDelay: '0.1s'}}>
                      <FormLabel className="label-enhanced">
                        <Weight className="icon-container" />
                        Weight (kg)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          className="input-enhanced"
                          placeholder="Enter package weight"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage className="error-message" />
                    </FormItem>
                  )}
                />

        
                {/* Delivery Address */}
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className="form-field-enhanced scale-in" style={{animationDelay: '0.3s'}}>
                      <FormLabel className="label-enhanced">
                        <MapPin className="icon-container" />
                        Delivery Address
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter delivery address" 
                          className="input-enhanced"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="error-message" />
                    </FormItem>
                  )}
                />

                {/* Receiver */}
                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem className="form-field-enhanced scale-in" style={{animationDelay: '0.4s'}}>
                      <FormLabel className="label-enhanced">
                        <User className="icon-container" />
                        Receiver
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger className="select-enhanced">
                              <SelectValue placeholder="Select receiver" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border-2 border-emerald-200 rounded-xl">
                            {allReceiver?.map((receiver: any) => (
                              <SelectItem 
                                key={receiver?._id}
                                value={receiver?._id}
                                className="hover:bg-emerald-50 rounded-lg m-1"
                              >
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-emerald-600" />
                                  {receiver?.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="error-message" />
                    </FormItem>
                  )}
                />

                {/* Coupon Code */}
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem className="form-field-enhanced scale-in" style={{animationDelay: '0.5s'}}>
                      <FormLabel className="label-enhanced">
                        <Gift className="icon-container" />
                        Coupon Code
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Enter coupon code (optional)" 
                            className="input-enhanced pr-20"
                            {...field} 
                          />
                          {field.value && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Applied
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage className="error-message" />
                    </FormItem>
                  )}
                />

                <div className="pt-4 scale-in" style={{animationDelay: '0.6s'}}>
                  <Button type="submit" className="button-enhanced w-full" onClick={form.handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <Package className="w-5 h-5" />
                      <span>Create Parcel</span>
                    </div>
                  </Button>
                </div>
              </div>
            </Form>

            {/* Footer Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200/50 scale-in" style={{animationDelay: '0.7s'}}>
              <div className="flex items-center justify-center gap-2 text-emerald-700">
                <Package className="w-5 h-5" />
                <span className="font-semibold">Secure & Fast Delivery Guaranteed</span>
              </div>
              <p className="text-center text-emerald-600 mt-2 text-sm">
                Your parcel will be handled with care and delivered safely to the destination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateParcel;