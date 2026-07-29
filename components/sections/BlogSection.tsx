"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { BlogDetailModal, BlogItem } from "../modals/BlogDetailModal";
import { useContent } from "@/context/ContentContext";

export const BlogSection: React.FC = () => {
  const { getSetting } = useContent();
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);

  const blogsBadge = getSetting("blogs_badge", "[ ARTICLE & BLOGS ]");
  const blogsTitle = getSetting("blogs_title", "Discover Articles Crafted By Industry Professionals");

  const blogs: BlogItem[] = [
    {
      id: "sunlight-to-savings",
      category: "Solar Energy",
      date: "December 24, 2025",
      author: "Brooklyn Simmons",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      title: getSetting("blog_1_title", "From Sunlight to Savings: How Solar Panels Reduce Monthly Energy Expenditures"),
      image: getSetting("blog_1_img", "/images/blog_aerial.jpg"),
      readTime: "5 min read",
      excerpt: getSetting("blog_1_excerpt", "Solar energy is no longer just an environmental decision; it is one of the most lucrative financial investments available for property owners in 2026."),
      content: [
        "Solar energy is transforming from a niche green alternative into an essential utility hedging strategy for homeowners and commercial facilities worldwide.",
        "By utilizing high-efficiency monocrystalline PV panels paired with smart microinverters, property owners can generate clean electricity directly at the point of consumption, eliminating grid transmission fees and peak demand surcharges.",
        "Over a 25-year system lifespan, a typical 10 kW residential solar array generates over $45,000 in direct utility bill savings while insulating your household against rising grid tariff rates.",
      ],
    },
    {
      id: "investing-in-solar-2025",
      category: "Clean Tech",
      date: "December 15, 2025",
      author: "Brooklyn Simmons",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      title: getSetting("blog_2_title", "Why Investing in Solar Energy & Battery Storage Makes Sense in 2025 and Beyond"),
      image: getSetting("blog_2_img", "/images/blog_office.jpg"),
      readTime: "7 min read",
      excerpt: getSetting("blog_2_excerpt", "With federal tax incentives, net metering policies, and falling battery storage costs, clean microgrids deliver rapid 3-to-4 year financial payback."),
      content: [
        "As global energy markets experience volatility, corporate ESG mandates and federal investment tax credits (ITC) make renewable microgrids an urgent strategic priority.",
        "Recent technological breakthroughs in Lithium-Iron-Phosphate (LFP) chemistry have dropped commercial battery storage costs by 35%, allowing businesses to store daytime solar energy for peak evening demand shaving.",
        "Integrating smart AI load controllers ensures seamless auto-switching during utility grid blackouts, protecting sensitive machinery and data servers from expensive downtime.",
      ],
    },
  ];

  return (
    <section id="blogs" className="py-24 px-6 bg-white" data-purpose="blog">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#012c2d]" /> {blogsBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1c1c1c] leading-tight tracking-tight">
              {blogsTitle}
            </h2>
          </div>

          <button
            onClick={() => setSelectedArticle(blogs[0])}
            className="bg-[#c9ff35] text-[#1c1c1c] px-6 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#012c2d] hover:text-white transition-all shadow-md group"
          >
            <span>Explore All Articles</span>
            <div className="bg-[#1c1c1c] text-white group-hover:bg-[#c9ff35] group-hover:text-[#1c1c1c] rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedArticle(blog)}
              className="group cursor-pointer bg-white"
            >
              <div className="rounded-[34.08px] overflow-hidden mb-8 h-[360px] relative shadow-xl">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest mb-3 text-gray-500">
                <span className="text-[#c9ff35] bg-[#012c2d] px-3 py-1 rounded-full font-extrabold">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {blog.date}
                </span>
                <span className="ml-auto flex items-center gap-2 text-[#1c1c1c] font-semibold">
                  <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden relative">
                    <Image src={blog.authorAvatar} alt={blog.author} fill unoptimized className="object-cover" />
                  </div>
                  {blog.author}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#1c1c1c] group-hover:text-[#012c2d] transition-colors leading-snug">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <BlogDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </section>
  );
};
