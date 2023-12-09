import { logoFullWhite } from "core/consts/images";
import { btn } from "core/consts/styling";
import { Link } from "react-router-dom";
import InputField from "../formfields/InputField";

const NavbarPublic = () => {
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0"
        style={{
          background: "#000000",
          zIndex: 1000,
        }}
      >
        <nav className="mx-auto my-1 flex w-11/12 items-center justify-between py-[20px] md:w-4/5">
          <div className="flex w-auto items-center gap-[50px] lg:w-1/2">
            <Link to="/home" className="w-[60px]">
              <img
                src={logoFullWhite}
                alt="Prism"
                loading="lazy"
                className="scale-125"
              />
            </Link>
            <InputField
              extra="w-2/3 hidden lg:flex -mt-2"
              label=""
              showLabel={false}
              placeholder="Search for a business"
              name="search"
              id="search"
              type="text"
              value=""
              onChange={() => {}}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/auth/login"
              className={`${btn} hidden px-[10px] text-line hover:text-white lg:flex`}
            >
              Write a Review
            </Link>
            <Link
              to="/auth"
              className={`${btn} hidden px-[10px] text-line hover:text-white lg:flex`}
            >
              Add Business
            </Link>
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
