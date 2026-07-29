"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDetailModal, ProjectItem } from "../modals/ProjectDetailModal";
import { useContent } from "@/context/ContentContext";

interface ProjectsSectionProps {
  onOpenBookMeeting: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenBookMeeting }) => {
  const { getSetting } = useContent();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projectsBadge = getSetting("projects_badge", "[ KONARK SOLAR PROJECTS ]");
  const projectsTitle = getSetting("projects_title", "Verified Installations Across Bengaluru & Karnataka");

  const projectsData: ProjectItem[] = [
    {
      id: "borewell-doddabalapura",
      category: "Agricultural",
      title: getSetting("project_1_title", "5 HP Solar Borewell Pump Installation"),
      location: "Doddabalapura, Karnataka",
      year: "May 2026",
      capacity: getSetting("project_1_badge", "Agricultural • 5 HP Solar Submersible Pump"),
      co2Saved: "14 Tons / Year",
      image: getSetting("project_1_img", "/images/project_farm.jpg"),
      summary: getSetting("project_1_desc", "High-performance 5 HP solar borewell pump installation providing uninterrupted agricultural water pumping without grid dependence."),
      fullDetails:
        "Engineered and commissioned by Konark Solar for an agricultural farm in Doddabalapura. Features 18 high-efficiency solar panels connected to an automatic MPPT solar pump drive. Delivers consistent high-flow water output from 450 ft borewell depths during daylight hours.",
      highlights: [
        "5 HP Heavy-Duty Solar Pump",
        "Automatic MPPT Solar Drive",
        "Zero Electricity Expenses",
        "Rugged Weather-Proof Mounting",
      ],
    },
    {
      id: "rooftop-vidyaranyapura",
      category: "Residential",
      title: getSetting("project_2_title", "16 Units/Day High Yield Rooftop Solar Unit"),
      location: "Vidyaranyapura, Bengaluru",
      year: "2026",
      capacity: getSetting("project_2_badge", "Residential • 3.5 kW Rooftop System"),
      co2Saved: "4.5 Tons / Year",
      image: getSetting("project_2_img", "/images/project_residential.jpg"),
      summary: getSetting("project_2_desc", "Residential rooftop solar installation generating ~16 units per day on sunny days and ~8 units on cloudy days."),
      fullDetails:
        "Custom designed and installed by Konark Solar team using standard quality materials and elevated mounting structure. Enabled total utility bill elimination under BESCOM net metering rules, saving the client thousands each month.",
      highlights: [
        "16 Units/Day Peak Solar Yield",
        "Standard Quality Mounting Hardware",
        "8 Units/Day Cloud Resiliency",
        "Loom Solar PV Modules",
      ],
    },
    {
      id: "battery-backup-doddabommasandra",
      category: "Commercial",
      title: getSetting("project_3_title", "Dual Heavy-Duty Battery Storage Setup (2 Nos)"),
      location: "Doddabommasandra, Bengaluru",
      year: "2026",
      capacity: getSetting("project_3_badge", "Commercial • 2 Nos Tubular Batteries + Inverter"),
      co2Saved: "Immediate Resiliency",
      image: getSetting("project_3_img", "/images/project_battery.jpg"),
      summary: getSetting("project_3_desc", "On-time delivery and precision installation of dual 200Ah battery bank providing complete power backup during outages."),
      fullDetails:
        "Installed as promised by Konark Solar's technically sound installation crew. Powers commercial shop loads, lighting, refrigeration, and computing systems seamlessly.",
      highlights: [
        "2 Nos 200Ah Heavy Duty Batteries",
        "Prompt On-Time Delivery",
        "Low Cost & Budget Friendly",
        "24/7 Power Security",
      ],
    },
    {
      id: "loom-solar-commercial",
      category: "Commercial",
      title: getSetting("project_4_title", "Commercial Loom Solar Photovoltaic Plant"),
      location: "Deshbandhunagara, Bengaluru",
      year: "2025",
      capacity: getSetting("project_4_badge", "Commercial • 12 kW Grid-Tied Solar Plant"),
      co2Saved: "18 Tons / Year",
      image: getSetting("project_4_img", "/images/project_textile.jpg"),
      summary: getSetting("project_4_desc", "High-capacity commercial solar installation for office & equipment supplier facility utilizing Loom Solar technology."),
      fullDetails:
        "Full turnkey design, procurement, and erection by Chikke Gowda and the Konark Solar team. Provides clean power for office computing, air conditioning, and testing equipment.",
      highlights: [
        "Loom Solar Mono PERC Panels",
        "Grid Net Metering Approval",
        "Technically Sound Workmanship",
        "3 Year ROI Payback Period",
      ],
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="projects" className="py-24 px-6 bg-white border-t border-gray-100" data-purpose="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#012c2d]" /> {projectsBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] leading-tight tracking-tight">
              {projectsTitle}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200">
            {["All", "Agricultural", "Residential", "Commercial"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? "bg-[#012c2d] text-[#c9ff35] shadow-md"
                    : "text-gray-600 hover:text-[#1c1c1c]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFeatured = idx === 0 && activeFilter === "All";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer ${isFeatured ? "md:col-span-2" : ""}`}
                >
                  <div
                    className={`rounded-[34.08px] overflow-hidden mb-6 relative shadow-xl ${
                      isFeatured ? "h-[420px]" : "h-[360px]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-[#012c2d]/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#c9ff35]">
                      {project.capacity}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#1c1c1c] group-hover:text-[#012c2d] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-2xl line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    <button className="bg-gray-100 group-hover:bg-[#c9ff35] group-hover:text-[#1c1c1c] text-[#1c1c1c] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shrink-0 transition-colors">
                      <span>Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBookMeeting={onOpenBookMeeting}
      />
    </section>
  );
};
