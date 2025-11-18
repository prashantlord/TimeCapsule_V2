import React from "react";

import { Activity, Calendar } from "lucide-react";
import { format, addDays, isPast, isFuture } from "date-fns";

function StatusBox({ locked = [], unlocked = [] }) {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Invalid Date";
    }
  };
  return (
    <div className="w-80  flex flex-col sm:flex-row sm:w-full xl:flex-col xl:w-120 gap-5 text-white">
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 sm:p-6 w-full">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-yellow-400" />
          Private Vault
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Capsules</span>
            <span className="font-medium text-cyan-300">
              {Number(locked?.length) + Number(unlocked?.length) || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Locked</span>
            <span className="font-medium text-yellow-400">
              {locked?.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Unlocked</span>
            <span className="font-medium text-emerald-400">
              {unlocked?.length || 0}
            </span>
          </div>
        </div>
      </div>

      {locked.length > 0 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 sm:p-6 w-full">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            Upcoming Unlocks
          </h3>

          <div className="space-y-3 text-sm">
            {locked.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="font-medium truncate text-[12px]">
                    {c.title}
                  </span>
                </div>
                <span className="text-purple-300 text-xs">
                  {formatDate(c.open_date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusBox;
