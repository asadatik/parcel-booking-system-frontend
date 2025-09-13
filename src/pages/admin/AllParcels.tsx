/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditParcelStatusModal } from "@/components/modules/modal/EditParcelStatusModal";
import Loader from "@/components/modules/shared/Loading";
import CommonPagination from "@/components/pagignation";
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
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useEffect, useState } from "react";

const AllParcels = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(5);

  useEffect(() => {
    const handleHashChange = () => {
      const pageFromHash = Number(window.location.hash.split("/")[2]) || 0;
      setCurrentPage(pageFromHash);
    };

   
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const { data, isLoading } = useGetAllParcelQuery({
    page: currentPage,
    limit,
  });
  const parcel = data?.data;
  console.log(parcel);

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <section className=" ">
      <div className="">
        <Table className="overflow-hidden">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Tracking ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead className="">Fee</TableHead>
              <TableHead className="">Delivery Date</TableHead>
              <TableHead className="">Delivery Address</TableHead>
              <TableHead className="">Pickup Address</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcel?.data?.map((singleParcel: any) => (
              <TableRow key={singleParcel?._id}>
                <TableCell>{singleParcel?.trackingId}</TableCell>
                <TableCell>{singleParcel.type}</TableCell>
                <TableCell>{singleParcel.weight}</TableCell>
                <TableCell>{singleParcel.fee}</TableCell>
                <TableCell>{singleParcel.deliveryDate}</TableCell>
                <TableCell>{singleParcel.deliveryAddress}</TableCell>
                <TableCell>{singleParcel.pickupAddress}</TableCell>
                <TableCell>{singleParcel.status}</TableCell>
                <TableCell className="flex gap-2">
                  <EditParcelStatusModal
                    singleParcel={singleParcel}
                  ></EditParcelStatusModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>
                <CommonPagination
                  currentPage={parcel?.meta?.page}
                  totalPages={parcel?.meta?.totalPage}
                  paginationItemsToDisplay={parcel?.meta?.total}
                ></CommonPagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default AllParcels;
