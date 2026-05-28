import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  ChevronRight,
  ChevronDown,
  Clock,
  Plus,
  Trash2,
  Bookmark,
  CheckCircle,
  Video,
  ExternalLink,
  RotateCcw,
  Star
} from "lucide-react";
import { Course, Chapter, Language, CourseNote } from "../types";
import { TRANSLATIONS } from "../data";

interface VideoPlayerProps {
  course: Course;
  language: Language;
  onBack: () => void;
  notes: CourseNote[];
  onAddNote: (note: Omit<CourseNote, "id" | "createdAt" | "timestampFormatted">, formatTime: string) => void;
  onDeleteNote: (noteId: string) => void;
  onToggleChapterComplete: (courseId: string, sectionId: string, chapterId: string) => void;
  onWriteReview: (course: Course) => void;
  onViewInstructor?: (instructorName: string) => void;
}

export default function VideoPlayer({
  course,
  language,
  onBack,
  notes,
  onAddNote,
  onDeleteNote,
  onToggleChapterComplete,
  onWriteReview,
  onViewInstructor,
}: VideoPlayerProps) {
  const t = TRANSLATIONS[language];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Active Lecture Selection State
  const [activeSectionId, setActiveSectionId] = useState<string>(course.sections[0]?.id || "");
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(
    course.sections[0]?.chapters[0] || null
  );

  // Traditional HTML5 Video controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [noteText, setNoteText] = useState("");
  const [resumedMessage, setResumedMessage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    [course.sections[0]?.id]: true,
  });

  // Effect to handle video element updates when current chapter changes
  useEffect(() => {
    if (activeChapter && videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [activeChapter]);

  // Video Events
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      
      // Cache playback timestamp position to localStorage
      if (activeChapter) {
        localStorage.setItem(`studyglass_playback_${course.id}_${activeChapter.id}`, time.toString());
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const totalDur = videoRef.current.duration;
      setDuration(totalDur);

      // Restore playback timestamp position if cached
      if (activeChapter) {
        const savedTimeStr = localStorage.getItem(`studyglass_playback_${course.id}_${activeChapter.id}`);
        if (savedTimeStr) {
          const savedTime = parseFloat(savedTimeStr);
          if (!isNaN(savedTime) && savedTime > 1.5 && savedTime < totalDur - 3) {
            videoRef.current.currentTime = savedTime;
            setCurrentTime(savedTime);
            setResumedMessage(language === "en" 
              ? `Auto-resumed from ${formatSeconds(savedTime)}` 
              : `បន្តចាក់ដោយស្វ័យប្រវត្តពី ${formatSeconds(savedTime)}`
            );
            setTimeout(() => {
              setResumedMessage(null);
            }, 3500);
          }
        }
      }
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const changeSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  // Convert seconds to string clock representation (e.g. "03:45")
  const formatSeconds = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Lecture Note Handler
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !activeChapter) return;

    onAddNote(
      {
        courseId: course.id,
        chapterId: activeChapter.id,
        chapterTitle: language === "en" ? activeChapter.titleEn : activeChapter.titleKh,
        timestamp: currentTime,
        content: noteText,
      },
      formatSeconds(currentTime)
    );
    setNoteText("");
  };

  // Filter notes specific to this video classroom session
  const filteredNotes = notes.filter((n) => n.courseId === course.id);

  return (
    <div className="space-y-6">
      {/* Mini Breadcrumbs Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="text-left">
          <button
            onClick={onBack}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-all mb-1 bg-white/5 px-2.5 py-1.5 rounded-lg"
          >
            ← {t.backToHome}
          </button>
          <h2 className="text-lg md:text-xl font-bold font-sans tracking-tight text-white line-clamp-1">
            {language === "en" ? course.titleEn : course.titleKh}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {course.progress === 100 && (
            <button
              onClick={() => onWriteReview(course)}
              className="rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 px-3.5 py-1.5 flex items-center gap-1.5 hover:from-amber-500/30 hover:to-orange-500/30 shadow-lg shadow-amber-500/5 transition-all cursor-pointer"
              id="review-player-btn"
            >
              <Star className="h-3.5 w-3.5 fill-amber-300 animate-pulse" />
              <span>{language === "en" ? "Write a Review" : "សរសេរការវាយតម្លៃ"}</span>
            </button>
          )}
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 border border-white/5 font-mono">
            {t.categoryAll.split(" ")[0]} : {course.category}
          </span>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column Content (Video + details tracker) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Virtual Glass Video Deck Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050507]/20 shadow-2xl shadow-indigo-500/5">
            <div className="aspect-video w-full relative bg-black">
              {activeChapter ? (
                <video
                  ref={videoRef}
                  src={activeChapter.videoUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="h-full w-full object-contain"
                  playsInline
                  onClick={handlePlayPause}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-500 p-6">
                  Select a chapter on the syllabus hierarchy to begin streaming.
                </div>
              )}

              {/* Resumed Playback Position Notification Tag */}
              {resumedMessage && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-indigo-500/90 text-white px-3.5 py-1.5 text-[11px] font-sans font-bold shadow-lg backdrop-blur-md border border-indigo-400/30 animate-fadeIn select-none pointer-events-none">
                  <Bookmark className="h-3.5 w-3.5 fill-white animate-pulse" />
                  <span>{resumedMessage}</span>
                </div>
              )}

              {/* Minimal overlay if not playing initially */}
              {!isPlaying && activeChapter && (
                <div
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[3px] cursor-pointer group"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-white shadow-lg shadow-indigo-400/35 group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Custom Interactive Floating Glass Controls */}
            {activeChapter && (
              <div className="flex flex-col border-t border-white/5 bg-[#050507]/90 p-4 font-mono text-xs">
                {/* Custom Time Scrubber Slidertrack */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10.5px] text-slate-400 font-mono">
                    {formatSeconds(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleScrub}
                    className="w-full accent-indigo-500 bg-white/10 h-1 rounded-lg cursor-pointer appearance-none outline-none"
                  />
                  <span className="text-[10.5px] text-slate-400 font-mono">
                    {formatSeconds(duration || 0)}
                  </span>
                </div>

                {/* Primary Button Panel */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayPause}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-white shadow-md shadow-indigo-500/10 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-white" />
                      ) : (
                        <Play className="h-4 w-4 fill-white ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => seekTo(0)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 transition-all"
                      title="Rewind lesson"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>

                    <div className="text-left">
                      <p className="text-[10.5px] text-slate-400 font-bold max-w-[200px] truncate leading-none">
                        {language === "en" ? activeChapter.titleEn : activeChapter.titleKh}
                      </p>
                      <span className="text-[9px] text-indigo-400/80">
                        {language === "en" ? "Streaming via GTV Studio" : "ការផ្សាយផ្ទាល់តាម GTV Studio"}
                      </span>
                    </div>
                  </div>

                  {/* Playback speed rates switcher */}
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-500 mr-1">{t.playbackSpeed}:</span>
                    {[0.75, 1, 1.5, 2].map((sp) => (
                      <button
                        key={sp}
                        onClick={() => changeSpeed(sp)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          playbackSpeed === sp
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {sp}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description & Instructors summary card */}
          <div className="rounded-2xl p-6 glass-panel border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Video className="h-4 w-4 text-indigo-400" />
              <span>{language === "en" ? "Lecture Overview" : "ទិដ្ឋភាពទូទៅនៃមេរៀន"}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {language === "en" ? course.descriptionEn : course.descriptionKh}
            </p>

            <div 
              onClick={() => onViewInstructor?.(course.instructorName)}
              className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5 mt-4 cursor-pointer hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all group/instructor"
              title={language === "en" ? `View ${course.instructorName}'s Profile` : `មើលប្រវត្តិរូប ${course.instructorName}`}
              id="video-player-instructor-card"
            >
              <img
                src={course.instructorAvatar}
                alt={course.instructorName}
                className="h-10 w-10 rounded-full border border-white/10 object-cover group-hover/instructor:border-indigo-400/50 transition-colors"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono text-[9px] block group-hover/instructor:text-indigo-400 transition-colors">
                  {t.instructorTitle.toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-slate-200 block group-hover/instructor:text-indigo-400 transition-colors">{course.instructorName}</span>
                <span className="text-xs text-slate-400 font-medium">
                  {language === "en" ? course.instructorTitleEn : course.instructorTitleKh}
                </span>
              </div>
            </div>
          </div>

          {/* Note taking workspace */}
          <div className="rounded-2xl p-6 glass-panel border border-white/10 space-y-4">
            <form onSubmit={handleSaveNote} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4 text-purple-400 fill-purple-400/10" />
                  <span>{t.notesLabel}</span>
                </label>
                <div className="rounded bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300">
                  {language === "en" ? "Current Time" : "ពេលវេលាបច្ចុប្បន្ន"} : {formatSeconds(currentTime)}
                </div>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={t.takeANote}
                rows={3}
                className="w-full text-xs md:text-sm p-4 rounded-xl text-slate-200 glass-input placeholder:text-slate-500"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!noteText.trim() || !activeChapter}
                  className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2 px-4 shadow-lg shadow-purple-500/10 disabled:opacity-40 transition-all flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t.saveNote} {formatSeconds(currentTime)}</span>
                </button>
              </div>
            </form>

            {/* Note logs list */}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <h4 className="text-xs font-bold inline-flex items-center gap-2 text-slate-300 font-sans">
                {t.recentNotes} ({filteredNotes.length})
              </h4>

              {filteredNotes.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs">
                  {t.noNotesYet}
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="group flex gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all relative"
                    >
                      {/* Interactive Seeking Timestamp Banner */}
                      <button
                        onClick={() => seekTo(note.timestamp)}
                        className="flex-shrink-0 h-16 w-16 flex flex-col items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer font-mono"
                        title="Seek video here"
                      >
                        <Clock className="h-4 w-4 text-indigo-400 mb-0.5 animate-pulse" />
                        <span className="text-[11px] font-bold">{note.timestampFormatted}</span>
                      </button>

                      <div className="text-left flex-1 py-1">
                        <span className="text-[10px] text-slate-500 font-bold block mb-1 uppercase">
                          {note.chapterTitle}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed pr-8 line-clamp-2">
                          {note.content}
                        </p>
                      </div>

                      {/* Delete index note */}
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="absolute right-3 top-3 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer p-1 rounded-md"
                        title="Delete note"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column Content (Live Curriculum chapters structure) */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5 glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
              {t.videoChapters}
            </h3>

            {/* Total course completion metrics */}
            <div className="pb-3 border-b border-white/5 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center justify-between font-mono">
                <span>{t.learningProgress}</span>
                <span className="font-bold text-indigo-400">{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Chapters Accordion Structure */}
            <div className="space-y-3">
              {course.sections.map((section) => {
                const isExpanded = expandedSections[section.id];
                const sectionTitle = language === "en" ? section.titleEn : section.titleKh;

                return (
                  <div key={section.id} className="space-y-2">
                    {/* Header bar button */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 text-xs font-bold text-slate-200 transition-all border border-white/[0.04] text-left"
                    >
                      <span className="line-clamp-1">{sectionTitle}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0 ml-1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0 ml-1" />
                      )}
                    </button>

                    {/* Collapsible list of chapters */}
                    {isExpanded && (
                      <div className="pl-2 space-y-2">
                        {section.chapters.map((chap) => {
                          const isChapActive = activeChapter?.id === chap.id;
                          const chapTitle = language === "en" ? chap.titleEn : chap.titleKh;

                          return (
                            <div
                              key={chap.id}
                              className={`group/chap flex items-center gap-3 p-3 rounded-xl transition-all border ${
                                isChapActive
                                  ? "bg-indigo-500/5 border-indigo-400/20 text-indigo-300"
                                  : "bg-transparent border-transparent text-slate-300 hover:bg-white/[0.01]"
                              }`}
                            >
                              {/* Complete mark checkBox toggle */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleChapterComplete(course.id, section.id, chap.id);
                                }}
                                className="flex-shrink-0 text-slate-500 hover:text-indigo-400 transition-all"
                                title="Toggle complete lesson status"
                              >
                                <CheckCircle
                                  className={`h-4.5 w-4.5 ${
                                    chap.completed
                                      ? "text-indigo-400 fill-indigo-400/10"
                                      : "text-slate-600 hover:text-slate-400"
                                  }`}
                                />
                              </button>

                              {/* Chapter select body */}
                              <div
                                onClick={() => {
                                  setActiveSectionId(section.id);
                                  setActiveChapter(chap);
                                }}
                                className="flex-1 text-left cursor-pointer"
                              >
                                <span className={`text-[11.5px] font-medium leading-tight block line-clamp-2 ${isChapActive ? "font-bold text-indigo-400" : ""}`}>
                                  {chapTitle}
                                </span>
                                <span className="text-[9px] font-mono text-slate-500 block mt-0.5">
                                  {chap.duration} MINS
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
