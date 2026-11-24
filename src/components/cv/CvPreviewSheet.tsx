"use client";

import React from "react";
import { CvData, CvFontStyle } from "@/types/cv";
import { getDirectionForLang, LanguageCode } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getBuiltinTemplate } from "@/lib/templates/catalog";

interface CvPreviewSheetProps {
  data: CvData;
  templateSlug: string;
  language: LanguageCode;
  accentColor?: string;
  fontSize?: "sm" | "md" | "lg";
  fontStyle?: CvFontStyle;
}

export function CvPreviewSheet({
  data,
  templateSlug,
  language,
  accentColor,
  fontSize = "md",
  fontStyle = "sans",
}: CvPreviewSheetProps) {
  const dir = getDirectionForLang(language);
  const dict = getDictionary(language);
  const meta = getBuiltinTemplate(templateSlug);
  const primaryColor = accentColor || meta.accentColor || "#0f172a";

  const sizeClass =
    fontSize === "sm"
      ? "text-[10.5px] leading-[1.42]"
      : fontSize === "lg"
      ? "text-[12.5px] leading-[1.52]"
      : "text-[11.5px] leading-[1.48]";

  const fontClass =
    language === "ar" || fontStyle === "arabic"
      ? "font-arabic"
      : fontStyle === "serif"
      ? "font-serif"
      : "font-sans";

  const showPhoto = meta.supportsPhoto && Boolean(data.personal.photoUrl);

  const SectionTitle = ({ title }: { title: string }) => (
    <h2
      className="mb-2 border-b pb-1 text-[11px] font-bold uppercase tracking-wider"
      style={{ color: primaryColor, borderColor: `${primaryColor}35` }}
    >
      {title}
    </h2>
  );

  const renderExperience = () =>
    data.experience.length > 0 && (
      <section className="mb-4">
        <SectionTitle title={dict.cvSections.experience} />
        <div className="space-y-3">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-slate-900">
                  {exp.role}{" "}
                  {exp.company && (
                    <span className="font-semibold text-slate-700">— {exp.company}</span>
                  )}
                </h3>
                <span className="text-[10px] font-medium text-slate-500">
                  {exp.startDate} – {exp.current ? dict.cvSections.present : exp.endDate}
                </span>
              </div>
              {exp.location && <p className="mb-1 text-[10px] text-slate-500">{exp.location}</p>}
              <ul className="list-disc space-y-0.5 ps-4 text-slate-700">
                {exp.bullets.filter(Boolean).map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );

  const renderEducation = () =>
    data.education.length > 0 && (
      <section className="mb-4">
        <SectionTitle title={dict.cvSections.education} />
        <div className="space-y-2">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                <span className="text-[10px] text-slate-500">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <p className="text-slate-700">
                {edu.institution}
                {edu.location ? ` • ${edu.location}` : ""}
              </p>
              {(edu.gpa || edu.honors) && (
                <p className="text-[10px] text-slate-500">
                  {edu.gpa ? `${dict.cvSections.gpa}: ${edu.gpa}` : ""}
                  {edu.gpa && edu.honors ? " • " : ""}
                  {edu.honors || ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderProjects = () =>
    data.projects.length > 0 && (
      <section className="mb-4">
        <SectionTitle title={dict.cvSections.projects} />
        <div className="space-y-2">
          {data.projects.map((p) => (
            <div key={p.id}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-bold text-slate-900">
                  {p.name}
                  {p.role ? <span className="font-normal text-slate-600"> ({p.role})</span> : null}
                </h3>
                {p.link && <span className="text-[10px] text-slate-500">{p.link}</span>}
              </div>
              <p className="text-slate-700">{p.summary}</p>
            </div>
          ))}
        </div>
      </section>
    );

  const renderSkillsInline = () =>
    data.skills.length > 0 && (
      <section className="mb-4">
        <SectionTitle title={dict.cvSections.skills} />
        <p className="text-slate-700">{data.skills.join(" • ")}</p>
      </section>
    );

  const renderSkillsBadges = (darkBg = false) =>
    data.skills.length > 0 && (
      <section className="mb-4">
        <h2
          className={`mb-2 border-b pb-1 text-[10.5px] font-bold uppercase tracking-wider ${
            darkBg ? "border-white/25 text-white" : ""
          }`}
          style={!darkBg ? { color: primaryColor, borderColor: `${primaryColor}35` } : undefined}
        >
          {dict.cvSections.skills}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                darkBg
                  ? "bg-white/15 text-white"
                  : "bg-slate-100 text-slate-800 border border-slate-200"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );

  const renderLanguages = (darkBg = false) =>
    data.languages.length > 0 && (
      <section className="mb-4">
        <h2
          className={`mb-2 border-b pb-1 text-[10.5px] font-bold uppercase tracking-wider ${
            darkBg ? "border-white/25 text-white" : ""
          }`}
          style={!darkBg ? { color: primaryColor, borderColor: `${primaryColor}35` } : undefined}
        >
          {dict.cvSections.languages}
        </h2>
        <ul className="space-y-1">
          {data.languages.map((l) => (
            <li key={l.id} className="flex justify-between gap-2 text-[10.5px]">
              <span className={darkBg ? "font-semibold text-white" : "font-semibold text-slate-800"}>
                {l.name}
              </span>
              <span className={darkBg ? "text-white/80" : "text-slate-500"}>{l.level}</span>
            </li>
          ))}
        </ul>
      </section>
    );

  const renderCertifications = (darkBg = false) =>
    data.certifications.length > 0 && (
      <section className="mb-4">
        <h2
          className={`mb-2 border-b pb-1 text-[10.5px] font-bold uppercase tracking-wider ${
            darkBg ? "border-white/25 text-white" : ""
          }`}
          style={!darkBg ? { color: primaryColor, borderColor: `${primaryColor}35` } : undefined}
        >
          {dict.cvSections.certifications}
        </h2>
        <ul className="space-y-1.5">
          {data.certifications.map((c) => (
            <li key={c.id} className="text-[10.5px]">
              <div className={darkBg ? "font-semibold text-white" : "font-semibold text-slate-800"}>
                {c.name}
              </div>
              <div className={darkBg ? "text-white/75" : "text-slate-500"}>
                {c.issuer} {c.year ? `(${c.year})` : ""}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );

  if (meta.layoutVariant === "two-col-sidebar") {
    return (
      <div
        id="cv-print-root"
        dir={dir}
        className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-lg flex ${sizeClass} ${fontClass}`}
      >
        <aside
          className="w-[33%] p-6 text-white flex flex-col justify-between"
          style={{ backgroundColor: primaryColor }}
        >
          <div>
            {showPhoto && (
              <img
                src={data.personal.photoUrl}
                alt={data.personal.fullName}
                className="mb-4 h-24 w-24 rounded-full object-cover border-2 border-white/40"
              />
            )}
            <h1 className="text-xl font-bold leading-tight text-white">
              {data.personal.fullName}
            </h1>
            <p className="mt-1 text-xs font-medium text-white/85">{data.personal.jobTitle}</p>

            <div className="mt-5 space-y-1.5 text-[10.5px] text-white/90 border-t border-white/20 pt-4">
              {data.personal.email && <div>{data.personal.email}</div>}
              {data.personal.phone && <div>{data.personal.phone}</div>}
              {data.personal.location && <div>{data.personal.location}</div>}
              {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
              {data.personal.website && <div>{data.personal.website}</div>}
            </div>

            <div className="mt-6">
              {renderSkillsBadges(true)}
              {renderLanguages(true)}
              {renderCertifications(true)}
            </div>
          </div>
        </aside>

        <div className="w-[67%] p-7">
          {data.summary && (
            <section className="mb-5">
              <SectionTitle title={dict.cvSections.summary} />
              <p className="text-slate-700">{data.summary}</p>
            </section>
          )}
          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
        </div>
      </div>
    );
  }

  if (meta.layoutVariant === "two-col-header" || meta.layoutVariant === "regional-grid") {
    return (
      <div
        id="cv-print-root"
        dir={dir}
        className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-lg ${sizeClass} ${fontClass}`}
      >
        <header
          className="px-8 py-6 text-white flex items-center justify-between gap-4"
          style={{ backgroundColor: primaryColor }}
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.personal.fullName}</h1>
            <p className="mt-0.5 text-sm text-white/90 font-medium">{data.personal.jobTitle}</p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-white/85">
              {data.personal.email && <span>{data.personal.email}</span>}
              {data.personal.phone && <span>{data.personal.phone}</span>}
              {data.personal.location && <span>{data.personal.location}</span>}
              {data.personal.nationality && (
                <span>
                  {dict.cvSections.nationality}: {data.personal.nationality}
                </span>
              )}
              {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            </div>
          </div>
          {showPhoto && (
            <img
              src={data.personal.photoUrl}
              alt={data.personal.fullName}
              className="h-20 w-20 shrink-0 rounded-xl object-cover border-2 border-white/40"
            />
          )}
        </header>

        <div className="grid grid-cols-3 gap-6 p-8">
          <div className="col-span-2">
            {data.summary && (
              <section className="mb-4">
                <SectionTitle title={dict.cvSections.summary} />
                <p className="text-slate-700">{data.summary}</p>
              </section>
            )}
            {renderExperience()}
            {renderProjects()}
          </div>
          <div className="col-span-1 border-s border-slate-200 ps-5">
            {renderEducation()}
            {renderSkillsBadges(false)}
            {renderLanguages(false)}
            {renderCertifications(false)}
          </div>
        </div>
      </div>
    );
  }

  const educationFirst = meta.layoutVariant === "academic-first";

  return (
    <div
      id="cv-print-root"
      dir={dir}
      className={`w-[210mm] min-h-[297mm] bg-white px-9 py-8 text-slate-900 shadow-lg ${sizeClass} ${fontClass}`}
    >
      <header
        className="mb-5 border-b-2 pb-4 flex items-start justify-between gap-4"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: primaryColor }}>
            {data.personal.fullName}
          </h1>
          <p className="mt-0.5 text-sm font-semibold text-slate-700">{data.personal.jobTitle}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-slate-600">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>• {data.personal.phone}</span>}
            {data.personal.location && <span>• {data.personal.location}</span>}
            {data.personal.linkedin && <span>• {data.personal.linkedin}</span>}
            {data.personal.website && <span>• {data.personal.website}</span>}
          </div>
        </div>
        {showPhoto && (
          <img
            src={data.personal.photoUrl}
            alt={data.personal.fullName}
            className="h-20 w-20 rounded-lg object-cover border border-slate-200"
          />
        )}
      </header>

      {data.summary && (
        <section className="mb-4">
          <SectionTitle title={dict.cvSections.summary} />
          <p className="text-slate-700">{data.summary}</p>
        </section>
      )}

      {educationFirst ? (
        <>
          {renderEducation()}
          {renderExperience()}
          {renderProjects()}
        </>
      ) : (
        <>
          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
        </>
      )}

      {renderSkillsInline()}

      <div className="grid grid-cols-2 gap-6">
        <div>{renderLanguages(false)}</div>
        <div>{renderCertifications(false)}</div>
      </div>
    </div>
  );
}
