"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import {
  formatDate,
  findClosestToToday,
  orderLockedCapsules,
} from "../../utils/functions";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import VanitySection from "./components/VanitySection";
import CapsulesSection from "./components/CapsulesSection";
import Footer from "/src/components/Footer";
import { getUser } from "/src/backend/userFns.js";
import {
  getPrivateCapsules,
  openPrivateCapsule,
} from "../../backend/privateFns";
import { useLocation, useNavigate } from "react-router";
import OpenCapsuleModal from "./components/OpenCapsuleUI";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [menuBar, setMenuBar] = useState(false);
  const [capsules, setCapsules] = useState([]);
  const [openCapsule, setOpenCapsule] = useState();
  const vanityStats = useMemo(() => {
    return {
      totalMemories:
        Number(capsules?.locked_capsule?.length) +
          Number(capsules?.unlocked_capsule?.length) || 0,
      locked: Number(capsules?.locked_capsule?.length),
      unlocked: Number(capsules?.unlocked_capsule?.length),

      daysUntilNextUnlock:
        findClosestToToday(capsules.locked_capsule)?.days ?? 999,
      inOrderLockedCapsule: orderLockedCapsules(capsules?.locked_capsule) || [],
      achievementLevel: "Memory Master",
    };
  }, [capsules]);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      {
        localStorage.setItem("auth_token", JSON.stringify(token));
        localStorage.setItem("auth_role", JSON.stringify("user"));
      }
      navigate("/dashboard", { replace: true });
      return;
    }

    const res = await getUser();
    setUserName(res);
    if (!res) {
      navigate("/login", { replace: true });
      return;
    }
  };

  const fetchPrivateCapsules = async () => {
    const res = await getPrivateCapsules(userName.id, "all");
    setCapsules(res);
  };

  const handleUnlock = async (id) => {
    const caps = [...vanityStats?.inOrderLockedCapsule];

    const result = caps.reduce((acc, obj) => {
      if (obj.id == id) {
        return obj; // keep the object
      }
      return acc; // otherwise keep previous accumulator
    }, null);

    const res = await openPrivateCapsule({
      private_capsules_id: id,
      open_date: new Date(),
    });
    if (res) {
      setOpenCapsule(result);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userName) {
      fetchPrivateCapsules();
    }
    return;
  }, [userName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900 text-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-emerald-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 z-100 bg-black/50 backdrop-blur-2xl w-full border-b border-gray-800 ">
        <Header
          userName={userName.username}
          menuBar={menuBar}
          setMenuBar={setMenuBar}
        />
      </header>

      {/* Interactive Welcome Banner */}
      <section className="relative py-24 px-6 mt-10">
        <HeroSection userName={userName.username} vanityStats={vanityStats} />
      </section>

      {/* Vanity Stats – completely redesigned */}
      <section className=" px-6">
        <VanitySection
          vanityStats={vanityStats}
          capsules={capsules}
          handleUnlock={handleUnlock}
        />
      </section>

      {/* Private Capsules */}
      <section className="py-20 px-6">
        <CapsulesSection
          capsules={vanityStats?.inOrderLockedCapsule || []}
          formatDate={formatDate}
        />
      </section>

      {/* Footer */}
      <Footer />
      {openCapsule && (
        <OpenCapsuleModal
          openCapsule={openCapsule}
          setOpenCapsule={setOpenCapsule}
        />
      )}
    </div>
  );
}
