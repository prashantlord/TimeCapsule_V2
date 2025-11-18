import React, { useState } from "react";
import { Calendar, ChevronRight, ChevronLeft, Folder } from "lucide-react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
} from "date-fns";

//  privateCapsules: {
//     title: "Learning PHP",
//     message: "lets learn php and get a proper fullstack job",
//     opening_date: "2005-12-12 12:12:00",
//     open_status: false,
//     open_date: null,
//   },

function CalenderBox() {
  const capsules = [
    {
      id: 1,
      title: "First Day at xAI",
      message: "fuck",
      created_at: "Oct 27, 2025",
      open_status: true,
      opening_date: new Date(2025, 9, 27),
    },
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Filter capsules with an opening_date
  const scheduledCapsules = capsules.filter((c) => c.opening_date);

  // Calendar range (includes extra days to fill the first/last weeks)
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const monthDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  return (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 sm:p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          Scheduled Opens
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentMonth((prev) => addMonths(prev, -1))}
            className="p-1 hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            className="p-1 hover:bg-gray-800 rounded-lg cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month Label */}
      <div className="text-center text-sm text-gray-400 mb-2">
        {format(currentMonth, "MMMM yyyy")}
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-xs mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, key) => (
          <div key={key} className="text-center text-gray-500 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {monthDays.map((day, idx) => {
          const hasEvent = scheduledCapsules.some((c) =>
            isSameDay(c.opening_date, day)
          );
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-lg transition-all
          ${
            hasEvent
              ? "bg-purple-500/20 text-purple-300 font-medium"
              : "text-gray-400"
          }
          ${!isSameMonth(day, currentMonth) ? "opacity-30" : ""}
          ${isToday ? "bg-cyan-900/50 font-semibold text-white" : ""}
        `}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      {/* Capsule List */}
      {scheduledCapsules.length > 0 && (
        <div className="mt-4 space-y-2 text-xs">
          {scheduledCapsules
            .filter(
              (c) =>
                c.opening_date &&
                c.opening_date.getMonth() === currentMonth.getMonth() &&
                c.opening_date.getFullYear() === currentMonth.getFullYear()
            )
            .sort((a, b) => a.opening_date - b.opening_date)
            .map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-2 text-purple-300"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="truncate">
                  {c.name} → {format(c.opening_date, "MMM d")}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CalenderBox;
