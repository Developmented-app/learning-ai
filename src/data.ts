import { Course, StudentStats, WeeklyActivity, CourseNote } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    titleEn: "Mastering Glassmorphism & Premium UI/UX Design",
    titleKh: "ការរចនាបថកញ្ចក់ Glassmorphism និងសិល្បៈ UI/UX កម្រិតខ្ពស់",
    descriptionEn: "Learn the core theories of glassmorphic layers, backdrops, lighting, high contrast color matching, and design beautiful web app dashboards. Ideal for modern digital designers striving for perfection.",
    descriptionKh: "ស្វែងយល់អំពីទ្រឹស្តីគ្រឹះនៃស្រទាប់កញ្ចក់ (Glassmorphic) និងចលនាពន្លឺ ការលាយពណ៌កម្រិតខ្ពស់ និងការរចនាផ្ទៃផ្ទាំងគ្រប់គ្រង (Dashboard) ដ៏ទាក់ទាញបំផុត។ ស័ក្តិសមបំផុតសម្រាប់អ្នកច្នៃប្រឌិតទាន់សម័យ។",
    instructorName: "Sophy Chanmony",
    instructorTitleEn: "Lead Product Designer at KhmerTech Innovations",
    instructorTitleKh: "ប្រធានផ្នែករចនាផលិតផលខ្មែរថេក",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 4.9,
    reviewsCount: 1420,
    durationHours: 12,
    totalLectures: 14,
    levelEn: "Intermediate",
    levelKh: "កម្រិតមធ្យម",
    category: "Design",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    tagEn: "Bestseller",
    tagKh: "ពេញនិយមបំផុត",
    enrolled: true,
    progress: 68,
    sections: [
      {
        id: "sec-1-1",
        titleEn: "Foundations of Visual Layers",
        titleKh: "គ្រឹះនៃស្រទាប់មើលឃើញ (Visual Layers)",
        chapters: [
          {
            id: "chap-1-1",
            titleEn: "Introduction to Glassmorphism Principles",
            titleKh: "សេចក្តីផ្តើមអំពីគោលការណ៍ Glassmorphism",
            duration: "04:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: true
          },
          {
            id: "chap-1-2",
            titleEn: "Mastering Backdrop Blur & Saturation in CSS",
            titleKh: "ការគ្រប់គ្រង Backdrop Blur និង Saturation ក្នុង CSS",
            duration: "08:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: true
          },
          {
            id: "chap-1-3",
            titleEn: "Managing Contrast & Underlay Lights",
            titleKh: "ការកំណត់កម្រិតពន្លឺផ្ទៃខាងក្រោយ និងសុវត្ថិភាពអក្សរ",
            duration: "12:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: true
          }
        ]
      },
      {
        id: "sec-1-2",
        titleEn: "Building Dashboard Layouts",
        titleKh: "ការស្ថាបនាប្លង់ផ្ទាំងគ្រប់គ្រង (Dashboard Content)",
        chapters: [
          {
            id: "chap-1-4",
            titleEn: "Configuring Nested Dynamic Borders & Dividers",
            titleKh: "ការកំណត់បន្ទាត់ស៊ុមឌីណាមិកចំណាំងប្លាត",
            duration: "10:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: true
          },
          {
            id: "chap-1-5",
            titleEn: "Interactive Hover States and Radial Neon Glows",
            titleKh: "ការបន្ថែមចលនា Hover និងពន្លឺ Neon ជុំវិញស៊ុម",
            duration: "15:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: false
          },
          {
            id: "chap-1-6",
            titleEn: "Responsive Grid Positioning for Glass Panels",
            titleKh: "ការកំណត់ទីតាំង Grid ឆ្លើយតបសម្រាប់ផ្ទាំងកញ្ចក់",
            duration: "09:12",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    titleEn: "Full-Stack Web Development React & Node.js",
    titleKh: "ការអភិវឌ្ឍគេហទំព័រពេញលេញ (React & Node.js)",
    descriptionEn: "Become a proficient Full-Stack developer. Master modern React architecture, server-side development with Express, and clean database integrations.",
    descriptionKh: "ក្លាយជាអ្នកសរសេរកម្មវិធីគេហទំព័រដ៏ជំនាញម្នាក់។ សិក្សាពីស្ថាបត្យកម្ម React ទំនើប ការបង្កើត API បម្រើការជាមួយ Node.js & Express និងការគ្រប់គ្រងមូលដ្ឋានទិន្នន័យ។",
    instructorName: "Dara Sovann",
    instructorTitleEn: "Senior Systems Architect at Angkor Solutions",
    instructorTitleKh: "ស្ថាបត្យករប្រព័ន្ធជាន់ខ្ពស់នៅអង្គរ Solutions",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 4.8,
    reviewsCount: 3125,
    durationHours: 36,
    totalLectures: 32,
    levelEn: "Advanced",
    levelKh: "កម្រិតខ្ពស់",
    category: "Coding",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    tagEn: "Trending",
    tagKh: "កំពុងពេញនិយម",
    enrolled: true,
    progress: 25,
    sections: [
      {
        id: "sec-2-1",
        titleEn: "Vite + React Setup with TypeScript",
        titleKh: "ការតំឡើងប្រព័ន្ធ Vite + React ជាមួយ TypeScript",
        chapters: [
          {
            id: "chap-2-1",
            titleEn: "Configuring a Modern React Project Structure",
            titleKh: "ការកំណត់រចនាសម្ព័ន្ធគម្រោង React បែបទំនើប",
            duration: "06:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: true
          },
          {
            id: "chap-2-2",
            titleEn: "Strong Typing States and Props in Components",
            titleKh: "ការវាយបញ្ចូលប្រភេទអក្សរតឹងរឹងលើ State និង Props",
            duration: "11:55",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false
          },
          {
            id: "chap-2-3",
            titleEn: "Custom Hooks for Server-side REST Polling",
            titleKh: "លំនាំបង្កើត Hook ផ្ទាល់ខ្លួនសម្រាប់ទាញទិន្នន័យពីម៉ាស៊ីនបម្រើ",
            duration: "14:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false
          }
        ]
      },
      {
        id: "sec-2-2",
        titleEn: "Restful API Integration with Express",
        titleKh: "ការតភ្ជាប់ទៅកាន់ Restful API ជាមួយ Express.js",
        chapters: [
          {
            id: "chap-2-4",
            titleEn: "Designing Route Handlers & Middleware",
            titleKh: "ការបង្កើតប្រព័ន្ធ Route Handlers និង Middleware ការពារសុវត្ថិភាព",
            duration: "12:50",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    titleEn: "Intro to Artificial Intelligence & Neural Networks",
    titleKh: "សេចក្តីផ្តើមអំពីបញ្ញាសិប្បនិម្មិត និងបណ្តាញណឺរ៉ូន",
    descriptionEn: "Unlock the mysteries of Neural Networks, Transformers, and LLMs. Acquire hands-on experience using industry standard frameworks to deploy your own models.",
    descriptionKh: "បើកអាថ៌កំបាំងអំពីបណ្តាញណឺរ៉ូនសិប្បនិម្មិត គំរូ Transformers និងប្រព័ន្ធគំរូភាសាធំៗ (LLMs)។ អនុវត្តផ្ទាល់ក្នុងការប្រើប្រាស់ Tools ពេញនិយមដើម្បីតម្លើងម៉ូដែលផ្ទាល់ខ្លួនរបស់អ្នក។",
    instructorName: "Vatana Pich",
    instructorTitleEn: "AI Research Scientist",
    instructorTitleKh: "អ្នកស្រាវជ្រាវវិទ្យាសាស្ត្រ AI",
    instructorAvatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
    rating: 4.7,
    reviewsCount: 840,
    durationHours: 18,
    totalLectures: 18,
    levelEn: "Beginner",
    levelKh: "កម្រិតដំបូង",
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600",
    tagEn: "Popular",
    tagKh: "ល្បីល្បាញ",
    enrolled: false,
    progress: 0,
    sections: [
      {
        id: "sec-3-1",
        titleEn: "Understanding Intelligence Systems",
        titleKh: "ការយល់ដឹងអំពីប្រព័ន្ធវៃឆ្លាត",
        chapters: [
          {
            id: "chap-3-1",
            titleEn: "Neural Activation, Neurons and Layers",
            titleKh: "ដំនើរការដំណើរការនៃណឺរ៉ូន និងស្រទាប់បណ្តាញ",
            duration: "10:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            completed: false
          },
          {
            id: "chap-3-2",
            titleEn: "How Deep Learning Optimization Solves Complexities",
            titleKh: "របៀបដោះស្រាយភាពស្មុគស្មាញដោយប្រើ Deep Learning",
            duration: "14:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    titleEn: "Digital Marketing & Branding in Cambodia",
    titleKh: "ទីផ្សារឌីជីថល និងយុទ្ធសាស្ត្រកសាងម៉ាកយីហោនៅកម្ពុជា",
    descriptionEn: "Master localized SEO, content marketing tactics, social media channel positioning, and user acquisition strategies tailored specifically for the fast-growing Cambodian market ecosystem.",
    descriptionKh: "យល់ដឹងពីការធ្វើ SEO ក្នុងស្រុក យុទ្ធសាស្ត្រទីផ្សារមាតិកា ការប្រើប្រាស់បណ្តាញសង្គមឱ្យចំគោលដៅ និងវិធីសាស្ត្រទាក់ទាញអតិថិជនផ្សេងៗដែលរៀបចំឡើងជាពិសេសសម្រាប់ទីផ្សារកម្ពុជា។",
    instructorName: "Samnang Roth",
    instructorTitleEn: "Branding Consultant & Agency Director",
    instructorTitleKh: "អ្នកពិគ្រោះយុទ្ធសាស្ត្រម៉ាកយីហោ និងជានាយកទីភ្នាក់ងារ",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: 4.9,
    reviewsCount: 1950,
    durationHours: 15,
    totalLectures: 20,
    levelEn: "Beginner",
    levelKh: "កម្រិតដំបូង",
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    tagEn: "Premium Choice",
    tagKh: "ជម្រើសកម្រិតពិសេស",
    enrolled: false,
    progress: 0,
    sections: [
      {
        id: "sec-4-1",
        titleEn: "Foundational Localization",
        titleKh: "គ្រឹះនៃការធ្វើទីផ្សារតាមតំបន់",
        chapters: [
          {
            id: "chap-4-1",
            titleEn: "Introduction to Localized Target Personas",
            titleKh: "សេចក្តីផ្តើមអំពីការស្វែងយល់ពីអតិថិជនគោលដៅខ្មែរ",
            duration: "08:12",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            completed: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_STATS: StudentStats = {
  learningTimeHours: 18.5,
  coursesEnrolled: 2,
  completedCourses: 1,
  activeStreakDays: 5,
  weeklyTargetHours: 25,
  analyticsHistory: [
    { dayEn: "Mon", dayKh: "ចន្ទ", hours: 2.8, quizzes: 1 },
    { dayEn: "Tue", dayKh: "អង្គារ", hours: 4.2, quizzes: 2 },
    { dayEn: "Wed", dayKh: "ពុធ", hours: 1.5, quizzes: 0 },
    { dayEn: "Thu", dayKh: "ព្រហស្បតិ៍", hours: 3.6, quizzes: 3 },
    { dayEn: "Fri", dayKh: "សុក្រ", hours: 5.0, quizzes: 2 },
    { dayEn: "Sat", dayKh: "សៅរ៍", hours: 1.4, quizzes: 1 },
    { dayEn: "Sun", dayKh: "អាទិត្យ", hours: 0.0, quizzes: 0 }
  ]
};

export const INITIAL_NOTES: CourseNote[] = [
  {
    id: "note-1",
    courseId: "course-1",
    chapterId: "chap-1-1",
    chapterTitle: "Introduction to Glassmorphism Principles",
    timestamp: 45,
    timestampFormatted: "00:45",
    content: "Glassmorphism highlights layered hierarchies using high-contrast borders and generous backdrop-blur properties. Crucial to limit overlay elements.",
    createdAt: "2026-05-25"
  },
  {
    id: "note-2",
    courseId: "course-1",
    chapterId: "chap-1-2",
    chapterTitle: "Mastering Backdrop Blur & Saturation in CSS",
    timestamp: 152,
    timestampFormatted: "02:32",
    content: "Use backdrop-filter: blur(16px) with saturate(180%) for ultimate contrast against dark glowing radial gradients. Ensure contrast ratios support easy reading.",
    createdAt: "2026-05-26"
  }
];

export const TRANSLATIONS = {
  en: {
    appTitle: "StudyGlass Platform",
    tagline: "Sleek, transparent, modern education system.",
    searchPlaceholder: "Search for tech, business, and design skills...",
    exploreCourses: "Explore Courses",
    myDashboard: "Learning Analytics",
    switchLanguage: "ភាសាខ្មែរ",
    categoryAll: "All Categories",
    categoryDesign: "UI/UX Design",
    categoryCoding: "Coding",
    categoryAI: "Artificial Intelligence",
    categoryMarketing: "Digital Marketing",
    hoursStudied: "Hours Studied",
    coursesJoined: "Courses Enrolled",
    completedState: "Completed Courses",
    activeStreak: "Daily Streak",
    weeklyGoal: "Weekly Study Target",
    resumeCourse: "Resume Learning",
    enrolledCoursesTitle: "Your Active Journey",
    recommendedTitle: "Explore High-Quality Curriculum",
    lectures: "Lectures",
    hoursShort: "hrs",
    levelLabel: "Level",
    learningProgress: "Learning Progress",
    notEnrolledYet: "Join Class",
    enrolledSuccesfully: "Enrolled Successfully!",
    startCourse: "Start Learning",
    viewCourse: "View Interface",
    backToHome: "Back to Catalog",
    notesLabel: "Lecture Notes",
    takeANote: "Write a note here...",
    saveNote: "Save Note at",
    recentNotes: "Your Chapter Notes",
    noNotesYet: "No notes added for this section yet.",
    videoChapters: "Course Syllabus",
    markCompleted: "Mark Lesson Done",
    playbackSpeed: "Speed",
    analyticsTitle: "Detailed Study Logs",
    analyticsSubtitle: "Monitored study duration and quiz records this week.",
    recentLessonsWatched: "Recently Completed Lessons",
    totalStudyHours: "Total Study Volume",
    hoursProgress: "Hours Tracked",
    weeklyTargetHeading: "Target Progress Summary",
    congratsMessage: "You're 74% towards your weekly goal! Keep maintaining your continuous streak.",
    achievementsHeading: "Earned Badges",
    certUnlocked: "Glass Professional Certified",
    certDesc: "Completed foundations course on high contrast layer designing.",
    completedStateVerb: "Completed",
    notesDeleted: "Note removed.",
    notesSaved: "Note recorded at specific timeframe.",
    searchResult: "found catalog matches",
    noCoursesFound: "No courses matched your query.",
    instructorTitle: "Instructor Portfolio",
    activeClassHeading: "Video Classroom Mode",
    viewDashboardButton: "Open Analytics Dashboard",
    exploreButton: "Open Course Catalog",
    ratingsReviews: "Rating & Reviews"
  },
  kh: {
    appTitle: "សិក្សាកញ្ចក់ - StudyGlass",
    tagline: "ប្រព័ន្ធអប់រំទំនើប ប្រកបដោយតម្លាភាព ភាពច្បាស់លាស់ និងភាពងាយស្រួល។",
    searchPlaceholder: "ស្វែងរកវគ្គសិក្សាបច្ចេកវិទ្យា ធុរកិច្ច និងការរចនា...",
    exploreCourses: "ស្វែងរកវគ្គសិក្សា",
    myDashboard: "ស្ថិតិការសិក្សា",
    switchLanguage: "English",
    categoryAll: "ប្រភេទទាំងអស់",
    categoryDesign: "រចនា UI/UX",
    categoryCoding: "សរសេរកូដ",
    categoryAI: "បញ្ញាសិប្បនិម្មិត",
    categoryMarketing: "ទីផ្សារឌីជីថល",
    hoursStudied: "ម៉ោងសិក្សាសរុប",
    coursesJoined: "វគ្គសិក្សាកំពុងរៀន",
    completedState: "វគ្គសិក្សាដែលបានបញ្ចប់",
    activeStreak: "ថ្ងៃសិក្សាបន្តបន្ទាប់",
    weeklyGoal: "គោលដៅប្រចាំសប្តាហ៍",
    resumeCourse: "បន្តការសិក្សា",
    enrolledCoursesTitle: "ដំណើរការសិក្សារបស់អ្នក",
    recommendedTitle: "ស្វែងយល់ពីកម្មវិធីសិក្សាលំដាប់ថ្នាក់ខ្ពស់",
    lectures: "មេរៀន",
    hoursShort: "ម៉ោង",
    levelLabel: "កម្រិតសិក្សា",
    learningProgress: "វឌ្ឍនភាពនៃការរៀនសូត្រ",
    notEnrolledYet: "ចុះឈ្មោះចូលរៀន",
    enrolledSuccesfully: "បានចុះឈ្មោះដោយជោគជ័យ!",
    startCourse: "ចាប់ផ្តើមរៀន",
    viewCourse: "ចូលផ្ទាំងសិក្សា",
    backToHome: "ត្រលប់ទៅកាន់កាតាឡុក",
    notesLabel: "កំណត់ត្រាកត់ចំណាំមេរៀន",
    takeANote: "សរសេរកំណត់ចំណាំរបស់អ្នកនៅទីនេះ...",
    saveNote: "រក្សាទុកកំណត់ត្រានៅ",
    recentNotes: "កំណត់ត្រាប្រចាំជំពូករបស់អ្នក",
    noNotesYet: "មិនទាន់មានកំណត់ត្រាសម្រាប់ផ្នែកនេះទេ។",
    videoChapters: "មាតិកាកម្មវិធីសិក្សា",
    markCompleted: "សម្គាល់ថារៀនរួចរាល់",
    playbackSpeed: "ល្បឿនចាក់",
    analyticsTitle: "របាយការណ៍សិក្សា تفصیلی",
    analyticsSubtitle: "តាមដានរយៈពេលសិក្សា និងកំណត់ត្រាតេស្តល្បងសមត្ថភាពប្រចាំសប្តាហ៍។",
    recentLessonsWatched: "មេរៀនដែលបានរៀនចប់ថ្មីៗ",
    totalStudyHours: "បរិមាណសិក្សាសរុប",
    hoursProgress: "ម៉ោងបានតាមដាន",
    weeklyTargetHeading: "សង្ខេបវឌ្ឍនភាពគោលដៅ",
    congratsMessage: "អ្នកសម្រេចបាន៧៤% នៃគោលដៅប្រចាំសប្តាហ៍ហើយ! សូមបន្តរក្សានូវទម្លាប់រៀនរាល់ថ្ងៃរបស់អ្នក។",
    achievementsHeading: "មេដាយស្នាដៃដែលទទួលបាន",
    certUnlocked: "វិញ្ញាបនបត្រជំនាញ Glass Graphics",
    certDesc: "បានបញ្ចប់វគ្គសិក្សាគ្រឹះស្តីពីការរចនាម៉ូដស្រទាប់កញ្ចក់គុណភាពខ្ពស់។",
    completedStateVerb: "បានបញ្ចប់",
    notesDeleted: "បានលុបកំណត់ត្រា។",
    notesSaved: "បានរក្សាទុកកំណត់ត្រានៅពេលវេលាជាក់លាក់។",
    searchResult: "វគ្គសិក្សាត្រូវបានរកឃើញ",
    noCoursesFound: "រកមិនឃើញវគ្គសិក្សាដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។",
    instructorTitle: "ប្រវត្តិគ្រូបង្រៀន",
    activeClassHeading: "បន្ទប់រៀនវីដេអូកម្រិតច្បាស់",
    viewDashboardButton: "បើកផ្ទាំងគ្រប់គ្រងការសិក្សា",
    exploreButton: "ស្វែងរកវគ្គសិក្សាទាំងអស់",
    ratingsReviews: "ការវាយតម្លៃ និងចំណាប់អារម្មណ៍"
  }
};
