import { LanguageCode } from "@/lib/i18n/config";

export type TemplateCategory = "ats" | "modern" | "academic" | "regional";
export type CvFontStyle = "sans" | "serif" | "arabic";

export interface CvPersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  nationality?: string;
  photoUrl?: string;
}

export interface CvExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface CvEducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface CvLanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface CvCertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface CvProjectItem {
  id: string;
  name: string;
  role: string;
  summary: string;
  link?: string;
}

export interface CvData {
  personal: CvPersonalInfo;
  summary: string;
  experience: CvExperienceItem[];
  education: CvEducationItem[];
  skills: string[];
  languages: CvLanguageItem[];
  certifications: CvCertificationItem[];
  projects: CvProjectItem[];
}

export interface CvDraft {
  id: string;
  title: string;
  templateSlug: string;
  language: LanguageCode;
  accentColor: string;
  fontSize: "sm" | "md" | "lg";
  fontStyle: CvFontStyle;
  data: CvData;
  updatedAt: string;
}

export interface AtsCheckResult {
  score: number;
  checks: { key: string; label: string; passed: boolean }[];
}

export function calculateAtsScore(data: CvData, templateSlug: string): AtsCheckResult {
  const isStrictAts = templateSlug.startsWith("ats-") || templateSlug === "canadian-standard";
  const hasContact = Boolean(data.personal.fullName && data.personal.email && data.personal.phone);
  const hasSummary = data.summary.trim().length >= 60;
  const hasExperience = data.experience.length > 0 && data.experience.some((e) => e.bullets.length >= 2);
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length >= 5;
  const hasQuantifiedImpact = data.experience.some((e) =>
    e.bullets.some((b) => /\d+%|\d+\+|\$\d+|\d+/.test(b))
  );
  const noPhotoInAts = !isStrictAts || !data.personal.photoUrl;

  const checks = [
    { key: "contact", label: "Complete contact header (Name, Email, Phone)", passed: hasContact },
    { key: "summary", label: "Targeted professional summary (60+ chars)", passed: hasSummary },
    { key: "experience", label: "Experience entries with 2+ bullet points", passed: hasExperience },
    { key: "metrics", label: "Quantified achievements (numbers / %)", passed: hasQuantifiedImpact },
    { key: "skills", label: "At least 5 ATS-parseable keyword skills", passed: hasSkills },
    { key: "education", label: "Education credentials included", passed: hasEducation },
    { key: "layout", label: "ATS-safe structure without photo conflicts", passed: noPhotoInAts },
  ];

  const base = isStrictAts ? 16 : 10;
  const perCheck = Math.floor((100 - base) / checks.length);
  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.min(
    100,
    base + passedCount * perCheck + (passedCount === checks.length ? 100 - (base + checks.length * perCheck) : 0)
  );

  return { score, checks };
}

export const SAMPLE_CV_BY_LANG: Record<LanguageCode, CvData> = {
  en: {
    personal: {
      fullName: "Amine Benali",
      jobTitle: "Senior Full-Stack Software Engineer",
      email: "amine.benali@email.com",
      phone: "+213 555 123 456",
      location: "Algiers, Algeria (Open to Remote / Relocation)",
      linkedin: "linkedin.com/in/amine-benali",
      website: "github.com/aminebenali",
      nationality: "Algerian",
    },
    summary:
      "Results-driven Full-Stack Engineer with 5+ years of experience architecting high-throughput TypeScript, Next.js, and cloud-native web platforms. Reduced API latency by 42% and scaled accessible multilingual applications serving 120K+ monthly active users across MENA and Europe.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Full-Stack Developer",
        company: "Numidia Cloud Systems",
        location: "Algiers, Algeria",
        startDate: "2023-03",
        endDate: "Present",
        current: true,
        bullets: [
          "Architected a high-speed Next.js & PostgreSQL platform handling 50,000+ daily requests with 99.98% uptime.",
          "Optimized Core Web Vitals (LCP < 0.9s, CLS = 0) and multilingual SEO, growing organic traffic by 140%.",
          "Mentored a team of 6 engineers, cutting PR review cycles by 35% through automated CI/CD quality gates.",
        ],
      },
      {
        id: "exp-2",
        role: "Software Engineer",
        company: "EuroTech Solutions",
        location: "Remote (Paris, France)",
        startDate: "2020-09",
        endDate: "2023-02",
        current: false,
        bullets: [
          "Built accessible React & Tailwind CSS dashboards supporting full RTL/LTR internationalization for 40+ enterprise clients.",
          "Optimized SQL indexing and caching strategies, reducing core reporting query times from 1.8s to 210ms.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master of Science in Software Engineering",
        institution: "USTHB — University of Science and Technology Houari Boumediene",
        location: "Algiers, Algeria",
        startDate: "2018",
        endDate: "2020",
        gpa: "16.4 / 20",
        honors: "Valedictorian (Major de promotion)",
      },
    ],
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Technical SEO",
      "Docker",
      "REST & GraphQL",
      "CI/CD",
    ],
    languages: [
      { id: "lang-1", name: "Arabic", level: "Native" },
      { id: "lang-2", name: "French", level: "Fluent (C1)" },
      { id: "lang-3", name: "English", level: "Fluent (C1)" },
    ],
    certifications: [
      { id: "cert-1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
      { id: "cert-2", name: "Meta Front-End Developer Professional Certificate", issuer: "Coursera", year: "2022" },
    ],
    projects: [
      {
        id: "proj-1",
        name: "MaghrebOpen ATS Parser",
        role: "Creator & Maintainer",
        summary: "Open-source multilingual resume parser supporting Arabic, French, and English with 600+ GitHub stars.",
        link: "github.com/aminebenali/ats-parser",
      },
    ],
  },
  fr: {
    personal: {
      fullName: "Amine Benali",
      jobTitle: "Ingénieur Logiciel Full-Stack Senior",
      email: "amine.benali@email.com",
      phone: "+213 555 123 456",
      location: "Alger, Algérie (Mobilité Internationale)",
      linkedin: "linkedin.com/in/amine-benali",
      website: "github.com/aminebenali",
      nationality: "Algérienne",
    },
    summary:
      "Ingénieur Full-Stack avec plus de 5 ans d'expérience dans la conception de plateformes web performantes en TypeScript, Next.js et PostgreSQL. Réduction de 42% de la latence API et croissance de 140% du trafic organique SEO pour plus de 120 000 utilisateurs actifs.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Développeur Full-Stack",
        company: "Numidia Cloud Systems",
        location: "Alger, Algérie",
        startDate: "03/2023",
        endDate: "Présent",
        current: true,
        bullets: [
          "Conçu une architecture Next.js & PostgreSQL traitant 50 000+ requêtes/jour avec 99,98% de disponibilité.",
          "Optimisé les Core Web Vitals (LCP < 0,9s, CLS = 0) et le SEO technique multilingue (+140% de trafic).",
          "Encadré une équipe de 6 développeurs et réduit le délai de mise en production de 35% via CI/CD.",
        ],
      },
      {
        id: "exp-2",
        role: "Ingénieur Logiciel",
        company: "EuroTech Solutions",
        location: "Télétravail (Paris, France)",
        startDate: "09/2020",
        endDate: "02/2023",
        current: false,
        bullets: [
          "Développé des interfaces React & Tailwind CSS multilingues (RTL/LTR) pour 40+ grands comptes européens.",
          "Optimisé les requêtes SQL critiques, abaissant le temps de réponse moyen de 1,8s à 210ms.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master en Génie Logiciel et Systèmes Distribués",
        institution: "USTHB — Université des Sciences et de la Technologie Houari Boumediene",
        location: "Alger, Algérie",
        startDate: "2018",
        endDate: "2020",
        gpa: "16.4 / 20",
        honors: "Major de promotion — Mention Très Bien",
      },
    ],
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "SEO Technique",
      "Docker",
      "CI/CD",
    ],
    languages: [
      { id: "lang-1", name: "Arabe", level: "Langue maternelle" },
      { id: "lang-2", name: "Français", level: "Courant (C1)" },
      { id: "lang-3", name: "Anglais", level: "Courant (C1)" },
    ],
    certifications: [
      { id: "cert-1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
    ],
    projects: [
      {
        id: "proj-1",
        name: "PFE : Plateforme Web Temps Réel",
        role: "Auteur Principal",
        summary: "Système distribué haute performance avec audit automatisé et rendu SSR.",
      },
    ],
  },
  ar: {
    personal: {
      fullName: "أمين بن علي",
      jobTitle: "مهندس برمجيات متكامل أول (Full-Stack)",
      email: "amine.benali@email.com",
      phone: "+213 555 123 456",
      location: "الجزائر العاصمة، الجزائر (متاح للعمل عن بعد)",
      linkedin: "linkedin.com/in/amine-benali",
      website: "github.com/aminebenali",
      nationality: "جزائري",
    },
    summary:
      "مهندس برمجيات متكامل بخبرة تزيد عن 5 سنوات في بناء منصات الويب السريعة باستخدام TypeScript و Next.js وقواعد البيانات السحابية. ساهمت في خفض زمن استجابة الخوادم بنسبة 42% وتحسين ظهور المواقع في محركات البحث لأكثر من 120 ألف مستخدم شهرياً.",
    experience: [
      {
        id: "exp-1",
        role: "قائد فريق التطوير المتكامل (Lead Full-Stack)",
        company: "نوميديا للأنظمة السحابية",
        location: "الجزائر العاصمة، الجزائر",
        startDate: "2023-03",
        endDate: "حتى الآن",
        current: true,
        bullets: [
          "تصميم وبناء منصة سريعة تعالج أكثر من 50,000 طلب يومياً بنسبة جاهزية 99.98%.",
          "تحسين مؤشرات الأداء الأساسية (Core Web Vitals) والسيو التقني، مما رفع الزيارات العضوية بنسبة 140%.",
          "قيادة وتوجيه فريق من 6 مهندسين وتقليص دورة مراجعة الأكواد بنسبة 35% عبر أتمتة CI/CD.",
        ],
      },
      {
        id: "exp-2",
        role: "مهندس برمجيات",
        company: "يوروتك للحلول الرقمية",
        location: "عمل عن بعد (باريس، فرنسا)",
        startDate: "2020-09",
        endDate: "2023-02",
        current: false,
        bullets: [
          "تطوير لوحات تحكم متجاوبة تدعم اللغات العربية والفرنسية والإنجليزية (RTL/LTR) لأكثر من 40 عميلاً.",
          "تحسين فهرسة استعلامات SQL مما قلل زمن استخراج التقارير من 1.8 ثانية إلى 210 مللي ثانية.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "ماستر في هندسة البرمجيات والأنظمة الموزعة",
        institution: "جامعة هواري بومدين للعلوم والتكنولوجيا (USTHB)",
        location: "الجزائر العاصمة، الجزائر",
        startDate: "2018",
        endDate: "2020",
        gpa: "16.4 / 20",
        honors: "الأول على الدفعة — تقدير ممتاز",
      },
    ],
    skills: [
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "تحسين محركات البحث SEO",
      "هندسة النظم السحابية",
    ],
    languages: [
      { id: "lang-1", name: "العربية", level: "اللغة الأم" },
      { id: "lang-2", name: "الفرنسية", level: "إتقان تام (C1)" },
      { id: "lang-3", name: "الإنجليزية", level: "إتقان تام (C1)" },
    ],
    certifications: [
      { id: "cert-1", name: "مهندس معماري معتمد من AWS", issuer: "Amazon Web Services", year: "2024" },
    ],
    projects: [
      {
        id: "proj-1",
        name: "محلل السيرة الذاتية مفتوح المصدر",
        role: "مؤسس ومطور",
        summary: "أداة مفتوحة المصدر لتحليل السير الذاتية العربية والفرنسية وفق معايير ATS.",
      },
    ],
  },
  es: {
    personal: {
      fullName: "Amine Benali",
      jobTitle: "Ingeniero de Software Full-Stack Senior",
      email: "amine.benali@email.com",
      phone: "+213 555 123 456",
      location: "Argel, Argelia (Remoto)",
      linkedin: "linkedin.com/in/amine-benali",
    },
    summary:
      "Ingeniero Full-Stack con más de 5 años de experiencia diseñando plataformas web ultrarrápidas con TypeScript, Next.js y PostgreSQL.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Full-Stack Developer",
        company: "Numidia Cloud Systems",
        location: "Argel, Argelia",
        startDate: "2023-03",
        endDate: "Actualidad",
        current: true,
        bullets: [
          "Diseñé una plataforma Next.js y PostgreSQL con 99.98% de disponibilidad y 140% más tráfico orgánico SEO.",
          "Lideré un equipo de 6 ingenieros reduciendo los ciclos de revisión en un 35%.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Máster en Ingeniería de Software",
        institution: "USTHB",
        location: "Argel",
        startDate: "2018",
        endDate: "2020",
      },
    ],
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Tailwind CSS", "Docker"],
    languages: [
      { id: "lang-1", name: "Árabe", level: "Nativo" },
      { id: "lang-2", name: "Francés", level: "Avanzado (C1)" },
      { id: "lang-3", name: "Inglés", level: "Avanzado (C1)" },
    ],
    certifications: [],
    projects: [],
  },
  de: {
    personal: {
      fullName: "Amine Benali",
      jobTitle: "Senior Full-Stack Software-Ingenieur",
      email: "amine.benali@email.com",
      phone: "+213 555 123 456",
      location: "Algier, Algerien (Remote)",
      linkedin: "linkedin.com/in/amine-benali",
    },
    summary:
      "Full-Stack-Ingenieur mit über 5 Jahren Erfahrung in der Entwicklung performanter Web-Plattformen mit TypeScript, Next.js und PostgreSQL.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Full-Stack Entwickler",
        company: "Numidia Cloud Systems",
        location: "Algier",
        startDate: "03/2023",
        endDate: "Heute",
        current: true,
        bullets: [
          "Entwicklung einer Next.js & PostgreSQL Plattform mit 99,98% Verfügbarkeit und 140% SEO-Wachstum.",
          "Leitung eines 6-köpfigen Teams mit 35% schnelleren Release-Zyklen.",
        ],
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master of Science in Software Engineering",
        institution: "USTHB",
        location: "Algier",
        startDate: "2018",
        endDate: "2020",
      },
    ],
    skills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Tailwind CSS", "Docker"],
    languages: [
      { id: "lang-1", name: "Arabisch", level: "Muttersprache" },
      { id: "lang-2", name: "Französisch", level: "Fließend (C1)" },
      { id: "lang-3", name: "Englisch", level: "Fließend (C1)" },
    ],
    certifications: [],
    projects: [],
  },
};
