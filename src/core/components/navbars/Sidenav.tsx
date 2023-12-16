import { activeSidenavLink, sidenavLink } from "core/consts/styling";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidenav = ({
  close,
  isOpen = false,
}: {
  close?: any;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`bg-dark fixed h-full w-full transition-all duration-500 ease-in-out ${
        isOpen ? "-left-0" : "-left-[100vw]"
      }`}
      style={{
        zIndex: 1000,
      }}
    >
      <nav className="relative mx-auto flex h-[80vh] w-11/12 items-center justify-between md:w-4/5">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <NavLink
            to="/public/home"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/public/services"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/public/company"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Company
          </NavLink>
          <NavLink
            to="/public/contact"
            onClick={() => close()}
            className={({ isActive }) =>
              isActive ? activeSidenavLink : sidenavLink
            }
          >
            Contact
          </NavLink>
        </div>
        <div
          className="absolute right-[30px] top-[30px]"
          onClick={() => close()}
        >
          <img src={close} alt="close" className="h-[32px] w-[32px]" />
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
