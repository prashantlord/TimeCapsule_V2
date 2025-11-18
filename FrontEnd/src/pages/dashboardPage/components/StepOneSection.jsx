import React from "react";
import { motion } from "framer-motion";

function StepOneSection({ title, setTitle, message, setMessage }) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-8"
    >
      <div>
        <label className="block text-lg font-medium mb-3">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={25}
          placeholder="e.g. My 25th Birthday Letter"
          className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition placeholder-gray-500"
        />
        <div className="text-right text-sm text-gray-500 mt-2">
          {title.length}/25
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium mb-3">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          placeholder="Write your letter to the future..."
          className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition placeholder-gray-500 resize-none"
        />
      </div>
    </motion.div>
  );
}

export default StepOneSection;
