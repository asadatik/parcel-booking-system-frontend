/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEditParcelMutation } from "@/redux/features/parcel/parcel.api";
import { BookCheck } from "lucide-react";
import { toast } from "sonner";

export function ParcelConfirmModal({ singleParcel }: any) {
  const [editParcel] = useEditParcelMutation();

  const handleConfirm = async () => {
    const toastId = toast.loading("Parcel delivery confirm loading...");

    const parcelId = singleParcel?.trackingId;
    const data = { status: "Delivered" };

    try {
      const res = await editParcel({ parcelId, data }).unwrap();

      console.log(res);
      toast.success("Parcel delivery confirmed", { id: toastId });
    } catch (error) {
      toast.error("Parcel delivery confirm failed", { id: toastId });

      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {singleParcel.status === "In Transit" ? (
          <Button variant={"secondary"} className="cursor-pointer">
            <BookCheck />
          </Button>
        ) : (
          <Button disabled variant={"secondary"} className="cursor-not-allowed">
            <BookCheck />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently Confirm your
            parcel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
