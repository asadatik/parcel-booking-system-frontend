import AllParcel from "@/pages/admin/AllParcels";
import AllUser from "@/pages/admin/AllUser";

import Profile from "@/pages/Profile";
import {   IconFolder, IconListDetails,} from "@tabler/icons-react";
import { User } from "lucide-react";
export const adminSidebarItems = [
  {
    title: "Admin",
    items: [
    
      {
        title: "Profile",
        url: "/admin/my-profile",
        component: Profile,
        icon: User,
      },
      {
        title: "All User",
        url: "/admin/all-users",
        component: AllUser,
        icon: IconListDetails,
      },
      {
        title: "All Parcel",
        url: "/admin/all-parcel",
        component: AllParcel,
        icon: IconFolder,
      },
    ],
  },
];
