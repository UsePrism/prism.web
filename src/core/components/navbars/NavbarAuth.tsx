import { logoFullWhite } from "core/consts/images";
import { Link } from "react-router-dom";

const NavbarAuth = () => {
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 border-b-[0.5px] border-b-shade bg-black"
        style={{
          zIndex: 600,
        }}
      >
        <nav className="mx-auto my-1 flex w-11/12 items-center justify-between py-[20px] md:w-4/5">
          <Link to="/home" className="w-[60px]">
            <img
              src={logoFullWhite}
              alt="Prism"
              loading="lazy"
              className="scale-125"
            />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavbarAuth;
