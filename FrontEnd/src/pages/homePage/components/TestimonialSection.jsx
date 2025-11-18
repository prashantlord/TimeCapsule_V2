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
function TestimonialSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-3xl md:text-4xl font-medium italic text-gray-200 mb-8">
          “The best gift I ever gave myself”
        </p>
        <p className="text-xl text-gray-400">
          “I wrote a letter to my 30-year-old self at 20. When it opened last
          year, I cried happy tears reading my dreams and seeing how far I've
          come.”
        </p>
        <p className="text-cyan-400 mt-6 font-medium">
          — Sarah K., opened her first capsule in 2024
        </p>
      </motion.div>
    </>
  );
}

export default TestimonialSection;
