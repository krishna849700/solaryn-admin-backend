"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sun, Zap, Battery, Wrench, Building, PhoneCall } from "lucide-react";

interface MultiStepLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICES = [
  { id: "Rooftop Solar", title: "Rooftop Solar System", desc: "16+ units/day savings for homes & villas", icon: Sun },
  { id: "5 HP Borewell Pump", title: "5 HP Solar Borewell Pump", desc: "Agricultural daylight pumping for farms", icon: Zap },
  { id: "Battery Systems", title: "Battery Storage & Backup", desc: "Heavy-duty 24/7 power backup systems", icon: Battery },
  { id: "Equipment Supply", title: "Solar Hardware Supply", desc: "Loom Solar panels, inverters & mounting", icon: Building },
  { id: "Fast Installation", title: "Express Solar Installation", desc: "Rapid 1-day engineering deployment", icon: PhoneCall },
  { id: "Maintenance & Repair", title: "Plant Maintenance & Service", desc: "Panel cleaning, testing & health audit", icon: Wrench },
];

const BUDGET_OPTIONS = [
  "Under ₹50,000",
  "₹50,000 - ₹1.5 Lakhs",
  "₹1.5 Lakhs - ₹3 Lakhs",
  "₹3 Lakhs - ₹5 Lakhs",
  "Above ₹5 Lakhs",
];

const TIMELINE_OPTIONS = [
  "Immediate (Within 7 Days)",
  "Within 1 Month",
  "Within 3 Months",
  "Just Researching / Future Planning",
];

const BENGALURU_AREAS = [
  "Vidyaranyapura",
  "Doddabommasandra",
  "Yelahanka",
  "Doddabalapura",
  "Devanahalli",
  "Whitefield",
  "Electronic City",
  "Other Area",
];

export const MultiStepLeadModal: React.FC<MultiStepLeadModalProps> = ({
  isOpen,
  onClose,
  defaultService = "Rooftop Solar",
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    budget: BUDGET_OPTIONS[1],
    timeline: TIMELINE_OPTIONS[0],
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 8;
  const progressPercent = (step / totalSteps) * 100;

  const validateStep = (): boolean => {
    setErrors(null);
    if (step === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        setErrors("Please enter your full name (at least 2 characters).");
        return false;
      }
    } else if (step === 2) {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 7) {
        setErrors("Please enter a valid phone number (at least 7 digits).");
        return false;
      }
    } else if (step === 3) {
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrors("Please enter a valid email address or leave blank.");
        return false;
      }
    } else if (step === 7) {
      if (!formData.location.trim()) {
        setErrors("Please enter your location or select a nearby area.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setErrors(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors(null);

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit lead request.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrors(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-[#012c2d] border border-[#c9ff35]/20 shadow-2xl text-[#FAF8F3]"
      >
        {/* Header Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#c9ff35] text-[#012c2d] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
              {isSuccess ? "SOLAR ESTIMATE READY" : `STEP ${step} OF ${totalSteps}`}
            </span>
            <span className="text-xs font-semibold text-gray-300">
              Konark Solar Free Audit & Quote
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="w-full bg-white/10 h-1.5">
            <motion.div
              className="bg-[#c9ff35] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
          {isSuccess ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-[#c9ff35] text-[#012c2d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#c9ff35]/20"
              >
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </motion.div>
              <h2 className="text-3xl font-black text-white mb-3">Estimate Request Submitted!</h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                Thank you, <span className="font-bold text-[#c9ff35]">{formData.name}</span>. Chikke Gowda & the Konark Solar technical team have received your request for <span className="font-bold text-white">{formData.service}</span> in <span className="font-bold text-white">{formData.location}</span>.
              </p>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl max-w-sm mx-auto mb-8 text-xs text-gray-300 text-left">
                <div className="flex items-center gap-2 text-[#c9ff35] font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" /> Next Steps:
                </div>
                1. Confirmation sent to {formData.phone}<br/>
                2. Our engineering team will call you within 2 business hours.<br/>
                3. Direct Hotline: <a href="tel:07338010012" className="underline text-white font-bold">073380 10012</a>
              </div>
              <button
                onClick={onClose}
                className="bg-[#c9ff35] text-[#012c2d] font-black px-8 py-3 rounded-full hover:bg-white transition-all shadow-md text-sm"
              >
                Close & Return To Website
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-center"
              >
                {/* STEP 1: Name */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      What is your full name?
                    </h2>
                    <p className="text-xs text-gray-300 mb-6">
                      Let us know who we are creating this solar estimate for.
                    </p>
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Sunil Kadam"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-base text-white outline-none focus:border-[#c9ff35] focus:ring-2 focus:ring-[#c9ff35]/30 transition-all placeholder:text-gray-500"
                    />
                  </div>
                )}

                {/* STEP 2: Phone */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      What is your phone number?
                    </h2>
                    <p className="text-xs text-gray-300 mb-6">
                      Required for quote delivery & WhatsApp technical consultation.
                    </p>
                    <input
                      type="tel"
                      autoFocus
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-base text-white outline-none focus:border-[#c9ff35] focus:ring-2 focus:ring-[#c9ff35]/30 transition-all placeholder:text-gray-500"
                    />
                  </div>
                )}

                {/* STEP 3: Email */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      What is your email address?
                    </h2>
                    <p className="text-xs text-gray-300 mb-6">
                      We will send your detailed PDF site audit & ROI report here (optional).
                    </p>
                    <input
                      type="email"
                      autoFocus
                      placeholder="e.g. sunil@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-base text-white outline-none focus:border-[#c9ff35] focus:ring-2 focus:ring-[#c9ff35]/30 transition-all placeholder:text-gray-500"
                    />
                  </div>
                )}

                {/* STEP 4: Service */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      Which solar service do you need?
                    </h2>
                    <p className="text-xs text-gray-300 mb-5">
                      Select the primary system for your site or property.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[260px] overflow-y-auto pr-1">
                      {SERVICES.map((srv) => {
                        const IconComp = srv.icon;
                        const isSelected = formData.service === srv.id;
                        return (
                          <div
                            key={srv.id}
                            onClick={() => setFormData({ ...formData, service: srv.id })}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected
                                ? "bg-[#c9ff35] text-[#012c2d] border-[#c9ff35] shadow-lg shadow-[#c9ff35]/10"
                                : "bg-white/5 text-white border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className={`p-2 rounded-xl ${isSelected ? "bg-[#012c2d] text-[#c9ff35]" : "bg-white/10 text-[#c9ff35]"}`}>
                              <IconComp className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm leading-snug">{srv.title}</div>
                              <div className={`text-[11px] mt-0.5 ${isSelected ? "text-[#012c2d]/80" : "text-gray-400"}`}>
                                {srv.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: Budget */}
                {step === 5 && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      What is your planned budget range?
                    </h2>
                    <p className="text-xs text-gray-300 mb-5">
                      Helps us select the right inverter & panel capacity for your savings target.
                    </p>
                    <div className="space-y-2.5">
                      {BUDGET_OPTIONS.map((bgt) => {
                        const isSelected = formData.budget === bgt;
                        return (
                          <div
                            key={bgt}
                            onClick={() => setFormData({ ...formData, budget: bgt })}
                            className={`px-5 py-3.5 rounded-2xl border cursor-pointer font-bold text-sm transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-[#c9ff35] text-[#012c2d] border-[#c9ff35]"
                                : "bg-white/5 text-white border-white/10 hover:border-white/30"
                            }`}
                          >
                            <span>{bgt}</span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-[#012c2d]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 6: Timeline */}
                {step === 6 && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      How soon do you plan to install?
                    </h2>
                    <p className="text-xs text-gray-300 mb-5">
                      Select your timeframe for engineering site audit & installation.
                    </p>
                    <div className="space-y-2.5">
                      {TIMELINE_OPTIONS.map((tml) => {
                        const isSelected = formData.timeline === tml;
                        return (
                          <div
                            key={tml}
                            onClick={() => setFormData({ ...formData, timeline: tml })}
                            className={`px-5 py-3.5 rounded-2xl border cursor-pointer font-bold text-sm transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-[#c9ff35] text-[#012c2d] border-[#c9ff35]"
                                : "bg-white/5 text-white border-white/10 hover:border-white/30"
                            }`}
                          >
                            <span>{tml}</span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-[#012c2d]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 7: Location */}
                {step === 7 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      Where is the installation site located?
                    </h2>
                    <p className="text-xs text-gray-300 mb-4">
                      Type your area/address or click a quick area below.
                    </p>
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Vidyaranyapura, Bengaluru"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:border-[#c9ff35] focus:ring-2 focus:ring-[#c9ff35]/30 transition-all placeholder:text-gray-500 mb-4"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {BENGALURU_AREAS.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setFormData({ ...formData, location: area })}
                          className={`text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                            formData.location === area
                              ? "bg-[#c9ff35] text-[#012c2d] border-[#c9ff35]"
                              : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 8: Message & Review */}
                {step === 8 && (
                  <div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      Review & Additional Details
                    </h2>
                    <p className="text-xs text-gray-300 mb-4">
                      Add any special notes or click Submit to send your estimate request.
                    </p>

                    <textarea
                      rows={2}
                      placeholder="Optional details (e.g. roof size, current monthly bill, battery preference)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-2xl p-3.5 text-xs text-white outline-none focus:border-[#c9ff35] focus:ring-2 focus:ring-[#c9ff35]/30 transition-all placeholder:text-gray-500 mb-4 resize-none"
                    />

                    {/* Summary Review Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-1.5 text-gray-300">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Name:</span>
                        <span className="font-bold text-white">{formData.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Phone:</span>
                        <span className="font-bold text-white">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Service:</span>
                        <span className="font-bold text-[#c9ff35]">{formData.service}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-gray-400">Budget:</span>
                        <span className="font-bold text-white">{formData.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="font-bold text-white">{formData.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Validation Error Banner */}
          {errors && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold"
            >
              ⚠️ {errors}
            </motion.div>
          )}

          {/* Navigation Controls */}
          {!isSuccess && (
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#c9ff35] text-[#012c2d] font-black px-7 py-3 rounded-full hover:bg-white transition-all shadow-md flex items-center gap-2 text-xs"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#c9ff35] text-[#012c2d] font-black px-8 py-3 rounded-full hover:bg-white transition-all shadow-lg shadow-[#c9ff35]/20 flex items-center gap-2 text-xs disabled:opacity-50"
                >
                  {isSubmitting ? "Sending Request..." : "Submit To Konark Solar ✓"}
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
