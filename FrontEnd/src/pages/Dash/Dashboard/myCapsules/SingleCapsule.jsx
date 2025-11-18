import React from "react";
import { format, addDays, isPast, isFuture } from "date-fns";

import {
  Image,
  Download,
  Trash2,
  MoreVertical,
  Clock,
  Lock,
} from "lucide-react";
function SingleCapsule({ capsule, canOpen, formatDate }) {
  return (
    <div
      key={capsule.id}
      className={`group h-40 text-white  relative p-4 bg-gray-900/40 backdrop-blur-xl border rounded-2xl cursor-pointer transition-all  ${
        !canOpen
          ? "border-yellow-500/40"
          : "border-gray-800 hover:border-gray-700 hover:bg-gray-850"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`p-3 rounded-lg mb-3 transition-all ${
            !canOpen ? "bg-yellow-500/20" : "bg-cyan-500/20"
          }`}
        >
          <Image
            className={`w-5 h-5 ${
              !canOpen ? "text-yellow-400" : "text-cyan-400"
            }`}
          />
        </div>
        <p className="text-sm font-medium text-gray-100 truncate w-full">
          {capsule.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {capsule.image.length} Items
        </p>
        {capsule.opening_date && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${
              canOpen ? "text-emerald-400" : "text-purple-400"
            }`}
          >
            <Clock className="w-3 h-3" />
            {formatDate(capsule.opening_date)}
          </p>
        )}
        {capsule.opening_date && canOpen && (
          <span className="text-xs text-emerald-400 font-medium">OPEN NOW</span>
        )}
      </div>
      {!capsule.open_status && !canOpen && (
        <Lock className="absolute top-2 right-2 w-4 h-4 text-yellow-400" />
      )}
      {!capsule.open_status || (
        <button className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-800 rounded-lg">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}

export default SingleCapsule;
