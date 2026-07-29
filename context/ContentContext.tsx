"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/constants";

interface ContentContextType {
  settings: Record<string, string>;
  getSetting: (key: string, fallback?: string) => string;
  refreshSettings: () => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  settings: DEFAULT_SITE_SETTINGS,
  getSetting: (key: string, fallback = "") => DEFAULT_SITE_SETTINGS[key] ?? fallback,
  refreshSettings: async () => {},
  loading: true,
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.warn("Failed to load CMS settings, using defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const getSetting = (key: string, fallback = "") => {
    return settings[key] ?? DEFAULT_SITE_SETTINGS[key] ?? fallback;
  };

  return (
    <ContentContext.Provider value={{ settings, getSetting, refreshSettings, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
