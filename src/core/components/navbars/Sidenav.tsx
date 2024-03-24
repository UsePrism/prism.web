import { activeSidenavLink, sidenavLink } from "core/consts/styling";
import React from "react";
import { NavLink } from "react-router-dom";
import closeImg from "assets/img/close.svg";

const Sidenav = ({
  close,
  isLoggedIn = false,
  isOpen = false,
}: {
  close?: any;
  isLoggedIn?: boolean;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`fixed h-full w-full bg-black transition-all duration-500 ease-in-out ${
        isOpen ? "-left-0" : "-left-[100vw]"
      }`}
      style={{
        zIndex: 1000,
      }}
    >
      <nav className="relative mx-auto flex h-[80vh] w-11/12 items-center justify-between md:w-4/5">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <NavLink
            to="/"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Home
          </NavLink>

          {!isLoggedIn && (
            <>
              <NavLink
                to="/auth/signup"
                onClick={() => close()}
                className={({ isActive }) =>
                  isActive ? activeSidenavLink : sidenavLink
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/auth/login"
                onClick={() => close()}
                className={({ isActive }) =>
                  isActive ? activeSidenavLink : sidenavLink
                }
              >
                Login
              </NavLink>
            </>
          )}
          <NavLink
            to="/businesses"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Businesses
          </NavLink>
          <NavLink
            to="/terms"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Terms
          </NavLink>
          <NavLink
            to="/privacy"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/cookies"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Cookie Policy
          </NavLink>
        </div>
        <div
          className="absolute right-[30px] top-[30px]"
          onClick={() => close()}
        >
          <img src={closeImg} alt="close" className="h-[32px] w-[32px]" />
        </div>
      </nav>
      <div>
        <p className="text-center font-ui-sans text-xs uppercase text-gray-500">
          &copy; {new Date().getFullYear()} Prism. <br /> All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Sidenav;
