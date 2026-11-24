import { LanguageCode } from "@/lib/i18n/config";

export interface UiDictionary {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  nav: {
    templates: string;
    builder: string;
    guides: string;
    cloudSync: string;
    freeBadge: string;
  };
  seo: {
    homeTitle: string;
    homeDesc: string;
    templatesTitle: string;
    templatesDesc: string;
    builderTitle: string;
    builderDesc: string;
    guidesTitle: string;
    guidesDesc: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustNote: string;
  };
  builder: {
    personal: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
    projects: string;
    aiEnhance: string;
    enhancing: string;
    exportPdf: string;
    printPdf: string;
    autoSaved: string;
    cloudSave: string;
    cvLang: string;
    atsScore: string;
    addItem: string;
    loadSample: string;
    newDraft: string;
    fontStyle: string;
  };
  cvSections: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
    projects: string;
    present: string;
    gpa: string;
    nationality: string;
  };
  faq: { q: string; a: string }[];
  howToSteps: { name: string; text: string }[];
}

export const DICTIONARIES: Record<LanguageCode, UiDictionary> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    nav: {
      templates: "Free Templates",
      builder: "CV Builder",
      guides: "Career Guides",
      cloudSync: "Cloud Sync",
      freeBadge: "100% Free Forever",
    },
    seo: {
      homeTitle: "BATAPRO — 100% Free ATS Resume & CV Builder (Arabic RTL, French & English)",
      homeDesc:
        "Create unlimited ATS-verified resumes and CVs 100% free on BATAPRO. Instant guest editor, crisp vector PDF downloads, Arabic RTL/French/English support, zero watermarks.",
      templatesTitle: "Free ATS, Modern, Academic & Regional CV Templates | BATAPRO",
      templatesDesc:
        "Browse 9+ completely free ATS-optimized, modern, academic PFE/internship, Canadian, European, and Gulf CV templates with instant A4 PDF export.",
      builderTitle: "Free Live Split-Screen CV Builder & ATS Vector PDF Export | BATAPRO",
      builderDesc:
        "Edit your resume in real time with instant LocalStorage auto-save, free AI bullet enhancement, and crisp selectable-text A4 PDF export.",
      guidesTitle: "ATS Resume & Career Guides 2026 (Algeria, MENA & Global) | BATAPRO",
      guidesDesc:
        "Actionable career guides on passing ATS scanners in 2026, crafting Algerian/French CVs, Arabic RTL resumes, and Canadian/European/Gulf HR rules.",
    },
    hero: {
      badge: "100% Free Forever • Zero Watermarks • No Credit Card Needed",
      title: "Build ATS-Winning Resumes 100% Free with BATAPRO",
      subtitle:
        "Start building instantly with zero signup friction. Switch seamlessly between Arabic (RTL), French, and English, enhance bullet points with free AI, and download unlimited crisp vector A4 PDFs.",
      ctaPrimary: "Start Building Free Now",
      ctaSecondary: "Browse Free Templates",
      trustNote: "Instant LocalStorage Auto-Save • Selectable Vector ATS PDF • Optional Cloud Sync",
    },
    builder: {
      personal: "Personal Info",
      summary: "Summary",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      languages: "Languages",
      certifications: "Certifications",
      projects: "Projects",
      aiEnhance: "Free AI Enhance",
      enhancing: "Enhancing...",
      exportPdf: "Download Free ATS PDF",
      printPdf: "Print / Save A4",
      autoSaved: "Auto-saved locally",
      cloudSave: "Cloud Sync",
      cvLang: "CV Language",
      atsScore: "ATS Readiness",
      addItem: "Add Entry",
      loadSample: "Load Sample",
      newDraft: "New CV",
      fontStyle: "Font",
    },
    cvSections: {
      summary: "Professional Summary",
      experience: "Work Experience",
      education: "Education",
      skills: "Core Skills",
      languages: "Languages",
      certifications: "Certifications",
      projects: "Key Projects",
      present: "Present",
      gpa: "GPA",
      nationality: "Nationality",
    },
    faq: [
      {
        q: "Is BATAPRO really 100% free forever?",
        a: "Yes. Every template, AI bullet enhancement, and unlimited high-resolution A4 PDF download on BATAPRO is completely free with zero paywalls, trials, or watermarks.",
      },
      {
        q: "Do BATAPRO PDFs pass Applicant Tracking Systems (ATS)?",
        a: "Yes. BATAPRO generates genuine selectable-text vector PDFs (never flattened screenshots) with clean semantic headings so Workday, Greenhouse, Lever, and Taleo parse 100% of your keywords.",
      },
      {
        q: "Do I need to create an account to build and download my CV?",
        a: "No. You can build immediately as a guest with automatic LocalStorage saving, and optionally create a free cloud account if you want to sync drafts across devices.",
      },
      {
        q: "Can I write my CV in Arabic (RTL), French, or English?",
        a: "Yes. BATAPRO supports Arabic (automatic RTL mirroring), French, English, Spanish, and German independently for both the interface and your CV document.",
      },
    ],
    howToSteps: [
      {
        name: "Pick a 100% Free ATS or Regional Template",
        text: "Choose from Strict ATS, Modern Two-Column, Academic/Stage PFE, Canadian, European, or Gulf formats.",
      },
      {
        name: "Edit Live & Enhance with Free AI",
        text: "Fill in your details with automatic LocalStorage saving and rewrite job tasks into quantified action-verb achievements.",
      },
      {
        name: "Download Crisp Selectable Vector PDF",
        text: "Export unlimited high-resolution A4 PDFs immediately with zero watermarks or paywalls.",
      },
    ],
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    nav: {
      templates: "Modèles Gratuits",
      builder: "Créateur de CV",
      guides: "Guides Carrière",
      cloudSync: "Sync Cloud",
      freeBadge: "100% Gratuit à Vie",
    },
    seo: {
      homeTitle: "BATAPRO — Créateur de CV ATS 100% Gratuit (Algérie, France & International)",
      homeDesc:
        "Créez des CV professionnels compatibles ATS gratuitement sur BATAPRO. Sans inscription obligatoire, sauvegarde locale auto, export PDF vectoriel haute qualité en Arabe, Français et Anglais.",
      templatesTitle: "Modèles de CV Gratuits ATS, Modernes, Stage PFE & Europass | BATAPRO",
      templatesDesc:
        "Téléchargez gratuitement nos 9+ modèles de CV ATS, modernes, académiques (Stage/PFE), canadiens, européens et du Golfe en PDF A4 net.",
      builderTitle: "Éditeur de CV en Direct Gratuit & Export PDF ATS | BATAPRO",
      builderDesc:
        "Modifiez votre CV en direct avec sauvegarde automatique, amélioration IA gratuite et export PDF vectoriel sans filigrane.",
      guidesTitle: "Guides CV & Carrière 2026 (Algérie, France & MENA) | BATAPRO",
      guidesDesc:
        "Conseils pratiques pour passer les filtres ATS en 2026, réussir son CV Algérie/France/Stage PFE et structurer un CV bilingue.",
    },
    hero: {
      badge: "100% Gratuit à Vie • Zéro Filigrane • Sans Carte Bancaire",
      title: "Créez des CV Compatibles ATS 100% Gratuits avec BATAPRO",
      subtitle:
        "Commencez immédiatement sans créer de compte. Basculez entre l'Arabe (RTL), le Français et l'Anglais, améliorez vos expériences par IA gratuite et téléchargez vos PDF A4 en illimité.",
      ctaPrimary: "Créer mon CV Gratuitement",
      ctaSecondary: "Voir les Modèles Gratuits",
      trustNote: "Sauvegarde Auto Locale • PDF Vectoriel ATS • Sync Cloud Optionnelle",
    },
    builder: {
      personal: "Informations",
      summary: "Profil",
      experience: "Expériences",
      education: "Formation",
      skills: "Compétences",
      languages: "Langues",
      certifications: "Certifications",
      projects: "Projets",
      aiEnhance: "Améliorer IA (Gratuit)",
      enhancing: "Optimisation...",
      exportPdf: "Télécharger PDF ATS Gratuit",
      printPdf: "Imprimer A4",
      autoSaved: "Sauvegardé localement",
      cloudSave: "Sync Cloud",
      cvLang: "Langue du CV",
      atsScore: "Score ATS",
      addItem: "Ajouter",
      loadSample: "Charger Exemple",
      newDraft: "Nouveau CV",
      fontStyle: "Police",
    },
    cvSections: {
      summary: "Profil Professionnel",
      experience: "Expériences Professionnelles",
      education: "Formation & Diplômes",
      skills: "Compétences Clés",
      languages: "Langues",
      certifications: "Certifications",
      projects: "Projets & PFE",
      present: "Présent",
      gpa: "Moyenne",
      nationality: "Nationalité",
    },
    faq: [
      {
        q: "BATAPRO est-il vraiment 100% gratuit à vie ?",
        a: "Oui. Tous les modèles, l'assistant IA et les téléchargements PDF A4 sont entièrement gratuits, sans abonnement ni filigrane.",
      },
      {
        q: "Les CV PDF générés passent-ils les logiciels ATS ?",
        a: "Oui. BATAPRO génère de véritables PDF vectoriels avec du texte sélectionnable, garantissant une lecture parfaite par les ATS.",
      },
      {
        q: "Dois-je créer un compte pour télécharger mon CV ?",
        a: "Non ! Votre travail est sauvegardé automatiquement dans votre navigateur (LocalStorage). La synchronisation cloud reste optionnelle.",
      },
      {
        q: "Puis-je créer un CV en Arabe (RTL), Français ou Anglais ?",
        a: "Oui, BATAPRO adapte automatiquement la direction (RTL/LTR) et la typographie pour chaque langue.",
      },
    ],
    howToSteps: [
      {
        name: "Choisissez un modèle gratuit",
        text: "Sélectionnez un modèle ATS strict, moderne, académique/Stage PFE, canadien, européen ou Golfe.",
      },
      {
        name: "Rédigez en direct avec l'IA gratuite",
        text: "Profitez de l'aperçu A4 instantané et de l'amélioration des verbes d'action en un clic.",
      },
      {
        name: "Exportez votre PDF vectoriel sans limite",
        text: "Téléchargez immédiatement votre CV au format PDF A4 prêt pour les recruteurs.",
      },
    ],
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    nav: {
      templates: "قوالب مجانية",
      builder: "مصمم السيرة الذاتية",
      guides: "دليل التوظيف",
      cloudSync: "مزامنة سحابية",
      freeBadge: "مجاني 100% للأبد",
    },
    seo: {
      homeTitle: "BATAPRO — مصمم سيرة ذاتية مجاني 100% متوافق مع ATS (عربي RTL، فرنسي، إنجليزي)",
      homeDesc:
        "أنشئ سيرة ذاتية احترافية مجاناً 100% بدون علامة مائية أو اشتراك عبر BATAPRO. تعديل فوري، دعم كامل للغة العربية RTL، وتحميل PDF متوافق مع أنظمة ATS.",
      templatesTitle: "قوالب سيرة ذاتية مجانية احترافية متوافقة مع ATS و PFE | BATAPRO",
      templatesDesc:
        "تصفح وحمّل مجاناً أكثر من 9 قوالب سيرة ذاتية احترافية بالعربية والفرنسية والإنجليزية: ATS، حديثة، تخرج وتربص، كندية، أوروبية وخليجية.",
      builderTitle: "محرر السيرة الذاتية الفوري المجاني وتحميل PDF | BATAPRO",
      builderDesc:
        "صمّم سيرتك الذاتية مباشرة مع حفظ تلقائي في المتصفح وتحسين بالذكاء الاصطناعي مجاناً وتصدير PDF عالي الدقة.",
      guidesTitle: "مقالات ونصائح السيرة الذاتية والتوظيف 2026 | BATAPRO",
      guidesDesc:
        "دليل شامل لاجتياز أنظمة ATS في 2026، ونصائح كتابة سيرة ذاتية احترافية للأسواق الجزائرية والعربية والعالمية.",
    },
    hero: {
      badge: "مجاني 100% للأبد • بدون علامة مائية • بدون بطاقة بنكية",
      title: "صمّم سيرة ذاتية احترافية مجاناً 100% مع BATAPRO",
      subtitle:
        "ابدأ التصميم فوراً دون تسجيل إجباري. تنقّل بسلاسة بين العربية (RTL) والفرنسية والإنجليزية، حسّن نقاط خبرتك بالذكاء الاصطناعي مجاناً، وحمّل ملفات PDF عالية الدقة بلا حدود.",
      ctaPrimary: "ابدأ التصميم مجاناً الآن",
      ctaSecondary: "تصفح القوالب المجانية",
      trustNote: "حفظ تلقائي فوري • ملفات PDF نصية متوافقة مع ATS • مزامنة سحابية اختيارية",
    },
    builder: {
      personal: "البيانات الشخصية",
      summary: "الملخص المهني",
      experience: "الخبرات",
      education: "التعليم",
      skills: "المهارات",
      languages: "اللغات",
      certifications: "الشهادات",
      projects: "المشاريع",
      aiEnhance: "تحسين مجاني بالذكاء الاصطناعي",
      enhancing: "جاري التحسين...",
      exportPdf: "تحميل PDF متوافق مع ATS مجاناً",
      printPdf: "طباعة / حفظ A4",
      autoSaved: "محفوظ تلقائياً",
      cloudSave: "مزامنة سحابية",
      cvLang: "لغة السيرة الذاتية",
      atsScore: "تقييم ATS",
      addItem: "إضافة عنصر",
      loadSample: "تحميل نموذج جاهز",
      newDraft: "سيرة جديدة",
      fontStyle: "الخط",
    },
    cvSections: {
      summary: "الملخص المهني",
      experience: "الخبرات العملية",
      education: "المؤهلات العلمية",
      skills: "المهارات الأساسية",
      languages: "اللغات",
      certifications: "الشهادات المهنية",
      projects: "المشاريع والإنجازات",
      present: "حتى الآن",
      gpa: "المعدل",
      nationality: "الجنسية",
    },
    faq: [
      {
        q: "هل منصة BATAPRO مجانية بالكامل حقاً؟",
        a: "نعم، جميع القوالب وأداة التحسين بالذكاء الاصطناعي وتحميل ملفات PDF بدقة عالية مجانية 100% للأبد دون أي رسوم أو علامات مائية.",
      },
      {
        q: "هل تتوافق السير الذاتية مع أنظمة تتبع المتقدمين ATS؟",
        a: "نعم. تقوم المنصة بتصدير ملفات PDF نصية حقيقية (وليس صوراً) بهيكلية قياسية تقرأها أنظمة التوظيف العالمية بدقة 100%.",
      },
      {
        q: "هل يجب عليّ إنشاء حساب لاستخدام المنصة؟",
        a: "لا، يمكنك البدء والتحميل فوراً كزائر مع حفظ تلقائي في متصفحك، وإنشاء حساب سحابي اختياري فقط إذا أردت المزامنة بين أجهزتك.",
      },
      {
        q: "هل تدعم المنصة اللغة العربية (RTL) والفرنسية والإنجليزية؟",
        a: "نعم، تدعم BATAPRO العربية باتجاه RTL التلقائي إلى جانب الفرنسية والإنجليزية والإسبانية والألمانية.",
      },
    ],
    howToSteps: [
      {
        name: "اختر قالباً مجانياً متوافقاً مع ATS",
        text: "اختر من بين القوالب القياسية أو الحديثة أو قوالب التخرج والتربص أو النماذج الخليجية والأوروبية والكندية.",
      },
      {
        name: "حرّر سيرتك وحسّنها بالذكاء الاصطناعي مجاناً",
        text: "شاهد المعاينة الفورية بحجم A4 وحوّل مهامك البسيطة إلى إنجازات احترافية بضغطة زر.",
      },
      {
        name: "حمّل ملف PDF عالي الدقة بلا حدود",
        text: "صدّر سيرتك الذاتية فوراً بدون علامة مائية أو قيود.",
      },
    ],
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    nav: {
      templates: "Plantillas Gratis",
      builder: "Editor CV",
      guides: "Guías",
      cloudSync: "Nube",
      freeBadge: "100% Gratis Siempre",
    },
    seo: {
      homeTitle: "BATAPRO — Creador de CV ATS 100% Gratis (Español, Árabe RTL, Francés, Inglés)",
      homeDesc:
        "Crea currículums compatibles con ATS 100% gratis en BATAPRO. Sin registro obligatorio, autoguardado local y exportación PDF vectorial A4 sin marcas de agua.",
      templatesTitle: "Plantillas de Currículum Gratis ATS, Modernas y Regionales | BATAPRO",
      templatesDesc:
        "Descarga gratis más de 9 plantillas de CV optimizadas para ATS, académicas, europeas, canadienses y del Golfo.",
      builderTitle: "Editor de CV en Vivo Gratis y Exportación PDF ATS | BATAPRO",
      builderDesc:
        "Edita tu currículum en tiempo real con IA gratuita y descarga ilimitada en PDF A4.",
      guidesTitle: "Guías de Currículum y Empleo ATS 2026 | BATAPRO",
      guidesDesc:
        "Aprende cómo superar filtros ATS en 2026 y redactar un CV ganador.",
    },
    hero: {
      badge: "100% Gratis Para Siempre • Sin Marcas de Agua • Sin Tarjeta",
      title: "Crea Currículums ATS Ganadores 100% Gratis con BATAPRO",
      subtitle:
        "Empieza al instante sin registro. Cambia entre Árabe (RTL), Francés, Inglés y Español, mejora logros con IA gratuita y descarga PDFs A4 ilimitados.",
      ctaPrimary: "Crear mi CV Gratis Ahora",
      ctaSecondary: "Ver Plantillas Gratis",
      trustNote: "Autoguardado Local • PDF Vectorial ATS • Sincronización Opcional",
    },
    builder: {
      personal: "Datos Personales",
      summary: "Resumen",
      experience: "Experiencia",
      education: "Educación",
      skills: "Habilidades",
      languages: "Idiomas",
      certifications: "Certificaciones",
      projects: "Proyectos",
      aiEnhance: "Mejorar con IA Gratis",
      enhancing: "Mejorando...",
      exportPdf: "Descargar PDF ATS Gratis",
      printPdf: "Imprimir A4",
      autoSaved: "Guardado local automático",
      cloudSave: "Nube",
      cvLang: "Idioma del CV",
      atsScore: "Puntuación ATS",
      addItem: "Añadir",
      loadSample: "Cargar Ejemplo",
      newDraft: "Nuevo CV",
      fontStyle: "Fuente",
    },
    cvSections: {
      summary: "Perfil Profesional",
      experience: "Experiencia Laboral",
      education: "Formación Académica",
      skills: "Competencias",
      languages: "Idiomas",
      certifications: "Certificaciones",
      projects: "Proyectos",
      present: "Actualidad",
      gpa: "Nota",
      nationality: "Nacionalidad",
    },
    faq: [
      {
        q: "¿BATAPRO es realmente 100% gratis?",
        a: "Sí, todas las plantillas, la IA y las descargas PDF son gratuitas sin marcas de agua.",
      },
      {
        q: "¿Los PDFs pasan los sistemas ATS?",
        a: "Sí, exportamos texto vectorial real seleccionable.",
      },
    ],
    howToSteps: [
      { name: "Elige una plantilla gratis", text: "Selecciona entre modelos ATS, modernos o regionales." },
      { name: "Edita en vivo con IA gratis", text: "Personaliza y optimiza tus logros al instante." },
      { name: "Descarga tu PDF A4", text: "Exporta sin límites ni marcas de agua." },
    ],
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    nav: {
      templates: "Gratis Vorlagen",
      builder: "CV-Editor",
      guides: "Karriere-Guides",
      cloudSync: "Cloud-Sync",
      freeBadge: "100% Dauerhaft Kostenlos",
    },
    seo: {
      homeTitle: "BATAPRO — 100% Kostenloser ATS-Lebenslauf-Editor (Deutsch, Arabisch RTL, FR, EN)",
      homeDesc:
        "Erstellen Sie ATS-optimierte Lebensläufe 100% kostenlos mit BATAPRO. Sofort ohne Anmeldung starten, automatische lokale Speicherung und Vektor-PDF ohne Wasserzeichen.",
      templatesTitle: "Kostenlose ATS, Moderne & Europäische Lebenslauf-Vorlagen | BATAPRO",
      templatesDesc:
        "Über 9 kostenlose Lebenslauf-Vorlagen für ATS, Berufseinsteiger, Kanada, Europa und die Golfregion.",
      builderTitle: "Kostenloser Live-Lebenslauf-Editor & ATS-PDF-Export | BATAPRO",
      builderDesc:
        "Bearbeiten Sie Ihren Lebenslauf in Echtzeit mit kostenloser KI-Optimierung und unbegrenztem PDF-Export.",
      guidesTitle: "Lebenslauf & ATS Karriere-Guides 2026 | BATAPRO",
      guidesDesc:
        "Praxisnahe Tipps für ATS-Lebensläufe 2026 und internationale Bewerbungsstandards.",
    },
    hero: {
      badge: "100% Kostenlos • Keine Wasserzeichen • Keine Kreditkarte",
      title: "Erstellen Sie ATS-Optimierte Lebensläufe 100% Kostenlos mit BATAPRO",
      subtitle:
        "Sofort ohne Registrierung starten. Wechseln Sie zwischen Arabisch (RTL), Französisch, Englisch und Deutsch und laden Sie unbegrenzt Vektor-PDFs herunter.",
      ctaPrimary: "Jetzt Kostenlos Starten",
      ctaSecondary: "Gratis Vorlagen Ansehen",
      trustNote: "Lokale Auto-Speicherung • Echter ATS-Vektor-Text • Optionaler Cloud-Sync",
    },
    builder: {
      personal: "Persönliches",
      summary: "Profil",
      experience: "Berufserfahrung",
      education: "Ausbildung",
      skills: "Kenntnisse",
      languages: "Sprachen",
      certifications: "Zertifikate",
      projects: "Projekte",
      aiEnhance: "Gratis KI-Optimierung",
      enhancing: "Optimiere...",
      exportPdf: "Gratis ATS-PDF Laden",
      printPdf: "A4 Drucken",
      autoSaved: "Lokal gespeichert",
      cloudSave: "Cloud-Sync",
      cvLang: "CV-Sprache",
      atsScore: "ATS-Score",
      addItem: "Hinzufügen",
      loadSample: "Beispiel Laden",
      newDraft: "Neuer CV",
      fontStyle: "Schrift",
    },
    cvSections: {
      summary: "Berufsprofil",
      experience: "Berufserfahrung",
      education: "Akademische Ausbildung",
      skills: "Kernkompetenzen",
      languages: "Sprachen",
      certifications: "Zertifikate",
      projects: "Projekte",
      present: "Heute",
      gpa: "Note",
      nationality: "Staatsangehörigkeit",
    },
    faq: [
      {
        q: "Ist BATAPRO wirklich 100% kostenlos?",
        a: "Ja, alle Vorlagen, KI-Funktionen und A4-PDF-Exporte sind dauerhaft kostenlos.",
      },
      {
        q: "Bestehen die PDFs ATS-Systeme?",
        a: "Ja, BATAPRO erzeugt echten selektierbaren Vektor-Text.",
      },
    ],
    howToSteps: [
      { name: "Kostenlose Vorlage wählen", text: "Wählen Sie aus ATS-, modernen oder regionalen Formaten." },
      { name: "Live bearbeiten & mit KI optimieren", text: "Automatisch lokal gespeichert." },
      { name: "Vektor-PDF herunterladen", text: "Unbegrenzt und ohne Wasserzeichen." },
    ],
  },
};

export function getDictionary(lang?: string | null): UiDictionary {
  if (lang && lang in DICTIONARIES) {
    return DICTIONARIES[lang as LanguageCode];
  }
  return DICTIONARIES.en;
}
