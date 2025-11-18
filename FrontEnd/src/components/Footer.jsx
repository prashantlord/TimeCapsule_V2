import React from "react";

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <>
      {" "}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {currentYear} Time Capsule. College Project.
      </footer>{" "}
    </>
  );
}

export default Footer;
