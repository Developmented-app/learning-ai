import React, { useState } from "react";
import { Search, Bell, Languages, Sparkles, LogOut, Clock, History, X, Trash2 } from "lucide-react";
import { Language } from "../types";
import { TRANSLATIONS } from "../data";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  studentEmail: string;
  isOnline: boolean;
}

export default function Header({
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  studentEmail,
  isOnline,
}: HeaderProps) {
  const t = TRANSLATIONS[language];
  const [showNotification, setShowNotification] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("studyglass_recent_searches");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return [];
  });

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "kh" : "en");
  };

  const addToRecent = (query: string) => {
    const cleaned = query.trim();
    if (!cleaned) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== cleaned.toLowerCase());
      const updated = [cleaned, ...filtered].slice(0, 5);
      localStorage.setItem("studyglass_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      addToRecent(searchQuery.trim());
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      const cleaned = searchQuery.trim();
      if (cleaned.length >= 3) {
        addToRecent(cleaned);
      }
    }, 250);
  };

  const handleSelectRecent = (q: string) => {
    setSearchQuery(q);
    addToRecent(q);
  };

  const handleDeleteRecent = (e: React.MouseEvent, q: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== q);
      localStorage.setItem("studyglass_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.setItem("studyglass_recent_searches", JSON.stringify([]));
  };

  const notifications = language === "en" ? [
    "🎓 Milestone: You saved a new lecture note!",
    "🔥 5-Day active learning streak unlocked!",
    "📘 New section added to Mastering Glassmorphic UI!"
  ] : [
    "🎓 ស្នាដៃ៖ អ្នកបានរក្សាទុកកំណត់ត្រាមកបន្ទប់រៀនថ្មី!",
    "🔥 បានបើកដំណើរការទម្លាប់សិក្សា ៥ថ្ងៃជាប់គ្នាហើយ!",
    "📘 ផ្នែកថ្មីត្រូវបានបន្ថែមទៅក្នុងវគ្គសិក្សា UI/UX!"
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-white/5 bg-[#050507]/30 px-6 backdrop-blur-xl">
      {/* Search Input Box */}
      <div className="relative flex flex-1 max-w-sm lg:max-w-md items-center" id="search-container">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={t.searchPlaceholder}
          className="w-full text-xs lg:text-sm pl-11 pr-8 py-2.5 rounded-full text-slate-200 glass-input font-sans placeholder:text-slate-500 text-ellipsis focus:scale-[1.01] focus:ring-1 focus:ring-indigo-500/50 transition-all font-sans"
          id="global-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 h-6 w-6 flex items-center justify-center rounded-full hover:bg-white/10 text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
            id="clear-search-query-btn"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {/* Recent Searches Dropdown list */}
        {isFocused && recentSearches.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-white/10 bg-[#070b15]/95 backdrop-blur-xl p-3.5 shadow-2xl shadow-indigo-500/10 animate-fadeIn"
            id="recent-searches-dropdown"
          >
            {/* Ambient glows inside dropdown */}
            <div className="absolute right-[-10%] top-[-10%] h-24 w-24 bg-indigo-500/10 blur-[30px] rounded-full pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 relative z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 text-indigo-400" />
                <span>{language === "en" ? "Recent Searches" : "ការស្វែងរកថ្មីៗ"}</span>
              </span>
              <button
                onMouseDown={(e) => handleClearAll(e)}
                className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer"
                id="clear-all-recent-searches-btn"
              >
                {language === "en" ? "Clear All" : "សម្អាតទាំងអស់"}
              </button>
            </div>

            <div className="space-y-1 relative z-10">
              {recentSearches.map((keyword, index) => (
                <div
                  key={index}
                  onMouseDown={() => handleSelectRecent(keyword)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] transition-all cursor-pointer group"
                  id={`recent-search-item-${index}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Clock className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-all flex-shrink-0" />
                    <span className="text-xs text-slate-300 group-hover:text-white transition-all truncate">
                      {keyword}
                    </span>
                  </div>
                  <button
                    onMouseDown={(e) => handleDeleteRecent(e, keyword)}
                    className="p-1 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    title={language === "en" ? "Delete from history" : "លុបចេញពីប្រវត្តិ"}
                    id={`delete-recent-search-btn-${index}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Actions Panel */}
      <div className="flex items-center gap-3 md:gap-5">
        {!isOnline && (
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{language === "en" ? "Offline Cached" : "រក្សាទុកក្រៅបណ្តាញ"}</span>
          </div>
        )}

        {/* Language Toggler */}
        <button
          onClick={toggleLanguage}
          className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold glass-card-interactive border border-white/10 hover:border-indigo-500/30 text-indigo-400"
        >
          <Languages className="h-4 w-4 text-indigo-400" />
          <span>
            {language === "en" ? "🇰🇭 ភាសាខ្មែរ" : "🇺🇸 English"}
          </span>
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-indigo-400 animate-ping"></div>
        </button>

        {/* System Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 text-slate-300 transition-all"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-indigo-400"></span>
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel p-4 shadow-xl z-50 border border-white/10">
              <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>{language === "en" ? "SYSTEM REMINDERS" : "ការជូនដំណឹងប្រព័ន្ធ"}</span>
                <span className="text-indigo-400 font-bold">● New</span>
              </h4>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="text-xs text-slate-300 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                    {notif}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Student Profile widget */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/5">
          <div className="relative">
            <div className="h-10 w-10 overflow-hidden rounded-xl border border-indigo-500/30 bg-slate-800 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Student Profile"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-[-2px] right-[-2px] h-3.5 w-3.5 rounded-full border-2 border-[#050507] bg-emerald-500"></span>
          </div>

          <div className="hidden flex-col text-left xl:flex">
            <span className="text-xs font-semibold text-slate-200">
              {language === "en" ? "Student" : "សិស្សសិក្សា"}
            </span>
            <span className="font-mono text-[9px] text-slate-400 max-w-[110px] truncate" title={studentEmail}>
              {studentEmail}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
