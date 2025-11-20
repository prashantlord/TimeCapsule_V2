"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LockClosedIcon,
  LockOpenIcon,
  GlobeAltIcon,
  ClockIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { format, formatDistanceToNowStrict } from "date-fns";

const mockPublicCapsules = [
  {
    id: 1,
    userName: "alexfuture",
    userAvatar: null,
    title: "To whoever finds this in 2030",
    sealedMessagePreview:
      "I'm writing this from 2025... the world feels like it's burning but I still believe...",
    fullMessage:
      "I'm writing this from 2025... the world feels like it's burning but I still believe we'll figure it out. If you're reading this, tell me — did we?",
    images: ["https://picsum.photos/seed/future1/1200/800"],
    openingDate: new Date("2030-01-01"),
    sealedAt: new Date("2025-11-15"),
    isPublic: true,
    unlockedBy: null,
    unlockedAt: null,
    unlockerAvatar: null,
  },
  {
    id: 2,
    userName: "ghost2035",
    userAvatar: null,
    title: "My biggest regret (unlocks 2035)",
    sealedMessagePreview:
      "I wish I had told her... but I was too scared of the answer.",
    fullMessage:
      "I wish I had told Sarah I loved her in 2025. I was too scared of the answer. If you're me reading this — did you ever tell her?",
    images: [],
    openingDate: new Date("2035-07-20"),
    sealedAt: new Date("2025-11-10"),
    isPublic: true,
    unlockedBy: null,
    unlockedAt: null,
  },
  {
    id: 3,
    userName: "timewanderer",
    userAvatar: null,
    title: "The day I disappeared",
    sealedMessagePreview:
      "November 19, 2025 — today I start walking and never look back...",
    fullMessage:
      "November 19, 2025 — today I quit my job, sold everything, and started walking south with no plan. If you're reading this, I made it at least 5 years. Tell past me he's still free.",
    images: [
      "https://picsum.photos/seed/walk1/1200/800",
      "https://picsum.photos/seed/walk2/1200",
    ],
    openingDate: new Date("2030-11-19"),
    sealedAt: new Date("2025-11-19"),
    isPublic: true,
    unlockedBy: "@starlight7",
    unlockedAt: new Date("2030-11-19"),
  },
  {
    id: 4,
    userName: "anonymous2025",
    userAvatar: null,
    title: "I know what happens in 2026 (serious)",
    sealedMessagePreview:
      "Something massive happens in March 2026. I'm scared to say it now but...",
    fullMessage:
      "March 2026 — the AI singularity begins. I work at xAI. We're closer than anyone thinks. This is not a joke.",
    images: [],
    openingDate: new Date("2027-01-01"),
    sealedAt: new Date("2025-11-18"),
    isPublic: true,
    unlockedBy: null,
    unlockedAt: null,
  },
  {
    id: 5,
    userName: "luna",
    userAvatar: null,
    title: "To my daughter when she turns 18",
    sealedMessagePreview:
      "You were born today, November 19, 2025. This is for you in 2043...",
    fullMessage:
      "You were born today, November 19, 2025. You're perfect. I hope the world treated you kindly. I hope you still have that fire in your eyes I saw the first second. Love you forever, Mom.",
    images: ["https://picsum.photos/seed/baby1/1200/1600"],
    openingDate: new Date("2043-11-19"),
    sealedAt: new Date("2025-11-19"),
    isPublic: true,
    unlockedBy: null,
    unlockedAt: null,
  },
];

export default function Public() {
  const [capsules, setCapsules] = useState(mockPublicCapsules);

  const now = new Date("2025-11-19");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-black/80 z-10">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <GlobeAltIcon className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Public Echoes
              </h1>
              <p className="text-sm text-gray-500">
                Sealed messages to the future · Anyone can see them coming
              </p>
            </div>
          </div>
          <a
            href="/create?public=true"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-full font-bold hover:scale-105 transition"
          >
            Seal a Public Capsule
          </a>
        </div>
      </header>

      {/* Main feed */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {capsules.map((cap) => {
            const isUnlocked = cap.unlockedBy !== null;
            const isReadyToUnlock =
              new Date(cap.openingDate) <= now && !isUnlocked;
            const timeLeft = formatDistanceToNowStrict(cap.openingDate, {
              addSuffix: false,
            });

            return (
              <motion.article
                key={cap.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Card */}
                <div
                  className={`relative overflow-hidden rounded-3xl border ${
                    isUnlocked ? "border-emerald-500/30" : "border-white/10"
                  } bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-2xl p-8 shadow-2xl`}
                >
                  {/* Locked overlay if not unlocked */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
                      <div className="text-center">
                        {isReadyToUnlock ? (
                          <>
                            <LockClosedIcon className="w-24 h-24 text-emerald-500 mx-auto mb-6 animate-pulse" />
                            <p className="text-3xl font-bold text-emerald-400">
                              Ready to unlock
                            </p>
                            <button className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-full font-bold text-lg hover:scale-110 transition">
                              Be the one to open it
                            </button>
                          </>
                        ) : (
                          <>
                            <LockClosedIcon className="w-32 h-32 text-cyan-500/50 mx-auto mb-8" />
                            <p className="text-5xl font-black text-cyan-400">
                              {timeLeft}
                            </p>
                            <p className="text-gray-500 mt-2">
                              until it can be opened
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Unlocked badge */}
                  {isUnlocked && (
                    <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5" /> Unlocked by{" "}
                      {cap.unlockedBy}
                    </div>
                  )}

                  {/* User & date */}
                  <div className="flex items-center gap-3 mb-6 text-gray-400">
                    <UserCircleIcon className="w-10 h-10" />
                    <div>
                      <span className="font-medium text-gray-300">
                        @{cap.userName}
                      </span>
                      <span className="mx-2">·</span>
                      <span>Sealed {format(cap.sealedAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    {cap.title}
                  </h2>

                  {/* Message preview / full */}
                  <div className="text-xl leading-relaxed text-gray-300 mb-6">
                    {cap.fullMessage}
                  </div>

                  {/* Images if any */}
                  {cap.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {cap.images.map((img, i) => (
                        <div key={i} className="rounded-2-xl overflow-hidden">
                          <img src={img} className="w-full h-64 object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Open date */}
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5" />
                    Opens {format(cap.openingDate, "MMMM d, yyyy")}
                  </div>
                </div>
              </motion.article>
            );
          })}q
        </div>
      </div>
    </div>
  );
}
