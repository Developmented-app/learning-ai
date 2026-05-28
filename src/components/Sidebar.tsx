import React from "react";
import { BookOpen, BarChart3, GraduationCap, Flame, Play } from "lucide-react";
import { motion } from "motion/react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  activeCourseId: string | null;
  resumeActiveVideo: () => void;
  streak: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  language,
  activeCourseId,
  resumeActiveVideo,
  streak,
}: SidebarProps) {
  const t = TRANSLATIONS[language];

  const menuItems = [
    { id: "explore", label: t.exploreCourses, icon: BookOpen },
    { id: "dashboard", label: t.myDashboard, icon: BarChart3 },
  ];

  return (
    <aside className="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-between border-t border-white/5 px-4 py-2 glass-panel md:sticky md:top-0 md:h-[calc(100vh)] md:w-64 md:flex-col md:items-stretch md:justify-start md:border-r md:border-white/5 md:border-t-0 md:px-6 md:py-8 lg:w-72">
      {/* Platform Branding */}
      <div className="hidden items-center gap-3 md:flex md:mb-10">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 shadow-lg shadow-indigo-500/20">
          <GraduationCap className="h-6 w-6 text-white" />
          <div className="absolute -inset-1 -z-10 rounded-xl bg-indigo-500/20 blur-sm"></div>
        </div>
        <div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            {t.appTitle.split(" - ")[0]}
          </span>
          <p className="font-mono text-[9px] text-indigo-400/80 tracking-wider uppercase">
            STUDY WITH INTENT
          </p>
        </div>
      </div>

      {/* Navigation Modules */}
      <nav className="flex w-full justify-around gap-1 md:flex-col md:justify-start md:gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-indigo-400 bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 h-full w-1 rounded-r-md bg-gradient-to-b from-indigo-500 to-purple-600 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110 text-indigo-400" : ""}`} />
              <span className="hidden leading-none md:block">{item.label}</span>
            </button>
          );
        })}

        {/* Dynamic Resume watcher (shortcut if course activated) */}
        {activeCourseId && (
          <button
            onClick={resumeActiveVideo}
            className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
              activeTab === "learn"
                ? "text-purple-400 bg-white/[0.04] border border-purple-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
            }`}
          >
            {activeTab === "learn" && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 h-full w-1 rounded-r-md bg-gradient-to-b from-purple-400 to-pink-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Play className={`h-5 w-5 animate-pulse ${activeTab === "learn" ? "text-purple-400 scale-110" : "text-purple-400/70"}`} />
            <span className="hidden text-left leading-none md:block">
              {language === "en" ? "Active Lecture" : "បន្ទប់រៀនសកម្ម"}
            </span>
          </button>
        )}
      </nav>

      {/* Streak section (Bottom of sidebar desktop-only) */}
      <div className="hidden border-t border-white/5 mt-auto pt-6 md:block">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 text-center glass-card-interactive">
          <div className="flex justify-center mb-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shadow-md shadow-amber-500/5">
              <Flame className="h-6 w-6 animate-bounce" />
            </div>
          </div>
          <p className="text-xl font-bold font-mono text-slate-100">{streak} 🔥</p>
          <p className="text-xs text-slate-400/80 mt-1">
            {language === "en" ? "Daily Streak Goal" : "ទម្លាប់សិក្សាប្រចាំថ្ងៃ"}
          </p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-5/6 rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
