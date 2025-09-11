import { NavLink } from "react-router";

const LogoWithoutName = () => {
  return (
    <div>
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dqdircc96/image/upload/v1756200306/Logo_pgo5yh.png"
          className="max-h-8 dark:invert"
          alt="Logo"
        />
      </NavLink>
    </div>
  );
};

export default LogoWithoutName;
