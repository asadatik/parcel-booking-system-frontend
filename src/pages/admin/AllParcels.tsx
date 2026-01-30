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
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 25px rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .slide-in-right { animation: slideInRight 0.5s ease-out; }
        .scale-in { animation: scaleIn 0.4s ease-out; }
        .float { animation: float 4s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        
        .all-parcels-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.15);
          overflow: hidden;
          border: 1px solid rgba(249, 115, 22, 0.1);
        }
        
        .all-parcels-header {
       

          position: relative;
          overflow: hidden;
        }
        
        .all-parcels-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -1000px;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
        
        .all-parcels-header th {
          padding: 20px 24px !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
          color: white !important;
          text-align: left !important;
          position: relative;
          z-index: 1;
        }
        
        .all-parcels-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(249, 115, 22, 0.1);
          background: white;
        }
        
        .all-parcels-row:hover {
          background: linear-gradient(135deg, #fff7ed, #ffedd5);
          transform: scale(1.01);
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.15);
        }
        
        .all-parcels-cell {
          padding: 18px 24px !important;
          font-weight: 500 !important;
          color: #374151 !important;
          vertical-align: middle !important;
        }
        
        .all-tracking-badge {
          font-family: 'Monaco', 'Courier New', monospace;
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          color: #7c2d12;
          border: 2px solid #fb923c;
          display: inline-block;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        
        .all-type-badge {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1e3a8a;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-block;
          border: 1px solid #93c5fd;
        }
        
        .all-weight-badge {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          color: #065f46;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid #6ee7b7;
        }
        
        .all-fee-badge {
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          color: #831843;
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 15px;
          display: inline-block;
          border: 2px solid #f9a8d4;
        }
        
        .all-address-cell {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #6b7280;
          font-size: 14px;
          padding: 8px 12px;
          background: linear-gradient(135deg, #f9fafb, #f3f4f6);
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .all-address-cell:hover {
          white-space: normal;
          overflow: visible;
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          z-index: 10;
          position: relative;
        }
        
        .all-status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: capitalize;
          display: inline-block;
          min-width: 110px;
          text-align: center;
          color: black;
          border: 2px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .all-status-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        
        .all-table-caption {
          padding: 16px 24px !important;
          color: #6b7280 !important;
          font-style: italic !important;
          font-size: 14px !important;
          background: linear-gradient(135deg, #fff7ed, #ffedd5) !important;
          text-align: center !important;
        }
        
        .all-table-footer {
          background: linear-gradient(135deg, #fff7ed, #fed7aa);
          padding: 20px;
        }
        
        .stats-card {
          background: linear-gradient(135deg, #fff7ed, #ffedd5);
          border: 2px solid #fdba74;
          border-radius: 20px;
          padding: 16px 28px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.2);
        }
        
        .stats-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }
        
        .stats-text {
          text-align: left;
        }
        
        .stats-number {
          font-size: 28px;
          font-weight: 800;
          color: #7c2d12;
          line-height: 1;
          margin-bottom: 4px;
        }
        
        .stats-label {
          font-size: 14px;
          font-weight: 600;
          color: #9a3412;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
      
      <section className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full opacity-20 float"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl shadow-xl glow">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-800 bg-clip-text text-transparent">
                All Parcels
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Complete overview of all parcels in the system
            </p>
            
            {/* Stats Card */}
            <div className="flex justify-center pulse">
              <div className="stats-card">
                <div className="stats-icon">📦</div>
                <div className="stats-text">
                  <div className="stats-number">{parcels?.length || 0}</div>
                  <div className="stats-label">Total Parcels</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="all-parcels-container scale-in">
            <Table className="overflow-hidden">
              <TableCaption className="all-table-caption">
                A list of all parcels.
              </TableCaption>
              
              <TableHeader className="all-parcels-header  bg-gradient-to-r from-emerald-500 to-amber-500">
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {parcels?.map((singleParcel: any, index: number) => (
                  <TableRow 
                    key={singleParcel?._id} 
                    className="all-parcels-row slide-in-right"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <TableCell className="all-parcels-cell">
                      <span className="all-tracking-badge">
                        {singleParcel?.trackingId}
                      </span>
                    </TableCell>
                    
                    <TableCell className="all-parcels-cell">
                      <span className="all-type-badge">
                        📦 {singleParcel?.parcelType}
                      </span>
                    </TableCell>
                    
                    <TableCell className="all-parcels-cell">
                      <span className="all-weight-badge">
                        ⚖️ {singleParcel?.weight} kg
                      </span>
                    </TableCell>
                    
                    <TableCell className="all-parcels-cell">
                      <span className="all-fee-badge">
                        ${singleParcel?.parcelFee}
                      </span>
                    </TableCell>
                    
                    <TableCell className="all-parcels-cell">
                      <div className="all-address-cell" title={singleParcel?.deliveryAddress}>
                        📍 {singleParcel?.deliveryAddress}
                      </div>
                    </TableCell>
                    {/* Status */}
                    <TableCell className="all-parcels-cell">
                      {singleParcel.statusLogs?.length > 0 ? (
                        <span
                          className="all-status-badge"
                          style={{
                            color: "black",
                            backgroundColor: statusColor[singleParcel.currentStatus] || "gray",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            display: "inline-block",
                            textAlign: "center",
                          }}
                        >
                          {singleParcel.currentStatus}
                        </span>
                      ) : (
                        <span className="all-status-badge" style={{backgroundColor: "#D1D5DB"}}>N/A</span>
                      )}
                    </TableCell>

                    <TableCell className="flex gap-2 all-parcels-cell">
                      <EditParcelStatus singleParcel={singleParcel} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
              <TableFooter className="all-table-footer">
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
        </div>
      </section>
    </>
  );
};

export default AllParcels;