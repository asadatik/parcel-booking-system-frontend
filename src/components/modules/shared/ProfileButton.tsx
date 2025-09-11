// react icons
import { MdVerified } from "react-icons/md";

const ProfileButton = ({ userImage }: { userImage: string }) => {
  return (
    <>
      <div className="relative cursor-pointer">
        <img
          src={userImage}
          alt="avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />

        <MdVerified className="text-blue-500 p-[2px] text-[1.2rem] dark:bg-[#020617] bg-white rounded-full absolute top-[25px] right-[2px]" />
      </div>
    </>
  );
};

export default ProfileButton;
