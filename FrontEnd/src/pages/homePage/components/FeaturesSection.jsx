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
import { ListTodo, Map, Milestone, Send } from "lucide-react";
function FeaturesSection() {
  const features = [
    { label: "Letters to future self", icon: Send },
    { label: "Travel adventures", icon: Map },
    { label: "Graduation & milestones", icon: Milestone },
    { label: "Bucket list items", icon: ListTodo },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Made for Every Memory
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <Icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-lg">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FeaturesSection;
