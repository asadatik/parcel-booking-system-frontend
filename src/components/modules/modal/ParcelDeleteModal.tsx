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
import { DeleteIcon } from "lucide-react";

export function ParcelDeleteModal({ singleParcel }: any) {
  console.log("singleParcel ", singleParcel);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {singleParcel.status === "Dispatched" ? (
          <Button disabled variant={"secondary"} className="cursor-not-allowed">
            <DeleteIcon></DeleteIcon>{" "}
          </Button>
        ) : (
          <Button variant={"secondary"} className="cursor-pointer">
            <DeleteIcon></DeleteIcon>{" "}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
