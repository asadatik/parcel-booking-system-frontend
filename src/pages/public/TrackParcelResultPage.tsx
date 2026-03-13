/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Package, MapPin, User, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TrackParcelResultPage = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { data, isLoading, isError } = useTrackParcelQuery(trackingId!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Parcel Not Found</h2>
          <p className="text-gray-600">The tracking ID you entered doesn't exist. Please check and try again.</p>
        </motion.div>
      </div>
    );
  }

  const parcel = data?.data;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in transit":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Package className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 border-green-200";
      case "in transit":
        return "bg-blue-50 border-blue-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-emerald-50 border-emerald-200";
    }
  };

  //  Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  //
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-md rounded-3xl py-2 md:py-4 mb-2 md:mb-4 text-gray-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 md:w-10 md:h-10  text-emerald-600" />

            <h1 className="text-3xl md:text-5xl font-bold  bg-gradient-to-r from-emerald-700 via-emerald-600 to-orange-600 bg-clip-text text-transparent">
              Parcel Tracking
            </h1>
          </div>

          <p className="text-lg">
            Tracking ID:
            <span className="font-mono  text-teal-700 ml-2">
              {parcel.trackingId}
            </span>
          </p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`${getStatusColor(parcel.currentStatus)} border-2 rounded-2xl p-4 mb-8 flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(parcel.currentStatus)}
            <div>
              <p className="text-sm text-gray-600">Current Status</p>
              <p className="text-xl font-bold text-gray-800">{parcel.currentStatus}</p>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-emerald-600 rounded-full"
          />
        </motion.div>

    {/* Parcel Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Sender Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <User className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800">From</h3>
            </div>
            <p className="text-gray-600 text-sm mb-1">Sender</p>
            <p className="text-lg font-bold text-gray-800">{parcel.sender?.name || parcel.sender}</p>
          </motion.div>

          {/* Receiver Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">To</h3>
            </div>
            <p className="text-gray-600 text-sm mb-1">Receiver</p>
            <p className="text-lg font-bold text-gray-800">{parcel.receiver?.name || parcel.receiver}</p>
          </motion.div>

          {/* Package Type */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Package Type</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">{parcel.parcelType}</p>
          </motion.div>

          {/* Weight */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Truck className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Weight</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">{parcel.weight} <span className="text-sm text-gray-600">kg</span></p>
          </motion.div>

          {/* Delivery Fee */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Delivery Fee</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800">${parcel.parcelFee}</p>
          </motion.div>

          {/* Delivery Date */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Calendar className="w-5 h-5 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Delivery Date</h3>
            </div>
            <p className="text-lg font-bold text-gray-800">{new Date(parcel.DeliveryDate).toLocaleDateString()}</p>
          </motion.div>
        </motion.div>
        
        {/* Status Timeline */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-600" />
            Delivery Timeline
          </h3>

          <div className="relative">

            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 to-orange-500" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {parcel.statusLogs?.map((log: any, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-0 w-14 h-14 bg-white border-4 border-emerald-600 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    {getStatusIcon(log.status)}
                  </motion.div>

                  {/* Timeline Content */}
                  <motion.div
                    className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all"
                    whileHover={{ x: 8 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-800 text-lg">{log.status}</h4>
                      <span className="text-sm font-mono text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full w-fit">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {log.note && (
                      <p className="text-gray-700 mt-2 leading-relaxed">{log.note}</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrackParcelResultPage;
