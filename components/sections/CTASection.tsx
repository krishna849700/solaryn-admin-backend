"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CTASectionProps {
  onOpenBookMeeting: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBookMeeting }) => {
  return (
    <section className="px-6 mb-20" data-purpose="footer-cta">
      <div className="max-w-7xl mx-auto relative rounded-[34.08px] overflow-hidden min-h-[420px] flex items-center justify-center shadow-2xl">
        {/* Background Image */}
        <Image
          src="/images/cta_bg.jpg"
          alt="Aerial Solar Array Field"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#012c2d]/75 backdrop-blur-xs" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 py-16 space-y-6 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#c9ff35] inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-[#c9ff35]" /> Ready To Transition To Clean Power?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight"
          >
            Start Your Next <br />
            <span className="text-[#c9ff35]">Project With Us</span>
          </motion.h2>

          <p className="text-white/80 text-base max-w-xl mx-auto font-normal">
            Join 50,000+ satisfied home and business owners lowering their utility bills while reducing carbon emissions with Solaryn.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <button
              onClick={onOpenBookMeeting}
              className="bg-[#c9ff35] text-[#1c1c1c] px-10 py-4.5 rounded-full font-extrabold text-lg inline-flex items-center gap-3 hover:bg-white transition-all transform hover:scale-105 shadow-2xl"
            >
              <span>Book A Meeting</span>
              <div className="bg-[#1c1c1c] text-white rounded-full w-7 h-7 flex items-center justify-center text-xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
