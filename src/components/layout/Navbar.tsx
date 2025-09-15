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

import LogoWithoutName from "../modules/shared/LogoWithoutName";
import ProfileButton from "../modules/shared/ProfileButton";
import { ModeToggle } from "./ModeToggler";
import { useEffect } from "react";

interface MenuItem {
  title: string;
  url: string;
}

const menuItems = [
 { title: "Home", url: "/", role: "PUBLIC" }, {
   
  title: "Features",
    url: "/features",
    role: "PUBLIC",
  },
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
  {
    title: "FAQ",
    url: "/faq",
    role: "PUBLIC",
  },
];
const Navbar = () => {
  const { data: user, isLoading } = useUserInfoQuery(undefined);
 
  const [logout] = useLogoutMutation(undefined);
  const dispatch = useAppDispatch();


useEffect(() => {
  if (user?.data) {
    console.log("user data from navbar", user.data);
  }
}, [user]);



  const handleLogout = async () => {
    try {
      await logout(undefined);
      dispatch(authAPi.util.resetApiState());
      localStorage.removeItem("user");
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  
  return (
    <section className="py-4">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
          
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
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
          <div className="flex gap-2">
            <ModeToggle></ModeToggle>

            {user?.data?.email ? (
              <>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
                <NavLink
                  to={`${
                    user?.data?.role === "SENDER"
                      ? "/sender"
                      : user?.data?.role === "RECEIVER"
                      ? "/receiver"
                      : "/admin"
                  }`}
                >
                  <ProfileButton userImage="https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?t=st=1722665625~exp=1722669225~hmac=61213dc4a128104a1e6f2685a176eca7bf689928fffab03d713789c45b6a1696&w=996"></ProfileButton>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="w-full " to="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </NavLink>
                <NavLink className="w-full " to="/register">
                  <Button variant="outline" size="sm" className="w-full">
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <LogoWithoutName></LogoWithoutName>
            <Sheet>
              <div className="flex gap-3">
                <ModeToggle></ModeToggle>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <LogoWithoutName></LogoWithoutName>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menuItems.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {user?.data?.email ? (
                      <>
                        <NavLink
                          className="w-full "
                          to={`${
                            user?.data?.role === "SENDER"
                              ? "/sender"
                              : user?.data?.role === "RECEIVER"
                              ? "/receiver"
                              : "/admin"
                          }`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Dashboard
                          </Button>
                        </NavLink>

                        <Button onClick={handleLogout} variant="outline">
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <NavLink className="w-full " to="/login">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Login
                          </Button>
                        </NavLink>
                        <NavLink className="w-full " to="/register">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
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
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <Link
        to={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} to={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export default Navbar;
