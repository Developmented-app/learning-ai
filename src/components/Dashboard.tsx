import React, { useState } from "react";
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Flame,
  Award,
  Sparkles,
  BookOpenCheck,
  TrendingUp,
  Target,
  GraduationCap,
  Play,
  Star
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { StudentStats, Course, Language } from "../types";
import { TRANSLATIONS } from "../data";

interface DashboardProps {
  stats: StudentStats;
  enrolledCourses: Course[];
  language: Language;
  onExploreClick: () => void;
  onResumeClick: (course: Course) => void;
  onWriteReview: (course: Course) => void;
}

export default function Dashboard({
  stats,
  enrolledCourses,
  language,
  onExploreClick,
  onResumeClick,
  onWriteReview,
}: DashboardProps) {
  const t = TRANSLATIONS[language];

  // Derive metrics in case user enrolled/completed more during session!
  const enrollmentCount = enrolledCourses.length;
  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;

  const cards = [
    {
      id: "stat-1",
      title: t.hoursStudied,
      value: `${stats.learningTimeHours.toFixed(1)} ${t.hoursShort}`,
      desc: language === "en" ? "+1.4 hrs today" : "+១.៤ ម៉ោង ថ្ងៃនេះ",
      icon: Clock,
      themeColor: "text-indigo-400 bg-indigo-400/5 border-indigo-400/20",
      glowColor: "shadow-indigo-500/5"
    },
    {
      id: "stat-2",
      title: t.coursesJoined,
      value: `${enrollmentCount}`,
      desc: language === "en" ? "1 completed" : "១ បញ្ចប់រួចរាល់",
      icon: BookOpen,
      themeColor: "text-blue-400 bg-blue-400/5 border-blue-400/20",
      glowColor: "shadow-blue-500/5"
    },
    {
      id: "stat-3",
      title: t.completedState,
      value: `${completedCount}`,
      desc: language === "en" ? "Keep it up!" : "បន្តដំណើរទៅមុខ!",
      icon: BookOpenCheck,
      themeColor: "text-purple-400 bg-purple-400/5 border-purple-400/20",
      glowColor: "shadow-purple-500/5"
    },
    {
      id: "stat-4",
      title: t.activeStreak,
      value: `${stats.activeStreakDays} ${language === "en" ? "Days" : "ថ្ងៃ"}`,
      desc: language === "en" ? "Personal Best!" : "ល្អបំផុត!",
      icon: Flame,
      themeColor: "text-orange-400 bg-orange-400/5 border-orange-400/20",
      glowColor: "shadow-orange-500/5"
    },
  ];

  // Achievements Collection
  const badges = [
    {
      id: "ach-1",
      title: t.certUnlocked,
      desc: t.certDesc,
      icon: Award,
      unlocked: true,
      color: "from-indigo-400 via-purple-500 to-indigo-600",
      unlockedDate: "2026-05-24"
    },
    {
      id: "ach-2",
      title: language === "en" ? "Active Learner Streak (5d)" : "ទម្លាប់សិក្សាជាប្រចាំ (៥ថ្ងៃ)",
      desc: language === "en" ? "Earned by learning at least 30 minutes daily for 5 continuous days." : "ទទួលបានដោយការសិក្សាយ៉ាងហោចណាស់៣០នាទីជាប្រចាំរយៈពេល៥ថ្ងៃជាប់ៗគ្នា។",
      icon: Flame,
      unlocked: true,
      color: "from-amber-400 via-orange-500 to-rose-600",
      unlockedDate: "2026-05-27"
    },
    {
      id: "ach-3",
      title: language === "en" ? "Dedicated Note Taker" : "អ្នកកត់ត្រាឯកទេស",
      desc: language === "en" ? "Logged 5+ contextual chapter notes to enhance memory retention." : "បានកត់ត្រាចំណាំសរុបជាគំរូមេរៀនលើសពី៥មេរៀនដើម្បីបង្កើនការយល់ដឹង។",
      icon: Sparkles,
      unlocked: true,
      color: "from-purple-400 via-pink-500 to-rose-500",
      unlockedDate: "2026-05-28"
    }
  ];

  const targetPercentage = Math.min(Math.round((stats.learningTimeHours / stats.weeklyTargetHours) * 100), 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Target Dashboard Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/5 pb-6 text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-white mb-2 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-400 fill-indigo-400/10 animate-pulse" />
            <span>{t.analyticsTitle}</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            {t.analyticsSubtitle}
          </p>
        </div>

        {/* Explore shortcut buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onExploreClick}
            className="rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/30 text-xs text-slate-200 px-4 py-2.5 transition-all flex items-center gap-2 font-semibold"
          >
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>{t.exploreButton}</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 numeric key indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`flex flex-col items-start p-4 md:p-5 rounded-2xl glass-panel text-left relative overflow-hidden transition-all duration-300 hover:border-white/20 shadow-lg ${card.glowColor}`}
            >
              <div className={`p-2.5 rounded-xl border ${card.themeColor} mb-3.5`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] md:text-xs font-semibold text-slate-400 tracking-wide uppercase">
                {card.title}
              </span>
              <span className="text-lg md:text-2xl font-bold font-mono text-white mt-1">
                {card.value}
              </span>
              <span className="text-[10px] text-slate-500 mt-1 font-sans">{card.desc}</span>
              {/* Corner ambient glow decor */}
              <div className="absolute right-[-10px] top-[-10px] h-16 w-16 bg-indigo-500/2 blur-[40px] rounded-full"></div>
            </div>
          );
        })}
      </div>

      {/* Chart and Sub-sections Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Student Study Profile Activity */}
        <div className="lg:col-span-2 rounded-3xl p-5 md:p-6 glass-panel border border-white/10 space-y-4">
          <div className="flex items-center justify-between text-left">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <span>{language === "en" ? "Weekly Studying Profile" : "សកម្មភាពសិក្សាប្រចាំសប្តាហ៍"}</span>
            </h3>
            <span className="text-[10.5px] rounded bg-indigo-400/10 border border-indigo-400/20 px-2 py-0.5 text-indigo-300 font-mono font-bold">
              {language === "en" ? "Live Telemetry" : "ទិន្នន័យផ្ទាល់ប្រព័ន្ធ"}
            </span>
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats.analyticsHistory}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis
                  dataKey={language === "en" ? "dayEn" : "dayKh"}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}h`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(5, 5, 7, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#818cf8", fontSize: "12px" }}
                  labelStyle={{ color: "#94a3b8", fontSize: "11px", fontWeight: "bold" }}
                  formatter={(value: any) => [`${value} ${t.hoursShort}`, language === "en" ? "Duration" : "រយៈពេល"]}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#hoursGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right sub-column: Target Progress meter */}
        <div className="rounded-3xl p-5 md:p-6 glass-panel border border-white/10 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-400" />
              <span>{t.weeklyTargetHeading}</span>
            </h3>

            <div className="text-center py-4 relative">
              {/* Big circular progress status percentage or digital values */}
              <div className="inline-flex flex-col items-center justify-center h-28 w-28 rounded-full border-4 border-dashed border-indigo-400/20 relative">
                <span className="text-3xl font-extrabold font-mono text-indigo-400">
                  {targetPercentage}%
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                  {t.completedStateVerb}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400 font-mono">
                <span>{t.hoursProgress}</span>
                <span className="font-semibold text-slate-200">
                  {stats.learningTimeHours}h / {stats.weeklyTargetHours}h
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-500 rounded-full"
                  style={{ width: `${targetPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-indigo-400/[0.02] border border-indigo-400/10 p-4 font-normal text-xs text-indigo-300 leading-relaxed">
            {t.congratsMessage}
          </div>
        </div>
      </div>

      {/* Course Watch-History shortcut or Active Lessons listing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses Shortcuts panel */}
        <div className="rounded-3xl p-6 glass-panel border border-white/10 text-left lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <BookOpenCheck className="h-4.5 w-4.5 text-indigo-400" />
            <span>{t.resumeCourse}</span>
          </h3>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-6 text-slate-500 text-xs">
              No active courses yet. Go to catalog to join a class.
            </div>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.map((crs) => (
                <div
                  key={crs.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-indigo-400/20 hover:bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={crs.thumbnail}
                      alt={crs.titleEn}
                      className="h-12 w-20 rounded-lg object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-slate-200 line-clamp-1">
                        {language === "en" ? crs.titleEn : crs.titleKh}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {crs.instructorName} ● {crs.sections.reduce((acc, sec) => acc + sec.chapters.length, 0)} {t.lectures}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="text-right flex flex-col min-w-[70px]">
                      <span className="font-mono font-bold text-xs text-indigo-400">
                        {crs.progress}% {t.completedStateVerb}
                      </span>
                      <div className="w-20 bg-white/5 h-1 rounded-full mt-1 overflow-hidden ml-auto">
                        <div className="bg-indigo-400 h-full" style={{ width: `${crs.progress}%` }}></div>
                      </div>
                    </div>

                    {crs.progress === 100 && (
                      <button
                        onClick={() => onWriteReview(crs)}
                        className="rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 py-2 px-3 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
                        id={`review-resume-btn-${crs.id}`}
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-400 animate-pulse" />
                        <span>{language === "en" ? "Review" : "វាយតម្លៃ"}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onResumeClick(crs)}
                      className="rounded-xl bg-indigo-500 text-white font-bold text-xs py-2 px-3.5 hover:bg-indigo-600 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>{language === "en" ? "Resume" : "ចូលរៀន"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Milestones / Earned Badge Awards widget */}
        <div className="rounded-3xl p-6 glass-panel border border-white/10 text-left space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <Award className="h-4.5 w-4.5 text-purple-400" />
            <span>{t.achievementsHeading}</span>
          </h3>

          <div className="space-y-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className="flex gap-3.5 items-start">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${badge.color} text-white shadow-md flex-shrink-0 mt-0.5`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="text-left py-0.5">
                    <span className="text-xs font-bold text-slate-200 block">{badge.title}</span>
                    <p className="text-[11px] text-slate-400/90 leading-tight mt-0.5">
                      {badge.desc}
                    </p>
                    {badge.unlocked && (
                      <span className="font-mono text-[9px] text-indigo-400/80 block mt-1">
                        Unlocked {badge.unlockedDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
