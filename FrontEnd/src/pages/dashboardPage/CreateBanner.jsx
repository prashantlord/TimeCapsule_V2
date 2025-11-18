import React from "react";
import { motion } from "framer-motion";

function CreateBanner() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Create a New
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {" "}
            Capsule
          </span>
        </h1>
        <p className="text-xl text-gray-300">
          Seal your memories today. Open them when the time is right.
        </p>
      </motion.div>
    </>
  );
}

export default CreateBanner;
