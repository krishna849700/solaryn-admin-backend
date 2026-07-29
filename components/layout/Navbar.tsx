"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X, Phone, MessageSquare, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";

interface NavbarProps {
  onOpenBookMeeting: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookMeeting }) => {
  const { getSetting } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const companyName = getSetting("company_name", "Konark Solar");
  const companyKannada = getSetting("company_kannada_name", "ಕೊನಾರ್ಕ್ ಸೋಲಾರ್");
  const phoneHotline = getSetting("phone_hotline", "073380 10012");
  const whatsappNumber = getSetting("whatsapp_number", "917338010012");
  const contactAddress = getSetting("contact_address", "21, Dwarka Rd, Doddabommasandra, Vidyaranyapura, Bengaluru - 560097");
  const logoImage = getSetting("logo_image", "/images/logo.png");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Projects", href: "#projects" },
    { name: "Solar Calculator", href: "#calculator" },
    { name: "Reviews", href: "#testimonials" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 px-4 md:px-8 py-3 ${
          scrolled ? "bg-[#012c2d]/90 backdrop-blur-lg shadow-2xl py-2.5" : "bg-transparent"
        }`}
        data-purpose="main-nav"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full px-6 md:px-8 py-2.5 border border-white/20 shadow-lg">
          {/* Brand Logo & Name */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center bg-[#c9ff35] rounded-full p-1 shadow-md">
              <Image
                src={logoImage}
                alt="Konark Solar Logo"
                width={28}
                height={28}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-lg md:text-xl tracking-tight flex items-center gap-1.5 leading-none">
                {companyName} <span className="w-2 h-2 rounded-full bg-[#c9ff35] inline-block animate-pulse"></span>
              </span>
              <span className="text-[#c9ff35] text-[10px] font-semibold tracking-wide font-sans">
                {companyKannada} • Bengaluru
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-6 text-white font-medium text-xs tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#c9ff35] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#c9ff35] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Link */}
            <a
              href={`tel:${phoneHotline.replace(/\D/g, "")}`}
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-bold text-xs border border-white/20 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#c9ff35]" />
              <span>{phoneHotline}</span>
            </a>

            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-3.5 py-2 rounded-full font-semibold text-xs border border-emerald-500/40 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBookMeeting}
              className="bg-[#c9ff35] text-[#1c1c1c] px-4 md:px-5 py-2.5 rounded-full font-extrabold text-xs flex items-center gap-2 hover:bg-white transition-all transform hover:scale-105 shadow-md"
            >
              <span>Get Estimate</span>
              <div className="w-4 h-4 bg-[#1c1c1c] text-white rounded-full flex items-center justify-center text-[10px]">
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[75px] z-30 bg-[#012c2d] border-b border-white/10 p-6 xl:hidden shadow-2xl text-white"
          >
            <div className="flex flex-col space-y-3 font-semibold text-sm">
              {/* Address Banner */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-white/80 flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#c9ff35] shrink-0 mt-0.5" />
                <span>{contactAddress}</span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#c9ff35] py-2 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${phoneHotline.replace(/\D/g, "")}`}
                  className="w-full bg-white/10 text-white py-2.5 rounded-full font-bold text-center flex items-center justify-center gap-2 text-xs"
                >
                  <Phone className="w-4 h-4 text-[#c9ff35]" /> Call {phoneHotline}
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookMeeting();
                  }}
                  className="w-full bg-[#c9ff35] text-[#1c1c1c] py-3 rounded-full font-bold text-center flex items-center justify-center gap-2 text-xs"
                >
                  Get Solar Quote <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
