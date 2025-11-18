import React from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  CalendarIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  CheckIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
function HeroSection() {
  return (
    <>
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full border border-cyan-500/20 mb-8"
        >
          <SparklesIcon className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-medium">
            Preserve today. Relive tomorrow.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-8"
        >
          Your Life's Most
          <br />
          Precious Moments,
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Sealed Until Ready
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="text-md sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Write letters to your future self. Save photos, voice notes, dreams,
          or personal notes. They unlock exactly when you choose — next year, in
          10 years, or on a special date.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="/register"
            className="group px-10 py-5 text-cyan-100 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            Create Your First Capsule
            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-5 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-400" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-400" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon className="w-5 h-5 text-emerald-400" />
            <span>No ads</span>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default HeroSection;
