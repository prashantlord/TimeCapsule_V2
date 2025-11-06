import React from "react";

function NavBtns({ navItems, setActiveNav, activeNav, handleClick }) {
  return (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = activeNav === item.link;
        return (
          <button
            key={item.link}
            className={`w-full text-cyan-100 cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${
                      active
                        ? "bg-cyan-500/10 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                        : "hover:bg-gray-900/40 border border-transparent"
                    } ${item.danger ? "text-red-400 hover:bg-red-500/10" : ""}`}
            onClick={() => {
              setActiveNav(item.link);
              handleClick(item.link);
            }}
          >
            <div
              className={`p-2 rounded-lg transition-all ${
                active
                  ? "bg-cyan-500/20"
                  : "bg-gray-800 group-hover:bg-gray-700"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "text-cyan-400" : ""}`} />
            </div>
            <span className={`font-medium ${active ? "text-cyan-300" : ""}`}>
              {item.label}
            </span>
            {active ? (
              <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            ) : (
              ""
            )}
          </button>
        );
      })}
    </>
  );
}

export default NavBtns;
