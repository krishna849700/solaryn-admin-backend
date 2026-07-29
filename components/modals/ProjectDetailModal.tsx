"use client";

import React from "react";
import Image from "next/image";
import { X, CheckCircle, Zap, Building2, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  location: string;
  year: string;
  capacity: string;
  co2Saved: string;
  image: string;
  summary: string;
  fullDetails: string;
  highlights: string[];
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenBookMeeting: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenBookMeeting,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#012c2d] border border-white/20 rounded-[34.08px] text-white overflow-hidden shadow-2xl my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md hover:bg-[#c9ff35] hover:text-[#1c1c1c] flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="relative w-full h-72 sm:h-96">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012c2d] via-[#012c2d]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-[#c9ff35] text-[#1c1c1c] text-xs font-extrabold uppercase px-3 py-1 rounded-full mb-2 inline-block">
                {project.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{project.title}</h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div>
                <div className="text-xs text-white/60 font-semibold uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c9ff35]" /> Location
                </div>
                <div className="text-sm font-bold text-white mt-1">{project.location}</div>
              </div>
              <div>
                <div className="text-xs text-white/60 font-semibold uppercase flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#c9ff35]" /> Capacity
                </div>
                <div className="text-sm font-bold text-[#c9ff35] mt-1">{project.capacity}</div>
              </div>
              <div>
                <div className="text-xs text-white/60 font-semibold uppercase flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#c9ff35]" /> Offset
                </div>
                <div className="text-sm font-bold text-white mt-1">{project.co2Saved}</div>
              </div>
              <div>
                <div className="text-xs text-white/60 font-semibold uppercase flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c9ff35]" /> Year
                </div>
                <div className="text-sm font-bold text-white mt-1">{project.year}</div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#c9ff35]">Project Case Study Overview</h3>
              <p className="text-white/80 leading-relaxed text-sm">{project.fullDetails}</p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/70">Key Engineering Accomplishments</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/90 bg-white/5 p-3 rounded-xl border border-white/10">
                    <CheckCircle className="w-4 h-4 text-[#c9ff35] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-white/60">Interested in a similar system for your facility?</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenBookMeeting();
                }}
                className="w-full sm:w-auto bg-[#c9ff35] text-[#1c1c1c] px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all text-center"
              >
                Request Similar Proposal
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
