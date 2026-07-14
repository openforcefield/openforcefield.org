---
color: darkblue
title: "Roadmap"
---

<div class="roadmap">

The long-term roadmap for Open Force Field includes specific projects grouped into four broad objectives:

- **Domain Expansion** — Expanding the domain of bioorganic chemistry for which our force fields are parameterized. Starting with drug-like small molecules, then advancing to peptides and proteins, then lipids, then nucleic acids, then metalloorganic chemistry.
- **Accuracy Improvements** — Improving the accuracy of our parameters within the domain of chemistry that we cover.
- **Infrastructure** — Improving the software tools we use for fitting, to enable faster fitting experiments involving larger datasets and advanced fitting targets or methods.
- **Usability / Community** — Putting our software and models into the hands of real users and enabling them to advance their scientific programs.

The projects listed here are proposals developed by staff that represent our vision of steps we could take that move us toward our roadmap objectives. Projects that we believe to offer the most direct path toward value to the Open Force Field Consortium are listed first. Projects listed as "ALT" (dashed border) may be of interest to alternative funding sources.

Click any project to view details.

<link rel="stylesheet" href="css/main.css">

<section style="margin-top:3rem;">
  <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1.25rem; flex-wrap:wrap;">
    <h2 style="font-size:1rem; font-weight:600; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin:0;">
      All Projects
    </h2>
  </div>
  <div id="project-grid" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:1rem;"></div>
</section>

<script type="module">
  import { initTheme } from "./js/theme.js";
  initTheme();
  import { PROJECTS, CATEGORIES } from "./data/projects.js";
  import { totalFTE, projectURL } from "./js/utils.js";

  const grid = document.getElementById("project-grid");

  let sortKey = "recommended";
  let sortAsc = false; // default: recommended first = desc (true=recommended at top)

  function getValue(p, key) {
    switch (key) {
      case "recommended": return p.recommended ? 1 : 0;
      case "science_code": return p.fte?.science_code ?? 0;
      case "science_exp": return p.fte?.science_exp ?? 0;
      case "infrastructure": return p.fte?.infrastructure ?? 0;
      case "other": return p.fte?.other ?? 0;
      case "total": return totalFTE(p) ?? 0;
      case "enables": return (p.enables ?? []).length;
      default: return 0;
    }
  }

  function renderGrid() {
    const projects = [...PROJECTS].sort((a, b) => {
      const va = getValue(a, sortKey);
      const vb = getValue(b, sortKey);
      return sortAsc ? va - vb : vb - va;
    });

    grid.innerHTML = projects.map(p => {
      const cat = CATEGORIES[p.category] || CATEGORIES.infrastructure;
      const fte = totalFTE(p);
      return `
        <a href="${projectURL(p.id)}" class="card card-link" style="
          border-left: 3px ${p.recommended ? 'solid' : 'dotted'} ${cat.color};
          ${!p.recommended ? 'filter:saturate(0.35) opacity(0.85);' : ''}
        ">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; margin-bottom:0.5rem;">
            <span class="badge badge--cat-${p.category}" style="font-size:0.7rem;">${cat.label}</span>
            ${!p.recommended ? '<span class="badge badge--alt" style="font-size:0.7rem;">ALT</span>' : ''}
          </div>
          <h3 style="font-size:0.9rem; margin-bottom:0.5rem; line-height:1.4;">${p.title}</h3>
          <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:0.75rem; line-height:1.5;
            display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${p.summary}
          </p>
          <div style="display:flex; align-items:center; justify-content:flex-end; gap:0.5rem;">
            <div style="display:flex; gap:0.5rem; align-items:center;">
              ${fte ? (() => { const s = fte < 1 ? "S" : fte <= 4 ? "M" : "L"; const icons = "👤".repeat(fte < 1 ? 1 : fte <= 4 ? 2 : 3); return `<span class="text-xs text-muted" style="font-family:var(--font-mono);">${icons} ${s}</span>`; })() : ""}
            </div>
          </div>
        </a>
      `;
    }).join("");
  }

  // Initial render: recommended first (desc)
  renderGrid();
</script>

</div>
