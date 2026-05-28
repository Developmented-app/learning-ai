import React from "react";
import { Star, Clock, BookOpen, User, GraduationCap } from "lucide-react";
import { Course, Language } from "../types";
import { TRANSLATIONS } from "../data";

interface CourseCardProps {
  key?: string;
  course: Course;
  language: Language;
  onJoin: (courseId: string) => void;
  onSelect: (course: Course) => void;
  onWriteReview?: (course: Course) => void;
  onViewInstructor?: (instructorName: string) => void;
}

export default function CourseCard({
  course,
  language,
  onJoin,
  onSelect,
  onWriteReview,
  onViewInstructor,
}: CourseCardProps) {
  const t = TRANSLATIONS[language];

  const title = language === "en" ? course.titleEn : course.titleKh;
  const desc = language === "en" ? course.descriptionEn : course.descriptionKh;
  const level = language === "en" ? course.levelEn : course.levelKh;
  const instructorTitle = language === "en" ? course.instructorTitleEn : course.instructorTitleKh;
  const tag = language === "en" ? course.tagEn : course.tagKh;

  const categoryColors: { [key: string]: string } = {
    Design: "from-indigo-400 to-indigo-600",
    Coding: "from-purple-500 to-indigo-800",
    AI: "from-indigo-500 to-fuchsia-600",
    Marketing: "from-amber-400 to-orange-500",
  };

  const getCategoryColor = (cat: string) => {
    return categoryColors[cat] || "from-slate-400 to-slate-500";
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl glass-panel glass-panel-hover md:min-h-[460px]">
      {/* Thumbnail Area */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Layer fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent"></div>

        {/* Floating Category and Badge tags */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className={`rounded-xl bg-gradient-to-r ${getCategoryColor(course.category)} px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider`}>
            {course.category}
          </span>
          <span className="rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-200">
            {level}
          </span>
        </div>

        {tag && (
          <div className="absolute right-4 top-4">
            <span className="rounded-xl bg-indigo-400 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-md shadow-indigo-400/20">
              {tag}
            </span>
          </div>
        )}
      </div>

      {/* Course Core Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Rating and Volume */}
        <div className="flex items-center gap-3 text-xs mb-2">
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="h-4 w-4 fill-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono text-[10.5px]">
            ({course.reviewsCount} {t.ratingsReviews.split("&")[0]})
          </span>
        </div>

        {/* Title & Desc */}
        <h3 className="text-sm md:text-base font-bold text-slate-200 leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-xs text-slate-400/90 line-clamp-2 md:line-clamp-3 mb-4">
          {desc}
        </p>

        {/* Instructors Widget */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onViewInstructor?.(course.instructorName);
          }}
          className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto cursor-pointer hover:opacity-80 transition-opacity group/instructor"
          title={language === "en" ? `View ${course.instructorName}'s Profile` : `មើលប្រវត្តិរូប ${course.instructorName}`}
          id={`instructor-trigger-${course.id}`}
        >
          <img
            src={course.instructorAvatar}
            alt={course.instructorName}
            className="h-8 w-8 rounded-full border border-white/10 object-cover group-hover/instructor:border-indigo-400/50 transition-colors"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-300 group-hover/instructor:text-indigo-400 transition-colors">{course.instructorName}</span>
            <span className="text-[10px] text-slate-500 truncate max-w-[150px]">{instructorTitle}</span>
          </div>
        </div>

        {/* Stats metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="h-3.5 w-3.5 text-indigo-400" />
            <span>{course.durationHours} {t.hoursShort}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <BookOpen className="h-3.5 w-3.5 text-purple-400" />
            <span>{course.sections.reduce((acc, sec) => acc + sec.chapters.length, 0)} {t.lectures}</span>
          </div>
        </div>

        {/* Enrolled progress indicator or Sign Up bar */}
        <div className="mt-5">
          {course.enrolled ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-400">{t.learningProgress}</span>
                <span className="font-bold text-indigo-400 font-mono">{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              {course.progress === 100 ? (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onSelect(course)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 py-2.5 text-xs font-bold text-indigo-400 hover:from-indigo-500/20 hover:to-purple-500/20 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="h-4 w-4 text-indigo-400" />
                    <span>{t.viewCourse}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWriteReview?.(course);
                    }}
                    className="rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/15 px-3 py-2.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all flex items-center justify-center cursor-pointer"
                    title={language === "en" ? "Write a Review" : "សរសេរការវាយតម្លៃ"}
                    id={`review-card-btn-${course.id}`}
                  >
                    <Star className="h-4 w-4 fill-amber-400 animate-pulse" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onSelect(course)}
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 py-2.5 text-xs font-bold text-indigo-400 hover:from-indigo-500/20 hover:to-purple-500/20 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="h-4 w-4 text-indigo-400" />
                  <span>{t.viewCourse}</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => onJoin(course.id)}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-700 py-3 text-xs font-bold text-white hover:opacity-95 shadow-lg shadow-indigo-500/15 hover:shadow-indigo-400/25 transition-all text-center"
            >
              {t.notEnrolledYet}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
