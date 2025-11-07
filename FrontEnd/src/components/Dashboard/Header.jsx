import React from "react";
import { ChevronRight, Home, Menu, PanelRight } from "lucide-react";

function Header({ statusBar, setStatusBar, activeNav }) {
  const Icon = activeNav.icon;
  return (
    <>
      <div className=" border-b border-cyan-500/20 w-full h-20 flex items-center px-5">
        <div className="flex items-center gap-8 ">
          <button
            onClick={() => {
              setStatusBar((prev) => !prev);
              console.log(statusBar);
            }}
          >
            <PanelRight className="text-cyan-500" />
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-400 w-full sm:w-auto">
            <Icon className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span className="text-cyan-300">{activeNav.label}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
