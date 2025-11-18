"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LockClosedIcon,
  GlobeAltIcon,
  CalendarIcon,
  PhotoIcon,
  XMarkIcon,
  PlusIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { createPrivateCapsule } from "/src/backend/privateFns.js";

import Header from "./components/Header";
import FooterProgressSection from "./components/FooterProgressSection";
import CreateBanner from "./CreateBanner";
import StepOneSection from "./components/StepOneSection";
import StepTwoSection from "./components/StepTwoSection";
import StepThreeSection from "./components/StepThreeSection";
import { getUser } from "/src/backend/userFns.js";
import { useNavigate } from "react-router";

export default function CreateCapsule() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [openingDate, setOpeningDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;

  /**
   * Function createPrivateCapsule
   * Description: A async function which is going to take the data from this site and call a backend function
   * createPrivateCapsule inside te backend/privateFns.js file. which is going to hit the backend laravel
   * api end point which is going to respond with status code 200 for success or 400 for failure.
   *
   * @param NA
   * @return void
   */

  const createPrivCapsule = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("user_id", userName.id);
    formData.append("title", title);
    formData.append("message", message);
    formData.append("opening_date", openingDate);

    // Images → Laravel expects array: files[]
    images.forEach((img) => {
      formData.append("files[]", img.file);
    });

    const res = await createPrivateCapsule(formData);

    if (res) {
      setTitle("");
      setMessage("");
      setOpeningDate("");
      setImages([]);
      setIsPublic(false);
      setIsLoading(false);
      navigate("/dashboard");
      return;
    } else {
      return;
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);

    const newImages = [];

    files.forEach((file) => {
      const exists = images.some(
        (img) =>
          img.file.name === file.name &&
          img.file.size === file.size &&
          img.file.lastModified === file.lastModified
      );

      if (!exists) {
        newImages.push({
          id: Math.random().toString(36),
          file,
          preview: URL.createObjectURL(file),
        });
      } else {
        console.log(`Duplicate file skipped: ${file.name}`);
      }
    });

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!title.trim() || !message.trim())) return;
    if (currentStep === 2 && !openingDate) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isFutureDate = (dateString) => {
    const selected = new Date(dateString);
    const today = new Date();

    // Remove time part to compare dates only
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    return selected > today;
  };

  const fetchUser = async () => {
    const res = await getUser();
    if (!res) {
      navigate("/login");
      return;
    }
    setUserName(res);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background (overlay only) */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-emerald-900/20"></div>
      </div>

      {/* Header (must NOT be inside pointer-events-none div) */}
      <header className="fixed top-0 w-full bg-black/50 backdrop-blur-2xl z-100 border-b border-gray-800">
        <Header link={"/dashboard"} />
      </header>

      {/* Progress Bar */}
      {/* <div className="max-w-3xl mx-auto px-6 pt-12">
        <ProgressSection totalSteps={totalSteps} currentStep={currentStep} />
      </div> */}

      {/* Main Section */}
      <section className="py-12 px-6 mt-24">
        <div className="max-w-3xl mx-auto">
          <CreateBanner />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:p-12 min-h-[600px] flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {currentStep === 1 && (
                <StepOneSection
                  title={title}
                  setTitle={setTitle}
                  message={message}
                  setMessage={setMessage}
                />
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <StepTwoSection
                  openingDate={openingDate}
                  setOpeningDate={setOpeningDate}
                  isPublic={isPublic}
                  setIsPublic={setIsPublic}
                />
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <StepThreeSection
                  images={images}
                  handleImageUpload={handleImageUpload}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  isDragging={isDragging}
                  removeImage={removeImage}
                />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-12 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all ${
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                <ChevronLeftIcon className="w-6 h-6" />
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 2) {
                      if (!isFutureDate(openingDate)) return;
                    }
                    nextStep();
                  }}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
                >
                  Next
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
                  onClick={() => {
                    createPrivCapsule();
                  }}
                >
                  Seal This Capsule
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <FooterProgressSection currentStep={currentStep} />
    </div>
  );
}
