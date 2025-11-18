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
function HowItWorksSection() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Beautifully Simple.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Incredibly Powerful.
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <HeartIcon className="w-12 h-12" />,
              title: "Capture the Moment",
              desc: "Write letters, record voice notes, upload photos — anything that matters to you right now.",
            },
            {
              icon: <LockClosedIcon className="w-12 h-12" />,
              title: "Lock It Away",
              desc: "Choose when your capsule unlocks — tomorrow, in 5 years, or on your 50th birthday.",
            },
            {
              icon: <CalendarIcon className="w-12 h-12" />,
              title: "Relive the Memory",
              desc: "When the time comes, your capsule opens. Experience the joy, tears, and growth all over again.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-500/20">
                <div className="p-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl text-cyan-100">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HowItWorksSection;
