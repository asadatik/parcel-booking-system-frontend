/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditParcelStatus } from "@/components/modules/modal/EditParcelStatus";
import Loader from "@/components/modules/shared/Loading";
import CommonPagination from "@/components/pagination";
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





const statusColor: { [key: string]: string } = {
  Requested: "#FDE68A",   // light yellow
  Approved: "#BFDBFE",    // light blue
  Dispatched: "#E5E7EB",  // light gray
  Picked: "#E9D5FF",      // light purple
  "In Transit": "#5EEAD4",// light teal
  Delivered: "#A7F3D0",   // light green
  Returned: "#FCA5A5",    // light red
  Cancelled: "#D1D5DB",   // soft gray
};


const AllParcels = () => {





  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

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

  const { data, isLoading } = useGetAllParcelQuery({
    page: currentPage,
    limit,
  });

  const parcels = data?.data; // directly array
  const meta = data?.meta;

  console.log("📦 parcels from API:", parcels);
  console.log("📊 meta info:", meta);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <div>
        <Table className="overflow-hidden">
          <TableCaption>A list of all parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Delivery Address</TableHead>

              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels?.map((singleParcel: any) => (
              <TableRow key={singleParcel?._id}>
                <TableCell>{singleParcel?.trackingId}</TableCell>
                <TableCell>{singleParcel?.parcelType}</TableCell>
                <TableCell>{singleParcel?.weight}</TableCell>
                <TableCell>{singleParcel?.parcelFee}</TableCell>
                <TableCell>{singleParcel?.DeliveryDate}</TableCell>
                <TableCell>{singleParcel?.deliveryAddress}</TableCell>
                <TableCell>
                  {singleParcel.statusLogs?.length > 0 ? (
                    <span
                      style={{
                        color: "black", // text color
                        backgroundColor:   statusColor[singleParcel.statusLogs[singleParcel.statusLogs.length - 1].status] || "gray",
                        padding: "2px 4px",
                        borderRadius: "12px",
                     
                        display: "inline-block",
                     
                        textAlign: "center",
                      }}
                    >
                      {singleParcel.statusLogs[singleParcel.statusLogs.length - 1].status}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>


                <TableCell className="flex gap-2">
                  <EditParcelStatus singleParcel={singleParcel} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>
                <CommonPagination
                  currentPage={meta?.page}
                  totalPage={meta?.totalPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default AllParcels;
