import React from "react";

function ActionButtons({ quickActions, handleClick }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((a, i) => {
          const Icon = a.icon;
          return (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-4 sm:p-5 bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group"
              onClick={() => {
                handleClick(a.link);
              }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-200 group-hover:text-cyan-300 transition-colors text-center">
                {a.title}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
export default ActionButtons;
