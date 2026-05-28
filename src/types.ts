export interface Chapter {
  id: string;
  titleEn: string;
  titleKh: string;
  duration: string; // e.g. "12:45"
  videoUrl: string; // mock video URL or placeholders
  completed: boolean;
}

export interface Section {
  id: string;
  titleEn: string;
  titleKh: string;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  titleEn: string;
  titleKh: string;
  descriptionEn: string;
  descriptionKh: string;
  instructorName: string;
  instructorTitleEn: string;
  instructorTitleKh: string;
  instructorAvatar: string;
  rating: number;
  reviewsCount: number;
  durationHours: number;
  totalLectures: number;
  levelEn: "Beginner" | "Intermediate" | "Advanced";
  levelKh: "កម្រិតដំបូង" | "កម្រិតមធ្យម" | "កម្រិតខ្ពស់";
  category: string;
  thumbnail: string;
  tagEn: string;
  tagKh: string;
  enrolled: boolean;
  progress: number; // percentage
  sections: Section[];
}

export interface WeeklyActivity {
  dayEn: string;
  dayKh: string;
  hours: number;
  quizzes: number;
}

export interface StudentStats {
  learningTimeHours: number;
  coursesEnrolled: number;
  completedCourses: number;
  activeStreakDays: number;
  weeklyTargetHours: number;
  analyticsHistory: WeeklyActivity[];
}

export interface CourseNote {
  id: string;
  courseId: string;
  chapterId: string;
  chapterTitle: string;
  timestamp: number; // in seconds
  timestampFormatted: string;
  content: string;
  createdAt: string;
}

export type Language = "en" | "kh";
