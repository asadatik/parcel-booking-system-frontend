/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetDeliveryHistoryQuery } from "@/redux/features/parcel/parcel.api";

export default function DeliveryHistory() {
  // 1️⃣ Fetch logged-in user info
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useUserInfoQuery(undefined);

  // 2️⃣ Extract receiverId (email) safely
  const receiverId = userData?.data?.email;

  // 3️⃣ Fetch delivery history only if receiverId exists
  const { data: deliveryData, isLoading: isDeliveryLoading, isError: isDeliveryError } =
    useGetDeliveryHistoryQuery(receiverId, { skip: !receiverId });

  // 4️⃣ Handle loading & error states
  if (isUserLoading || isDeliveryLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
  
  if (isUserError) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <p className="text-xl font-bold text-gray-800">Error fetching user info</p>
      </div>
    </div>
  );
  
  if (isDeliveryError) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">❌</span>
        </div>
        <p className="text-xl font-bold text-gray-800">Error fetching delivery history</p>
      </div>
    </div>
  );

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
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 35px rgba(16, 185, 129, 0.6); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        .slide-in-right { animation: slideInRight 0.5s ease-out; }
        .scale-in { animation: scaleIn 0.4s ease-out; }
        .float { animation: float 4s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
        .bounce { animation: bounce 2s ease-in-out infinite; }
        
        .history-table-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.15);
          overflow: hidden;
          border: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .history-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        
        .history-table-header {
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          position: relative;
          overflow: hidden;
        }
        
        .history-table-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: -1000px;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
        
        .history-table-header th {
          padding: 20px 24px;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          text-align: left;
          position: relative;
          z-index: 1;
          border: none;
        }
        
        .history-table-row {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
          background: white;
        }
        
        .history-table-row:hover {
          background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
          transform: scale(1.01);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
        }
        
        .history-table-cell {
          padding: 18px 24px;
          font-weight: 500;
          color: #374151;
          vertical-align: middle;
          border: none;
        }
        
        .history-tracking-badge {
          font-family: 'Monaco', 'Courier New', monospace;
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          color: #1e3a8a;
          border: 2px solid #93c5fd;
          display: inline-block;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        
        .history-sender-badge {
          background: linear-gradient(135deg, #e9d5ff, #d8b4fe);
          color: #581c87;
          padding: 8px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #c084fc;
        }
        
        .history-type-badge {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          color: #065f46;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-block;
          border: 1px solid #6ee7b7;
        }
        
        .history-weight-badge {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #78350f;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid #fcd34d;
        }
        
        .history-address-cell {
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
        
        .history-address-cell:hover {
          white-space: normal;
          overflow: visible;
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          z-index: 10;
          position: relative;
        }
        
        .history-date-badge {
          background: linear-gradient(135deg, #fce7f3, #fbcfe8);
          color: #831843;
          padding: 8px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #f9a8d4;
        }
        
        .empty-state {
          text-align: center;
          padding: 60px 24px;
          color: #6b7280;
          font-size: 16px;
        }
        
        .empty-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 40px;
        }
        
        .stats-badge {
          display: inline-block;
          padding: 10px 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border-radius: 16px;
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 p-6 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full opacity-20 float"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full opacity-15 float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-xl glow">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="  text-2xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                Delivery History
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Complete record of all your delivered parcels
            </p>
            <div className="stats-badge bounce">
              📦 {deliveryData?.data?.length || 0} Total Deliveries
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="history-table-container scale-in overflow-x-auto">
           {
              deliveryData && deliveryData?.data?.length > 0 ? (
           <table className="history-table">
              <thead className="history-table-header">
                <tr>
                  <th>Tracking ID</th>
                  <th>Sender</th>
                  <th>Parcel Type</th>
                  <th>Weight</th>
                  <th>Delivery Address</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {deliveryData?.data?.map((parcel: any, index: number) => (
                  <tr 
                    key={parcel._id} 
                    className="history-table-row slide-in-right"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <td className="history-table-cell">
                      <span className="history-tracking-badge">
                        {parcel.trackingId}
                      </span>
                    </td>
                    
                    <td className="history-table-cell">
                      <span className="history-sender-badge">
                        👤 {parcel.sender?.email || parcel.sender?.name}
                      </span>
                    </td>
                    
                    <td className="history-table-cell">
                      <span className="history-type-badge">
                        📦 {parcel.parcelType}
                      </span>
                    </td>
                    
                    <td className="history-table-cell">
                      <span className="history-weight-badge">
                        ⚖️ {parcel.weight} kg
                      </span>
                    </td>
                    
                    <td className="history-table-cell">
                      <div className="history-address-cell" title={parcel.deliveryAddress}>
                        📍 {parcel.deliveryAddress}
                      </div>
                    </td>
                    
                    <td className="history-table-cell">
                      <span className="history-date-badge">
                        📅 {new Date(parcel.DeliveryDate).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={6} className="empty-state">
                      <div className="empty-icon">📭</div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">No delivery history found</p>
                      <p className="text-gray-500">Your completed deliveries will appear here</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            )   :
             (
              <div className="text-center py-12  text-gray-500 text-3xl font-medium fade-in">
                🚫 No  delivery parcels found...
              </div>
            )}
          
        
           
          </div>
        </div>
      </div>
    </>
  );
}