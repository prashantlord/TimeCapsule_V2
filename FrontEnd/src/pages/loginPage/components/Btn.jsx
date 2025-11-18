import React from "react";
import { motion } from "framer-motion";
function Btn({ label, type, isLoading }) {
  return (
    <motion.button
      whileHover={{ scale: !isLoading ? 1.02 : 1 }}
      whileTap={{ scale: !isLoading ? 0.98 : 1 }}
      type={type}
      className={`w-full py-3 mt-2 rounded-lg font-medium text-white transition relative overflow-hidden  ${
        isLoading
          ? "bg-[#0077b6] cursor-not-allowed"
          : " bg-gradient-to-r from-[#00b4d8] to-[#0077b6] cursor-pointer"
      }`}
      disabled={isLoading}
    >
      {/* Button text */}
      <span className="relative z-10">{label}</span>

      {/* Neon glowing border overlay while loading */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-t-[#00b4d8] shadow-[0_-4px_6px_-2px_rgba(0,180,216,0.6)] border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      )}

      {/* Optional soft neon glow behind the button */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 rounded-lg shadow-[0_0_20px_#00b4d8]"
          animate={{
            boxShadow: [
              "0 0 15px #00b4d8",
              "0 0 30px #00b4d8",
              "0 0 15px #00b4d8",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
}

export default Btn;
