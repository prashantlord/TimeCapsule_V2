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
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { Menu } from "lucide-react";

function Header({ userName, menuBar, setMenuBar, link = null }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 py-6 flex items-center justify-between">
        <div className="flex items-center gap-1 text-cyan-100">
          <img src="/src/assets/logo.svg" className="w-13 h-13 text-black" />

          <span className="sm:text-2xl font-bold">Time Capsule</span>
        </div>
        {link ? (
          link === "/dashboard/create" ? (
            <Link
              to="/dashboard/create"
              className="flex items-center text-sm   cursor-pointer text-cyan-100 gap-3 px-3 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5" />
              New Capsule
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Dashboard
              </Link>
            </>
          )
        ) : (
          <>
            <button
              className="text-cyan-100 transition-transform duration-300 ease-in cursor-pointer md:hidden"
              onClick={() => {
                setMenuBar((prev) => !prev);
              }}
            >
              {" "}
              <Menu />
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/public"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <GlobeAltIcon className="w-5 h-5" />
                Public
              </Link>
              <Link
                to="/dashboard/create"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              >
                <PlusIcon className="w-5 h-5" />
                Create
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <UserCircleIcon className="w-6 h-6" />
                  <span>{userName}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
            </nav>{" "}
          </>
        )}
      </div>
    </>
  );
}

export default Header;
