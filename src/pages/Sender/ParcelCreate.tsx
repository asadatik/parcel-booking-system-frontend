/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

import { toast } from "sonner";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetAllReceiverQuery } from "@/redux/features/user/user.api";



// Validation schema
const parcelSchema = z.object({
  type: z.string().min(1, "Type is required"),
  weight: z.number().min(0.1, "Weight must be positive"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  receiver: z.string().min(1, "Receiver is required"),
  couponCode: z.string().optional(),
});

// 

const ParcelCreate = () => {

  const [createParcel   ] = useCreateParcelMutation();
  const { data: user } = useUserInfoQuery(undefined);
  const { data: receiver } = useGetAllReceiverQuery(undefined);


  // Form setup
  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      type: "",
      weight: 0,
      pickupAddress: "",
      deliveryAddress: "",
      receiver: "",
      couponCode: "swiftship",
    },
  });


  const allReceiver = receiver?.data?.data;
  console.log("receiver", allReceiver);

  const onSubmit = async (data: any) => {
    data.sender = user?.data?._id;


    console.log("Parcel form submitted:", data);
    const toastId = toast.loading("Parcel creating...");


    try {
      const res = await createParcel(data).unwrap();
      console.log(res);
      toast.success("Parcel created", { id: toastId });
    } catch (error) {
      toast.error("Parcel creating failed", { id: toastId });

      console.log(error);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Parcel</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Parcel Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Package">Package</SelectItem>
                    <SelectItem value="Fragile">Fragile</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          {/* Pickup Address */}
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pickup address" {...field} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          {/* Delivery Address */}
          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter delivery address" {...field} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          {/* Receiver */}
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Receiver" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allReceiver?.map((receiver: any) => (
                        <SelectItem value={receiver?._id}>
                          {receiver?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          {/* Coupon Code */}
          <FormField
            control={form.control}
            name="couponCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon Code</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ParcelCreate;
