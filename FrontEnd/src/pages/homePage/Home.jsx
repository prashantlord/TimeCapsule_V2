"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  CalendarIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  CheckIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialSection from "./components/TestimonialSection";
import FinalCtaSection from "./components/FinalCtaSection";
import Footer from "../../components/Footer";

export default function Home() {
  const [email, setEmail] = React.useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 fixed top-0 w-full bg-black/50 backdrop-blur-2xl z-100">
        <Header />
      </header>

      {/* Hero */}
      <section className=" mt-10 pt-28 pb-32 px-6 overflow-hidden">
        <HeroSection />
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <HowItWorksSection />
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/20">
        <FeaturesSection />
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6">
        <TestimonialSection />
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <FinalCtaSection email={email} setEmai={setEmail} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
