"use client";

import React, { useState } from "react";
import { User, Bell, Shield, Settings, Camera, Check } from "lucide-react";

export default function SettingsMain() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="w-full h-full bg-[#050505] text-gray-100 font-manrope p-6">
      {/* App Name */}
      <div className="flex items-center gap-3 mb-8 text-cyan-400">
        <Settings className="w-5 h-5" />
        <span className="text-lg font-medium">Settings</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-gray-800">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "privacy", label: "Privacy & Security", icon: Shield },
          { id: "preferences", label: "Preferences", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-gray-900 text-cyan-400 border-t border-x border-cyan-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl font-bold">
                    JD
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg text-sm font-medium">
                  Change Avatar
                </button>
                <button className="px-5 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:border-gray-600">
                  Remove
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2.5 bg-gray-800/50 border border-gray-700 border-r-0 rounded-l-lg text-sm text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    defaultValue="johndoe"
                    className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-r-lg text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                defaultValue="Preserving memories one capsule at a time."
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-cyan-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">0/280 characters</p>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>Notification settings coming soon.</p>
          </div>
        )}

        {/* Privacy & Security Tab */}
        {activeTab === "privacy" && (
          <div className="text-center py-12 text-gray-400">
            <Shield className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>Privacy settings coming soon.</p>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div className="text-center py-12 text-gray-400">
            <Settings className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>Preferences coming soon.</p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
          <Check className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
