import { logoFullImg } from "core/consts/images";
import { Link } from "react-router-dom";

const NavbarAuth = () => {
  return (
    <>
      <div
        className="border-b-light-gray fixed left-0 right-0 top-0 border"
        style={{
          background: "rgb(254, 254, 254)",
          zIndex: 1000,
        }}
      >
        <nav className="mx-auto my-1 flex w-11/12 items-center justify-between py-[20px] md:w-4/5">
          <Link to="/home" className="w-[60px]">
            <img src={logoFullImg} alt="Prism" className="scale-105" />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavbarAuth;
