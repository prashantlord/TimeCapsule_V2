"use client";
import React from "react";
import { motion } from "framer-motion";
import { PhotoIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
function StepThreeSection({
  handleImageUpload,
  images,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  isDragging,
  removeImage,
}) {
  return (
    <>
      <motion.div
        key="step3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="space-y-8"
      >
        <div>
          <label className="block text-lg font-medium mb-3">
            Add Photos & Memories (Optional)
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging
                ? "border-cyan-500 bg-cyan-500/10"
                : "border-white/20 hover:border-white/40"
            }`}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <PhotoIcon className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-lg text-gray-400">
              Drag & drop images here, or{" "}
              <span className="text-cyan-400 underline">click to browse</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Up to 20 photos • Max 10MB each
            </p>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative group rounded-xl overflow-hidden"
                >
                  <img
                    src={img.preview}
                    alt="preview"
                    className="w-full h-32 object-cover"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 p-2 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}

              {images.length < 20 && (
                <label className="flex items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-white/40 transition">
                  <PlusIcon className="w-8 h-8 text-gray-500" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default StepThreeSection;
