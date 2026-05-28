import React from "react";
import { X, Award, Users, BookOpen, Star, Mail, Briefcase, Heart, Cpu } from "lucide-react";
import { Course, Language } from "../types";
import { TRANSLATIONS } from "../data";

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructorName: string;
  allCourses: Course[];
  language: Language;
}

interface InstructorDetails {
  name: string;
  titleEn: string;
  titleKh: string;
  avatar: string;
  bioEn: string;
  bioKh: string;
  philosophyEn: string;
  philosophyKh: string;
  studentsCount: string;
  experienceYears: number;
  ratingAverage: number;
}

const INSTRUCTOR_DATA: Record<string, InstructorDetails> = {
  "Sophy Chanmony": {
    name: "Sophy Chanmony",
    titleEn: "Lead Product Designer at KhmerTech Innovations",
    titleKh: "ប្រធានផ្នែករចនាផលិតផលខ្មែរថេក",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    bioEn: "Sophy is an award-winning UI/UX designer with over 8 years of experience building beautiful, responsive product interfaces. She has worked with global tech giants and national initiatives, focusing on establishing solid design tokens and immersive user experiences within modern web applications. Her signature style is 'Reflective Elegance' utilizing lightweight glass levels.",
    bioKh: "កញ្ញា សុភី គឺជាអ្នករចនា UI/UX ឈ្នះពានរង្វាន់ដែលមានបទពិសោធន៍ជាង ៨ ឆ្នាំក្នុងការបង្កើតចំណុចប្រទាក់ផលិតផលដ៏ស្រស់ស្អាត និងឆ្លើយតបយ៉ាងល្អ។ នាងបានធ្វើការជាមួយក្រុមហ៊ុនបច្ចេកវិទ្យាយក្សលំដាប់ពិភពលោក និងគំនិតផ្តួចផ្តើមថ្នាក់ជាតិ ដោយផ្តោតលើការបង្កើត design tokens រឹងមាំ និងបទពិសោធន៍អ្នកប្រើប្រាស់ដ៏ស៊ីជម្រៅក្នុងកម្មវិធីបណ្ដាញទំនើប។ ស្ទីលលេចធ្លោរបស់នាងគឺ 'ភាពឆើតឆាយឆ្លុះបញ្ចាំង' ដោយប្រើប្រាស់ស្រទាប់កញ្ចក់ទម្ងន់ស្រាល។",
    philosophyEn: "Design is not just what it looks like and feels like. Design is how it works. By emphasizing clear visual hierarchy and predictable interface physics, we empower the user with instant clarity and calm interactive flow.",
    philosophyKh: "ការរចនាមិនត្រឹមតែជាអ្វីដែលមើលទៅឃើញ ឬមានអារម្មណ៍ប៉ះពាល់ប៉ុណ្ណោះទេ។ ការរចនាគឺអំពីរបៀបដែលវាដំណើរការ។ តាមរយៈការសង្កត់ធ្ងន់លើឋានានុក្រមដែលមើលឃើញច្បាស់លាស់ និងរូបវិទ្យាចំណុចប្រទាក់ដែលងាយស្មានទុកជាមុន យើងផ្តល់អំណាចដល់អ្នកប្រើប្រាស់នូវភាពច្បាស់លាស់ភ្លាមៗ និងរំហូរអន្តរកម្មដ៏ស្ងប់ស្ងាត់។",
    studentsCount: "12,450+",
    experienceYears: 8,
    ratingAverage: 4.9,
  },
  "Dara Sovann": {
    name: "Dara Sovann",
    titleEn: "Senior Systems Architect at Angkor Solutions",
    titleKh: "ស្ថាបត្យករប្រព័ន្ធជាន់ខ្ពស់នៅអង្គរ Solutions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    bioEn: "Dara is a passionate software engineer specializing in scalable system design and high-performance server architectures. Having led core database refactors for telemetry log networks and financial frameworks across Southeast Asia, Dara brings real-world enterprise engineering insights to developer education. He is highly proficient in TypeScript, Node.js, and multi-tenant Docker setups.",
    bioKh: "លោក ដារ៉ា គឺជាវិស្វករកម្មវិធីដ៏ងប់ងល់ម្នាក់ដែលមានឯកទេសក្នុងការរចនាប្រព័ន្ធដែលអាចពង្រីកបាន និងស្ថាបត្យកម្មម៉ាស៊ីនបម្រើដែលមានប្រសិទ្ធិភាពខ្ពស់។ ដោយបានដឹកនាំការកែលម្អមូលដ្ឋានទិន្នន័យស្នូលសម្រាប់បណ្តាញ telemetry logs និងប្រព័ន្ធហិរញ្ញវត្ថុទូទាំងអាស៊ីអាគ្នេយ៍ ដារ៉ានាំមកនូវការយល់ដឹងអំពីវិស្វកម្មសហគ្រាសជាក់ស្តែងដល់ការអប់រំអ្នកអភិវឌ្ឍន៍។ លោកមានជំនាញខ្ពស់ក្នុង TypeScript, Node.js, និងការរៀបចំ multi-tenant Docker។",
    philosophyEn: "Keep systems simple, predictable, and strongly typed. A robust application layer is built by anticipating edge cases and keeping module dependencies strictly isolated and highly cohesive.",
    philosophyKh: "រក្សាប្រព័ន្ធឱ្យសាមញ្ញ អាចទស្សន៍ទាយបាន និងមានប្រភេទត្រឹមត្រូវតឹងរឹង (Strongly Typed)។ ស្រទាប់កម្មវិធីដ៏រឹងមាំត្រូវបានបង្កើតឡើងដោយការរំពឹងទុកលើបញ្ហាស្មុគស្មាញជាមុន និងរក្សាការពឹងផ្អែករបស់ម៉ូឌុលនីមួយៗឱ្យនៅដាច់ដោយឡែកពីគ្នា និងមានវិន័យខ្ពស់។",
    studentsCount: "24,800+",
    experienceYears: 11,
    ratingAverage: 4.8,
  },
  "Vatana Pich": {
    name: "Vatana Pich",
    titleEn: "AI Research Scientist & Neural Network Specialist",
    titleKh: "អ្នកស្រាវជ្រាវវិទ្យាសាស្ត្រ AI & ឯកទេសបណ្តាញណឺរ៉ូន",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
    bioEn: "Dr. Vatana Pich is a pioneer in localized machine learning algorithms and neural translation tools in Cambodia. Focusing on large language model fine-tuning processes and visual computer-vision integration, his research has been published in prestige global AI directories. He translates complex academic AI mathematics into practical, hands-on tutorials.",
    bioKh: "បណ្ឌិត វឌ្ឍនៈ ពេជ្រ គឺជាអ្នកត្រួសត្រាយផ្លូវក្នុងការបង្កើតក្បួនដោះស្រាយម៉ាស៊ីនរៀន (Machine Learning) តាមមូលដ្ឋាន និងឧបករណ៍បកប្រែណឺរ៉ូននៅកម្ពុជា។ ដោយផ្តោតលើដំណើរការ fine-tuning នៃគំរូភាសាធំៗ និងការរួមបញ្ចូលចក្ខុវិស័យកុំព្យូទ័រ (Computer-Vision) ការស្រាវជ្រាវរបស់គាត់ត្រូវបានចុះផ្សាយក្នុងទិនានុប្បវត្តិ AI ល្បីៗលើពិភពលោក។ គាត់បកប្រែគណិតវិទ្យា AI បែបការសិក្សាស្មុគស្មាញទៅជាមេរៀនអនុវត្តជាក់ស្តែង ងាយយល់។",
    philosophyEn: "Intelligence is the ultimate frontier. Mastering artificial intelligence requires understanding the basic weight optimizations and gradients, then using them to build tools that solve genuine local societal problems.",
    philosophyKh: "បញ្ញាគឺជាព្រំដែនចុងក្រោយបង្អស់។ ការស្ទាត់ជំនាញបញ្ញាសិប្បនិម្មិត តម្រូវឱ្យយល់ដឹងពីការបង្កើនប្រសិទ្ធភាពទម្ងន់ (Weight Optimizations) និងជម្រាល (Gradients) មូលដ្ឋាន រួចប្រើប្រាស់វាដើម្បីបង្កើតឧបករណ៍ដែលដោះស្រាយបញ្ហាសង្គមជាក់ស្តែងនៅក្នុងតំបន់។",
    studentsCount: "8,920+",
    experienceYears: 6,
    ratingAverage: 4.7,
  },
  "Samnang Roth": {
    name: "Samnang Roth",
    titleEn: "Branding Consultant & Agency Director",
    titleKh: "អ្នកពិគ្រោះយុទ្ធសាស្ត្រម៉ាកយីហោ និងជានាយកទីភ្នាក់ងារ",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    bioEn: "Samnang is a branding maestro who has accelerated growth parameters for over 50 prominent national brands. He specializes in market positioning, localized search engine optimization campaigns, target demographic profiling, and organic growth hacks tailored to the thriving digital landscape of Cambodia.",
    bioKh: "លោក សំណាង គឺជាអ្នកជំនាញកសាងម៉ាកយីហោដ៏ឆ្នើមម្នាក់ ដែលបានជម្រុញការលូតលាស់នៃម៉ាកល្បីៗលំដាប់ជាតិជាង ៥០។ លោកមានជំនាញច្បាស់លាស់ក្នុងការស្វែងរកទីតាំងទីផ្សារ យុទ្ធនាការទាញចំណាប់អារម្មណ៍ SEO ក្នុងស្រុក ការចងក្រងប្រវត្តិជនគោលដៅ និងយុទ្ធសាស្ត្រលូតលាស់ដោយធម្មជាតិដែលរៀបចំសម្រាប់ទិដ្ឋភាពឌីជីថលកំពុងអភិវឌ្ឍន៍នៅកម្ពុជា។",
    philosophyEn: "A brand is not a logo; it is a promise. Connect with your audience by telling authentic stories that respect and reflect local cultural values and structural market trends.",
    philosophyKh: "ម៉ាកយីហោមិនមែនជាឡូហ្គោនោះទេ វាគឺជាការសន្យាមួយ។ តភ្ជាប់ទំនាក់ទំនងជាមួយទស្សនិកជនរបស់អ្នកដោយនិទានរឿងរ៉ាវពិតប្រាកដដែលគោរព និងឆ្លុះបញ្ចាំងពីតម្លៃវប្បធម៌ក្នុងស្រុក និងនិន្នាការទីផ្សារ។",
    studentsCount: "15,600+",
    experienceYears: 9,
    ratingAverage: 4.9,
  },
};

export default function InstructorModal({
  isOpen,
  onClose,
  instructorName,
  allCourses,
  language,
}: InstructorModalProps) {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const detail = INSTRUCTOR_DATA[instructorName] || {
    name: instructorName,
    titleEn: "Educator & Professional Coach",
    titleKh: "អ្នកអប់រំ និងជាគ្រូបណ្តុះបណ្តាលអាជីព",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
    bioEn: `${instructorName} is dedicated to bringing quality modern material to learners, focusing on continuous skill building and hands-on production experiences.`,
    bioKh: `លោក/អ្នកស្រី ${instructorName} យកចិត្តទុកដាក់ខ្ពស់ក្នុងការនាំយកមេរៀនទំនើបដែលមានគុណភាពជូនដល់សិក្ខាកាម ដោយផ្តោតលើការកសាងជំនាញបន្តបន្ទាប់ និងបទពិសោធន៍ផលិតផ្ទាល់ដៃ។`,
    philosophyEn: "Education is the kindling of a flame, not the filling of a vessel.",
    philosophyKh: "ការអប់រំគឺជាការបញ្ឆេះអណ្តាតភ្លើង មិនមែនជាការបញ្ចូលទឹកដាក់ក្នុងក្អមនោះឡើយ។",
    studentsCount: "5,000+",
    experienceYears: 5,
    ratingAverage: 4.8,
  };

  // Find all other courses taught by this specific instructor
  const instructorCourses = allCourses.filter(
    (course) => course.instructorName.toLowerCase() === instructorName.toLowerCase()
  );

  const bio = language === "en" ? detail.bioEn : detail.bioKh;
  const philosophy = language === "en" ? detail.philosophyEn : detail.philosophyKh;
  const title = language === "en" ? detail.titleEn : detail.titleKh;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn" id="instructor-modal-backdrop">
      {/* Dynamic portfolio glass deck */}
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#070b15]/95 shadow-2xl shadow-indigo-500/10 text-left flex flex-col max-h-[90vh]"
        id="instructor-modal-container"
      >
        {/* Glow ambient design tags */}
        <div className="absolute right-[-15%] top-[-10%] h-64 w-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute left-[-15%] bottom-[-10%] h-64 w-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Floating Close Action */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-100 transition-all cursor-pointer border border-white/5"
          id="close-instructor-modal-btn"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Modal Scroll Deck */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6 relative z-10 custom-scrollbar">
          {/* Header Card Profile Block */}
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center border-b border-white/5 pb-6">
            <img
              src={detail.avatar}
              alt={detail.name}
              className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/30 shadow-indigo-500/10 shadow-lg flex-shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-indigo-400" />
                <span>{language === "en" ? "Verified Educator" : "គ្រូបង្រៀនផ្លូវការ"}</span>
              </span>
              <h3 className="text-xl font-extrabold text-slate-100 font-sans tracking-tight leading-tight">
                {detail.name}
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                {title}
              </p>
            </div>
          </div>

          {/* Core Analytics Blocks Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-center">
              <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">{language === "en" ? "Students" : "សិស្សសរុប"}</span>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center justify-center gap-1 font-mono">
                <Users className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                <span>{detail.studentsCount}</span>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-center">
              <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">{language === "en" ? "Experience" : "បទពិសោធន៍"}</span>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center justify-center gap-1 font-mono">
                <Briefcase className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                <span>{detail.experienceYears} {language === "en" ? "Yrs" : "ឆ្នាំ"}</span>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 text-center">
              <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-wider">{language === "en" ? "Rating" : "ការវាយតម្លៃ"}</span>
              <div className="text-sm font-bold text-slate-200 mt-1 flex items-center justify-center gap-1 font-mono">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                <span>{detail.ratingAverage.toFixed(1)} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Biography Division */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
              <span>{language === "en" ? "Biography" : "ជីវប្រវត្តិសង្ខេប"}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
              {bio}
            </p>
          </div>

          {/* Teaching Philosophy Division */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              <span>{language === "en" ? "Teaching Philosophy" : "ទស្សនវិជ្ជាបង្រៀន"}</span>
            </h4>
            <p className="text-xs italic text-slate-300 leading-relaxed font-sans bg-indigo-500/5 border border-indigo-500/10 p-4 rounded-2xl relative">
              <span className="absolute top-2 left-2 text-3xl text-indigo-500/10 font-serif leading-none">“</span>
              <span className="relative z-10 block pl-3">
                {philosophy}
              </span>
            </p>
          </div>

          {/* Instructor's Courses Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Cpu className="h-3.5 w-3.5 text-purple-400" />
              <span>
                {language === "en" 
                  ? `Courses by ${detail.name.split(" ")[0]}` 
                  : `វគ្គសិក្សារបស់លោក/អ្នកស្រី ${detail.name.split(" ")[0]}`
                }
              </span>
            </h4>
            <div className="space-y-2">
              {instructorCourses.length > 0 ? (
                instructorCourses.map((crs) => {
                  const courseTitle = language === "en" ? crs.titleEn : crs.titleKh;
                  return (
                    <div
                      key={crs.id}
                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-3.5 items-center justify-between hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <img
                          src={crs.thumbnail}
                          alt={courseTitle}
                          className="h-10 w-16 rounded-lg object-cover flex-shrink-0 border border-white/5"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-200 truncate mt-0.5 leading-tight">
                            {courseTitle}
                          </h5>
                          <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider mt-0.5 block">
                            {crs.category} • {crs.durationHours} {t.hoursShort} • {crs.sections.reduce((acc, s) => acc + s.chapters.length, 0)} {t.lectures}
                          </span>
                        </div>
                      </div>

                      {/* Display course rating or enrolled badge */}
                      <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span>{crs.rating.toFixed(1)}</span>
                        </div>
                        {crs.enrolled && (
                          <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest font-mono mt-1">
                            {t.completedStateVerb.toLowerCase() === "completed" && crs.progress === 100 ? t.completedStateVerb : "Enrolled"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-3 text-center text-xs text-slate-500 font-mono bg-white/[0.01] rounded-2xl border border-white/5">
                  {language === "en" ? "No other lectures announced." : "មិនទាន់មានវគ្គសិក្សាផ្សព្វផ្សាយផ្សេងទៀតទេ។"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
