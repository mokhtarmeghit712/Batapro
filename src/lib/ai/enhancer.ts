import { LanguageCode } from "@/lib/i18n/config";

const WEAK_TO_STRONG_EN: [RegExp, string][] = [
  [/^(i\s+)?worked on\b/i, "Engineered and delivered"],
  [/^(i\s+)?helped (with|to)\b/i, "Collaborated across teams to accelerate"],
  [/^(i\s+)?was responsible for\b/i, "Spearheaded end-to-end execution of"],
  [/^(i\s+)?made\b/i, "Architected and launched"],
  [/^(i\s+)?managed\b/i, "Directed and optimized"],
  [/^(i\s+)?used\b/i, "Leveraged"],
  [/^(i\s+)?fixed\b/i, "Resolved critical bottlenecks in"],
  [/^(i\s+)?did\b/i, "Executed"],
];

const WEAK_TO_STRONG_FR: [RegExp, string][] = [
  [/^(j'ai\s+)?travaillé sur\b/i, "Conçu et déployé"],
  [/^(j'ai\s+)?aidé à\b/i, "Contribué activement à l'optimisation de"],
  [/^(j'étais\s+)?chargé(e)? de\b/i, "Piloté de bout en bout"],
  [/^(j'ai\s+)?fait\b/i, "Réalisé et mis en production"],
  [/^(j'ai\s+)?géré\b/i, "Supervisé et optimisé"],
];

const WEAK_TO_STRONG_AR: [RegExp, string][] = [
  [/^عملت على\b/, "صمّمت وطوّرت بكفاءة"],
  [/^ساعدت في\b/, "ساهمت بفاعلية في تسريع وتطوير"],
  [/^كنت مسؤولاً عن\b/, "تولّيت القيادة التنفيذية الكاملة لـ"],
  [/^قمت بـ?\s*/, "نفّذت وأنجزت"],
];

function deterministicEnhance(text: string, lang: LanguageCode, kind: "bullet" | "summary"): string {
  const cleaned = text.trim();
  if (!cleaned) return text;

  if (kind === "summary") {
    if (lang === "ar") {
      return cleaned.endsWith(".")
        ? `${cleaned} تركيز عالٍ على تحقيق نتائج قابلة للقياس وتحسين الكفاءة التشغيلية.`
        : `${cleaned}. تركيز عالٍ على تحقيق نتائج قابلة للقياس وتحسين الكفاءة التشغيلية.`;
    }
    if (lang === "fr") {
      return `${cleaned.replace(/\.$/, "")}. Orienté résultats avec une capacité prouvée à livrer des projets à fort impact et à optimiser les performances.`;
    }
    return `${cleaned.replace(/\.$/, "")}. Proven track record of delivering measurable business impact, accelerating execution speed, and maintaining high quality standards.`;
  }

  let enhanced = cleaned;
  const rules =
    lang === "ar"
      ? WEAK_TO_STRONG_AR
      : lang === "fr"
      ? WEAK_TO_STRONG_FR
      : WEAK_TO_STRONG_EN;

  let matched = false;
  for (const [pattern, replacement] of rules) {
    if (pattern.test(enhanced)) {
      enhanced = enhanced.replace(pattern, replacement);
      matched = true;
      break;
    }
  }

  if (!matched) {
    if (lang === "ar") {
      enhanced = `تطوير وتحسين ${enhanced}`;
    } else if (lang === "fr") {
      enhanced = `Optimisé et piloté ${enhanced.charAt(0).toLowerCase()}${enhanced.slice(1)}`;
    } else {
      enhanced = `Spearheaded ${enhanced.charAt(0).toLowerCase()}${enhanced.slice(1)}`;
    }
  }

  if (!/\d/.test(enhanced)) {
    if (lang === "ar") {
      enhanced += "، مما ساهم في رفع الكفاءة بنسبة 25%";
    } else if (lang === "fr") {
      enhanced += ", améliorant l'efficacité opérationnelle de 25%";
    } else {
      enhanced += ", improving team efficiency and delivery reliability by 25%";
    }
  }

  return enhanced;
}

export async function enhanceTextWithAI(
  text: string,
  lang: LanguageCode,
  kind: "bullet" | "summary"
): Promise<{ enhanced: string; source: "openai" | "batapro-free-ats-engine" }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const langLabel =
        lang === "ar" ? "Arabic" : lang === "fr" ? "French" : lang === "es" ? "Spanish" : lang === "de" ? "German" : "English";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 180,
          messages: [
            {
              role: "system",
              content: `You are an elite ATS resume writer. Rewrite the user's CV ${kind} in ${langLabel} using strong action verbs, concise wording, and measurable impact. Return ONLY the improved text.`,
            },
            { role: "user", content: text },
          ],
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const output = json?.choices?.[0]?.message?.content?.trim();
        if (output) return { enhanced: output, source: "openai" };
      }
    } catch {
      // Fallback cleanly to free built-in ATS enhancer
    }
  }

  return {
    enhanced: deterministicEnhance(text, lang, kind),
    source: "batapro-free-ats-engine",
  };
}
