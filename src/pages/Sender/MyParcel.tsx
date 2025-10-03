/* eslint-disable @typescript-eslint/no-explicit-any */

import { ParcelDeleteModal } from "@/components/modules/modal/ParcelDeleteModal";
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
import { useGetMyParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useEffect, useState } from "react";

const MyParcel = () => {
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

  const { data, isLoading } = useGetMyParcelQuery({ page: currentPage, limit });
  const parcel = data?.data;
  const meta = data?.meta;
  console.log(parcel);

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase();
    if (statusLower?.includes('delivered')) return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
    if (statusLower?.includes('transit') || statusLower?.includes('shipping')) return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white';
    if (statusLower?.includes('pending')) return 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white';
    if (statusLower?.includes('cancelled')) return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
    return 'bg-gradient-to-r from-gray-500 to-slate-600 text-white';
  };

  if (isLoading) {
    return <Loader></Loader>;
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
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .slide-in-right { animation: slideInRight 0.5s ease-out; }
        .scale-in { animation: scaleIn 0.4s ease-out; }
        .float { animation: float 4s ease-in-out infinite; }
        
        .enhanced-table-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.15);
          overflow: hidden;
          border: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .enhanced-table-header {
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          position: relative;
          overflow: hidden;
        }
        
        .enhanced-table-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -1000px;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
        
        .enhanced-table-header th {
          padding: 20px 24px;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          text-align: left;
          position: relative;
          z-index: 1;
        }
        
        .enhanced-table-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
          background: white;
        }
        
        .enhanced-table-row:hover {
          background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
          transform: scale(1.01);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
        }
        
        .enhanced-table-cell {
          padding: 18px 24px;
          font-weight: 500;
          color: #374151;
          vertical-align: middle;
        }
        
        .tracking-id-badge {
          font-family: 'Monaco', 'Courier New', monospace;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          color: #374151;
          border: 2px solid #d1d5db;
          display: inline-block;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        
        .type-badge {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1e40af;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-block;
          border: 1px solid #93c5fd;
        }
        
        .weight-badge {
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
        
        .fee-badge {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          color: #991b1b;
          padding: 8px 16px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 15px;
          display: inline-block;
          border: 2px solid #fca5a5;
        }
        
        .date-badge {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #78350f;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-block;
          border: 1px solid #fcd34d;
        }
        
        .address-cell {
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
        
        .address-cell:hover {
          white-space: normal;
          overflow: visible;
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          z-index: 10;
          position: relative;
        }
        
        .status-badge {
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: capitalize;
          display: inline-block;
          min-width: 100px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .action-cell {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .enhanced-table-caption {
          padding: 16px 24px;
          color: #6b7280;
          font-style: italic;
          font-size: 14px;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          text-align: center;
        }
        
        .enhanced-table-footer {
          background: linear-gradient(135deg, #f9fafb, #f3f4f6);
          padding: 20px;
        }
      `}</style>
      
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 float"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 fade-in-up">
            <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-4">
              My Parcels
            </h1>
            <p className="text-xl text-gray-600">Track and manage all your parcel shipments</p>
          </div>

          {/* Enhanced Table */}
          <div className="enhanced-table-container scale-in">
            <Table className="overflow-hidden">
              <TableCaption className="enhanced-table-caption">
                A list of your recent invoices.
              </TableCaption>
              
              <TableHeader className="enhanced-table-header">
                <TableRow>
                  <TableHead className="">Tracking ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead className="">Fee</TableHead>
                  <TableHead className="">Delivery Date</TableHead>
                  <TableHead className="">Delivery Address</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Action</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {parcel?.map((singleParcel: any, index: number) => (
                  <TableRow 
                    key={singleParcel?._id} 
                    className="enhanced-table-row slide-in-right"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <TableCell className="enhanced-table-cell">
                      <span className="tracking-id-badge">
                        {singleParcel?.trackingId}
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <span className="type-badge">
                        {singleParcel.parcelType}
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <span className="weight-badge">
                        ⚖️ {singleParcel.weight} kg
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <span className="fee-badge">
                        ${singleParcel.parcelFee}
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <span className="date-badge">
                        📅 {singleParcel.DeliveryDate || 'TBD'}
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <div className="address-cell" title={singleParcel.deliveryAddress}>
                        📍 {singleParcel.deliveryAddress}
                      </div>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <span className={`status-badge ${getStatusColor(singleParcel.currentStatus)}`}>
                        {singleParcel.currentStatus}
                      </span>
                    </TableCell>
                    
                    <TableCell className="enhanced-table-cell">
                      <div className="action-cell flex gap-2">
                        <ParcelDeleteModal
                          singleParcel={singleParcel}
                        ></ParcelDeleteModal>
                      
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
              <TableFooter className="enhanced-table-footer">
                <TableRow>
                  <TableCell colSpan={10}>
                    <CommonPagination
                      currentPage={meta?.page}
                      totalPage={meta?.totalPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    ></CommonPagination>
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

export default MyParcel;