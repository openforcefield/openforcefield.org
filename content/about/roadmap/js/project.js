/**
 * OpenFF Roadmap — Project Detail Page Renderer
 * Reads ?id= from URL, finds project in PROJECTS, renders all sections.
 */

import { PROJECTS, CATEGORIES, PROJECT_MAP, ALL_STAGES, STAGE_LABELS,
         MATURITY_LABELS } from "../data/projects.js";
import { totalFTE, projectURL, MATURITY_COLORS } from "./utils.js";

// Stage icons (inline SVG paths)
const STAGE_ICONS = {
  infra_updates:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  data_generation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  fitting:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  benchmarking:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  release:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>`,
  community_maintenance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
};

export function initProject() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id || !PROJECT_MAP[id]) {
    renderNotFound(id);
    return;
  }

  const project = PROJECT_MAP[id];
  const idx = PROJECTS.findIndex(p => p.id === id);

  document.title = `${project.title} — OpenFF Roadmap`;

  renderBreadcrumb(project);
  renderHero(project);
  renderPipeline(project);
  renderGoalsAndFTE(project);
  renderTimeline(project);
  renderMetrics(project);
  renderGoNoGo(project);
  renderDependencies(project);
  renderProjectNav(idx);
}

// ---- Breadcrumb --------------------------------------------
function renderBreadcrumb(p) {
  const el = document.getElementById("breadcrumb");
  if (!el) return;
  const cat = CATEGORIES[p.category] || CATEGORIES.infrastructure;
  el.innerHTML = `
    <a href="index.html">OpenFF Roadmap</a>
    <span class="sep">/</span>
    <span>${cat.label}</span>
    <span class="sep">/</span>
    <span class="current">${p.title}</span>
  `;
}

// ---- Hero --------------------------------------------------
function renderHero(p) {
  const el = document.getElementById("project-hero");
  if (!el) return;
  const cat = CATEGORIES[p.category] || CATEGORIES.infrastructure;
  const matColor = MATURITY_COLORS[p.maturity] || "#94a3b8";

  el.innerHTML = `
    <div class="hero-badges">
      <span class="badge badge--cat-${p.category}">${cat.label}</span>
      ${p.recommended
        ? '<span class="badge badge--recommended">✓ Recommended</span>'
        : '<span class="badge badge--alt">Alternative proposal</span>'}
    </div>
    <h1 class="hero-title">${p.title}</h1>
    <p class="hero-summary">${p.summary}</p>
  `;
}

// ---- Pipeline stepper --------------------------------------
function renderPipeline(p) {
  const el = document.getElementById("pipeline-stepper");
  if (!el) return;
  const activeStages = new Set(p.stages || []);

  el.innerHTML = ALL_STAGES.map(stage => {
    const active = activeStages.has(stage);
    return `
      <div class="pipeline-stage ${active ? "active" : "inactive"}">
        <div class="stage-dot-wrap">
          ${STAGE_ICONS[stage] || ""}
        </div>
        <span class="stage-label">${STAGE_LABELS[stage]}</span>
      </div>
    `;
  }).join("");
}

// ---- Goals & FTE -------------------------------------------
function renderGoalsAndFTE(p) {
  const goalsEl = document.getElementById("project-goals");
  const fteEl   = document.getElementById("project-fte");

  if (goalsEl) {
    goalsEl.innerHTML = `<div class="body-html">${p.body_html || "<p class='text-muted'>No description available.</p>"}</div>`;
  }

  if (fteEl) {
    const fte = p.fte || {};
    const infra = fte.infrastructure || 0;
    const code  = fte.science_code   || 0;
    const exp   = fte.science_exp    || 0;
    const other = fte.other          || 0;
    const total = infra + code + exp + other;
    const maxVal = Math.max(infra, code, exp, other, 1);

    fteEl.innerHTML = `
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
        <h2>FTE Required</h2>
      </div>
      ${fteRow("Science (new code)", code, maxVal, "science-code")}
      ${fteRow("Science (experiments)", exp, maxVal, "science-exp")}
      ${fteRow("Infrastructure (new and ongoing)", infra, maxVal, "infrastructure")}
      ${other > 0 ? fteRow("Project management", other, maxVal, "other") : ""}
      <div class="fte-total">
        <span class="fte-total-label">Total estimated effort</span>
        <span class="fte-total-value">${total} mo</span>
      </div>
    `;
  }
}

function fteRow(label, value, maxVal, cls) {
  const pct = maxVal > 0 ? Math.round((value / maxVal) * 100) : 0;
  return `
    <div class="fte-row">
      <div class="fte-label">
        <span class="fte-label-name">${label}</span>
        <span class="fte-label-value">${value} mo</span>
      </div>
      <div class="fte-bar-bg">
        <div class="fte-bar-fill ${cls}" style="width:${pct}%"></div>
      </div>
    </div>
  `;
}

// ---- Timeline ----------------------------------------------
function renderTimeline(p) {
  const el = document.getElementById("project-timeline");
  if (!el) return;
  const milestones = p.timeline || [];

  if (milestones.length === 0) {
    el.innerHTML = `<p class="text-muted text-sm">No milestones defined yet.</p>`;
    return;
  }

  el.innerHTML = `
    <div class="timeline-track">
      ${milestones.map(m => `
        <div class="timeline-milestone">
          <div class="milestone-dot"></div>
          <div class="milestone-date">${m.date}</div>
          <div class="milestone-label">${m.milestone}</div>
        </div>
      `).join("")}
    </div>
  `;
}

// ---- Metrics -----------------------------------------------
function renderMetrics(p) {
  const el = document.getElementById("project-metrics");
  if (!el) return;
  const metrics = p.metrics || [];

  if (metrics.length === 0) {
    el.innerHTML = `<p class="text-muted text-sm">No metrics defined yet.</p>`;
    return;
  }

  el.innerHTML = `
    <ul class="metrics-list">
      ${metrics.map(m => `<li>${m}</li>`).join("")}
    </ul>
  `;
}

// ---- Go/No-Go ----------------------------------------------
function renderGoNoGo(p) {
  const el = document.getElementById("project-gonogo");
  if (!el) return;
  const gates = p.go_no_go || [];

  if (gates.length === 0) {
    el.innerHTML = `<p class="text-muted text-sm">No go/no-go gates defined yet.</p>`;
    return;
  }

  el.innerHTML = `
    <div class="gonogo-list">
      ${gates.map(g => `
        <div class="gonogo-gate">
          <span class="gate-date">${g.gate}</span>
          <span class="gate-condition">${g.condition}</span>
        </div>
      `).join("")}
    </div>
  `;
}

// ---- Dependencies & Unlocks --------------------------------
function renderDependencies(p) {
  const el = document.getElementById("project-deps");
  if (!el) return;
  const deps    = (p.dependencies || []).map(id => PROJECT_MAP[id]).filter(Boolean);
  const enables = (p.enables || []).map(id => PROJECT_MAP[id]).filter(Boolean);

  let html = "";

  if (deps.length > 0) {
    html += `
      <div class="section-header mt-4">
        <h2>Depends On</h2>
      </div>
      <div class="deps-grid">${deps.map(depCard).join("")}</div>
    `;
  }

  if (enables.length > 0) {
    html += `
      <div class="section-header mt-6">
        <h2>Unlocks</h2>
      </div>
      <div class="deps-grid">${enables.map(depCard).join("")}</div>
    `;
  }

  if (!html) {
    html = `<p class="deps-empty">No project dependencies.</p>`;
  }

  el.innerHTML = html;
}

function depCard(proj) {
  const cat = CATEGORIES[proj.category] || CATEGORIES.infrastructure;
  return `
    <a href="${projectURL(proj.id)}" class="dep-card">
      <span class="dep-card-dot" style="background:${cat.color}"></span>
      ${proj.title}
      <span class="dep-card-arrow">→</span>
    </a>
  `;
}

// ---- Prev/Next navigation ----------------------------------
function renderProjectNav(idx) {
  const el = document.getElementById("project-nav");
  if (!el) return;

  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];

  el.innerHTML = `
    ${prev ? `
      <a href="${projectURL(prev.id)}" class="project-nav-link prev">
        ← <span>
          <span class="nav-link-label">Previous</span>
          <span class="nav-link-title">${prev.title}</span>
        </span>
      </a>` : '<span></span>'}
    ${next ? `
      <a href="${projectURL(next.id)}" class="project-nav-link next">
        <span>
          <span class="nav-link-label">Next</span>
          <span class="nav-link-title">${next.title}</span>
        </span> →
      </a>` : ''}
  `;
}

// ---- Not found ---------------------------------------------
function renderNotFound(id) {
  document.getElementById("project-hero")?.replaceWith(
    Object.assign(document.createElement("div"), {
      className: "project-hero",
      innerHTML: `<h1 class="hero-title">Project not found</h1>
        <p class="hero-summary">No project with id "<code>${id || "(none)"}</code>" was found.
        <a href="index.html">← Return to overview</a></p>`
    })
  );
  ["pipeline-stepper","project-goals","project-fte","project-timeline",
   "project-metrics","project-gonogo","project-deps","project-nav"]
    .forEach(id => { const el = document.getElementById(id); if (el) el.remove(); });
}
