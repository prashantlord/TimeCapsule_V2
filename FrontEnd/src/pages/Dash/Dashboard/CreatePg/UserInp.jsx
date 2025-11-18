import React, { useState } from "react";
import {
  ArrowLeft,
  Package,
  Lock,
  Calendar,
  Image,
  FileText,
  Video,
  Music,
  Clock,
  Eye,
  EyeOff,
  Plus,
  Upload,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Check,
  Trash2,
} from "lucide-react";
import { format, addDays } from "date-fns";

function UserInp({
  step,
  capsuleName,
  setCapsuleName,
  message,
  setMessage,
  isPrivate,
  setIsPrivate,
  openDate,
  setOpenDate,
  files,
  setFiles,
  handleFileUpload,
  removeFile,
}) {
  const fileTypes = [
    { name: "Photos", icon: Image, type: "image/*" },
    { name: "Documents", icon: FileText, type: "text/*,.pdf" },
    { name: "Videos", icon: Video, type: "video/*" },
    { name: "Audio", icon: Music, type: "audio/*" },
  ];

  return (
    <>
      {step === 1 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            Capsule Details
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Capsule Name
              </label>
              <input
                type="text"
                placeholder="e.g. 'First Day at xAI', 'Family Vacation 2024' Max:25 characters"
                value={capsuleName}
                maxLength={25}
                onChange={(e) => setCapsuleName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Add a short description or memory note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-yellow-400" />
            Privacy & Unlock Schedule
          </h3>

          <div className="grid xl:grid-cols-2 gap-6">
            {/* Privacy Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                <span>Privacy</span>
              </label>
              <div className="flex gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <button
                  onClick={() => setIsPrivate(true)}
                  className={`flex-1 p-4 rounded-lg transition-all ${
                    isPrivate
                      ? "bg-yellow-500/20 border border-yellow-500/40 text-yellow-300"
                      : "bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <Lock className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-medium block">Private</span>
                  <span className="text-xs text-yellow-400/80">
                    Only you can view
                  </span>
                </button>
                <button
                  onClick={() => setIsPrivate(false)}
                  className={`flex-1 p-4 rounded-lg transition-all ${
                    !isPrivate
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                      : "bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <Eye className="w-5 h-5 mx-auto mb-2" />
                  <span className="text-sm font-medium block">Public</span>
                  <span className="text-xs text-emerald-400/80">
                    Share with world
                  </span>
                </button>
              </div>
            </div>

            {/* Unlock Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Unlock Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="date"
                  value={format(openDate, "yyyy-MM-dd")}
                  onChange={(e) => setOpenDate(new Date(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>
              <p className="text-xs text-purple-400 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{format(openDate, "MMM d, yyyy")}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Add Files */}
      {step === 3 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 w-full">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-emerald-400" />
            Add Memories
          </h3>

          <div className="space-y-6">
            {/* File Type Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {fileTypes.map((type, idx) => {
                const Icon = type.icon;
                return (
                  <label key={idx} className="group">
                    <input
                      type="file"
                      multiple
                      accept={type.type}
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-700 rounded-xl hover:border-cyan-500/50 hover:bg-gray-800/20 transition-all cursor-pointer">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-200 mb-1">
                        {type.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Click to upload
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Uploaded ({files.length})
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {files.map((file) => {
                    const icons = {
                      image: Image,
                      video: Video,
                      audio: Music,
                      document: FileText,
                    };
                    const Icon = icons[file.type] || FileText;
                    return (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                            <Icon className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-100 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Check className="w-6 h-6 text-emerald-400" />
            Review & Create
          </h3>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border border-yellow-500/20 rounded-xl">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="font-semibold text-gray-100">
                      {capsuleName || "Untitled Capsule"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Private • Opens {format(openDate, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="font-medium text-gray-100 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {files.length} memories added
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
                  <p className="text-sm text-gray-400">
                    Your capsule will not be accessible until the expected date
                    of opening has been reached.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserInp;
