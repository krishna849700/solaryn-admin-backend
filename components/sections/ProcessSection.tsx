"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Compass, Layers, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export const ProcessSection: React.FC = () => {
  const { getSetting } = useContent();
  const [activeStep, setActiveStep] = useState(0);

  const processBadge = getSetting("process_badge", "[ OUR PROCESS ]");
  const processTitle = getSetting("process_title", "Switching To Solar In 3 Easy Steps");

  const processCardBadge = getSetting("process_card_badge", "Live Project Deployment");
  const processCardTitle = getSetting("process_card_title", "Certified Solar Engineering Team");
  const processCardDesc = getSetting("process_card_desc", "Our NABCEP-certified technicians conduct on-site inspections to ensure optimal panel placement and zero structural compromise.");
  const processImg = getSetting("process_img", "/images/process_engineers.jpg");

  const steps = [
    {
      num: "01",
      icon: Compass,
      title: getSetting("process_step1_title", "Free Consultation"),
      description: getSetting("process_step1_desc", "Get a free comprehensive energy audit, site shade analysis, and custom solar microgrid recommendation tailored to your utility budget."),
      details: getSetting("process_step1_details", "Our certified energy consultants perform digital LiDAR roof modeling to project 25-year production outputs."),
    },
    {
      num: "02",
      icon: Layers,
      title: getSetting("process_step2_title", "Design & Install"),
      description: getSetting("process_step2_desc", "We handle all engineering permits, utility interconnection approvals, and rapid 1-day certified hardware installation."),
      details: getSetting("process_step2_details", "Top-tier Tier-1 monocrystalline panels with microinverters installed under strict electrical safety codes."),
    },
    {
      num: "03",
      icon: PiggyBank,
      title: getSetting("process_step3_title", "Start & Saving"),
      description: getSetting("process_step3_desc", "Activate your solar system, switch to clean green power, and enjoy immediate 50-80% reductions on monthly utility bills."),
      details: getSetting("process_step3_details", "24/7 live mobile app monitoring tracks instantaneous solar generation, power storage, and grid exports."),
    },
  ];

  return (
    <section id="process" className="py-24 px-6 bg-white" data-purpose="process">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Timeline */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">
            {processBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] mb-12 tracking-tight">
            {processTitle}
          </h2>

          <div className="space-y-8 relative">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[20px] top-6 bottom-6 w-0.5 bg-gray-200" />

            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`relative pl-14 cursor-pointer group transition-all p-4 rounded-2xl ${
                    isActive ? "bg-gray-50 border border-gray-200 shadow-sm" : "hover:bg-gray-50/50"
                  }`}
                >
                  {/* Step Circle Indicator */}
                  <div
                    className={`absolute left-0 top-5 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors z-10 ${
                      isActive
                        ? "bg-[#c9ff35] text-[#1c1c1c] ring-4 ring-[#c9ff35]/30 shadow-md"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    {isActive ? <Check className="w-5 h-5" /> : step.num}
                  </div>

                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-extrabold text-[#012c2d] uppercase tracking-wider">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1c1c1c] mb-2 group-hover:text-[#012c2d] transition-colors flex items-center gap-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    {step.description}
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-gray-200 text-xs text-[#012c2d] font-medium"
                    >
                      💡 {step.details}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Feature Photo */}
        <div className="rounded-[34.08px] overflow-hidden shadow-2xl h-[650px] relative group">
          <Image
            src={processImg}
            alt="Solar Engineers Consultation"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#012c2d]/80 via-transparent to-transparent p-8 flex items-end">
            <div className="bg-[#012c2d]/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white max-w-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#c9ff35] animate-ping" />
                <span className="text-[#c9ff35] font-bold text-xs uppercase tracking-wider">
                  {processCardBadge}
                </span>
              </div>
              <h4 className="font-bold text-lg">{processCardTitle}</h4>
              <p className="text-xs text-white/80 mt-1">
                {processCardDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
