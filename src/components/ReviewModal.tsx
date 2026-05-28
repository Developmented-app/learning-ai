import React, { useState } from "react";
import { Star, X, MessageSquare, PenSquare, Sparkles } from "lucide-react";
import { Course, Language } from "../types";
import { TRANSLATIONS } from "../data";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  language: Language;
  onSubmit: (courseId: string, rating: number, feedback: string) => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  course,
  language,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const title = language === "en" ? course.titleEn : course.titleKh;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError(
        language === "en"
          ? "Please select a rating between 1 and 5 stars."
          : "សូមជ្រើសរើសការវាយតម្លៃចន្លោះពី ១ ដល់ ៥ ផ្កាយ។"
      );
      return;
    }
    
    onSubmit(course.id, rating, feedback.trim());
    setFeedback("");
    setRating(5);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn" id="review-modal-backdrop">
      {/* Glass Panel Box */}
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#070b15]/95 p-6 md:p-8 shadow-2xl shadow-indigo-500/10 text-left"
        id="review-modal-container"
      >
        {/* Glow ambient circle */}
        <div className="absolute right-[-10%] top-[-10%] h-48 w-48 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute left-[-10%] bottom-[-10%] h-48 w-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400">
              <PenSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-sans tracking-tight">
                {language === "en" ? "Write a Review" : "សរសេរការវាយតម្លៃ"}
              </h3>
              <p className="text-[10.5px] text-slate-400 font-mono">
                {language === "en" ? "SHARE LEARNING FEEDBACK" : "ចែករំលែកមតិកែលម្អហ្វឹកហាត់"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            id="close-review-modal-btn"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {/* Target course info card */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3 items-center">
            <img
              src={course.thumbnail}
              alt={title}
              className="h-10 w-16 rounded-lg object-cover flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="text-[9.5px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                {language === "en" ? "Completed Curriculum" : "កម្មវិធីសិក្សាបានបញ្ចប់"}
              </span>
              <h4 className="text-xs font-bold text-slate-200 line-clamp-1 mt-0.5 leading-tight">
                {title}
              </h4>
            </div>
          </div>

          {/* Interactive Stars Row Selector */}
          <div className="space-y-2 text-center py-2">
            <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase">
              {language === "en" ? "Select Star Rating" : "ជ្រើសរើសចំនួនកម្រិតផ្កាយ"}
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 cursor-pointer transition-all hover:scale-125 focus:outline-none"
                  id={`star-btn-${star}`}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      (hoverRating !== null ? star <= hoverRating : star <= rating)
                        ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]"
                        : "text-slate-600 hover:text-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            
            {/* Contextual textual rating description */}
            <div className="h-4 text-[11px] font-mono font-bold text-indigo-400/80">
              {rating === 5 && (language === "en" ? "Perfect! Highly Recommended (5/5)" : "អស្ចារ្យណាស់! ណែនាំខ្ពស់បំផុត (៥/៥)")}
              {rating === 4 && (language === "en" ? "Great Course! Very Helpful (4/5)" : "ល្អខ្លាំងណាស់! ជំនួយបានច្រើន (៤/៥)")}
              {rating === 3 && (language === "en" ? "Good! Met My Expectations (3/5)" : "ល្អល្មម! ឆ្លើយតបការរំពឹងទុក (៣/៥)")}
              {rating === 2 && (language === "en" ? "Mediocre! Needs Improvements (2/5)" : "មធ្យម! ត្រូវការការកែលម្អបន្ថែម (២/៥)")}
              {rating === 1 && (language === "en" ? "Disappointing! Not Satisfactory (1/5)" : "ខកចិត្ត! មិនពេញចិត្តឡើយ (១/៥)")}
            </div>
          </div>

          {/* Written Feedback Form */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-slate-400 tracking-wide uppercase flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
              <span>{language === "en" ? "Write Written Review" : "សរសេរចំណាប់អារម្មណ៍ម្អិត"}</span>
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                language === "en"
                  ? "Describe your learning experience, what you built, and your feedback on the lectures..."
                  : "ពណ៌នាអំពីបទពិសោធន៍សិក្សារបស់អ្នក តើអ្នកបានផលិតអ្វីខ្លះ និងគំនិតយោបល់របស់អ្នកលើមេរៀន..."
              }
              className="w-full min-h-[90px] text-xs rounded-xl border border-white/10 bg-white/[0.01] p-3 text-slate-200 placeholder-slate-500 focus:border-indigo-400/50 focus:outline-none transition-all resize-none font-sans"
              required
              id="review-feedback-textarea"
            />
          </div>

          {error && <p className="text-red-400 text-[11px] font-semibold">{error}</p>}

          {/* Action triggers */}
          <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              id="cancel-review-btn"
            >
              {language === "en" ? "Cancel" : "បោះបង់"}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-505 from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/15 hover:opacity-95 transition-all cursor-pointer"
              id="submit-review-btn"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white animate-pulse" />
              <span>{language === "en" ? "Submit Review" : "ដាក់ស្នើការវាយតម្លៃ"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
