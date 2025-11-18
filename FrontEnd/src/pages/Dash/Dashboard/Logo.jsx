import React from "react";
import { Sunrise, Sparkles } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <img src="/src/assets/logo.svg" alt="Logo" className="w-12 " />
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
          Time Capsule
        </h1>
        <p className="text-xs text-gray-500">Digital Memory Vault</p>
      </div>
    </div>
  );
}

export default Logo;
