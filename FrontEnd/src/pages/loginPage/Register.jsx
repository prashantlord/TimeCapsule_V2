import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { getUser, register } from "/src/backend/userFns.js";
import InputFld from "./components/InputFld";
import Btn from "./components/Btn";
import Divider from "./components/Divider";
import OauthBtns from "./components/OauthBtns";
import ErrorPop from "./components/ErrorPop";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAvalable = async () => {
      const valid_user = await getUser();
      if (valid_user) {
        if (JSON.parse(localStorage.getItem("auth_role")) === "admin") {
          navigate("/admin");
          return;
        }
        navigate("/dashboard");
      }
    };
    isAvalable();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await register(username, email, password);
    if (res) navigate("/dashboard");
    else setError("Oops! Something’s not quite right.");
    setIsLoading((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0c0c0c] text-white font-['DM Sans']">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#141414] to-[#0a0a0a] opacity-95"></div>
      <ErrorPop show={error} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-[#151515]/80 border border-[#222] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 backdrop-blur-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 tracking-tight text-gray-100">
          Sign Up
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputFld
            label="User Name"
            type="text"
            placeholder="Jon Doe"
            state={username}
            setState={setUserName}
          />

          <InputFld
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            state={email}
            setState={setEmail}
          />

          <InputFld
            label="Password"
            type="password"
            placeholder="••••••••"
            state={password}
            setState={setPassword}
          />

          <Btn label="Register" type="submit" isLoading={isLoading} />
        </form>

        <Divider />

        <OauthBtns />

        <p className="text-center text-sm text-gray-500 mt-6">
          Alredy have an account?{" "}
          <Link to="/login" className="text-[#00b4d8] hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
