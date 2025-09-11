import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div>
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dqdircc96/image/upload/v1756200306/Logo_pgo5yh.png"
          className="max-h-8 dark:invert"
          alt="Logo"
        />
        <span className="text-lg font-semibold tracking-tighter">Pathao</span>
      </NavLink>
    </div>
  );
};

export default Logo;
