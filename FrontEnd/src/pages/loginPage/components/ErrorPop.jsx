import { motion, AnimatePresence } from "framer-motion";

const ErrorPop = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-6 right-6 z-50 bg-[#1a1a1a] border border-[#ff3b3b]/50 text-[#ff5555] px-5 py-3 rounded-xl shadow-[0_0_15px_#ff000033]"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <p className="font-medium">{show}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorPop;
