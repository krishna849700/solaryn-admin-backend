"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Phone, ShieldCheck, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

interface HeroSectionProps {
  onOpenBookMeeting: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBookMeeting }) => {
  const { getSetting } = useContent();

  const heroBgImage = getSetting("hero_bg_image", "/images/hero_bg.jpg");
  const heroBadge = getSetting("hero_badge", "[ #1 RATED SOLAR PROVIDER IN BENGALURU ]");
  const heroTitle = getSetting("hero_title", "KONARK SOLAR");
  const heroSubtitle = getSetting("hero_subtitle", "Bengaluru’s premier rooftop solar power specialists & solar equipment suppliers. Delivering 16+ units/day clean energy generation, 5 HP solar borewell pumps, Loom Solar systems, and emergency battery backup.");
  const phoneHotline = getSetting("phone_hotline", "073380 10012");
  const whatsappNumber = getSetting("whatsapp_number", "917338010012");
  const contactAddress = getSetting("contact_address", "21, Dwarka Rd, Doddabommasandra, Vidyaranyapura, Bengaluru - 560097");
  const ratingStars = getSetting("rating_stars", "4.9");
  const reviewCount = getSetting("review_count", "176");

  return (
    <header id="home" className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden" data-purpose="hero">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBgImage}
          alt="Konark Solar Rooftop Installations"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl space-y-8">
          {/* Rating Badge & Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-[#c9ff35]">
              <div className="flex items-center text-[#c9ff35]">
                <Star className="w-4 h-4 fill-[#c9ff35]" />
                <span className="ml-1 text-white font-extrabold">{ratingStars} ★</span>
              </div>
              <span className="text-white/80 font-medium">({reviewCount} Google Reviews)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Standard Materials & Expert Installation
            </div>

            <div className="inline-flex items-center gap-1.5 bg-pink-500/20 border border-pink-500/30 px-3 py-1.5 rounded-full text-xs font-semibold text-pink-200">
              <Heart className="w-3.5 h-3.5 text-pink-400" /> Women-Owned • LGBTQ+ Friendly
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            {heroTitle}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl font-normal leading-relaxed"
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA Buttons & Direct Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
          >
            <button
              onClick={onOpenBookMeeting}
              className="bg-[#c9ff35] text-[#1c1c1c] px-8 py-4 rounded-full font-extrabold text-base flex items-center gap-3 hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
            >
              <span>Get Solar Estimate</span>
              <div className="w-7 h-7 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center text-xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <a
              href={`tel:${phoneHotline.replace(/\D/g, "")}`}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-full font-bold text-base flex items-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5 text-[#c9ff35]" />
              <span>Call: {phoneHotline}</span>
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-6 py-4 rounded-full font-bold text-base flex items-center gap-2 transition-all"
            >
              💬 WhatsApp Chat
            </a>
          </motion.div>

          {/* Address & Plus Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-2xl text-white/90 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#c9ff35] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{contactAddress}</p>
                <p className="text-white/60 text-xs mt-0.5">Plus Code: 3H57+3W Bengaluru, Karnataka</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Konark+Solar+Doddabommasandra+Vidyaranyapura+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c9ff35] text-[#1c1c1c] px-3.5 py-1.5 rounded-full font-bold text-xs shrink-0 hover:bg-white transition-colors"
            >
              Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
