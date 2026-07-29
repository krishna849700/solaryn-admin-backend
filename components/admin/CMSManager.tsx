"use client";

import React, { useState, useEffect } from "react";
import { Save, RefreshCw, CheckCircle, Image, Globe, Phone, FileText, Sparkles, UserCheck, Layers, Folder, MessageSquare, AlertTriangle } from "lucide-react";

export function CMSManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "services" | "process" | "projects" | "testimonials">("hero");

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings ?? {});
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (res.ok) {
        setMessage("All CMS website content and photo settings saved successfully!");
        setTimeout(() => setMessage(null), 4000);
      } else if (res.status === 401) {
        setMessage("SESSION_EXPIRED: Your admin session has expired. Please log out and log in again.");
      } else {
        const errData = await res.json().catch(() => ({}));
        setMessage(errData.error || "Error saving CMS settings. Please try again.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setMessage("Error connecting to server. Please check your network connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E7E3D8] p-10 text-center text-sm text-[#6B6F6C]">
        Loading full CMS content manager...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E7E3D8] shadow-sm overflow-hidden text-[#1C1F1D]">
      <header className="p-6 border-b border-[#E7E3D8] bg-[#F7F5EF] flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#012c2d] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8A33D]" /> Complete Website Content & Image Manager (CMS)
          </h2>
          <p className="text-xs text-[#6B6F6C] mt-1">
            Edit text descriptions, headlines, contact tags, and photo URLs for all 5 website sections live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadSettings}
            className="px-3.5 py-2 rounded-full border border-[#E7E3D8] text-xs font-bold bg-white hover:bg-gray-50 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reload
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 rounded-full bg-[#012c2d] text-[#c9ff35] font-bold text-xs hover:bg-[#16301F] transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save All CMS Changes"} <Save className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {message && (
        <div className={`p-3.5 px-6 text-xs font-bold flex items-center justify-between gap-2 ${
          message.includes("Error") || message.includes("SESSION_EXPIRED") 
            ? "bg-red-50 text-red-700 border-b border-red-200" 
            : "bg-emerald-50 text-emerald-800 border-b border-emerald-200"
        }`}>
          <div className="flex items-center gap-2">
            {message.includes("SESSION_EXPIRED") || message.includes("Error") ? (
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            ) : (
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            )}
            <span>{message.replace("SESSION_EXPIRED: ", "")}</span>
          </div>
          {message.includes("SESSION_EXPIRED") && (
            <a
              href="/admin/login"
              className="px-3 py-1 bg-red-700 text-white rounded-full text-[11px] hover:bg-red-800 font-bold"
            >
              Re-login Now
            </a>
          )}
        </div>
      )}

      {/* Sub tabs for all 6 sections */}
      <div className="flex border-b border-[#E7E3D8] bg-[#FAF8F3] px-6 pt-3 gap-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab("hero")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "hero" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Globe className="w-4 h-4" /> 1. Hero & Header
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "about" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <UserCheck className="w-4 h-4" /> 2. About Bento Grid
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "services" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <FileText className="w-4 h-4" /> 3. Services List
        </button>
        <button
          onClick={() => setActiveTab("process")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "process" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Layers className="w-4 h-4" /> 4. 3-Step Process
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "projects" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Folder className="w-4 h-4" /> 5. Projects Portfolio
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all shrink-0 ${
            activeTab === "testimonials" ? "border-[#012c2d] text-[#012c2d]" : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> 6. Reviews & Articles
        </button>
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-6">
        {/* Tab 1: Hero & Header */}
        {activeTab === "hero" && (
          <div className="space-y-4 max-w-3xl">
            <InputField
              label="Hero Top Badge"
              value={settings.hero_badge ?? ""}
              onChange={(v) => handleChange("hero_badge", v)}
            />
            <InputField
              label="Hero Main Title"
              value={settings.hero_title ?? ""}
              onChange={(v) => handleChange("hero_title", v)}
            />
            <TextAreaField
              label="Hero Subtitle / Description"
              value={settings.hero_subtitle ?? ""}
              onChange={(v) => handleChange("hero_subtitle", v)}
              rows={3}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Company Name"
                value={settings.company_name ?? ""}
                onChange={(v) => handleChange("company_name", v)}
              />
              <InputField
                label="Kannada Title"
                value={settings.company_kannada_name ?? ""}
                onChange={(v) => handleChange("company_kannada_name", v)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Phone Hotline"
                value={settings.phone_hotline ?? ""}
                onChange={(v) => handleChange("phone_hotline", v)}
              />
              <InputField
                label="WhatsApp Number (With country code)"
                value={settings.whatsapp_number ?? ""}
                onChange={(v) => handleChange("whatsapp_number", v)}
              />
            </div>
            <InputField
              label="Hero Background Photo URL"
              value={settings.hero_bg_image ?? ""}
              onChange={(v) => handleChange("hero_bg_image", v)}
            />
          </div>
        )}

        {/* Tab 2: About Us Bento Grid (Screenshot 1) */}
        {activeTab === "about" && (
          <div className="space-y-4 max-w-3xl">
            <InputField
              label="About Section Badge"
              value={settings.about_badge ?? ""}
              onChange={(v) => handleChange("about_badge", v)}
            />
            <InputField
              label="About Section Main Title"
              value={settings.about_title ?? ""}
              onChange={(v) => handleChange("about_title", v)}
            />
            <InputField
              label="Consult Button Label"
              value={settings.about_cta_label ?? ""}
              onChange={(v) => handleChange("about_cta_label", v)}
            />
            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Card 1: Market Leadership</h4>
              <InputField
                label="Title"
                value={settings.about_market_leadership_title ?? ""}
                onChange={(v) => handleChange("about_market_leadership_title", v)}
              />
              <TextAreaField
                label="Description"
                value={settings.about_market_leadership_desc ?? ""}
                onChange={(v) => handleChange("about_market_leadership_desc", v)}
                rows={2}
              />
              <InputField
                label="Wind/Solar Photo URL"
                value={settings.about_img_wind ?? ""}
                onChange={(v) => handleChange("about_img_wind", v)}
              />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Center Feature: Peak Solar Generation</h4>
              <InputField
                label="Badge"
                value={settings.about_generation_badge ?? ""}
                onChange={(v) => handleChange("about_generation_badge", v)}
              />
              <InputField
                label="Stat Title"
                value={settings.about_generation_title ?? ""}
                onChange={(v) => handleChange("about_generation_title", v)}
              />
              <TextAreaField
                label="Stat Description"
                value={settings.about_generation_desc ?? ""}
                onChange={(v) => handleChange("about_generation_desc", v)}
                rows={2}
              />
              <InputField
                label="Rooftop House Photo URL"
                value={settings.about_img_house ?? ""}
                onChange={(v) => handleChange("about_img_house", v)}
              />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Card 3: Standard Materials</h4>
              <InputField
                label="Title"
                value={settings.about_standard_materials_title ?? ""}
                onChange={(v) => handleChange("about_standard_materials_title", v)}
              />
              <TextAreaField
                label="Description"
                value={settings.about_standard_materials_desc ?? ""}
                onChange={(v) => handleChange("about_standard_materials_desc", v)}
                rows={2}
              />
              <InputField
                label="Engineering Team Photo URL"
                value={settings.about_img_team ?? ""}
                onChange={(v) => handleChange("about_img_team", v)}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Services List (Screenshot 2) */}
        {activeTab === "services" && (
          <div className="space-y-6 max-w-3xl">
            <InputField
              label="Services Section Badge"
              value={settings.services_badge ?? ""}
              onChange={(v) => handleChange("services_badge", v)}
            />
            <InputField
              label="Services Section Main Title"
              value={settings.services_title ?? ""}
              onChange={(v) => handleChange("services_title", v)}
            />
            <InputField
              label="Quotation Button Label"
              value={settings.services_cta_label ?? ""}
              onChange={(v) => handleChange("services_cta_label", v)}
            />

            <ServiceCMSItem n={1} settings={settings} onChange={handleChange} />
            <ServiceCMSItem n={2} settings={settings} onChange={handleChange} />
            <ServiceCMSItem n={3} settings={settings} onChange={handleChange} />
            <ServiceCMSItem n={4} settings={settings} onChange={handleChange} />
            <ServiceCMSItem n={5} settings={settings} onChange={handleChange} />
            <ServiceCMSItem n={6} settings={settings} onChange={handleChange} />
          </div>
        )}

        {/* Tab 4: 3-Step Process (Screenshot 3) */}
        {activeTab === "process" && (
          <div className="space-y-4 max-w-3xl">
            <InputField
              label="Process Section Badge"
              value={settings.process_badge ?? ""}
              onChange={(v) => handleChange("process_badge", v)}
            />
            <InputField
              label="Process Main Title"
              value={settings.process_title ?? ""}
              onChange={(v) => handleChange("process_title", v)}
            />

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Step 01: Consultation</h4>
              <InputField label="Title" value={settings.process_step1_title ?? ""} onChange={(v) => handleChange("process_step1_title", v)} />
              <TextAreaField label="Description" value={settings.process_step1_desc ?? ""} onChange={(v) => handleChange("process_step1_desc", v)} rows={2} />
              <InputField label="LiDAR / Tech Details Note" value={settings.process_step1_details ?? ""} onChange={(v) => handleChange("process_step1_details", v)} />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Step 02: Design & Install</h4>
              <InputField label="Title" value={settings.process_step2_title ?? ""} onChange={(v) => handleChange("process_step2_title", v)} />
              <TextAreaField label="Description" value={settings.process_step2_desc ?? ""} onChange={(v) => handleChange("process_step2_desc", v)} rows={2} />
              <InputField label="Technical Safety Note" value={settings.process_step2_details ?? ""} onChange={(v) => handleChange("process_step2_details", v)} />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Step 03: Start & Savings</h4>
              <InputField label="Title" value={settings.process_step3_title ?? ""} onChange={(v) => handleChange("process_step3_title", v)} />
              <TextAreaField label="Description" value={settings.process_step3_desc ?? ""} onChange={(v) => handleChange("process_step3_desc", v)} rows={2} />
              <InputField label="Mobile App Note" value={settings.process_step3_details ?? ""} onChange={(v) => handleChange("process_step3_details", v)} />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Right Feature Card: Certified Solar Team</h4>
              <InputField label="Badge Tag" value={settings.process_card_badge ?? ""} onChange={(v) => handleChange("process_card_badge", v)} />
              <InputField label="Card Title" value={settings.process_card_title ?? ""} onChange={(v) => handleChange("process_card_title", v)} />
              <TextAreaField label="Card Description" value={settings.process_card_desc ?? ""} onChange={(v) => handleChange("process_card_desc", v)} rows={2} />
              <InputField label="Process Photo URL" value={settings.process_img ?? ""} onChange={(v) => handleChange("process_img", v)} />
            </div>
          </div>
        )}

        {/* Tab 5: Projects Portfolio (Screenshot 4) */}
        {activeTab === "projects" && (
          <div className="space-y-6 max-w-3xl">
            <InputField label="Projects Badge" value={settings.projects_badge ?? ""} onChange={(v) => handleChange("projects_badge", v)} />
            <InputField label="Projects Main Title" value={settings.projects_title ?? ""} onChange={(v) => handleChange("projects_title", v)} />

            <ProjectCMSCard n={1} settings={settings} onChange={handleChange} />
            <ProjectCMSCard n={2} settings={settings} onChange={handleChange} />
            <ProjectCMSCard n={3} settings={settings} onChange={handleChange} />
            <ProjectCMSCard n={4} settings={settings} onChange={handleChange} />
          </div>
        )}

        {/* Tab 6: Testimonials & Articles (Screenshot 5) */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Client Review Section</h4>
              <InputField label="Badge" value={settings.testimonials_badge ?? ""} onChange={(v) => handleChange("testimonials_badge", v)} />
              <InputField label="Title" value={settings.testimonials_title ?? ""} onChange={(v) => handleChange("testimonials_title", v)} />
              <TextAreaField label="Client Quote" value={settings.testimonial_quote ?? ""} onChange={(v) => handleChange("testimonial_quote", v)} rows={3} />
              <InputField label="Client Name" value={settings.testimonial_author ?? ""} onChange={(v) => handleChange("testimonial_author", v)} />
              <InputField label="Client Tag" value={settings.testimonial_author_tag ?? ""} onChange={(v) => handleChange("testimonial_author_tag", v)} />
              <InputField label="Owner Reply Message" value={settings.testimonial_response ?? ""} onChange={(v) => handleChange("testimonial_response", v)} />
              <InputField label="Testimonial Photo URL" value={settings.testimonial_img ?? ""} onChange={(v) => handleChange("testimonial_img", v)} />
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Articles & Blogs Section</h4>
              <InputField label="Badge" value={settings.blogs_badge ?? ""} onChange={(v) => handleChange("blogs_badge", v)} />
              <InputField label="Title" value={settings.blogs_title ?? ""} onChange={(v) => handleChange("blogs_title", v)} />

              <div className="pt-2 border-t border-[#E7E3D8] space-y-2">
                <p className="text-[11px] font-bold text-[#012c2d]">Blog Post 1</p>
                <InputField label="Article 1 Title" value={settings.blog_1_title ?? ""} onChange={(v) => handleChange("blog_1_title", v)} />
                <TextAreaField label="Article 1 Excerpt" value={settings.blog_1_excerpt ?? ""} onChange={(v) => handleChange("blog_1_excerpt", v)} rows={2} />
                <InputField label="Article 1 Image URL" value={settings.blog_1_img ?? ""} onChange={(v) => handleChange("blog_1_img", v)} />
              </div>

              <div className="pt-2 border-t border-[#E7E3D8] space-y-2">
                <p className="text-[11px] font-bold text-[#012c2d]">Blog Post 2</p>
                <InputField label="Article 2 Title" value={settings.blog_2_title ?? ""} onChange={(v) => handleChange("blog_2_title", v)} />
                <TextAreaField label="Article 2 Excerpt" value={settings.blog_2_excerpt ?? ""} onChange={(v) => handleChange("blog_2_excerpt", v)} rows={2} />
                <InputField label="Article 2 Image URL" value={settings.blog_2_img ?? ""} onChange={(v) => handleChange("blog_2_img", v)} />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#E7E3D8] flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-full bg-[#012c2d] text-[#c9ff35] font-bold text-xs hover:bg-[#16301F] transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save All CMS Changes"} <Save className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6F6C] mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E7E3D8] px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[#012c2d] text-[#1C1F1D]"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6F6C] mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E7E3D8] px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[#012c2d] text-[#1C1F1D] resize-none"
      />
    </div>
  );
}

function ServiceCMSItem({
  n,
  settings,
  onChange,
}: {
  n: number;
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
      <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Service #{n}</h4>
      <InputField label="Title" value={settings[`service_${n}_title`] ?? ""} onChange={(v) => onChange(`service_${n}_title`, v)} />
      <TextAreaField label="Description" value={settings[`service_${n}_desc`] ?? ""} onChange={(v) => onChange(`service_${n}_desc`, v)} rows={2} />
      <InputField label="Photo URL" value={settings[`service_${n}_img`] ?? ""} onChange={(v) => onChange(`service_${n}_img`, v)} />
    </div>
  );
}

function ProjectCMSCard({
  n,
  settings,
  onChange,
}: {
  n: number;
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#E7E3D8] space-y-3">
      <h4 className="font-bold text-xs uppercase tracking-wider text-[#012c2d]">Project Installation #{n}</h4>
      <InputField label="Project Title" value={settings[`project_${n}_title`] ?? ""} onChange={(v) => onChange(`project_${n}_title`, v)} />
      <TextAreaField label="Project Description" value={settings[`project_${n}_desc`] ?? ""} onChange={(v) => onChange(`project_${n}_desc`, v)} rows={2} />
      <InputField label="Category Badge Tag" value={settings[`project_${n}_badge`] ?? ""} onChange={(v) => onChange(`project_${n}_badge`, v)} />
      <InputField label="Installation Photo URL" value={settings[`project_${n}_img`] ?? ""} onChange={(v) => onChange(`project_${n}_img`, v)} />
    </div>
  );
}
