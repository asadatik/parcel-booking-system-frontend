import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/public/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import Home from "@/pages/public/Home";
import { generateRoutes } from "@/utils/generateRoutes";
import { senderSidebarItems } from "./senderaSideBar";
import { adminSidebarItems } from "./adminSidebarItems";
import Contact from "@/pages/public/Contact";
import { receiverSidebarItems } from "./receiverSideBarItems";
import NotFound from "@/pages/NotFound";

import TrackParcelResultPage from "@/pages/public/TrackParcelResultPage";
import TrackParcelPage from "@/pages/public/TrackParcelPage";

export const router = createBrowserRouter([
  //general routes
  {
    Component: App,
    path: "/",
    errorElement: <NotFound />,
    children: [
      { index: true, Component: Home },
      { path: "contact", Component: Contact },
      { path: "about", Component: About },
      { path: "track", Component: TrackParcelPage },
      { path: "track/:trackingId", Component: TrackParcelResultPage },
    ],
  },

  // Admin dashboard
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/my-profile" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  // Sender dashboard
  {
    Component: withAuth(DashboardLayout, role.SENDER as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/my-profile" /> },
      ...generateRoutes(senderSidebarItems),
    ],
  },

  // Receiver dashboard
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/my-profile" /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },

  // Auth routes
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/verify", Component: Verify },
]);