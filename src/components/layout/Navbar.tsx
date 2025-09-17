import { Menu } from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {


  authAPi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, NavLink } from "react-router";
import { toast } from "sonner";
import Loader from "../modules/shared/Loading";


import ProfileButton from "../modules/shared/ProfileButton";
import { ModeToggle } from "./ModeToggler";
import { useEffect } from "react";

interface MenuItem {
  title: string;
  url: string;
}

const menuItems = [
  { title: "Home", url: "/", role: "PUBLIC" }, 
  {
    title: "About",
    url: "/about",
    role: "PUBLIC",
  },
  {
    title: "Contact",
    url: "/contact",
    role: "PUBLIC",
  },

];

const Navbar = () => {
  const { data: user, isLoading } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user?.data) {
      console.log("user data from navbar", user.data)
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await logout(undefined)
      dispatch(authAPi.util.resetApiState())
      localStorage.removeItem("user")
      toast.success("Logout successful")
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <section className="    py-4 bg-gradient-to-r from-emerald-50 via-white to-orange-50 dark:from-emerald-950/20 dark:via-background dark:to-orange-950/20 backdrop-blur-sm border-b border-emerald-100 dark:border-emerald-800/30">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden    justify-between lg:flex items-center">
          <div className="flex mx-4  items-center gap-8">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-900/50 transition-all duration-300 group-hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-orange-500  bg-clip-text text-transparent">
                ParcelPro
              </span>
            </div>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {menuItems.map((item) => (
                    <>
                      {item.role.includes("PUBLIC")
                        ? renderMenuItem(item)
                        : item.role.includes(user?.data?.role)
                          ? renderMenuItem(item)
                          : ""}
                    </>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-emerald-100 dark:border-emerald-800/30">
              <ModeToggle />
            </div>

            {user?.data?.email ? (
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/50 transition-all duration-200 hover:scale-105 bg-transparent"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </Button>
                <NavLink
                  to={`${user?.data?.role === "SENDER" ? "/sender" : user?.data?.role === "RECEIVER" ? "/receiver" : "/admin"
                    }`}
                  className="group"
                >
                  <div className="relative">
                    <ProfileButton userImage="https://i.ibb.co.com/BHpcVQRq/pexels-rfera-432059.jpg" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="flex gap-2">
                <NavLink to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/50 transition-all duration-200 hover:scale-105 bg-transparent"
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/50 transition-all duration-200 hover:scale-105 border-0"
                  >
                    Register
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-900/50 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                ParcelPro
              </span>
            </div>

            <Sheet>
              <div className="flex gap-3">
                <div className="p-1 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-emerald-100 dark:border-emerald-800/30">
                  <ModeToggle />
                </div>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/50 transition-all duration-200 bg-transparent"
                  >
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>

              <SheetContent className="overflow-y-auto bg-gradient-to-b from-white via-emerald-50/30 to-orange-50/30 dark:from-background dark:via-emerald-950/10 dark:to-orange-950/10">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                        ParcelPro
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {menuItems.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {user?.data?.email ? (
                      <>
                        <NavLink
                          to={`${user?.data?.role === "SENDER"
                              ? "/sender"
                              : user?.data?.role === "RECEIVER"
                                ? "/receiver"
                                : "/admin"
                            }`}
                        >
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-200"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                            Dashboard
                          </Button>
                        </NavLink>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/50 transition-all duration-200 bg-transparent"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <NavLink to="/login">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-950/50 transition-all duration-200 bg-transparent"
                          >
                            Login
                          </Button>
                        </NavLink>
                        <NavLink to="/register">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-200"
                          >
                            Register
                          </Button>
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <Link
        to={item.url}
        className="group relative bg-background hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm"
      >
        {item.title}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-200 group-hover:w-full group-hover:left-0"></div>
      </Link>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link
      key={item.title}
      to={item.url}
      className="text-md font-semibold p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 flex items-center gap-3 group"
    >
      <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      {item.title}
    </Link>
  )
}

export default Navbar

