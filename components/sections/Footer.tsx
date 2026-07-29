"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, MapPin, Phone, MessageSquare, Heart, ShieldCheck, Star } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export const Footer: React.FC = () => {
  const { getSetting } = useContent();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const companyName = getSetting("company_name", "Konark Solar");
  const companyKannada = getSetting("company_kannada_name", "ಕೊನಾರ್ಕ್ ಸೋಲಾರ್");
  const phoneHotline = getSetting("phone_hotline", "073380 10012");
  const whatsappNumber = getSetting("whatsapp_number", "917338010012");
  const contactAddress = getSetting("contact_address", "21, Dwarka Rd, Doddabommasandra, Vidyaranyapura, Deshbandhunagara, Bengaluru, Karnataka 560097");
  const ratingStars = getSetting("rating_stars", "4.9");
  const reviewCount = getSetting("review_count", "176");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      try {
        await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Newsletter Subscriber",
            phone: "N/A",
            email,
            message: "Subscribed via footer newsletter form.",
            source: "NEWSLETTER",
          }),
        });
      } catch (err) {
        console.warn("Newsletter backend submit error:", err);
      }
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#c9ff35]/10 py-20 px-6 border-t border-[#c9ff35]/20 text-[#1c1c1c]" data-purpose="main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Contact Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center bg-[#c9ff35] rounded-full p-1 shadow-sm">
              <Image src="/images/logo.png" alt="Konark Solar Logo" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight block leading-none">{companyName}</span>
              <span className="text-xs font-bold text-[#012c2d]">{companyKannada}</span>
            </div>
          </div>

          <h3 className="text-3xl font-extrabold text-[#1c1c1c] leading-tight max-w-md tracking-tight">
            Powering Bengaluru, Starting Today With {companyName}.
          </h3>

          {/* Full Address & Phone */}
          <div className="space-y-2 bg-white/60 p-4 rounded-2xl border border-[#012c2d]/10 text-xs leading-relaxed font-medium">
            <div className="flex items-start gap-2 text-[#012c2d]">
              <MapPin className="w-4 h-4 text-[#012c2d] shrink-0 mt-0.5" />
              <span>
                <strong>Address:</strong> {contactAddress}
              </span>
            </div>
            <div className="flex items-center gap-4 pt-1 font-bold text-[#012c2d]">
              <a href={`tel:${phoneHotline.replace(/\D/g, "")}`} className="flex items-center gap-1 hover:underline">
                <Phone className="w-3.5 h-3.5" /> {phoneHotline}
              </a>
              <span>•</span>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-700 hover:underline">
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp (wa.me)
              </a>
              <span>•</span>
              <span className="text-gray-500 font-mono text-[11px]">Plus Code: 3H57+3W</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 text-[11px] font-extrabold uppercase">
            <span className="bg-[#012c2d] text-[#c9ff35] px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#c9ff35]" /> {ratingStars} ★ Rating ({reviewCount} Reviews)
            </span>
            <span className="bg-pink-100 text-pink-900 border border-pink-200 px-3 py-1 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3 text-pink-600" /> Women-Owned • LGBTQ+ Friendly
            </span>
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Standard Materials & Workmen
            </span>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="relative max-w-md pt-2">
            <input
              type="email"
              required
              placeholder="Subscribe With Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#c9ff35] text-[#1c1c1c] placeholder:text-[#1c1c1c]/60 border-none rounded-full py-3.5 px-6 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-[#012c2d]"
            />
            <button
              type="submit"
              className="absolute right-2 top-3.5 w-8 h-8 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center hover:bg-[#012c2d] transition-colors shadow-md"
              aria-label="Subscribe"
            >
              {subscribed ? <Check className="w-3.5 h-3.5 text-[#c9ff35]" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-widest text-gray-500 mb-6">Navigations</h4>
          <ul className="space-y-3.5 text-[#1c1c1c]/80 font-medium text-xs">
            <li>
              <a href="#about" className="hover:text-[#012c2d] hover:font-bold transition-colors">
                About {companyName}
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#012c2d] hover:font-bold transition-colors">
                Rooftop Solar & 5 HP Pumps
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-[#012c2d] hover:font-bold transition-colors">
                Doddabalapura & Bengaluru Projects
              </a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-[#012c2d] hover:font-bold transition-colors">
                Solar Savings Calculator
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-[#012c2d] hover:font-bold transition-colors">
                {reviewCount} Verified Google Reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Local Area Served */}
        <div>
          <h4 className="font-extrabold text-xs uppercase tracking-widest text-gray-500 mb-6">Bengaluru Areas Served</h4>
          <ul className="space-y-2.5 text-[#1c1c1c]/80 font-medium text-xs">
            <li>• Vidyaranyapura</li>
            <li>• Doddabommasandra</li>
            <li>• Deshbandhunagara</li>
            <li>• Doddabalapura</li>
            <li>• Devanahalli & Yelahanka</li>
            <li>• Sahakarnagar & Hebbal</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1c1c1c]/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#1c1c1c]/70 font-medium gap-4">
        <p>© 2026 {companyName} ({companyKannada}) - All rights reserved. {ratingStars}★ Solar Energy Equipment Supplier.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#1c1c1c]">
            Style Guide
          </a>
          <a href="#" className="hover:text-[#1c1c1c]">
            License
          </a>
          <a href="#" className="hover:text-[#1c1c1c]">
            Change Log
          </a>
        </div>
      </div>
    </footer>
  );
};
