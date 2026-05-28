import React, { useState } from "react";
import { BookOpen, GraduationCap, Grid, Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { MOCK_COURSES, INITIAL_STATS, TRANSLATIONS, INITIAL_NOTES } from "./data";
import { Course, Language, StudentStats, CourseNote, Chapter } from "./types";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import VideoPlayer from "./components/VideoPlayer";
import Dashboard from "./components/Dashboard";
import ReviewModal from "./components/ReviewModal";
import InstructorModal from "./components/InstructorModal";

export default function App() {
  // Navigation & Localization States
  const [language, setLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<string>("explore");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviewingCourse, setReviewingCourse] = useState<Course | null>(null);
  const [viewingInstructorName, setViewingInstructorName] = useState<string | null>(null);

  // Search & Filtration States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Domain Dynamic/Cached States loaded from localStorage
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("studyglass_courses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse cached courses:", err);
      }
    }
    return MOCK_COURSES;
  });

  const [stats, setStats] = useState<StudentStats>(() => {
    const saved = localStorage.getItem("studyglass_stats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse cached stats:", err);
      }
    }
    return INITIAL_STATS;
  });

  const [notes, setNotes] = useState<CourseNote[]>(() => {
    const saved = localStorage.getItem("studyglass_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to parse cached notes:", err);
      }
    }
    return INITIAL_NOTES;
  });

  const [showToast, setShowToast] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Translation helpers
  const t = TRANSLATIONS[language];

  // Auto-caching state synchronizers
  React.useEffect(() => {
    localStorage.setItem("studyglass_courses", JSON.stringify(courses));
  }, [courses]);

  React.useEffect(() => {
    localStorage.setItem("studyglass_stats", JSON.stringify(stats));
  }, [stats]);

  React.useEffect(() => {
    localStorage.setItem("studyglass_notes", JSON.stringify(notes));
  }, [notes]);

  // Network connection status tracker
  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerToast(
        language === "en" 
          ? "Network restored! Online synchronization active." 
          : "អ៊ីនធឺណិតត្រូវបានភ្ជាប់ឡើងវិញ! ការសំរួលទិន្នន័យអនឡាញសកម្ម។"
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      triggerToast(
        language === "en" 
          ? "Network unstable or disconnected. Running in Cached Offline Mode." 
          : "បណ្តាញអ៊ីនធឺណិតមិនស្ថិតស្ថេរ ឬដាច់។ កំពុងដំណើរការក្នុងរបៀបរក្សាទុកក្រៅបណ្តាញ។"
      );
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [language]);

  // Quick Action: Enroll / Join Course
  const handleEnrollCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          triggerToast(language === "en" ? `Joined Class: ${course.titleEn}` : `បានចូលរួមថ្នាក់រៀន៖ ${course.titleKh}`);
          return {
            ...course,
            enrolled: true,
            progress: 0,
          };
        }
        return course;
      })
    );

    // Update global enrollment stats count
    setStats((prevStats) => ({
      ...prevStats,
      coursesEnrolled: prevStats.coursesEnrolled + 1,
    }));
  };

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  // Select active course to view in classroom
  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab("learn");
  };

  // Switch back to learning classroom
  const handleResumeActiveVideo = () => {
    if (selectedCourse) {
      setActiveTab("learn");
    } else {
      // If no course explicitly loaded, load the first enrolled course
      const firstEnrolled = courses.find((c) => c.enrolled);
      if (firstEnrolled) {
        setSelectedCourse(firstEnrolled);
        setActiveTab("learn");
      } else {
        triggerToast(language === "en" ? "Join a course from catalog first!" : "សូមចុះឈ្មោះចូលរៀនជាមុនសិន!");
      }
    }
  };

  // Chapter Lesson Done Switcher handler
  const handleToggleChapterComplete = (
    courseId: string,
    sectionId: string,
    chapterId: string
  ) => {
    let updatedProgress = 0;
    
    // 1. Update Chapters Completeness
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        // Map sections
        const updatedSections = course.sections.map((section) => {
          if (section.id === sectionId) {
            const updatedChapters = section.chapters.map((chap) => {
              if (chap.id === chapterId) {
                const toggledState = !chap.completed;
                
                // Add study telemetry stats when marked done
                if (toggledState) {
                  setStats((prevStats) => {
                    const currentDayNameEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date().getDay()];
                    
                    // Add 0.8 hours to matching day
                    const updatedHistory = prevStats.analyticsHistory.map((dayItem) => {
                      if (dayItem.dayEn === currentDayNameEn) {
                        return {
                          ...dayItem,
                          hours: parseFloat((dayItem.hours + 0.8).toFixed(1)),
                        };
                      }
                      return dayItem;
                    });

                    return {
                      ...prevStats,
                      learningTimeHours: parseFloat((prevStats.learningTimeHours + 0.8).toFixed(1)),
                      analyticsHistory: updatedHistory,
                    };
                  });
                  triggerToast(language === "en" ? "Progress Saved! +0.8 study hours recorded." : "វឌ្ឍនភាពត្រូវបានកត់ត្រា! +០.៨ ម៉ោងសិក្សាត្រូវបានសន្សំ។");
                }
                
                return { ...chap, completed: toggledState };
              }
              return chap;
            });
            return { ...section, chapters: updatedChapters };
          }
          return section;
        });

        // Compute total chapters & completed ones
        const allChapters = updatedSections.flatMap((s) => s.chapters);
        const totalCount = allChapters.length;
        const completedCount = allChapters.filter((c) => c.completed).length;
        updatedProgress = Math.round((completedCount / totalCount) * 100);

        const isFullyDoneNow = updatedProgress === 100 && course.progress < 100;

        if (isFullyDoneNow) {
          triggerToast(
            language === "en" 
              ? `🎉 Perfect! Completed "${course.titleEn}" and earned your credentials!` 
              : `🎉 អស្ចារ្យណាស់! អ្នកបានបញ្ចប់វគ្គ "${course.titleKh}" ទាំងស្រុងហើយ!`
          );
        }

        return {
          ...course,
          sections: updatedSections,
          progress: updatedProgress,
        };
      }
      return course;
    });

    setCourses(updatedCourses);

    // Sync active course to prevent visual state drift
    const activeCourseSync = updatedCourses.find((c) => c.id === courseId);
    if (activeCourseSync) {
      setSelectedCourse(activeCourseSync);
    }
  };

  // Add contextual video note
  const handleAddNote = (
    newNoteData: Omit<CourseNote, "id" | "createdAt" | "timestampFormatted">,
    formatTime: string
  ) => {
    const freshNote: CourseNote = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      timestampFormatted: formatTime,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setNotes((prevNotes) => [freshNote, ...prevNotes]);
    triggerToast(t.notesSaved);
  };

  // Delete video note
  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId));
    triggerToast(t.notesDeleted);
  };

  // Submit course review and update rating math averages
  const handleReviewSubmit = (courseId: string, ratingValue: number, textFeedback: string) => {
    setCourses((prevCourses) => {
      const updated = prevCourses.map((course) => {
        if (course.id === courseId) {
          const totalPoints = course.rating * course.reviewsCount;
          const newReviewsCount = course.reviewsCount + 1;
          const newRating = (totalPoints + ratingValue) / newReviewsCount;
          
          triggerToast(
            language === "en"
              ? `Review added! Course rating is now ${newRating.toFixed(2)} ★`
              : `ការវាយតម្លៃត្រូវបានរក្សាទុក! កម្រិតវាយតម្លៃមធ្យមបច្ចុប្បន្នគឺ ${newRating.toFixed(2)} ★`
          );
          
          return {
            ...course,
            rating: parseFloat(newRating.toFixed(2)),
            reviewsCount: newReviewsCount,
          };
        }
        return course;
      });

      // Maintain direct selection synchronization
      const activeMatch = updated.find((c) => c.id === courseId);
      if (activeMatch && selectedCourse && selectedCourse.id === courseId) {
        setSelectedCourse(activeMatch);
      }

      return updated;
    });
  };

  // Course Filter & Search Matcher
  const filteredCourses = courses.filter((course) => {
    const titleMatch =
      course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.titleKh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      selectedCategory === "All" || course.category === selectedCategory;

    return titleMatch && categoryMatch;
  });

  // Unique categories helper
  const categoriesList = ["All", "Design", "Coding", "AI", "Marketing"];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "All":
        return t.categoryAll;
      case "Design":
        return t.categoryDesign;
      case "Coding":
        return t.categoryCoding;
      case "AI":
        return t.categoryAI;
      case "Marketing":
        return t.categoryMarketing;
      default:
        return cat;
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation Left Panel */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        activeCourseId={selectedCourse ? selectedCourse.id : null}
        resumeActiveVideo={handleResumeActiveVideo}
        streak={stats.activeStreakDays}
      />

      {/* Main Body Section */}
      <div className="flex-1 flex flex-col pb-24 md:pb-6">
        
        {/* Dynamic Global Header (Search, Language Switcher, Profile avatar) */}
        <Header
          language={language}
          setLanguage={setLanguage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          studentEmail="maisieclarke641@gmail.com"
          isOnline={isOnline}
        />

        {/* Global Floating Glass Banner Toasts */}
        {showToast && (
          <div className="fixed bottom-24 right-6 z-50 animate-slideUp">
            <div className="rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-indigo-500/30 px-5 py-3.5 shadow-2xl shadow-indigo-400/20 text-xs text-indigo-300 font-semibold flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400 fill-indigo-400/10 animate-spin" />
              <span>{showToast}</span>
            </div>
          </div>
        )}

        {/* View Routing Node Section */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* TAP A: Explore / Course Catalog Browse */}
          {activeTab === "explore" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Premium Hero Promo Section with fine border glows & glass panels */}
              <div className="relative overflow-hidden rounded-3xl glass-panel p-6 md:p-10 text-left border border-white/10 shadow-2xl">
                {/* Backlighting effect */}
                <div className="absolute right-[-10%] top-[-20%] h-80 w-80 bg-indigo-500/10 blur-[130px] rounded-full"></div>
                <div className="absolute left-[-5%] bottom-[-20%] h-60 w-60 bg-purple-500/10 blur-[110px] rounded-full"></div>

                <div className="max-w-2xl relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-400/10 border border-indigo-400/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    <span>{language === "en" ? "VIP ACCREDITED EDUCATION" : "វិញ្ញាបនបត្រទទួលស្គាល់កម្រិតខ្ពស់"}</span>
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-extrabold font-sans tracking-tight text-white leading-tight">
                    {language === "en" ? "Unlock Creative Capabilities with Glass Architecture Design" : "អភិវឌ្ឍសមត្ថភាពច្នៃប្រឌិតរបស់អ្នកជាមួយប្រព័ន្ធសិក្សាឌីជីថលទំនើប"}
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400/90 leading-relaxed">
                    {t.tagline}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold font-sans text-xs py-3 px-6 hover:opacity-95 shadow-md shadow-indigo-400/10 hover:shadow-indigo-400/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <GraduationCap className="h-5 w-5 text-white" />
                      <span>{t.viewDashboardButton}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Catalog Title & Filtration pill boxes */}
              <div className="space-y-5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">
                      {t.recommendedTitle}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {filteredCourses.length} {t.searchResult}
                    </p>
                  </div>

                  {/* Horizontal Category Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                    <SlidersHorizontal className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                    {categoriesList.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-400/10"
                            : "bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white"
                        }`}
                      >
                        {getCategoryLabel(cat)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid layout of courses */}
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16 rounded-3xl bg-white/[0.01] border border-white/5">
                    <p className="text-slate-400 text-sm">{t.noCoursesFound}</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="mt-3 text-xs text-indigo-400 hover:underline"
                    >
                      Reset Catalog Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        language={language}
                        onJoin={handleEnrollCourse}
                        onSelect={handleSelectCourse}
                        onWriteReview={setReviewingCourse}
                        onViewInstructor={setViewingInstructorName}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAP B: Student Analytics Analytics Tab */}
          {activeTab === "dashboard" && (
            <Dashboard
              stats={stats}
              enrolledCourses={courses.filter((c) => c.enrolled)}
              language={language}
              onExploreClick={() => setActiveTab("explore")}
              onResumeClick={handleSelectCourse}
              onWriteReview={setReviewingCourse}
            />
          )}

          {/* TAP C: Video Learning Classroom */}
          {activeTab === "learn" && selectedCourse && (
            <VideoPlayer
              course={selectedCourse}
              language={language}
              onBack={() => setActiveTab("explore")}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onToggleChapterComplete={handleToggleChapterComplete}
              onWriteReview={setReviewingCourse}
              onViewInstructor={setViewingInstructorName}
            />
          )}

        </main>
      </div>

      {/* Write a Review Interaction Panel */}
      {reviewingCourse && (
        <ReviewModal
          isOpen={!!reviewingCourse}
          onClose={() => setReviewingCourse(null)}
          course={reviewingCourse}
          language={language}
          onSubmit={handleReviewSubmit}
        />
      )}

      {/* Instructor Profile Portfolio Modal */}
      {viewingInstructorName && (
        <InstructorModal
          isOpen={!!viewingInstructorName}
          onClose={() => setViewingInstructorName(null)}
          instructorName={viewingInstructorName}
          allCourses={courses}
          language={language}
        />
      )}
    </div>
  );
}
