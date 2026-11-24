import { LanguageCode } from "@/lib/i18n/config";

export interface SeoGuideArticle {
  slug: string;
  primaryLang: LanguageCode;
  publishedAt: string;
  readingMinutes: number;
  recommendedTemplate: string;
  title: string;
  excerpt: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
}

export const SEO_GUIDES: SeoGuideArticle[] = [
  {
    slug: "how-to-pass-ats-2026",
    primaryLang: "en",
    publishedAt: "2026-10-15",
    readingMinutes: 5,
    recommendedTemplate: "ats-executive",
    title: "How to Pass ATS Resume Scanners in 2026: The Exact Engineering Checklist",
    excerpt:
      "Learn why 75% of resumes fail automated Applicant Tracking Systems and how selectable vector PDFs, standard headings, and quantified impact bullets guarantee 98%+ parseability.",
    keywords: ["pass ATS 2026", "ATS resume checker", "free ATS resume builder", "vector PDF resume"],
    sections: [
      {
        heading: "1. Never Export Your Resume as a Flattened Image PDF",
        paragraphs: [
          "Many online CV makers render your resume on an HTML canvas and convert it into a screenshot inside a PDF. To a human eye it looks crisp, but an ATS parser like Workday, Greenhouse, or Taleo sees a blank document with zero searchable text.",
          "BATAPRO generates real, selectable vector text PDFs using @react-pdf/renderer and native browser A4 print typography—completely free and watermark-free.",
        ],
      },
      {
        heading: "2. Use Standard HR Headings & Single-Column Structure for Strict Portals",
        paragraphs: [
          "Multi-column layouts with icons and progress bars can scramble reading order on legacy enterprise parsers. When applying to multinational corporations, choose BATAPRO's ATS Executive Classic or ATS Tech templates.",
        ],
        bullets: [
          "Use exact section labels: Professional Summary, Work Experience, Education, Core Skills.",
          "Avoid skill rating stars or 80% progress bars—list exact keywords instead.",
          "Include measurable numbers (%, $, latency, revenue, team size) in every role.",
        ],
      },
    ],
  },
  {
    slug: "modele-cv-algerie-france-2026",
    primaryLang: "fr",
    publishedAt: "2026-10-20",
    readingMinutes: 6,
    recommendedTemplate: "academic-stage",
    title: "Modèle CV Algérie & France 2026 : Format ATS, Stage PFE et Erreurs à Éviter",
    excerpt:
      "Guide complet pour les candidats en Algérie et en France : réussir son CV de stage PFE, choisir entre format européen avec photo et modèle ATS international.",
    keywords: [
      "modèle CV Algérie gratuit",
      "CV stage PFE",
      "modèle CV France 2026",
      "CV ATS gratuit PDF",
    ],
    sections: [
      {
        heading: "1. Adapter son CV au marché algérien, français ou international",
        paragraphs: [
          "En Algérie et en France, les recruteurs apprécient un CV clair sur 1 page (ou 2 pages pour les profils seniors) avec la mention du niveau linguistique (Arabe, Français, Anglais selon le cadre CECRL).",
          "Pour les jeunes diplômés (Licence, Master, Ingénieur d'État), placez la rubrique Formation et votre Projet de Fin d'Études (PFE) avant les expériences courtes grâce au modèle Académique & Stage PFE de BATAPRO.",
        ],
      },
      {
        heading: "2. Faut-il mettre une photo sur son CV en 2026 ?",
        paragraphs: [
          "En Europe et au Maghreb, une photo professionnelle sobre reste acceptée sur les modèles Modernes ou Europass. En revanche, pour le Canada, les États-Unis ou les portails ATS stricts, supprimez la photo pour éviter tout rejet automatique.",
        ],
        bullets: [
          "Utilisez une adresse e-mail professionnelle (prénom.nom@email.com).",
          "Quantifiez vos réalisations (ex: Réduction des délais de 25%, gestion de 15 clients).",
          "Exportez toujours en PDF vectoriel propre via BATAPRO sans filigrane.",
        ],
      },
    ],
  },
  {
    slug: "arabic-cv-template-guide",
    primaryLang: "ar",
    publishedAt: "2026-10-28",
    readingMinutes: 5,
    recommendedTemplate: "gulf-executive",
    title: "نموذج سيرة ذاتية احترافية باللغة العربية: دليل النجاح في التوظيف 2026",
    excerpt:
      "تعرّف على أسرار كتابة سيرة ذاتية احترافية باللغة العربية باتجاه RTL صحيح، مع الكلمات المفتاحية المناسبة لسوق العمل الجزائري والخليجي.",
    keywords: [
      "نموذج سيرة ذاتية مجاني",
      "إنشاء سيرة ذاتية بالعربية",
      "سيرة ذاتية متوافقة مع ATS",
      "قالب سيرة ذاتية جاهز PDF",
    ],
    sections: [
      {
        heading: "1. أهمية التنسيق الصحيح من اليمين إلى اليسار (RTL)",
        paragraphs: [
          "أكبر خطأ يقع فيه الباحثون عن عمل عند تصميم سيرة ذاتية عربية هو استخدام قوالب إنجليزية معكوسة يدوياً، مما يؤدي إلى تداخل النصوص والأرقام عند التصدير.",
          "منصة BATAPRO تعكس التخطيط بالكامل تلقائياً (RTL) عند اختيار اللغة العربية مع خطوط واضحة ومجانية 100%.",
        ],
      },
      {
        heading: "2. ماذا تكتب في الملخص المهني والخبرات؟",
        paragraphs: [
          "ابدأ كل نقطة في خبراتك العملية بفعل إنجاز قوي متبوعاً بنتيجة رقمية واضحة بدلاً من سرد المهام الروتينية.",
        ],
        bullets: [
          "استخدم أفعالاً مثل: صمّمت، طوّرت، قدت، رفعت الكفاءة بنسبة...",
          "أدرج المهارات التقنية واللغات (العربية، الفرنسية، الإنجليزية) بوضوح.",
          "للعمل في دول الخليج (الإمارات والسعودية)، يمكنك إضافة خانة الجنسية اختيارياً في القالب الخليجي.",
        ],
      },
    ],
  },
  {
    slug: "canadian-vs-european-gulf-cv",
    primaryLang: "en",
    publishedAt: "2026-11-02",
    readingMinutes: 5,
    recommendedTemplate: "canadian-standard",
    title: "Canadian vs. Europass vs. Gulf CV Formats: Exact Regional HR Rules",
    excerpt:
      "Applying abroad? Learn the mandatory formatting differences between Canadian resumes, European CEFR CVs, and Gulf executive dossiers.",
    keywords: [
      "Canadian resume format free",
      "Europass CV alternative",
      "Dubai UAE CV template",
      "international resume standards",
    ],
    sections: [
      {
        heading: "Canada & North America: Strictly No Photo, No Age, No Marital Status",
        paragraphs: [
          "Canadian anti-discrimination employment laws mean HR teams often discard resumes containing a headshot, birthdate, or marital status. Use BATAPRO's Canadian Standard template, which automatically enforces photo-free compliance.",
        ],
      },
      {
        heading: "Europe vs. Gulf (UAE, Saudi Arabia, Qatar)",
        paragraphs: [
          "European recruiters value clear CEFR language grades (B2/C1/C2) and chronological clarity. Gulf recruiters in Dubai and Riyadh appreciate an executive summary at the top plus optional nationality/visa readiness.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): SeoGuideArticle | undefined {
  return SEO_GUIDES.find((g) => g.slug === slug);
}
