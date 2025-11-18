import React from "react";

function InputFld({ label, type, placeholder, state, setState }) {
  return (
    <div>
      <label htmlFor={type} className="block text-sm text-gray-400 mb-2">
        {label}
      </label>
      <input
        id={type}
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2c2c2c] rounded-lg focus:outline-none focus:border-[#00b4d8] text-gray-200 placeholder-gray-500"
      />
    </div>
  );
}

export default InputFld;
