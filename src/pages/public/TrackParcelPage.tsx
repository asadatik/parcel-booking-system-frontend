import { useState } from "react";
import { useNavigate } from "react-router";

const demoTrackingIds = [
  "TRK-20251005-5ED885",
  "TRK-20251007-093E30",
  "TRK-20251010-1D7330",
  "TRK-20251013-CC5B8C",
  "TRK-20251016-48A45F",
  "TRK-20251017-28041A",
  "TRK-20251017-9F591D",
  "TRK-20251025-AB49D8",
  "TRK-20260313-B2E80A",
];

const TrackParcelPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter a tracking code");
      return;
    }
    setError("");
    navigate(`/track/${trackingId}`);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrackingId(e.target.value); 
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Track Your Parcel</h1>

      {/* Demo Dropdown */}
      <select
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full max-w-md"
        value={trackingId}
        onChange={handleDropdownChange}
      >
        <option value="">Select your tracking ID</option>
        {demoTrackingIds.map((id) => (
          <option key={id} value={id}>
            {id.slice(-6)} 
          </option>
        ))}
      </select>

      {/* Input Form */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter tracking code"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
          >
            Track Parcel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackParcelPage;