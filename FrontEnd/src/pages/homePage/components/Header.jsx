import React from "react";

import { LockClosedIcon } from "@heroicons/react/24/outline";
function Header() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-3 py-6 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img src="/src/assets/logo.svg" className="w-12 h-12 text-black" />

          <span className="text-xl font-bold">Time Capsule</span>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="/login"
            className="text-gray-300 hover:text-white transition font-medium hidden md:block"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="px-3 py-2 bg-gradient-to-r text-sm text-cyan-50 md:text-md from-cyan-500 to-emerald-500 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
