import React from "react";
import { ChevronRight, Check, ChevronLeft } from "lucide-react";

function Footer({ handlePrevStep, handleCreateCapsule, handleNextStep, step }) {
  return (
    <>
      <div className="bg-black/10 border-t border-cyan-500/20 px-4 py-4 w-full text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-sm font-medium hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {step === 4 ? (
            <button
              onClick={handleCreateCapsule}
              className="flex items-center gap-2 px-8 py-3 cursor-pointer bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <Check className="w-4 h-4" />
              Create Capsule
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white cursor-pointer rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
              Next Step
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer;
