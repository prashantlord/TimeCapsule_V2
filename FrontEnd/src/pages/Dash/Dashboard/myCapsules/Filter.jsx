import React from "react";
import { Menu, Package, ChevronRight, ChevronLeft } from "lucide-react";

function Filter({ filter, setFilter, filterTypes }) {
  return (
    <>
      <div className="flex gap-2 mt-4 overflow-x-auto px-5">
        {filterTypes.map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer
                  ${
                    filter === item.id
                      ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                      : "bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600"
                  }`}
          >
            {item.label} <span className="ml-1 opacity-70">({item.count})</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default Filter;
