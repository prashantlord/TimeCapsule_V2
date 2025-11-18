"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  CalendarIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  UserCircleIcon,
  PlusIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  FireIcon,
  TrophyIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

import { format, differenceInDays } from "date-fns";
function HeroSection({ userName, vanityStats }) {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-3xl blur-3xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 text-center group-hover:border-cyan-500/30 transition-all">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="text-md sm:text-xl text-gray-300 mb-8">
              Your vault is growing. {vanityStats.totalMemories} memories safely
              locked away.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/dashboard/create"
                className="px-5 text-sm py-5 sm:px-10 sm:text-lg  text-cyan-50 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <PlusIcon className="w-6 h-6" />
                Create New Capsule
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default HeroSection;
