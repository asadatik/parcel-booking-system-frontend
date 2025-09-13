import Profile from "@/pages/Profile";
import ConfirmedParcel from "@/pages/Receiver/ConfirmedParcel";
import IncomingParcel from "@/pages/Receiver/IncomingParcel";
import { IconListDetails } from "@tabler/icons-react";
import { User } from "lucide-react";

export const receiverSidebarItems = [
  {
    title: "Profile",
    url: "/receiver/my-profile",
    component: Profile,
    icon: User,
  },
  {
    title: "Incoming Parcel",
    url: "/receiver/incoming-parcel",
    icon: IconListDetails,
    component: IncomingParcel,
  },
  {
    title: "Deleiverd Parcel",
    url: "/receiver/deleiverd-parcel",
    icon: IconListDetails,
    component: ConfirmedParcel,
  },
];
