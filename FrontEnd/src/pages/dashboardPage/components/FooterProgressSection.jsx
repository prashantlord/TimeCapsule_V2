import React from "react";

function FooterProgressSection({ currentStep }) {
  return (
    <>
      <div
        className={`fixed bottom-0 h-2 transition-all duraiton-300 ease-in bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-r-xl ${
          currentStep === 1
            ? "w-[1%]"
            : currentStep === 2
            ? "w-[33%]"
            : "w-[66%]"
        }`}
      >
        {" "}
      </div>
    </>
  );
}

export default FooterProgressSection;
