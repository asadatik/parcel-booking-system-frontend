/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/modules/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminStatsQuery } from "@/redux/features/user/user.api";
import { Shield, UserCheck, UserMinus, Users, UserX } from "lucide-react";

const Analytics = () => {
  const { data, isLoading } = useGetAdminStatsQuery(undefined);

  const stats = data?.data;
  console.log("stats", stats);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="text-[#ee4b2a]" /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        {/* Verified Users */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="text-[#ee4b2a]" /> Verified Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalVerifiedUsesr}</p>
          </CardContent>
        </Card>

        {/* Blocked Users */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserX className="text-[#ee4b2a]" /> Blocked Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalBlockedUsesr}</p>
          </CardContent>
        </Card>

        {/* Deleted Users */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserMinus className="text-[#ee4b2a]" /> Deleted Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalDeletedUsesr}</p>
          </CardContent>
        </Card>

        {/* New Users in last 7 days */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="text-[#ee4b2a]" /> New Users (7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.newUsersInLast7Days}</p>
          </CardContent>
        </Card>

        {/* New Users in last 30 days */}
        <Card
          className="shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="text-[#ee4b2a]" /> New Users (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.newUsersInLast30Days}</p>
          </CardContent>
        </Card>

        {/* Users by Role */}
        <Card
          className="col-span-1 md:col-span-2 lg:col-span-3 shadow-lg rounded-2xl border-t-4"
          style={{ borderColor: "#ee4b2a" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center flex-wrap gap-6">
              {stats.usersByRole.map((role: any) => (
                <div
                  key={role._id}
                  className="p-4 bg-gray-100 rounded-xl flex flex-col items-center shadow"
                >
                  <p className="text-sm font-medium text-gray-600">
                    {role._id}
                  </p>
                  <p className="text-2xl font-bold text-[#ee4b2a]">
                    {role.count}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
