import React from "react";
import { PanelRight } from "lucide-react";

function Header({ statusBar, setStatusBar }) {
  return (
    <>
      <div className=" border-b border-cyan-500/20 w-full h-20 flex items-center px-5">
        <button
          onClick={() => {
            setStatusBar((prev) => !prev);
            console.log(statusBar);
          }}
        >
          <PanelRight className="text-cyan-500" />
        </button>
      </div>
    </>
  );
}

export default Header;
