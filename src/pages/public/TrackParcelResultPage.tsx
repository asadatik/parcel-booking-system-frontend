/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useParams } from "react-router-dom";


const TrackParcelResultPage = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { data, isLoading, isError } = useTrackParcelQuery(trackingId!);

  if (isLoading) return <p className="text-center mt-8">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center mt-8">Parcel not found</p>;

  const parcel = data?.data;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">Tracking ID: {parcel.trackingId}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <p><strong>Sender:</strong> {parcel.sender?.name || parcel.sender}</p>
          <p><strong>Receiver:</strong> {parcel.receiver?.name || parcel.receiver}</p>
          <p><strong>Type:</strong> {parcel.parcelType}</p>
          <p><strong>Weight:</strong> {parcel.weight} kg</p>
          <p><strong>Fee:</strong> ${parcel.parcelFee}</p>
          <p><strong>Delivery Date:</strong> {new Date(parcel.DeliveryDate).toLocaleDateString()}</p>
          <p><strong>Current Status:</strong> {parcel.currentStatus}</p>
        </div>

        <h3 className="font-semibold mb-2">Status Logs:</h3>
        <ul className="border-t border-gray-200 pt-2">
          {parcel.statusLogs?.map((log: any, index: number) => (
            <li key={index} className="py-2 border-b border-gray-100">
              <p><strong>Status:</strong> {log.status}</p>
              <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
              {log.note && <p><strong>Note:</strong> {log.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackParcelResultPage;