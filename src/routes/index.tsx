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


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
            {
        index: true,
        Component: Home   
      },
      {
        Component: Contact,
        path: "contact",
      },

      {
        Component: About,
        path: "about",
      },
    ],


    
  },
//
 {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/my-profile" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.SENDER as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/my-profile"></Navigate> },

      
      ...generateRoutes(senderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/my-profile"></Navigate> },

    
      ...generateRoutes(receiverSidebarItems),
    ],
  },


//


  // {
  //   Component: withAuth(DashboardLayout, role.user as TRole),
  //   path: "/user",
  //   children: [
  //     { index: true, element: <Navigate to="/user/bookings" /> },
  //     ...generateRoutes(userSidebarItems),
  //   ],
  // },

//
    {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {


    Component: Verify,
    path: "/verify",

    
  },
]);
