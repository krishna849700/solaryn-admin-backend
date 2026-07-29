"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles, UserCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

interface AboutSectionProps {
  onOpenBookMeeting: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBookMeeting }) => {
  const { getSetting } = useContent();

  const aboutBadge = getSetting("about_badge", "[ ABOUT KONARK SOLAR • ಕೊನಾರ್ಕ್ ಸೋಲಾರ್ ]");
  const aboutTitle = getSetting("about_title", "Customer Satisfaction Is Our Priority");
  const aboutCtaLabel = getSetting("about_cta_label", "Consult Chikke Gowda (Owner)");

  const marketTitle = getSetting("about_market_leadership_title", "Market Leadership");
  const marketDesc = getSetting("about_market_leadership_desc", "Helmed by Chikke Gowda, Konark Solar is recognized as #1 in the market for transparent estimates, technical excellence, and low-cost budget friendly solar setups.");

  const genBadge = getSetting("about_generation_badge", "High Daily Generation Performance");
  const genTitle = getSetting("about_generation_title", "16 Units/Day Peak Solar Generation");
  const genDesc = getSetting("about_generation_desc", "Generates ~16 units per day on sunny days and ~8 units even on cloudy Bengaluru days, securing maximum utility savings for residential and commercial customers.");

  const matTitle = getSetting("about_standard_materials_title", "Standard Materials");
  const matDesc = getSetting("about_standard_materials_desc", "We install high-grade solar modules (including Loom Solar), premium battery banks, and robust mounting structures with technically sound installation teams.");

  const imgWind = getSetting("about_img_wind", "/images/about_wind.jpg");
  const imgHouse = getSetting("about_img_house", "/images/about_house.jpg");
  const imgTeam = getSetting("about_img_team", "/images/process_engineers.jpg");

  return (
    <section id="about" className="py-24 px-6 bg-white" data-purpose="about-us">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#012c2d]" /> {aboutBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] tracking-tight">
              {aboutTitle}
            </h2>
          </div>
          <button
            onClick={onOpenBookMeeting}
            className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-3 hover:bg-[#012c2d] hover:text-white transition-all shadow-md group"
          >
            <span>{aboutCtaLabel}</span>
            <div className="bg-[#1c1c1c] text-white group-hover:bg-[#c9ff35] group-hover:text-[#1c1c1c] rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[620px]">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#012c2d] p-8 rounded-[34.08px] flex flex-col justify-between h-1/2 text-white shadow-xl relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-[#c9ff35] rounded-full flex items-center justify-center text-[#1c1c1c] shadow-lg">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="mt-6">
                <h3 className="font-extrabold text-2xl mb-2 text-white">{marketTitle}</h3>
                <p className="text-sm text-white/80 leading-relaxed font-normal">
                  {marketDesc}
                </p>
              </div>
            </motion.div>

            <div className="h-1/2 rounded-[34.08px] overflow-hidden relative shadow-lg group">
              <Image
                src={imgWind}
                alt="Solar & Wind Equipment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Main Rooftop Solar Project Feature Image (Span 2) */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 rounded-[34.08px] overflow-hidden relative shadow-2xl min-h-[350px] group"
          >
            <Image
              src={imgHouse}
              alt="Konark Solar Rooftop Power Installation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex items-end">
              <div className="bg-[#012c2d]/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#c9ff35]" />
                  <span className="text-[#c9ff35] text-xs font-extrabold uppercase tracking-wider">
                    {genBadge}
                  </span>
                </div>
                <p className="text-sm font-bold text-white mb-1">
                  {genTitle}
                </p>
                <p className="text-xs text-white/80 leading-relaxed">
                  {genDesc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            <div className="h-1/2 rounded-[34.08px] overflow-hidden relative shadow-lg group">
              <Image
                src={imgTeam}
                alt="Standard Materials Installation Team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[#012c2d] p-8 rounded-[34.08px] flex flex-col justify-between h-1/2 text-white shadow-xl"
            >
              <div className="w-12 h-12 bg-[#c9ff35] rounded-full flex items-center justify-center text-[#1c1c1c] shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="mt-6">
                <h3 className="font-extrabold text-2xl mb-2 text-white">{matTitle}</h3>
                <p className="text-sm text-white/80 leading-relaxed font-normal">
                  {matDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
