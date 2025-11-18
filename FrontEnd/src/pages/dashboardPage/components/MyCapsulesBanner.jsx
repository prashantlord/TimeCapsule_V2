import React from "react";
import { motion } from "framer-motion";
import { formatDate } from "/src/utils/functions.js";
import { Sparkles } from "lucide-react";

function MyCapsulesBanner({ vanityStats, handleUnlock }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-gradient-to-r from-cyan-900/30 via-emerald-900/30 to-transparent backdrop-blur-xl rounded-3xl border border-white/10 p-10 md:p-16 text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Your next capsule opens in
          </h2>
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            {vanityStats?.daysUntilNextUnlock} days
          </div>
          <p className="text-xl md:text-3xl text-gray-300 mb-4">
            "{vanityStats?.inOrderLockedCapsule[0]?.title || "Empty"}"
          </p>
          <p className="md:text-lg text-gray-400">
            Sealed on{" "}
            {vanityStats?.inOrderLockedCapsule[0]
              ? formatDate(vanityStats?.inOrderLockedCapsule[0]?.created_at)
              : "2025"}
            {"  "}• Opens{" "}
            {vanityStats?.inOrderLockedCapsule[0]
              ? formatDate(vanityStats?.inOrderLockedCapsule[0]?.opening_date)
              : "Today"}
          </p>
          {vanityStats.daysUntilNextUnlock === 0 && (
            <button
              className="mt-8 px-8 py-4 cursor-pointer animate-bounce rounded-full font-semibold  text-lg bg-gradient-to-r from-cyan-400 to-emerald-400  text-white bg border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:bg-purple-600/30 transition-all duration-300 flex items-center gap-3 mx-auto "
              onClick={() => {
                handleUnlock(vanityStats?.inOrderLockedCapsule[0]?.id || 0);
              }}
            >
              <span className="text-cyan-100 ">
                {" "}
                <Sparkles />{" "}
              </span>
              Unlock Capsule
            </button>
          )}
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
}

export default MyCapsulesBanner;
