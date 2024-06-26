import { btn } from "core/consts/styling";
import { Link, useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
import { useState } from "react";
import useSystemStore from "core/services/stores/useSystemStore";
import useUserStore from "core/services/stores/useUserStore";
import Dropdown from "../Dropdown";
import useBusinessStore from "core/services/stores/useBusinessStore";
import SearchBox from "../SearchBox";
import Modal from "../Modal";
import useIdleTimer from "core/helpers/useIdleTimer";
import { googleLogout } from "@react-oauth/google";
import notification from "core/helpers/notification";
import caretdown from "assets/img/caretdown.svg";
import hamburger from "assets/img/hamburger.svg";
import logoFullWhite from "assets/img/logofull.svg";
import logoutImg from "assets/img/logout.svg";
import searchIcon from "assets/img/search.svg";
import settingImg from "assets/img/profile.svg";

const NavbarPublic = ({ showLinks = true }: { showLinks?: boolean }) => {
  const navigate = useNavigate();
  const [showSidenav, setSidenav] = useState(false);
  const toggleWaitListModal = useSystemStore(
    (store) => store.toggleWaitListModal,
  );

  const [showSearch, setShowSearch] = useState(false);

  const token = useUserStore((store) => store.token);
  const user = useUserStore((store) => store.user);

  const resetUserStore = useUserStore((store) => store.reset);
  const resetBusinessStore = useBusinessStore((store) => store.reset);

  const logout = (isExpired: boolean = false) => {
    resetUserStore();
    resetBusinessStore();
    googleLogout();
    sessionStorage.removeItem("userStore");
    sessionStorage.removeItem("systemStore");
    sessionStorage.removeItem("businessStore");

    if (isExpired) {
      notification({
        title: "SESSION TIMEOUT",
        type: "warning",
        message: "You have been logged out automatically, due to inactivity.",
      });
    }

    navigate("/");
  };

  useIdleTimer({ timeout: 15 * 60 * 1000, onInactive: () => logout(true) });

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
              <>
                <SearchBox
                  id="nav-search"
                  formStyle="hidden w-2/3 items-center gap-2 lg:flex"
                  inputStyle="w-10/12"
                  buttonStyle="flex w-2/12 items-center justify-center rounded-[5px] bg-brand px-2 py-3 disabled:cursor-not-allowed"
                />
              </>
            )}
          </div>
          <div className="flex items-center justify-between gap-3">
            {showLinks && (
              <>
                {token == null || token?.length < 1 ? (
                  <>
                    <button
                      className="flex items-center justify-center rounded-[5px] bg-brand px-2 py-1 disabled:cursor-not-allowed lg:hidden"
                      onClick={() => setShowSearch(true)}
                    >
                      <img src={searchIcon} alt="" className="p-1" />
                    </button>
                    <Link
                      to="/auth/login"
                      className={`${btn} hidden px-[5px] text-line hover:text-white lg:flex`}
                    >
                      Write a Review
                    </Link>
                    <button
                      className={`${btn} hidden px-[5px] text-line hover:text-white lg:flex`}
                      onClick={() => toggleWaitListModal(true)}
                    >
                      Add Business
                    </button>
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
                  </>
                ) : (
                  <>
                    <button
                      className="flex items-center justify-center rounded-[5px] bg-brand px-2 py-1 disabled:cursor-not-allowed lg:hidden"
                      onClick={() => {
                        setShowSearch(true);
                      }}
                    >
                      <img src={searchIcon} alt="" className="p-1" />
                    </button>
                    <Link
                      to="/review"
                      className={`${btn} hidden !px-[5px] text-line hover:text-white lg:flex`}
                    >
                      Write a Review
                    </Link>
                    <button
                      className={`${btn} hidden !px-[5px] text-line hover:text-white lg:flex`}
                      onClick={() => toggleWaitListModal(true)}
                    >
                      Add Business
                    </button>
                    <Dropdown
                      button={
                        <div className="flex items-center justify-center gap-3">
                          <p className="inline-block text-[14px] capitalize text-line hover:text-white">
                            {user?.firstName}
                          </p>
                          <img src={caretdown} alt="" />
                          <p className="rounded-full bg-brand p-[8px] text-[16px] uppercase text-white">
                            {user?.firstName?.slice(0, 2)}
                          </p>
                        </div>
                      }
                      children={
                        <div className="flex h-auto flex-col items-center rounded-[5px] border border-[.5px] border-[#344054] !bg-black  p-[10px] text-white shadow-xl">
                          <button
                            disabled
                            className="flex items-center justify-start   gap-5 rounded-[5px] px-[10px] py-[20px] text-[14px] text-sm hover:bg-[#1A1A1A] disabled:cursor-not-allowed"
                          >
                            <img src={settingImg} alt="" />
                            <span className="px-[40px]">Settings</span>
                          </button>

                          <button
                            onClick={() => logout(false)}
                            className="flex items-center justify-start   gap-5 rounded-[5px] px-[10px] py-[20px] text-[14px] text-sm hover:bg-[#1A1A1A] disabled:cursor-not-allowed"
                          >
                            <img src={logoutImg} alt="" />
                            <span className="px-[40px]">Log Out</span>
                          </button>
                        </div>
                      }
                      classNames={"py-2 top-[40px] -left-[60px] w-max"}
                    />
                  </>
                )}
              </>
            )}
            <button
              className={`${btn} block !bg-none !px-1 sm:hidden`}
              onClick={() => setSidenav(!showSidenav)}
            >
              <img src={hamburger} alt="" loading="lazy" />
            </button>
          </div>
        </nav>
      </div>

      <Sidenav
        isLoggedIn={token != null && token?.length > 0}
        isOpen={showSidenav}
        close={() => setSidenav(false)}
        onSignOut={() => logout(false)}
      />

      {showSearch && (
        <Modal
          header="Search for business"
          onClose={() => setShowSearch(false)}
        >
          <SearchBox
            formStyle="mt-5 w-full items-center gap-2 flex"
            inputStyle="w-10/12"
            buttonStyle="flex w-2/12 items-center justify-center rounded-[5px] bg-brand px-2 py-3 disabled:cursor-not-allowed"
            closeModal={() => setShowSearch(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default NavbarPublic;
