/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useEditParcelMutation } from "@/redux/features/parcel/parcel.api";
import { useGetAllReceiverQuery } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

// ----------------- Validation Schema -----------------
const parcelSchema = z.object({
  type: z.string().min(1, "Type is required"),
  weight: z.number().min(0.1, "Weight must be positive"),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  receiver: z.string().min(1, "Receiver is required"),
  couponCode: z.string().optional(),
});

export function EditParcelModal({ singleParcel }: any) {
  const [open, setOpen] = useState(false);

  const { data: user } = useUserInfoQuery(undefined);

  const [editParcel] = useEditParcelMutation();
  const { data: receiver } = useGetAllReceiverQuery(undefined);

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      type: singleParcel?.type || "",
      weight: singleParcel?.weight || 0,
      pickupAddress: singleParcel?.pickupAddress || "",
      deliveryAddress: singleParcel?.deliveryAddress || "",
      receiver: singleParcel?.receiver || "",
      couponCode: singleParcel?.couponCode || "NEW50",
    },
  });

  const allReceiver = receiver?.data?.data;
  console.log("receiver", allReceiver);

  const onSubmit = async (data: any) => {
    data.sender = user?.data?._id;

    console.log("Parcel form submitted:", data);
    const toastId = toast.loading("Parcel updating...");
    const parcelId = singleParcel?.trackingId;
    try {
      const res = await editParcel({ parcelId, data }).unwrap();
      console.log(res);
      toast.success("Parcel updated", { id: toastId });
    } catch (error) {
      toast.error("Parcel updating failed", { id: toastId });

      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer ">
            <Edit></Edit>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Parcel</DialogTitle>
          </DialogHeader>
          <div className="w-full mx-auto bg-white rounded-xl ">
            <Form {...form}>
              <form
                id="update-parcel"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
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
                        <Input
                          placeholder="Enter delivery address"
                          {...field}
                        />
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
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="update-parcel">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
