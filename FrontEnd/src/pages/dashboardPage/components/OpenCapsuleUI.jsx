"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function OpenCapsuleModal({
  onClose,
  openCapsule,
  setOpenCapsule,
}) {
  const [stage, setStage] = useState("largeTitle");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageSectionRef = useRef(null);

  const { title, message, image, created_at } = openCapsule;

  useEffect(() => {
    // Reset stage every time the modal opens
    setStage("largeTitle");
    setCurrentImageIndex(0);

    const timer1 = setTimeout(() => setStage("card"), 3000);
    const timer2 = setTimeout(() => setStage("images"), 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [openCapsule]);

  useEffect(() => {
    if (stage === "images" && image.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % image.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [stage, image.length]);

  // Auto scroll to images when they appear
  useEffect(() => {
    if (stage === "images" && imageSectionRef.current) {
      imageSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [stage]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 pt-20 md:pt-0"
      >
        {/* Animated Background - fixed behind everything */}
        <div className="fixed inset-0 pointer-events-none opacity-40 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-emerald-900/20"></div>
          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-5xl px-6 py-20 md:py-24">
          <AnimatePresence mode="wait">
            {stage === "largeTitle" && (
              <motion.div
                key="largeTitle"
                layoutId={`capsuleTitle-${openCapsule.id || "mock"}`}
                className="text-center"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                  {title}
                </h1>
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-5xl sm:text-6xl md:text-7xl mt-20 text-gray-500"
                >
                  ...
                </motion.p>
              </motion.div>
            )}

            {(stage === "card" || stage === "images") && (
              <motion.div
                key="capsuleCard"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="p-8 sm:p-12 md:p-20">
                  <div className="space-y-12 md:space-y-16">
                    <div>
                      <motion.h2
                        layoutId={`capsuleTitle-${openCapsule.id || "mock"}`}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                      >
                        {title}
                      </motion.h2>
                      <p className="text-base sm:text-lg text-gray-400">
                        Sealed on {format(created_at, "MMMM d, yyyy")} • Opened
                        today
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                      className="text-lg sm:text-xl leading-relaxed text-gray-200"
                    >
                      <p className="whitespace-pre-wrap">{message}</p>
                    </motion.div>

                    {image.length > 0 && stage === "images" && (
                      <div ref={imageSectionRef}>
                        <motion.div
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1, duration: 1.2 }}
                          className="rounded-2xl overflow-hidden bg-black/20 aspect-video md:aspect-auto md:h-[600px] lg:h-[700px]"
                        >
                          <AnimatePresence initial={false}>
                            <motion.img
                              key={currentImageIndex}
                              src={
                                "http://127.0.0.1:8000/storage/" +
                                image[currentImageIndex]?.image_location
                              }
                              alt="memory"
                              className="w-full h-full object-cover"
                              initial={{ x: "100%" }}
                              animate={{ x: "0%" }}
                              exit={{ x: "-100%" }}
                              transition={{ duration: 1.4, ease: "easeInOut" }}
                            />
                          </AnimatePresence>

                          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                            {image.map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  i === currentImageIndex
                                    ? "w-12 bg-white"
                                    : "w-2 bg-white/40"
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {stage === "images" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-center pt-12"
                      >
                        <button
                          onClick={() => {
                            setOpenCapsule(false);
                          }}
                          className="inline-block text-cyan-100 px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-cyan-500 to-emerald-500  rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
                        >
                          Close
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
