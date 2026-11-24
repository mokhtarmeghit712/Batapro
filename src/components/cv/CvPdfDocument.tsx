"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, Font, pdf } from "@react-pdf/renderer";
import { CvData } from "@/types/cv";
import { getDirectionForLang, LanguageCode } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getBuiltinTemplate } from "@/lib/templates/catalog";

let fontsRegistered = false;
function ensureFontsRegistered() {
  if (fontsRegistered || typeof window === "undefined") return;
  const origin = window.location.origin;
  Font.register({
    family: "BataSans",
    fonts: [
      { src: `${origin}/fonts/tahoma.ttf`, fontWeight: "normal" },
      { src: `${origin}/fonts/tahomabd.ttf`, fontWeight: "bold" },
    ],
  });
  fontsRegistered = true;
}

function CvVectorPdfDocument({
  data,
  templateSlug,
  language,
  accentColor,
}: {
  data: CvData;
  templateSlug: string;
  language: LanguageCode;
  accentColor?: string;
}) {
  const dict = getDictionary(language);
  const meta = getBuiltinTemplate(templateSlug);
  const primary = accentColor || meta.accentColor || "#0f172a";
  const isRtl = getDirectionForLang(language) === "rtl";
  const align = isRtl ? "right" : "left";

  const styles = StyleSheet.create({
    page: {
      fontFamily: "BataSans",
      fontSize: 9.5,
      lineHeight: 1.45,
      paddingTop: 28,
      paddingBottom: 28,
      paddingHorizontal: 32,
      color: "#0f172a",
      backgroundColor: "#ffffff",
    },
    header: {
      borderBottomWidth: 2,
      borderBottomColor: primary,
      paddingBottom: 10,
      marginBottom: 12,
      textAlign: align,
    },
    name: {
      fontSize: 19,
      fontWeight: "bold",
      color: primary,
      textAlign: align,
    },
    jobTitle: {
      fontSize: 11,
      fontWeight: "bold",
      color: "#334155",
      marginTop: 2,
      textAlign: align,
    },
    contactLine: {
      fontSize: 8.5,
      color: "#475569",
      marginTop: 5,
      textAlign: align,
    },
    section: { marginBottom: 11 },
    sectionTitle: {
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: primary,
      borderBottomWidth: 1,
      borderBottomColor: "#cbd5e1",
      paddingBottom: 3,
      marginBottom: 6,
      textAlign: align,
    },
    rowBetween: {
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    boldText: { fontWeight: "bold", color: "#0f172a" },
    mutedText: { fontSize: 8.5, color: "#64748b" },
    bullet: { fontSize: 9.2, color: "#1e293b", marginTop: 2, textAlign: align },
    bodyText: { fontSize: 9.3, color: "#1e293b", textAlign: align },
  });

  const contactParts = [
    data.personal.email,
    data.personal.phone,
    data.personal.location,
    data.personal.linkedin,
    data.personal.website,
  ].filter(Boolean);

  return (
    <Document
      title={`${data.personal.fullName} - CV (BATAPRO)`}
      author={data.personal.fullName}
      subject={data.personal.jobTitle}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          <Text style={styles.jobTitle}>{data.personal.jobTitle}</Text>
          <Text style={styles.contactLine}>{contactParts.join("  |  ")}</Text>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.summary}</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.experience}</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 7 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.boldText}>
                    {exp.role} {exp.company ? `— ${exp.company}` : ""}
                  </Text>
                  <Text style={styles.mutedText}>
                    {exp.startDate} - {exp.current ? dict.cvSections.present : exp.endDate}
                  </Text>
                </View>
                {exp.location ? <Text style={styles.mutedText}>{exp.location}</Text> : null}
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {data.education.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.education}</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 5 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.boldText}>{edu.degree}</Text>
                  <Text style={styles.mutedText}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.bodyText}>
                  {edu.institution}
                  {edu.location ? ` — ${edu.location}` : ""}
                </Text>
                {edu.gpa || edu.honors ? (
                  <Text style={styles.mutedText}>
                    {[edu.gpa ? `${dict.cvSections.gpa}: ${edu.gpa}` : "", edu.honors]
                      .filter(Boolean)
                      .join(" • ")}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.skills}</Text>
            <Text style={styles.bodyText}>{data.skills.join("  •  ")}</Text>
          </View>
        ) : null}

        {data.projects.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.projects}</Text>
            {data.projects.map((p) => (
              <View key={p.id} style={{ marginBottom: 4 }}>
                <Text style={styles.boldText}>
                  {p.name} {p.role ? `(${p.role})` : ""}
                </Text>
                <Text style={styles.bodyText}>{p.summary}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.languages.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.languages}</Text>
            <Text style={styles.bodyText}>
              {data.languages.map((l) => `${l.name} (${l.level})`).join("  •  ")}
            </Text>
          </View>
        ) : null}

        {data.certifications.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dict.cvSections.certifications}</Text>
            {data.certifications.map((c) => (
              <Text key={c.id} style={styles.bullet}>
                • {c.name} — {c.issuer} {c.year ? `(${c.year})` : ""}
              </Text>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export async function downloadFreeAtsPdf(params: {
  data: CvData;
  templateSlug: string;
  language: LanguageCode;
  accentColor?: string;
  fileName?: string;
}) {
  ensureFontsRegistered();
  const blob = await pdf(
    <CvVectorPdfDocument
      data={params.data}
      templateSlug={params.templateSlug}
      language={params.language}
      accentColor={params.accentColor}
    />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download =
    params.fileName || `${(params.data.personal.fullName || "BATAPRO_CV").replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
