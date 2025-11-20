"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
  formatDate,
  findClosestToToday,
  orderLockedCapsules,
  daysFromToday,
} from "../../utils/functions";
import {
  LockClosedIcon,
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon,
  PhotoIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { format, formatDistanceToNow } from "date-fns";

import { getUser } from "/src/backend/userFns.js";
import {
  getPrivateCapsules,
  openPrivateCapsule,
} from "../../backend/privateFns";

import Header from "./components/Header";
import MyCapsulesListSection from "./components/MyCapsulesListSection";
import MyCapsulesBanner from "./components/MyCapsulesBanner";
import OpenCapsuleUI from "./components/OpenCapsuleUI";

export default function MyCapsules() {
  const navigate = useNavigate();

  const [capsules, setCapsules] = useState([]);
  const [userName, setUserName] = useState("");
  const [openCapsule, setOpenCapsule] = useState(false);

  // ########################################################################################################## //

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

  const fetchUser = async () => {
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

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userName) {
      fetchPrivateCapsules();
    }

    return;
  }, [userName]);

  const handleUnlock = async (id) => {
    const caps = [...vanityStats?.inOrderLockedCapsule];

    const result = caps.reduce((acc, obj) => {
      if (obj.id == id) {
        return obj; // keep the object
      }
      return acc; // otherwise keep previous accumulator
    }, null);

    const res = await openPrivateCapsule({ private_capsules_id: id });
    if (res) {
      setOpenCapsule(result);
    } else {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-emerald-900/20"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className=" border-b border-gray-800 bg-black/50 backdrop-blur-2xl fixed top-0 w-full z-100">
        <Header link="/dashboard/create" />{" "}
      </header>

      {/* Hero Banner - Soonest Opening Capsule */}

      <section className="relative px-6 py-20 mt-15">
        <MyCapsulesBanner
          vanityStats={vanityStats}
          handleUnlock={handleUnlock}
        />
      </section>

      {/* Capsules Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              My Time Capsules
            </h1>
            <p className="text-xl text-gray-300">
              {capsules.length} sealed memories waiting for their moment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vanityStats
              ? vanityStats?.inOrderLockedCapsule?.map((capsule, index) => {
                  const isPublic = false;
                  const canOpen = daysFromToday(capsule.opening_date) <= 0;
                  return (
                    <MyCapsulesListSection
                      isPublic={isPublic}
                      capsule={capsule}
                      index={index}
                      key={index}
                      canOpen={canOpen}
                      handleUnlock={handleUnlock}
                    />
                  );
                })
              : ""}
          </div>

          {/* Pagination */}
          {/* {
            <div className="flex justify-center items-center gap-4 mt-16">
              <button
                className={`px-6 py-3 rounded-xl transition-all ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                Previous
              </button>
              <div className="flex gap-2">
                {Array.from({ length: 1 }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`w-12 h-12 rounded-full transition-all ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className={`px-6 py-3 rounded-xl transition-all ${
                  currentPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                Next
              </button>
            </div>
          } */}
        </div>
      </section>
      {openCapsule && (
        <OpenCapsuleUI
          openCapsule={openCapsule}
          setOpenCapsule={setOpenCapsule}
        />
      )}
    </div>
  );
}
