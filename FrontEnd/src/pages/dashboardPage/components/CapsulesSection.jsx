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
  UserCircleIcon,
  PlusIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  FireIcon,
  TrophyIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";

function CapsulesSection({ capsules = [], formatDate }) {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <LockClosedIcon className="w-8 h-8 text-yellow-400" />
            Your Private Vault
          </h2>
          <Link
            to="/dashboard/my"
            className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-2"
          >
            View all
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.slice(0, 3).map((capsule, i) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-yellow-500/20 rounded-xl">
                  <LockClosedIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <span className="text-sm text-gray-500">#{capsule.id}</span>
              </div>

              <h3 className="text-2xl font-bold mb-3">{capsule.title}</h3>
              <p className="text-gray-400 mb-6">
                {capsule.image?.length} memories sealed
              </p>

              <div className="flex items-center gap-3 text-purple-400">
                <CalendarIcon className="w-5 h-5" />
                <span className="text-lg">
                  Opens {formatDate(capsule?.opening_date)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CapsulesSection;
