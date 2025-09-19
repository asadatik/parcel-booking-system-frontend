

import { EditPassword } from "@/components/modules/modal/EditPassword"
// import { ProfileUpdateModal } from "@/components/modules/modal/ProfileUpdateModal";
import Loader from "@/components/modules/shared/Loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { motion } from "framer-motion"
import { Mail, Shield, User, CheckCircle, XCircle, Crown } from "lucide-react"

const Profile = () => {
  const { data: users, isLoading } = useUserInfoQuery(undefined)

  const user = users?.data
  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-orange-500/5" />

         <CardHeader className="relative z-10 pt-14 pb-10 bg-gradient-to-b from-emerald-50 via-white to-orange-50 rounded-t-2xl shadow-sm">
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center gap-6"
  >
    {/* Avatar Section */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-orange-400 to-orange-600 rounded-full p-1 animate-pulse group-hover:animate-none transition" />
      <div className="bg-white rounded-full p-1 shadow-lg">
        <Avatar className="w-32 h-32 border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300">
          <AvatarImage
            src={
              user.picture ||
              "https://i.ibb.co/BHpcVQRq/pexels-rfera-432059.jpg"
            }
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-emerald-500 to-orange-500 text-white">
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>

    {/* User Info */}
    <div className="text-center space-y-2">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent tracking-tight"
      >
        {user.name}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
      >
        <Mail className="w-5 h-5" />
        <span className="text-lg">{user.email}</span>
      </motion.div>
    </div>
  </motion.div>
</CardHeader>


          <CardContent className="relative z-10 px-8 pb-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Account Status
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Role Badge */}
                {user.role && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl border border-emerald-200"
                  >
                    <Crown className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <Badge
                        variant="secondary"
                        className="capitalize bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </motion.div>
                )}

                {/* Verification Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${
                    user.isVerified
                      ? "bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200"
                      : "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-200"
                  }`}
                >
                  {user.isVerified ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-yellow-600" />
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Verification</p>
                    <Badge
                      variant={user.isVerified ? "default" : "secondary"}
                      className={
                        user.isVerified
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }
                    >
                      {user.isVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                </motion.div>

                {/* Account Status Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${
                    !user.isDeleted
                      ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200"
                      : "bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-200"
                  }`}
                >
                  <User className={`w-6 h-6 ${!user.isDeleted ? "text-blue-600" : "text-red-600"}`} />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge
                      variant={!user.isDeleted ? "default" : "destructive"}
                      className={
                        !user.isDeleted
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {!user.isDeleted ? "Active" : "Deleted"}
                    </Badge>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-6 border-t border-gray-200"
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* <ProfileUpdateModal></ProfileUpdateModal> */}
                <div className="w-full sm:w-auto">
                  <EditPassword />
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Profile
