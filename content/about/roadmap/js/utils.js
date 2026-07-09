// Shared utilities — imported by graph.js and project.js

export const CATEGORIES = {
  infrastructure: { label: "Infrastructure / Fitting Pipeline", color: "#6366f1" },
  domain:         { label: "Domain Expansion",                  color: "#10b981" },
  accuracy:       { label: "Accuracy Improvements",             color: "#f59e0b" },
  benchmarking:   { label: "Benchmarking",                      color: "#3b82f6" },
  usability:      { label: "Usability / Community",             color: "#ec4899" },
};

export const MATURITY_COLORS = {
  early: "#f97316",
  mid:   "#eab308",
  late:  "#22c55e",
  end:   "#94a3b8",
  full:  "#a78bfa",
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
 * Returns the earliest date string from a project's timeline, or null.
 */
export function earliestMilestone(project) {
  const t = project.timeline || [];
  return t.length > 0 ? t[0].date : null;
}

/**
 * Returns the latest date string from a project's timeline, or null.
 */
export function latestMilestone(project) {
  const t = project.timeline || [];
  return t.length > 0 ? t[t.length - 1].date : null;
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
  return `project.html?id=${id}`;
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
