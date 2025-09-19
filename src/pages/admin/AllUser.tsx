/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/modules/shared/Loading";
import CommonPagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUserQuery, useProfileUpdateMutation } from "@/redux/features/user/user.api";

import { useEffect, useState } from "react";
import { toast } from "sonner";
type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1); // start at 1

  useEffect(() => {
    const handleHashChange = () => {
      const pageFromHash = Number(window.location.hash.split("/")[2]) || 1;
      setCurrentPage(pageFromHash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const { data, isLoading } = useGetAllUserQuery({ page: currentPage, limit: 10 });

  const [profileUpdate] = useProfileUpdateMutation();

  const handleUpdateStatus = async (id: string, status: UserStatus) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await profileUpdate({ id, data: { isActive: status } }).unwrap();
      toast.success("Profile updated", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Profile update failed", { id: toastId });
    }
  };


  const users = data?.data || [];
  const meta = data?.meta || { page: 1, totalPage: 1, total: 0 };

  if (isLoading) return <Loader />;

  return (
    <section className="">
      <div className="">
        <Table className="overflow-hidden">
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img
                    className="rounded w-12 h-12 object-cover"
                    src={
                      user.picture ||
                      "https://i.ibb.co/zQDLxpK/pexels-olly-842811.jpg"
                    }
                    alt="Profile"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isActive === "ACTIVE" && "Active"}
                  {user.isActive === "BLOCKED" && "Blocked"}
                  {user.isActive === "INACTIVE" && "Inactive"}
                  {user.isActive === "DELETED" && "Deleted"}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    onClick={() => handleUpdateStatus(user._id, "BLOCKED")}
                    variant="secondary"
                    disabled={user.isActive === "BLOCKED"} // ❌ Blocked হলে disable
                    className={`cursor-pointer bg-gradient-to-r from-emerald-500 to-orange-400 
      hover:from-emerald-700 hover:to-orange-500 text-white rounded-2xl transition-all duration-300 
      transform hover:scale-105 hover:shadow-2xl shadow-lg ${user.isActive === "BLOCKED" ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none" : ""}`}
                  >
                    Block
                  </Button>

                  <Button
                    onClick={() => handleUpdateStatus(user._id, "ACTIVE")}
                    variant="secondary"
                    disabled={user.isActive === "ACTIVE"} // ❌ Active হলে disable
                    className={`cursor-pointer bg-gradient-to-r from-emerald-400 to-teal-500 
      hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl transition-all duration-300 
      transform hover:scale-105 hover:shadow-2xl shadow-lg ${user.isActive === "ACTIVE" ? "opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none" : ""}`}
                  >
                    Unblock
                </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <CommonPagination
                  currentPage={meta.page}
                  totalPage={meta.totalPage}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.location.hash = `/admin/all-user/${page}`;
                  }
                  }
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default AllUser;



