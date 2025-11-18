import React, { useContext, useState } from "react";
import Logo from "./Logo";

import useData from "../../context/useData";
import NavBtns from "./NavBtns";
import UserDet from "./UserDet";
import { logoutUser } from "../../backend/userFns";
import { BiLowVision } from "react-icons/bi";
import { useNavigate } from "react-router";

function LeftBar({
  statusBar,
  setStatusBar,
  activeNav,
  setActiveNav,
  navItems,
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logout_user = await logoutUser();
    if (logout_user) {
      navigate("/login");
      return;
    }
    console.log(logout_user);
  };

  const handleClick = (link) => {
    if (activeNav.link === link) {
      return;
    }
    if (link === "dashboard") {
      navigate("/dashboard");
      return;
    }

    navigate(`/dashboard/${link}`);
  };

  return (
    <>
      <aside
        className={` md:w-70 xl:w-80 h-screen border-r border-cyan-500/20 flex flex-col justify-between items-center ${
          statusBar ? "hidden md:flex" : "hidden"
        }`}
      >
        <div className="flex flex-col w-full gap-10 p-5">
          <div className="w-fit mx-auto ">
            <Logo />
          </div>
          <nav className="flex flex-col gap-2 px-1 ">
            <NavBtns
              navItems={navItems}
              setActiveNav={setActiveNav}
              activeNav={activeNav}
              handleClick={handleClick}
            />
          </nav>
        </div>

        <UserDet handleLogout={handleLogout} />
      </aside>
    </>
  );
}

export default LeftBar;
