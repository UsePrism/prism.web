import { logoFullWhite } from "core/consts/images";
import { btn } from "core/consts/styling";
import { Link } from "react-router-dom";

const NavbarPublic = () => {
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0"
        style={{
          background: "#001219",
          zIndex: 1000,
        }}
      >
        <nav className="mx-auto my-1 flex w-11/12 items-center justify-between py-[20px] md:w-4/5">
          <Link to="/home" className="w-[60px]">
            <img src={logoFullWhite} alt="Prism" className="scale-105" />
          </Link>
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/auth/login"
              className={`${btn} border-1 border border-white text-white`}
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className={`${btn} border-1 border border-brand bg-brand text-white`}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarPublic;
