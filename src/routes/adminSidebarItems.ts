import AllParcel from "@/pages/admin/AllParcels";
import AllUser from "@/pages/admin/AllUser";
import Analytics from "@/pages/admin/Analytics";
import Profile from "@/pages/Profile";
import {  IconDashboard, IconFolder, IconListDetails,} from "@tabler/icons-react";
import { User } from "lucide-react";

export const adminSidebarItems = [
  {
    title: "Analytics",
    url: "/admin/analytics",
    component: Analytics,
    icon: IconDashboard,
  },
  {
    title: "Profile",
    url: "/admin/my-profile",
    component: Profile,
    icon: User,
  },

  {
    title: "All User",
    url: "/admin/all-user",
    icon: IconListDetails,
    component: AllUser,
  },
  {
    title: "All Parcel",
    url: "/admin/all-parcel",
    icon: IconFolder,
    component: AllParcel,
  },
];
