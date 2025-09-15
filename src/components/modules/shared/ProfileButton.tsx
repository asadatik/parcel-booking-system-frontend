// react icons


const ProfileButton = ({ userImage }: { userImage: string }) => {
  return (
    <>
      <div className="relative cursor-pointer">
        <img
          src={userImage}
          alt="avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />

      </div>
    </>
  );
};

export default ProfileButton;
