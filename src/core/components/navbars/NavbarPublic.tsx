import { hamburger, logoFullWhite } from "core/consts/images";
import { btn } from "core/consts/styling";
import { Link } from "react-router-dom";
import InputField from "../formfields/InputField";

const NavbarPublic = ({ showLinks = true }: { showLinks?: boolean }) => {
  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 ${
          showLinks ? "" : "border-b-[0.5px] border-b-shade bg-black"
        }`}
        style={{
          background: "#000000",
          zIndex: 600,
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
            {showLinks && (
              <InputField
                boxStyle="w-2/3 hidden lg:flex -mt-2"
                placeholder="Search for a business"
                name="search"
                id="search"
                type="text"
                value=""
                onChange={() => {}}
              />
            )}
          </div>
          {showLinks && (
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
                className={`${btn} border-1 hidden border border-white text-white sm:flex`}
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className={`${btn} border-1 border border-brand bg-brand text-white`}
              >
                Sign Up
              </Link>
              <button className={`${btn} block !bg-none !px-1 sm:hidden`}>
                <img src={hamburger} alt="" loading="lazy" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavbarPublic;
