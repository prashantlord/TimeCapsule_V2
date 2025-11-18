import React from "react";

function Divider() {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-[#2c2c2c]"></div>
      <span className="mx-3 text-gray-500 text-sm">or continue with</span>
      <div className="flex-grow border-t border-[#2c2c2c]"></div>
    </div>
  );
}

export default Divider;
