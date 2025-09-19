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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditParcelMutation } from "@/redux/features/parcel/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { motion } from "framer-motion";

// Validation Schema 
const parcelSchema = z.object({
  status: z.string().min(1, "Select any status"),
});

export function EditParcelStatus({ singleParcel }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editParcel] = useEditParcelMutation();

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      status: singleParcel?.status || "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!singleParcel?._id) return toast.error("Parcel ID missing");
    setLoading(true);
    const toastId = toast.loading("Parcel status updating...");
    const parcelId = singleParcel._id; // use _id for backend route
    try {
      await editParcel({ parcelId, data }).unwrap();
      toast.success("Parcel status updated", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Parcel status updating failed", { id: toastId });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg hover:scale-110 hover:shadow-emerald-400/50 transition-transform duration-300">
          <Settings className="w-6 h-6 text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-center font-semibold">
              Edit Parcel Status
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              id="update-parcel"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="hover:scale-105 transition-transform duration-200"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="update-parcel"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-md rounded-lg hover:from-emerald-500 hover:via-emerald-400 hover:to-orange-300 transition-all duration-300"
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
