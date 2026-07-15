// Shared utilities — imported by graph.js and project.js

/**
 * Reads a CSS custom property (declared on :root in css/main.css).
 */
export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export const MATURITY_COLORS = {
  early: cssVar("--mat-early"),
  mid:   cssVar("--mat-mid"),
  late:  cssVar("--mat-late"),
  end:   cssVar("--mat-end"),
  full:  cssVar("--mat-full"),
};

export const MATURITY_LABELS = {
  early: "Early Stage",
  mid:   "Mid Stage",
  late:  "Late Stage",
  end:   "End Stage",
  full:  "Full Pipeline",
};

export const ALL_STAGES = ["infra_updates", "data_generation", "fitting", "benchmarking", "release"];

export const STAGE_LABELS = {
  infra_updates:   "Infra Updates",
  data_generation: "Data Generation",
  fitting:         "Fitting",
  benchmarking:    "Benchmarking",
  release:         "Release",
};

/**
 * Returns total FTE in person-months for a project.
 */
export function totalFTE(project) {
  const f = project.fte || {};
  return (f.infrastructure || 0) + (f.science_code || 0) + (f.science_exp || 0) + (f.other || 0);
}

/**
 * Truncates a string to maxLen characters, adding ellipsis if needed.
 */
export function truncate(str, maxLen) {
  if (!str) return "";
  return str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;
}

/**
 * Returns the URL for a project's detail page.
 */
export function projectURL(id) {
  return `/about/roadmap/project/?id=${id}`;
}

/**
 * Hex color with alpha (0–1) as rgba string.
 */
export function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Whether a project is "full-stage" (all or most stages active).
 * Full-stage projects get larger nodes in the graph.
 */
export function isFullStage(project) {
  return (project.stages || []).length >= 4;
}
