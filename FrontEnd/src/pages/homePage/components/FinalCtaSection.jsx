import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

function FinalCtaSection({ email, setEmail }) {
  return (
    <>
      {" "}
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
            <Link
              to="/register"
              className="px-5 py-4 bg-gradient-to-r text-cyan-50 from-cyan-500 to-emerald-500 text-black rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          No credit card required • Unlimited capsules
        </p>
      </motion.div>
    </>
  );
}

export default FinalCtaSection;
