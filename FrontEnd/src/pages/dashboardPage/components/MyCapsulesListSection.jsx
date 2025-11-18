"use client";
import React from "react";
import { motion } from "framer-motion";

import {
  LockClosedIcon,
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { format, formatDistanceToNow } from "date-fns";
import { daysFromToday } from "../../../utils/functions";
import VanitySection from "./VanitySection";

function MyCapsulesListSection({
  isPublic,
  capsule,
  index,
  canOpen,
  handleUnlock,
}) {
  return (
    <>
      <motion.div
        key={capsule.id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-cyan-500/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition"></div>

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-6">
            <div
              className={`p-3 rounded-xl ${
                isPublic ? "bg-emerald-500/20" : "bg-cyan-500/20"
              }`}
            >
              {isPublic ? (
                <GlobeAltIcon className="w-8 h-8 text-emerald-400" />
              ) : (
                <LockClosedIcon className="w-8 h-8 text-cyan-400" />
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cyan-400">
                {daysFromToday(capsule.opening_date)}
              </div>
              <div className="text-sm text-gray-400">days left</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 line-clamp-2">
            {capsule.title}
          </h3>

          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Opens {format(capsule.opening_date, "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-2">
              <PhotoIcon className="w-5 h-5" />
              {capsule?.image?.length || 0} photos
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              Sealed{" "}
              {formatDistanceToNow(capsule.created_at, {
                addSuffix: true,
              })}
            </div>
          </div>

          <button
            className={`mt-6 w-full py-4 bg-gradient-to-r   text-black rounded-xl font-bold ${
              canOpen
                ? " from-cyan-500 to-emerald-500 text-cyan-100 cursor-pointer "
                : "from-gray-800 text-gray-400 to-gray-900"
            } `}
            onClick={() => {
              if (canOpen) {
                handleUnlock(capsule.id);
              }
              return;
            }}
          >
            {!canOpen ? "Locked" : "Unlock"}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default MyCapsulesListSection;
