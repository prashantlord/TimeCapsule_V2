"use client";

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

export default function App() {
  const [email, setEmail] = React.useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <LockClosedIcon className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold">Time Capsule</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="/login"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-32 px-6 overflow-hidden">
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
            className="text-5xl md:text-7xl font-bold leading-tight mb-8"
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
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Write letters to your future self. Save photos, voice notes, dreams,
            or personal notes. They unlock exactly when you choose — next year,
            in 10 years, or on a special date.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <a
              href="/register"
              className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              Create Your First Capsule
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-10 py-5 bg-white/10 backdrop-blur rounded-xl font-medium border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3">
              <PlayIcon className="w-5 h-5" />
              Watch How It Works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-12 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-400" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-400" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-emerald-400" />
              <span>No ads</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
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
                  <div className="p-6 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-2xl text-black">
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
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/20">
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
            {[
              "Letters to future self",
              "Wedding vows & anniversaries",
              "Baby's first year",
              "Travel adventures",
              "Graduation & milestones",
              "Family recipes",
              "Bucket list items",
              "Voice messages to loved ones",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <HeartIcon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6">
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
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Start Preserving Your Story
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Free forever. No ads. Your memories are yours.
          </p>

          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 transition"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all">
                Get Started Free
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Unlimited capsules • End-to-end encrypted
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2025 Time Capsule. Made with ❤️ in Nepal.
      </footer>
    </div>
  );
}
