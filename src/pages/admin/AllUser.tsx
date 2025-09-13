/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/modules/shared/Loading";
import CommonPagination from "@/components/pagignation";
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
import {
  useGetAllUserQuery,
  useProfileUpdateMutation,
} from "@/redux/features/user/user.api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(5);

  useEffect(() => {
    const handleHashChange = () => {
      const pageFromHash = Number(window.location.hash.split("/")[2]) || 0;
      setCurrentPage(pageFromHash);
    };

    // প্রথমবার call করা
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const { data, isLoading } = useGetAllUserQuery({ page: currentPage, limit });
  const [profileUpdate] = useProfileUpdateMutation();

  const handleUpdateStatus = async (id: string, data: boolean) => {
    const status = { isBlocked: data };
    const toastId = toast.loading("Profile update is loading");
    const formData = new FormData();
    formData.append("data", JSON.stringify(status));

    try {
      const res = await profileUpdate({ id, formData });
      console.log(res);
      toast.success("Profile updated ", { id: toastId });
    } catch (error) {
      toast.error("Profile upload failed", { id: toastId });
      console.log(error);
    }
  };

  const users = data?.data?.data;
  console.log("users ", users);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <section className=" ">
      <div className="">
        <Table className="overflow-hidden">
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="">Block</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user?._id}>
                <TableCell>
                  <img
                    className="rounded"
                    src={
                      user?.picture ||
                      "https://img.freepik.com/premium-vector/profile-interface-icon-vector-art_1015832-3774.jpg"
                    }
                    alt="Profile"
                  />
                </TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.isBlocked ? "Blocked" : "Unblock"}</TableCell>
                <TableCell className="flex items-center  gap-2">
                  <Button
                    onClick={() => handleUpdateStatus(user?._id, true)}
                    variant={"secondary"}
                    className="cursor-pointer"
                  >
                    Block
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus(user?._id, false)}
                    variant={"secondary"}
                    className="cursor-pointer"
                  >
                    Unblock
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>
                <CommonPagination
                  currentPage={data?.data?.meta?.page}
                  totalPages={data?.data?.meta?.totalPage}
                  paginationItemsToDisplay={data?.data?.meta?.total}
                ></CommonPagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default AllUser;
