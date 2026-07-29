"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, User, Clock, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface BlogItem {
  id: string;
  category: string;
  date: string;
  author: string;
  authorAvatar: string;
  title: string;
  image: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

interface BlogDetailModalProps {
  article: BlogItem | null;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#012c2d] border border-white/20 rounded-[34.08px] text-white overflow-hidden shadow-2xl my-8"
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
            <Image src={article.image} alt={article.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012c2d] via-transparent to-transparent" />
          </div>

          {/* Body */}
          <div className="p-6 sm:p-10 space-y-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="bg-[#c9ff35] text-[#1c1c1c] font-extrabold uppercase px-3 py-1 rounded-md">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#c9ff35]" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#c9ff35]" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1.5 ml-auto">
                <User className="w-3.5 h-3.5 text-[#c9ff35]" /> {article.author}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{article.title}</h2>

            <div className="space-y-4 text-white/80 leading-relaxed text-sm border-t border-white/10 pt-6">
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-2.5 rounded-full font-bold text-xs hover:bg-white transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
