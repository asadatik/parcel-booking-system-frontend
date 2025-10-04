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
import { useConfirmDeliveryMutation } from "@/redux/features/parcel/parcel.api";
import { CheckCircle, AlertTriangle } from "lucide-react";



export function ParcelConfirmModal({ singleParcel }: any) {
  const [confirmDelivery] = useConfirmDeliveryMutation();

  const handleConfirmDelivery = async () => {
    try {
      await confirmDelivery({
        parcelId: singleParcel._id,
        data: { currentStatus: "Delivered", isDelivered: true },
      }).unwrap();
      alert("Parcel marked as Delivered!");
    } catch (error) {
      console.error(error);
      alert("Failed to confirm delivery");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={singleParcel.currentStatus === "Delivered" ? "secondary" : "destructive"}
            disabled={singleParcel.currentStatus === "Delivered"}
            className="cursor-pointer"
          >
            <CheckCircle className="w-5 h-5 mr-2" /> 
            {singleParcel.currentStatus === "Delivered" ? "Delivered" : "Confirm Delivery"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="enhanced-alert-content">
          <AlertDialogHeader className="enhanced-alert-header">
            <AlertDialogTitle className="enhanced-alert-title">
              <div className="warning-icon-container">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              Confirm Parcel Delivery?
            </AlertDialogTitle>
            <AlertDialogDescription className="enhanced-alert-description">
              Are you sure you want to mark this parcel as delivered? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="enhanced-alert-footer">
            <AlertDialogCancel className="cancel-button-enhanced">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="continue-button-enhanced"
              onClick={handleConfirmDelivery}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
