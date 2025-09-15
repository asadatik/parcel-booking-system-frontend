/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

import SingleImageUploader from "@/components/SingleImageUploader";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useProfileUpdateMutation } from "@/redux/features/user/user.api";
import { useState } from "react";
import { toast } from "sonner";

export function ProfileUpdateModal() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const [profileUpdate] = useProfileUpdateMutation();

  const { data: user } = useUserInfoQuery(undefined);
  // const [{ files }] = useFileUpload({
  //   accept: "image/*",
  // });

  const form = useForm({
    defaultValues: {
      name: user?.data?.name || "",
      email: user?.data?.email || "",
    },
  });

  const id = user?.data?._id;

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Profile update is loading");
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    if (image) {
      formData.append("file", image as File);
    }

    try {
      const res = await profileUpdate({ id, formData });
      console.log(res);
      toast.success("Profile updated ", { id: toastId });
      setOpen(false);
    } catch (error) {
      toast.error("Profile upload failed", { id: toastId });

      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#ee4b2a] cursor-pointer mt-8">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form id="update-profile" onSubmit={form.handleSubmit(onSubmit)}>
                <SingleImageUploader
                  setImage={setImage}
                  currentImage={user?.data?.picture}
                ></SingleImageUploader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
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
            <Button type="submit" form="update-profile">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
