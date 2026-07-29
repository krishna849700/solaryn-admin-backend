"use client";

import React, { useState } from "react";
import { X, CheckCircle, Sun, Building, User, Phone, ArrowRight, ArrowLeft, MapPin, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookMeetingModal: React.FC<BookMeetingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("Rooftop Solar System");
  const [propertyType, setPropertyType] = useState("Residential Home");
  const [monthlyBill, setMonthlyBill] = useState(4000);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [backendRefId, setBackendRefId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          city: "Bengaluru",
          address: formData.address || null,
          monthlyBill: `₹${monthlyBill.toLocaleString()}/mo`,
          roofType: propertyType,
          message: `Requirement: ${service}.${formData.notes ? " Notes: " + formData.notes : ""}`,
          source: "SITE_AUDIT",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMsg(result.error ?? "Failed to submit enquiry.");
        return;
      }

      if (result.id) {
        setBackendRefId(result.id);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Backend submit error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setBackendRefId(null);
    setErrorMsg("");
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#012c2d] border border-white/20 rounded-[34.08px] text-white p-6 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-[#c9ff35] hover:text-[#1c1c1c] flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Header */}
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#c9ff35] block mb-2">
                  [ KONARK SOLAR ESTIMATE • STEP {step} OF 3 ]
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight">Request Free Site Audit & Quote</h2>
                <p className="text-white/70 text-sm mt-1">
                  Connect with Chikke Gowda and Konark Solar experts in Bengaluru.
                </p>
                {/* Progress bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div
                    className="bg-[#c9ff35] h-full transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Select Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Sun className="w-5 h-5 text-[#c9ff35]" /> Select Solar Requirement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Rooftop Solar System (16 Units/day)",
                      "5 HP Solar Borewell Pump",
                      "Battery Bank Storage (2 nos)",
                      "Loom Solar PV Equipment",
                      "Solar Water Heater",
                      "Commercial Power Plant",
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          service === item
                            ? "border-[#c9ff35] bg-[#c9ff35]/15 text-white font-bold"
                            : "border-white/10 bg-white/5 text-white/80 hover:border-white/30"
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{item}</span>
                        {service === item && <CheckCircle className="w-4 h-4 text-[#c9ff35]" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <a
                      href="https://wa.me/917338010012"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-semibold text-xs flex items-center gap-1.5 hover:underline"
                    >
                      <MessageSquare className="w-4 h-4" /> Direct WhatsApp Chat
                    </a>
                    <button
                      onClick={() => setStep(2)}
                      className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Property & Monthly Bill */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
                      <Building className="w-5 h-5 text-[#c9ff35]" /> Installation Type
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {["Residential Home", "Commercial Shop", "Agricultural Farm"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`py-3 px-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            propertyType === type
                              ? "border-[#c9ff35] bg-[#c9ff35] text-[#1c1c1c]"
                              : "border-white/10 bg-white/5 text-white/80 hover:border-white/30"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-white/90">
                        Monthly Electricity Bill (₹):
                      </label>
                      <span className="text-[#c9ff35] font-extrabold text-lg">₹{monthlyBill.toLocaleString()}/mo</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      aria-label="Monthly Electricity Bill slider"
                      className="w-full accent-[#c9ff35] cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/50 mt-1">
                      <span>₹1,000</span>
                      <span>₹10,000</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-white/70 hover:text-white px-4 py-2 font-medium text-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Schedule */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Your Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                        <input
                          type="text"
                          required
                          placeholder="Sunil Kadam"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9ff35]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1">Phone Number (Mandatory)</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                        <input
                          type="tel"
                          required
                          placeholder="098765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9ff35]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Location / Address in Bengaluru</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Vidyaranyapura, Doddabommasandra, Doddabalapura..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9ff35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1">Additional Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Specify roof space, borewell depth, or Loom solar interest..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9ff35]"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-white/70 hover:text-white px-4 py-2 font-medium text-sm flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#c9ff35] text-[#1c1c1c] px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 disabled:opacity-50"
                    >
                      {isSubmitting ? "Connecting to Backend..." : "Submit To Konark Solar"} <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Success View */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-[#c9ff35] text-[#1c1c1c] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-extrabold text-white">Thank You, {formData.name}!</h3>
              <p className="text-white/80 max-w-md mx-auto text-sm leading-relaxed">
                Your quote request for <span className="text-[#c9ff35] font-bold">{service}</span> has been processed and logged on our backend serverless service. Chikke Gowda or Konark Solar team will call you directly at <span className="font-bold text-white">{formData.phone}</span>.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md mx-auto text-left text-xs text-white/70 space-y-1.5">
                {backendRefId && <p><strong className="text-[#c9ff35]">Backend Reference ID:</strong> {backendRefId}</p>}
                <p><strong>Requirement:</strong> {service}</p>
                <p><strong>Property:</strong> {propertyType} (₹{monthlyBill.toLocaleString()}/mo bill)</p>
                <p><strong>Location:</strong> {formData.address || "Bengaluru"}</p>
                <p><strong>Konark Hotline:</strong> 073380 10012</p>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href="tel:07338010012"
                  className="bg-white/10 text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-white/20 transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9ff35]" /> Call Now (073380 10012)
                </a>
                <button
                  onClick={resetAndClose}
                  className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-2.5 rounded-full font-bold text-xs hover:bg-white transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
