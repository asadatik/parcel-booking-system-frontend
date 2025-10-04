import Profile from "@/pages/Profile";
import CreateParcel from "@/pages/Sender/CreateParcel";

import MyParcel from "@/pages/Sender/MyParcel";
import { IconListDetails } from "@tabler/icons-react";
import { User } from "lucide-react";
export const senderSidebarItems = [


  { title: "Sender", items: [
    {
      title: "Profile",
      url: "/sender/my-profile",
      component: Profile,
      icon: User,
    },
    {
      title: "Create Parcel",
      url: "/sender/create-parcel",
      component: CreateParcel,
      icon: IconListDetails,



  },
  {
    title: "My Parcel",
    url: "/sender/my-parcel",
      component: MyParcel,
    icon: IconListDetails,
    
  },]

}

];
