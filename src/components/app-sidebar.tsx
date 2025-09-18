

import type * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { motion } from "framer-motion"
import { Package, Truck, MapPin, Users, BarChart3, Settings, Home, Send, History, Bell } from "lucide-react"

const iconMap: Record<string, React.ComponentType<any>> = {
  dashboard: Home,
  parcels: Package,
  tracking: MapPin,
  delivery: Truck,
  users: Users,
  analytics: BarChart3,
  settings: Settings,
  send: Send,
  history: History,
  notifications: Bell,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  }

  return (
    <Sidebar
      {...props}
      className="border-r-0 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-gray-900"
    >
      <SidebarHeader className="border-b border-emerald-100 dark:border-emerald-800 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 px-4 py-3"
        >
          <NavLink to="/">
           <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg"
          >
            <Package className="h-5 w-5 text-white" />
          </motion.div>
          
          </NavLink>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              ParcelPro
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Delivery Management</span>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {data.navMain.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          >
            <SidebarGroup className="mb-6">
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-3 px-3">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {group.items.map((item, itemIndex) => {
                    const IconComponent = iconMap[item.title.toLowerCase()] || Package

                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: groupIndex * 0.1 + itemIndex * 0.05 }}
                      >
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-emerald-50 dark:hover:from-emerald-900/50 dark:hover:to-emerald-800/30 hover:shadow-md hover:scale-[1.02]"
                          >
                            <NavLink
                              to={item.url}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                  ? "text-emerald-700 dark:text-emerald-300 bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30 shadow-sm"
                                  : "text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-300"
                                }`
                              }
                            >
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex-shrink-0"
                              >
                                <IconComponent className="h-4 w-4" />
                              </motion.div>
                              <span className="truncate">{item.title}</span>

                              <motion.div
                                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="sidebar-indicator"
                              />
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </motion.div>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.div>
        ))}
      </SidebarContent>

      <SidebarRail className="bg-gradient-to-b from-emerald-200 to-orange-200 dark:from-emerald-800 dark:to-orange-800" />
    </Sidebar>
  )
}
