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
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditParcelMutation } from "@/redux/features/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

// ----------------- Validation Schema -----------------
const parcelSchema = z.object({
  status: z.string().min(1, "Select any status"),
});

export function EditParcelStatusModal({ singleParcel }: any) {
  const [open, setOpen] = useState(false);

  console.log("singleParcel ", singleParcel);

  const [editParcel] = useEditParcelMutation();

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      status: singleParcel?.status || "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Parcel status submitted:", data);
    const toastId = toast.loading("Parcel status updating...");
    const parcelId = singleParcel?.trackingId;
    try {
      const res = await editParcel({ parcelId, data }).unwrap();
      console.log(res);
      toast.success("Parcel status updated", { id: toastId });
    } catch (error) {
      toast.error("Parcel status updating failed", { id: toastId });

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
            <DialogTitle>Edit Parcel Status</DialogTitle>
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
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
                          <SelectItem value="Requested">Requested</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Dispatched">Dispatched</SelectItem>
                          <SelectItem value="In Transit">In Transit</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
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
