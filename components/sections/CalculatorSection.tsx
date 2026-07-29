"use client";

import React, { useState } from "react";
import { ArrowRight, Calculator, DollarSign, Leaf, Sparkles, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface CalculatorSectionProps {
  onOpenBookMeeting: () => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onOpenBookMeeting }) => {
  const [monthlyBill, setMonthlyBill] = useState(400);
  const [sunHours, setSunHours] = useState(5.0);
  const [roofArea, setRoofArea] = useState(2500);

  // Calculations
  const annualBill = monthlyBill * 12;
  const estimatedSystemKw = Math.min(Math.max(Math.round((monthlyBill / 35) * 10) / 10, 3.5), 100);
  const annualSavings = Math.round(annualBill * 0.82);
  const lifetimeSavings = Math.round(annualSavings * 25);
  const co2OffsetTons = Math.round(estimatedSystemKw * 1.4);
  const treesPlanted = Math.round(co2OffsetTons * 45);
  const paybackYears = Math.round((estimatedSystemKw * 2200 - 0.3 * estimatedSystemKw * 2200) / annualSavings * 10) / 10;

  return (
    <section id="calculator" className="py-24 px-6 bg-[#012c2d] text-white relative overflow-hidden" data-purpose="calculator">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9ff35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c9ff35] inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
            <Calculator className="w-4 h-4 text-[#c9ff35]" /> [ SOLAR ROI ESTIMATOR ]
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Calculate Your Solar Savings & Impact
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Adjust the sliders below to see instant estimates of your system requirements, financial payback, and environmental carbon reduction.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Input Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-10 rounded-[34.08px] backdrop-blur-md shadow-2xl space-y-8">
            {/* Slider 1: Monthly Bill */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#c9ff35]" /> Average Monthly Electric Bill
                </label>
                <span className="text-[#c9ff35] font-extrabold text-2xl">${monthlyBill}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                aria-label="Average Monthly Electric Bill slider"
                className="w-full accent-[#c9ff35] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-xs text-white/40 font-mono">
                <span>$100/mo (Home)</span>
                <span>$1,000/mo (Biz)</span>
                <span>$2,500/mo (Factory)</span>
              </div>
            </div>

            {/* Slider 2: Daily Sunshine Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#c9ff35]" /> Average Daily Peak Sun Hours
                </label>
                <span className="text-[#c9ff35] font-extrabold text-2xl">{sunHours} hrs/day</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="7.0"
                step="0.5"
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                aria-label="Average Daily Peak Sun Hours slider"
                className="w-full accent-[#c9ff35] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-xs text-white/40 font-mono">
                <span>3.0 hrs (Low)</span>
                <span>5.0 hrs (Avg)</span>
                <span>7.0 hrs (High)</span>
              </div>
            </div>

            {/* Slider 3: Roof Area */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c9ff35]" /> Available Roof / Land Surface Area
                </label>
                <span className="text-[#c9ff35] font-extrabold text-2xl">{roofArea.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={roofArea}
                onChange={(e) => setRoofArea(Number(e.target.value))}
                aria-label="Available Roof / Land Surface Area slider"
                className="w-full accent-[#c9ff35] cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-xs text-white/40 font-mono">
                <span>500 sq ft</span>
                <span>10,000 sq ft</span>
                <span>25,000 sq ft</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-white/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9ff35]" /> Includes 30% Federal ITC Tax Credit & Net Metering Incentives
            </div>
          </div>

          {/* Output Results Panel (5 Cols) */}
          <div className="lg:col-span-5">
            <motion.div
              layout
              className="bg-white text-[#1c1c1c] p-8 md:p-10 rounded-[34.08px] shadow-2xl space-y-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#c9ff35] text-[#1c1c1c] font-extrabold text-xs uppercase px-4 py-1.5 rounded-bl-2xl">
                Estimated Results
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Recommended System</span>
                <div className="text-4xl font-extrabold text-[#012c2d] flex items-baseline gap-2">
                  {estimatedSystemKw} <span className="text-lg font-bold text-gray-600">kW Solar Array</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Annual Savings</span>
                  <div className="text-2xl font-extrabold text-green-600">${annualSavings.toLocaleString()}/yr</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">25-Yr Savings</span>
                  <div className="text-2xl font-extrabold text-[#012c2d]">${lifetimeSavings.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Est. Payback</span>
                  <div className="text-xl font-extrabold text-gray-800">{paybackYears} Years</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">CO2 Offset</span>
                  <div className="text-xl font-extrabold text-gray-800">{co2OffsetTons} Tons/yr</div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3 text-emerald-800 text-xs font-medium">
                <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Equivalent to planting <strong>{treesPlanted.toLocaleString()} trees</strong> every single year!</span>
              </div>

              <button
                onClick={onOpenBookMeeting}
                className="w-full bg-[#012c2d] hover:bg-[#c9ff35] hover:text-[#1c1c1c] text-white py-4 rounded-full font-extrabold text-sm flex items-center justify-center gap-3 transition-all shadow-xl group"
              >
                <span>Lock In This Estimate & Book Audit</span>
                <ArrowRight className="w-4 h-4 text-[#c9ff35] group-hover:text-[#1c1c1c]" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
