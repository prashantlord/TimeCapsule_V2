import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
function OffLoginItm({ item, handleClick, isLoading }) {
  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.1 } : {}}
      className="relative flex items-center justify-center w-12 h-12 bg-[#1a1a1a] border border-[#2c2c2c] rounded-full hover:border-[#00b4d8] transition cursor-pointer overflow-hidden"
      onClick={handleClick}
      disabled={isLoading}
    >
      {/* Loading border animation */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00b4d8]"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      )}

      {/* Button content stays same */}
      <span className="z-10">{item}</span>
    </motion.button>
  );
}

export default OffLoginItm;
