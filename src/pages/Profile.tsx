import { EditPasswordModal } from "@/components/modules/modal/EditPasswordModal";
// import { ProfileUpdateModal } from "@/components/modules/modal/ProfileUpdateModal";
import Loader from "@/components/modules/shared/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

const Profile = () => {
  const { data: users, isLoading } = useUserInfoQuery(undefined);

  const user = users?.data;
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
   
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.picture} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </CardHeader>

        <CardContent className="space-y-4">
       
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {user.role && (
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            )}
            {user.isVerified ? (
              <Badge variant="default">Verified</Badge>
            ) : (
              <Badge variant="default">Unverified</Badge>
            )}
            {user.isDeleted ? (
              <Badge variant="destructive">Deleted</Badge>
            ) : (
              <Badge variant="destructive">Active</Badge>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center  ">
            {/* <ProfileUpdateModal></ProfileUpdateModal> */}
            <EditPasswordModal></EditPasswordModal>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Profile;
