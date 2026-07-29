"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";

interface ServicesSectionProps {
  onOpenBookMeeting: (service?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBookMeeting }) => {
  const { getSetting } = useContent();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const servicesBadge = getSetting("services_badge", "[ KONARK SOLAR SERVICES ]");
  const servicesTitle = getSetting("services_title", "Standard Quality Materials & Budget Friendly Solutions");
  const servicesCtaLabel = getSetting("services_cta_label", "Get Quotation");

  const services = [
    {
      id: 1,
      number: "1.",
      title: getSetting("service_1_title", "ROOFTOP SOLAR"),
      image: getSetting("service_1_img", "/images/service_featured.jpg"),
      description: getSetting("service_1_desc", "Custom high-efficiency rooftop solar installations generating 16+ units per day. Built with standard quality materials, high-performance Loom Solar modules, and guaranteed long-term utility savings."),
      features: ["16 Units/Day High Yield", "Net Metering Grid Export", "Low Cost & Budget Friendly", "Standard Tier-1 Materials"],
    },
    {
      id: 2,
      number: "2.",
      title: getSetting("service_2_title", "5 HP BOREWELL PUMPS"),
      image: getSetting("service_2_img", "/images/about_wind.jpg"),
      description: getSetting("service_2_desc", "High-torque 5 HP solar borewell pumps for agricultural farms and estates in Doddabalapura, Devanahalli, and rural Bengaluru. Zero grid reliance with automatic daylight pumping controllers."),
      features: ["5 HP High Flow Submersible", "Automatic MPPT Controller", "Zero Electricity Cost", "Doddabalapura Field Proven"],
    },
    {
      id: 3,
      number: "3.",
      title: getSetting("service_3_title", "BATTERY SYSTEMS"),
      image: getSetting("service_3_img", "/images/about_house.jpg"),
      description: getSetting("service_3_desc", "Prompt delivery and installation of dual battery packs (2 nos 150Ah/200Ah) and heavy-duty tubular batteries for 24/7 uninterrupted power back-up."),
      features: ["2 Nos Battery Delivery", "Fast On-Time Onsite Setup", "Long Life Tubular Plates", "Heavy Load Capacity"],
    },
    {
      id: 4,
      number: "4.",
      title: getSetting("service_4_title", "FAST INSTALLATION"),
      image: getSetting("service_4_img", "/images/project_textile.jpg"),
      description: getSetting("service_4_desc", "Technically sound installation team trained to complete rooftop installations smoothly with robust mounting hardware, elevated structural frames, and safe wiring."),
      features: ["Unique Elevated Structure", "Experienced Workmen", "Safety Code Met", "Rapid 1-2 Day Turnaround"],
    },
    {
      id: 5,
      number: "5.",
      title: getSetting("service_5_title", "EQUIPMENT SUPPLY"),
      image: getSetting("service_5_img", "/images/blog_office.jpg"),
      description: getSetting("service_5_desc", "Wholesale & retail supplier of solar panels (Loom Solar, Adani, Vikram), MPPT charge controllers, solar inverters, and heavy-duty solar cables across Karnataka."),
      features: ["Authorized Loom Solar Dealer", "Budget Friendly Pricing", "Genuine Manufacturer Warranty", "Prompt Local Delivery"],
    },
    {
      id: 6,
      number: "6.",
      title: getSetting("service_6_title", "MAINTENANCE & REPAIR"),
      image: getSetting("service_6_img", "/images/process_engineers.jpg"),
      description: getSetting("service_6_desc", "Prompt after-sales service, panel cleaning, battery electrolyte testing, inverter health diagnostics, and solar plant performance optimization."),
      features: ["Fast On-Site Response", "Annual Maintenance Contracts", "System Upgrade Options", "Component Health Diagnostics"],
    },
  ];

  const currentService = services[activeServiceIndex];

  return (
    <section id="services" className="bg-[#012c2d] py-24 px-6 text-white" data-purpose="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#c9ff35]/80 mb-2 block flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#c9ff35]" /> {servicesBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {servicesTitle}
            </h2>
          </div>
          <button
            onClick={() => onOpenBookMeeting(currentService.title)}
            className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-all shadow-md group"
          >
            <span>{servicesCtaLabel}</span>
            <div className="bg-[#1c1c1c] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Service List Selector */}
          <div className="lg:col-span-5 space-y-4">
            {services.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveServiceIndex(index)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  activeServiceIndex === index
                    ? "border-[#c9ff35] bg-white/10 shadow-lg"
                    : "border-white/5 hover:border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-2xl md:text-3xl font-extrabold flex items-center gap-4 ${
                      activeServiceIndex === index ? "text-[#c9ff35]" : "text-white"
                    }`}
                  >
                    <span className="text-base text-white/50">{item.number}</span>
                    {item.title}
                  </h3>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      activeServiceIndex === index ? "text-[#c9ff35] translate-x-1" : "text-white/30"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Featured Dynamic Service Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 p-8 md:p-10 rounded-[34.08px] border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-md">
                  <Image src={currentService.image} alt={currentService.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 bg-[#012c2d]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#c9ff35]">
                    Konark Service • {currentService.title}
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed text-base mb-6 font-normal">
                  {currentService.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {currentService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/90 font-medium bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#c9ff35] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenBookMeeting(currentService.title)}
                  className="inline-flex items-center gap-3 bg-[#c9ff35] text-[#1c1c1c] px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-all transform hover:scale-105"
                >
                  <span>Book Free Consultation</span>
                  <div className="bg-[#1c1c1c] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
