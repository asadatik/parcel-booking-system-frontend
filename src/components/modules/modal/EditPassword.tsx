/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";

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

import { usePasswordUpdateMutation } from "@/redux/features/user/user.api";

export function EditPassword() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwordUpdate] = usePasswordUpdateMutation();

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const toastId = toast.loading("Updating password...");
    try {
      const res = await passwordUpdate(data).unwrap();
      console.log(res);
      toast.success("Password updated successfully ✅", { id: toastId });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Password update failed ❌", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-600 via to-orange-400 hover:scale-105 transition-transform duration-300">
          Edit Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle className="text-center mb-4 text-2xl   "  >Edit Password</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              id="update-password"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter old password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end gap-2 mt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  form="update-password"
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-600 to-orange-400 hover:scale-105 transition-transform duration-300"
                >
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
