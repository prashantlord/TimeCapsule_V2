import React, { useContext, useState } from "react";
import Logo from "./Logo";
import {
  Globe,
  Home,
  Package,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";
import useData from "../../context/useData";
import NavBtns from "./NavBtns";

function LeftBar({ statusBar, setStatusBar }) {
  const { userDetails } = useData();

  const [activeNav, setActiveNav] = useState("dashboard");

  const navItems = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: Home,
    },
    {
      label: "Create Capsule",
      link: "create",
      icon: PlusCircle,
    },
    {
      label: "My Capsules",
      link: "my",
      icon: Package,
    },
    {
      label: "Public Capsules",
      link: "public",
      icon: Globe,
    },
    {
      label: "Settings",
      link: "settings",
      icon: Settings,
    },
  ];

  const handleClick = (link) => {
    console.log(link);
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

        <div className="w-full bg-black/10 border-t border-cyan-500/20 px-4 py-5 flex justify-between items-center">
          <div className=" flex gap-3 md:gap-4 text-cyan-50 ">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-px">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center  font-bold">
                {userDetails.username[0].toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium">{userDetails.username}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>{" "}
                Active
              </p>
            </div>
          </div>
          <div className="">
            <button
              className="cursor-pointer p-2 text-red-900 hover:text-red-700 transition-colors duration-300 ease-in"
              title="logout"
            >
              <LogOut />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default LeftBar;
