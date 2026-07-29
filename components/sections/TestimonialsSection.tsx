"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Quote, Star, MessageSquare, CheckCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export const TestimonialsSection: React.FC = () => {
  const { getSetting } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsBadge = getSetting("testimonials_badge", "[ REVIEWS & TESTIMONIALS ]");
  const testimonialsTitle = getSetting("testimonials_title", "Shining Testimonials From Satisfied Clients");
  const ratingStars = getSetting("rating_stars", "4.9");
  const reviewCount = getSetting("review_count", "176");

  const testimonials = [
    {
      id: 1,
      name: getSetting("testimonial_author", "Sunil Kadam"),
      role: getSetting("testimonial_author_tag", "[LOCAL GUIDE • 15 REVIEWS]"),
      badge: "Google Verified Review",
      image: getSetting("testimonial_img", "/images/blog_office.jpg"),
      rating: 5,
      quote: getSetting("testimonial_quote", "\" I recently got my rooftop solar system installed by Konark Solar, and I'm extremely satisfied with the entire experience. Low cost, budget friendly, and customer satisfaction is their priority! \""),
      ownerResponse: getSetting("testimonial_response", "Response from Konark Solar Owner: Thanks sir!"),
    },
    {
      id: 2,
      name: "Nagaraja Rao",
      role: "Rooftop Solar Client",
      badge: "Google Verified Review",
      image: "/images/about_house.jpg",
      rating: 5,
      quote:
        "\" The installation of rooftop solar power unit is very good and we generating around 16 units per day during sunny day and around 8 units during cloudy days. There is good saving since I was not getting free power. The vendor has done good work. \"",
      ownerResponse: "Response from Konark Solar Owner: Thanks sir!",
    },
    {
      id: 3,
      name: "Arjun M.G",
      role: "Local Guide • 57 reviews",
      badge: "Google Verified Review",
      image: "/images/process_engineers.jpg",
      rating: 5,
      quote:
        "\" Chikke gowdru being owner is number one in the market where he explains things and also gives good estimate on product when compared to others and their installation team is technically sound and install the instrument in a unique and standard way. \"",
      ownerResponse: "Response from Konark Solar Owner: Thanks sir!",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 px-6 bg-white" data-purpose="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#012c2d]" /> {testimonialsBadge}
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {ratingStars} ★ ({reviewCount} Google Reviews)
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] tracking-tight">
              {testimonialsTitle}
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#012c2d] hover:text-[#c9ff35] hover:border-[#012c2d] transition-all shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="w-12 h-12 rounded-full bg-[#c9ff35] text-[#1c1c1c] flex items-center justify-center hover:bg-[#012c2d] hover:text-white transition-all shadow-md"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#012c2d] rounded-[34.08px] overflow-hidden flex flex-col lg:flex-row min-h-[440px] shadow-2xl border border-white/10"
          >
            {/* Left Image */}
            <div className="lg:w-5/12 relative min-h-[280px] lg:min-h-full">
              <Image src={current.image} alt={current.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012c2d] via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3 h-3" /> {current.badge}
              </div>
            </div>

            {/* Right Quote Body */}
            <div className="lg:w-7/12 p-8 sm:p-12 flex flex-col justify-between text-white relative">
              <Quote className="w-12 h-12 text-[#c9ff35]/30 mb-4" />

              <p className="text-xl sm:text-2xl font-medium leading-relaxed italic mb-6 text-white/95 font-serif">
                {current.quote}
              </p>

              {current.ownerResponse && (
                <div className="bg-white/10 p-3 rounded-xl border border-white/15 text-xs text-[#c9ff35] font-semibold mb-6 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{current.ownerResponse}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-4 border-t border-white/15">
                <div>
                  <div className="font-extrabold text-xl text-white tracking-tight">{current.name}</div>
                  <div className="text-[#c9ff35] text-xs font-semibold uppercase tracking-wider mt-0.5">
                    {current.role}
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#c9ff35]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#c9ff35]" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
