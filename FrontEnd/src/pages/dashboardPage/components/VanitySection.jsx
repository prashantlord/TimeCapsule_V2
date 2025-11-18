"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
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
function VanitySection({ vanityStats, handleUnlock }) {
  const achivement = vanityStats.locked >= 5 && vanityStats.unlocked >= 1;
  console.log(vanityStats.inOrderLockedCapsule);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your Memory Journey
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl border border-purple-500/20 text-center"
          >
            <TrophyIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-purple-300">
              {vanityStats?.locked || 0}
            </p>
            <p className="text-gray-400 mt-2">Locked Capsules</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-2xl border border-cyan-500/20 text-center"
          >
            <FireIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-cyan-300">
              {vanityStats?.unlocked || 0}
            </p>
            <p className="text-gray-400 mt-2">Unlocked Capsules</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-2xl border border-emerald-500/20 text-center"
          >
            <HeartIcon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <p className="text-4xl font-bold text-emerald-300">
              {vanityStats.totalMemories}
            </p>
            <p className="text-gray-400 mt-2">Total Memories</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8  rounded-2xl border  text-center ${
              achivement
                ? "bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border-yellow-500/20"
                : "bg-gray-500/10 border-cyan-900"
            } `}
          >
            <StarIcon
              className={`w-12 h-12  mx-auto mb-4 ${
                achivement ? "text-yellow-400" : "text-gray-500"
              }`}
            />
            <p
              className={`text-2xl font-bold ${
                achivement ? "text-yellow-300" : "text-gray-500/50"
              }`}
            >
              {vanityStats.achievementLevel}
            </p>
            <p className="text-gray-400 mt-2">
              {" "}
              {achivement ? "Achievement" : "Locked"}{" "}
            </p>
          </motion.div>
        </div>

        {/* Days until next unlock – big vanity card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-12 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl border border-purple-500/20 text-center"
        >
          <ClockIcon className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <p className="text-6xl font-bold text-purple-300 mb-2">
            {vanityStats.daysUntilNextUnlock}
          </p>
          <p className="text-2xl text-gray-300">
            days until your next capsule unlocks
          </p>
          {vanityStats.daysUntilNextUnlock === 0 && (
            <button
              className="mt-8 px-8 py-4 cursor-pointer animate-pulse rounded-full font-semibold  text-lg  text-white  bg-purple-600/20 backdrop-blur-md border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-purple-600/30 transition-all duration-300 flex items-center gap-3 mx-auto "
              onClick={() => {
                handleUnlock(vanityStats?.inOrderLockedCapsule[0]?.id);
              }}
            >
              <span className="text-purple-300 ">
                {" "}
                <Sparkles />{" "}
              </span>
              Unlock Capsule
            </button>
          )}
        </motion.div>
      </div>
    </>
  );
}

export default VanitySection;
