"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  GlobeAltIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

function StepTwoSection({
  openingDate,
  setOpeningDate,
  isPublic,
  setIsPublic,
}) {
  return (
    <>
      <motion.div
        key="step2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="space-y-10"
      >
        <div>
          <label className="block text-lg font-medium mb-3">
            When should this open? <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none" />
            <input
              type="date"
              value={openingDate}
              onChange={(e) => setOpeningDate(e.target.value)}
              min={format(
                new Date(Date.now() + 24 * 60 * 60 * 1000),
                "yyyy-MM-dd"
              )}
              className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium mb-4">Privacy</label>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                !isPublic
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <LockClosedIcon className="w-8 h-8" />
              <div>
                <p className="font-semibold">Private</p>
                <p className="text-sm text-gray-400">Only you can open</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPublic(true);
              }}
              className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                isPublic
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <GlobeAltIcon className="w-8 h-8" />
              <div>
                <p className="font-semibold">Public</p>
                <p className="text-sm text-gray-400">Anyone can view</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default StepTwoSection;
