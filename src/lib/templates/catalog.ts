import { TemplateCategory } from "@/types/cv";

export interface BuiltinTemplateMeta {
  slug: string;
  name: string;
  nameAr: string;
  nameFr: string;
  category: TemplateCategory;
  regionTag: string;
  description: string;
  accentColor: string;
  atsScore: number;
  layoutVariant:
    | "single-classic"
    | "single-minimal"
    | "two-col-sidebar"
    | "two-col-header"
    | "academic-first"
    | "regional-grid";
  supportsPhoto: boolean;
}

export const CATEGORY_SEO_META: Record<
  TemplateCategory,
  {
    titleEn: string;
    titleFr: string;
    titleAr: string;
    descEn: string;
    descFr: string;
    descAr: string;
  }
> = {
  ats: {
    titleEn: "Strict ATS-Optimized Resume Templates (100% Free)",
    titleFr: "Modèles de CV Strictement Compatibles ATS (100% Gratuits)",
    titleAr: "قوالب سيرة ذاتية قياسية متوافقة مع أنظمة ATS (مجانية 100%)",
    descEn:
      "Single-column, zero-graphic resume templates engineered for 99% parser accuracy on Workday, Greenhouse, Lever & corporate HR portals.",
    descFr:
      "Modèles de CV à colonne unique sans graphiques bloquants pour une lecture à 99% par les logiciels ATS d'entreprises.",
    descAr:
      "قوالب سيرة ذاتية بعمود واحد بدون رسومات معقدة لضمان قراءة مثالية بنسبة 99% من أنظمة فرز السير الذاتية.",
  },
  modern: {
    titleEn: "Modern Professional Two-Column CV Templates (Free)",
    titleFr: "Modèles de CV Modernes Deux Colonnes (Gratuits)",
    titleAr: "قوالب سيرة ذاتية حديثة بعمودين للتقنية والتسويق (مجانية)",
    descEn:
      "Clean two-column layouts with subtle color accents tailored for software engineers, product managers, marketers, and startup teams.",
    descFr:
      "Mises en page modernes à deux colonnes idéales pour les métiers tech, marketing, produit et startups.",
    descAr:
      "تصاميم عصرية بعمودين مع ألوان متناسقة مثالية لمطوري البرمجيات والتسويق والشركات الناشئة.",
  },
  academic: {
    titleEn: "Academic, Graduate & Internship (Stage PFE) CV Templates",
    titleFr: "Modèles de CV Académique, Étudiant & Stage PFE (Gratuits)",
    titleAr: "قوالب سيرة ذاتية للخريجين والتربص الميداني PFE والباحثين",
    descEn:
      "Education-first resume layouts tailored for fresh university graduates, Master/PFE theses, scholarships, and internships.",
    descFr:
      "Modèles mettant en avant la formation, le projet de fin d'études (PFE) et les stages pour jeunes diplômés.",
    descAr:
      "قوالب تبرز المسار الأكاديمي ومشاريع التخرج والتربصات الميدانية للطلبة والخريجين الجدد.",
  },
  regional: {
    titleEn: "Canadian, European (Europass) & Gulf Standard CV Formats",
    titleFr: "Modèles de CV Format Canadien, Européen & Golfe (Gratuits)",
    titleAr: "نماذج سيرة ذاتية وفق المعايير الكندية والأوروبية والخليجية",
    descEn:
      "Region-compliant resume templates following Canadian HR (no-photo), European CEFR Europass, and UAE/Saudi Gulf executive standards.",
    descFr:
      "Formats conformes aux standards RH du Canada (sans photo), d'Europe (CECRL) et du Golfe (EAU/Arabie Saoudite).",
    descAr:
      "نماذج متوافقة مع معايير التوظيف في كندا (بدون صورة) وأوروبا ودول الخليج العربي.",
  },
};

export const BUILTIN_TEMPLATES: BuiltinTemplateMeta[] = [
  {
    slug: "ats-executive",
    name: "ATS Executive Classic",
    nameAr: "قالب ATS التنفيذي الكلاسيكي",
    nameFr: "ATS Exécutif Classique",
    category: "ats",
    regionTag: "Global ATS",
    description:
      "Strict single-column architecture with zero graphics and standard HR section headings. Engineered for 99% parser accuracy on Workday, Greenhouse & Taleo.",
    accentColor: "#0f172a",
    atsScore: 99,
    layoutVariant: "single-classic",
    supportsPhoto: false,
  },
  {
    slug: "ats-tech",
    name: "ATS Tech & Engineering",
    nameAr: "قالب ATS التقني والهندسي",
    nameFr: "ATS Tech & Ingénierie",
    category: "ats",
    regionTag: "Global Tech",
    description:
      "High-density single-column technical resume highlighting stack skills, measurable latency/scale metrics, and open-source projects.",
    accentColor: "#1d4ed8",
    atsScore: 98,
    layoutVariant: "single-minimal",
    supportsPhoto: false,
  },
  {
    slug: "modern-slate",
    name: "Modern Slate Two-Column",
    nameAr: "القالب العصري بعمودين",
    nameFr: "Moderne Slate Deux Colonnes",
    category: "modern",
    regionTag: "Startups & SaaS",
    description:
      "Sleek two-column layout with an accent sidebar for skills, languages, and certifications, paired with a clean timeline for experience.",
    accentColor: "#0f766e",
    atsScore: 93,
    layoutVariant: "two-col-sidebar",
    supportsPhoto: true,
  },
  {
    slug: "startup-split",
    name: "Startup Growth Split",
    nameAr: "قالب الشركات الناشئة والتسويق",
    nameFr: "Startup Growth & Marketing",
    category: "modern",
    regionTag: "Product & Growth",
    description:
      "Bold top banner header with balanced asymmetric grid built for product managers, marketers, and creative technologists.",
    accentColor: "#4338ca",
    atsScore: 91,
    layoutVariant: "two-col-header",
    supportsPhoto: true,
  },
  {
    slug: "academic-stage",
    name: "Academic & Stage (PFE)",
    nameAr: "قالب التخرج والتربص الميداني (PFE)",
    nameFr: "Académique & Stage PFE",
    category: "academic",
    regionTag: "Algeria / Europe",
    description:
      "Education-first structure tailored for fresh university graduates, PFE/Master theses, and internship (Stage) applications.",
    accentColor: "#0369a1",
    atsScore: 96,
    layoutVariant: "academic-first",
    supportsPhoto: true,
  },
  {
    slug: "research-scholar",
    name: "Research & PhD Scholar",
    nameAr: "قالب الباحثين والدكتوراه",
    nameFr: "Recherche & Doctorat",
    category: "academic",
    regionTag: "Universities",
    description:
      "Structured academic CV emphasizing degrees, honors, research projects, certifications, and multilingual proficiency.",
    accentColor: "#334155",
    atsScore: 97,
    layoutVariant: "academic-first",
    supportsPhoto: false,
  },
  {
    slug: "canadian-standard",
    name: "Canadian Standard (No Photo)",
    nameAr: "النموذج الكندي المعياري",
    nameFr: "Format Canadien Standard",
    category: "regional",
    regionTag: "Canada",
    description:
      "Follows strict Canadian HR compliance (no photo, no age/marital info) with crisp action-verb achievements and bilingual readiness.",
    accentColor: "#b91c1c",
    atsScore: 98,
    layoutVariant: "single-classic",
    supportsPhoto: false,
  },
  {
    slug: "european-europass",
    name: "European Europass Modern",
    nameAr: "النموذج الأوروبي الحديث",
    nameFr: "Européen Moderne (CECRL)",
    category: "regional",
    regionTag: "Europe / France",
    description:
      "Clean European structured grid highlighting CEFR language levels, work timeline, and optional professional headshot.",
    accentColor: "#1e40af",
    atsScore: 94,
    layoutVariant: "regional-grid",
    supportsPhoto: true,
  },
  {
    slug: "gulf-executive",
    name: "Gulf Executive (UAE / KSA)",
    nameAr: "النموذج الخليجي التنفيذي",
    nameFr: "Exécutif Golfe (EAU / Arabie)",
    category: "regional",
    regionTag: "Gulf / MENA",
    description:
      "Tailored for Dubai, Riyadh, and Doha corporate recruitment with optional nationality field and crisp bilingual RTL/LTR typography.",
    accentColor: "#047857",
    atsScore: 95,
    layoutVariant: "two-col-header",
    supportsPhoto: true,
  },
];

export function getBuiltinTemplate(slug: string): BuiltinTemplateMeta {
  return BUILTIN_TEMPLATES.find((t) => t.slug === slug) ?? BUILTIN_TEMPLATES[0];
}
