"use client";

import { Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* ---------------------------------------------------------------- data ---- */

type SkillGroup = {
  title: string;
  skills: string[];
};

/** Placeholder groups — replace titles and skill labels with your real stack. */
const GROUPS: SkillGroup[] = [
  {
    title: "Placeholder Group One",
    skills: [
      "Skill One",
      "Skill Two",
      "Skill Three",
      "Skill Four",
      "Skill Five",
      "Skill Six",
      "Skill Seven",
      "Skill Eight",
    ],
  },
  {
    title: "Placeholder Group Two",
    skills: [
      "Tool One",
      "Tool Two",
      "Tool Three",
      "Tool Four",
      "Tool Five",
      "Tool Six",
      "Tool Seven",
      "Tool Eight",
    ],
  },
  {
    title: "Placeholder Group Three",
    skills: [
      "Service One",
      "Service Two",
      "Service Three",
      "Service Four",
      "Service Five",
      "Service Six",
      "Service Seven",
      "Service Eight",
    ],
  },
];

const DISPLAY_FONT = "var(--font-display), ui-sans-serif, system-ui, sans-serif";

/* ------------------------------------------------------------- component --- */

/** Three columns of skill chips, each chip carrying a tinted initial glyph. */
export function Skills() {
  return (
    <SectionShell id="skills" ariaLabel="Skills">
      <SectionHeader
        eyebrow="Tech Arsenal"
        heading="Skills"
        description="A short description of this section goes here."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {GROUPS.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            delay={groupIndex * 0.08}
            className="flex h-full flex-col gap-4"
            style={{
              padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
              borderRadius: "var(--radius)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="h-card">{group.title}</h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, skillIndex) => (
                <Reveal key={skill} delay={skillIndex * 0.05}>
                  <span
                    className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border py-1.5 pl-1.5 pr-3.5 text-sm transition-colors duration-300"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--card)",
                      color: "var(--foreground-soft)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-7 w-7 flex-none place-items-center text-xs font-semibold"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        background: "var(--primary-glow)",
                        color: "var(--primary-text)",
                        fontFamily: DISPLAY_FONT,
                      }}
                    >
                      {skill.charAt(0).toUpperCase()}
                    </span>
                    {skill}
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
