import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";

function StatsCreate({ capsuleName, isPrivate, openDate, files }) {
  return (
    <>
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          Capsule Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Name</span>
            <span className="font-medium">{capsuleName || "Untitled"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Privacy</span>
            <span
              className={isPrivate ? "text-yellow-400" : "text-emerald-400"}
            >
              {isPrivate ? "🔒 Private" : "🌐 Public"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Opens</span>
            <span className="font-medium text-purple-400">
              {format(openDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Files</span>
            <span className="font-medium text-cyan-400">{files.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatsCreate;
