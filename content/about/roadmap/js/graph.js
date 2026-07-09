/**
 * OpenFF Roadmap — Dependency Graph (Gantt-style)
 * X-axis: 5 pipeline stage columns (Infra Updates → Release)
 * Y-axis: category swimlanes; nodes span their active stage columns.
 * Interval scheduling avoids horizontal overlaps within each band.
 * D3.js v7 for SVG rendering.
 */

import { PROJECTS, CATEGORIES, PROJECT_MAP } from "../data/projects.js";
import {
  totalFTE, projectURL,
  hexAlpha, MATURITY_LABELS
} from "./utils.js";

// ---- Layout constants ----------------------------------------
const STAGE_ORDER = ["infra_updates","data_generation","fitting","benchmarking","release","community_maintenance"];
const STAGE_HEADER = {
  infra_updates:        "Upfront Infrastructure",
  data_generation:      "Data Generation",
  fitting:              "Fitting",
  benchmarking:         "Benchmarking",
  release:              "Release",
  community_maintenance:"Community & Maintenance",
};
const CAT_ORDER = ["infrastructure","domain","accuracy","usability"];

const LEFT_PAD    = 108;  // category label column
const TOP_PAD     = 52;   // stage header row height
const STAGE_COL_W = 158;  // px per stage column
const RIGHT_PAD   = 16;

const NODE_H      = 36;
const NODE_IPAD   = 7;    // inset from column boundary edges
const ROW_GAP     = 5;
const BAND_PAD_T  = 6;
const BAND_PAD_B  = 8;

// ---- State ---------------------------------------------------
let activeCategories = new Set(Object.keys(CATEGORIES));
let zoomBehavior     = null;
let svgSel           = null;

// ---- Entry point ---------------------------------------------
export function initGraph() {
  renderGraph();
  buildTooltip();
  window.addEventListener("resize", () => renderGraph());
}

// ---- Stage range [first, last] column indices ----------------
function stageRange(p) {
  const indices = (p.stages || [])
    .map(s => STAGE_ORDER.indexOf(s))
    .filter(i => i >= 0);
  if (!indices.length) return { first: 0, last: 0 };
  return { first: Math.min(...indices), last: Math.max(...indices) };
}

// ---- Node x/width from stage span ---------------------------
function nodeGeom(p) {
  const { first, last } = stageRange(p);
  const x = LEFT_PAD + first * STAGE_COL_W + NODE_IPAD;
  const w = (last - first + 1) * STAGE_COL_W - NODE_IPAD * 2;
  return { x, w, first, last };
}

// ---- Interval scheduling: non-overlapping row assignment ----
function assignRows(projects) {
  const rowEnd = [];           // rightmost X consumed in each row
  const result = {};
  const sorted = [...projects].sort((a, b) => {
    const ga = nodeGeom(a), gb = nodeGeom(b);
    return ga.x !== gb.x ? ga.x - gb.x : (ga.x + ga.w) - (gb.x + gb.w);
  });
  for (const p of sorted) {
    const { x, w } = nodeGeom(p);
    let row = rowEnd.findIndex(end => end <= x - 4);
    if (row === -1) { row = rowEnd.length; rowEnd.push(0); }
    rowEnd[row] = x + w;
    result[p.id] = row;
  }
  return result;
}

// ---- Full layout: band Y coords + per-node positions --------
function computeLayout() {
  let curY = TOP_PAD;
  const bands = {};
  const pos   = {};

  for (const cat of CAT_ORDER) {
    const projs  = PROJECTS.filter(p => p.category === cat);
    const rowMap = assignRows(projs);
    const rowCount = projs.length ? Math.max(...projs.map(p => rowMap[p.id])) + 1 : 1;
    const height = BAND_PAD_T + rowCount * NODE_H + (rowCount - 1) * ROW_GAP + BAND_PAD_B;
    bands[cat] = { y: curY, height, rowCount };

    for (const p of projs) {
      const row = rowMap[p.id] ?? 0;
      const { x, w } = nodeGeom(p);
      const cy = curY + BAND_PAD_T + row * (NODE_H + ROW_GAP) + NODE_H / 2;
      pos[p.id] = { x, y: cy, w, h: NODE_H };
    }
    curY += height;
  }
  return { pos, bands, totalH: curY };
}

// ---- Render --------------------------------------------------
function renderGraph() {
  const wrapper = document.getElementById("graph-wrapper");
  if (!wrapper) return;
  wrapper.querySelector("svg")?.remove();

  const { pos, bands, totalH } = computeLayout();
  const svgW = LEFT_PAD + STAGE_ORDER.length * STAGE_COL_W + RIGHT_PAD;
  const svgH = totalH + 20;

  svgSel = d3.select(wrapper)
    .append("svg")
    .attr("id", "graph-svg")
    .attr("viewBox", `0 0 ${svgW} ${svgH}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "820px");

  // Arrow markers per category
  const defs = svgSel.append("defs");
  for (const [catId, cat] of Object.entries(CATEGORIES)) {
    defs.append("marker")
      .attr("id", `arr-${catId}`)
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 9).attr("refY", 5)
      .attr("markerWidth", 6).attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path").attr("d", "M0 0 L10 5 L0 10 z").attr("fill", cat.color);
  }

  const mainG = svgSel.append("g").attr("id", "graph-main");

  // Zoom
  zoomBehavior = d3.zoom().scaleExtent([0.12, 3])
    .on("zoom", ev => mainG.attr("transform", ev.transform));
  svgSel.call(zoomBehavior);

  // Initial fit
  const wrapW = wrapper.clientWidth || 900;
  const scale = Math.min(wrapW / svgW, 820 / svgH, 1) * 0.95;
  svgSel.call(zoomBehavior.transform,
    d3.zoomIdentity
      .translate((wrapW - svgW * scale) / 2, (820 - svgH * scale) / 2)
      .scale(scale));

  // ---- Stage columns: alternating bg + header labels --------
  const stageG = mainG.append("g");
  STAGE_ORDER.forEach((stage, i) => {
    const colX = LEFT_PAD + i * STAGE_COL_W;
    stageG.append("rect")
      .attr("x", colX).attr("y", TOP_PAD - 8)
      .attr("width", STAGE_COL_W).attr("height", svgH - TOP_PAD + 4)
      .attr("fill", i % 2 === 0 ? "rgba(139,152,180,0.028)" : "rgba(0,0,0,0)")
      .attr("stroke", "rgba(139,152,180,0.09)")
      .attr("stroke-width", 0.5);
    stageG.append("text")
      .attr("x", colX + STAGE_COL_W / 2).attr("y", TOP_PAD - 20)
      .attr("text-anchor", "middle")
      .attr("font-family", "Inter,sans-serif").attr("font-size", "9.5")
      .attr("font-weight", "700").attr("letter-spacing", "0.07em")
      .attr("fill", "rgba(139,152,180,0.6)")
      .text(STAGE_HEADER[stage].toUpperCase());
  });

  // ---- Category band backgrounds + left labels --------------
  const bandG = mainG.append("g");
  for (const cat of CAT_ORDER) {
    const { y, height } = bands[cat];
    const ci = CATEGORIES[cat]; if (!ci) continue;
    // Band area
    bandG.append("rect")
      .attr("x", LEFT_PAD).attr("y", y)
      .attr("width", STAGE_ORDER.length * STAGE_COL_W).attr("height", height)
      .attr("fill", hexAlpha(ci.color, 0.04))
      .attr("stroke", hexAlpha(ci.color, 0.13))
      .attr("stroke-width", 0.5);
    // Left label block
    bandG.append("rect")
      .attr("x", 0).attr("y", y)
      .attr("width", LEFT_PAD - 1).attr("height", height)
      .attr("fill", hexAlpha(ci.color, 0.09));
    bandG.append("text")
      .attr("x", (LEFT_PAD - 1) / 2).attr("y", y + height / 2)
      .attr("transform", `rotate(-90,${(LEFT_PAD - 1) / 2},${y + height / 2})`)
      .attr("text-anchor", "middle")
      .attr("font-family", "Inter,sans-serif").attr("font-size", "9")
      .attr("font-weight", "700").attr("letter-spacing", "0.08em")
      .attr("fill", hexAlpha(ci.color, 0.72))
      .text(ci.label.toUpperCase());
  }

  // ---- Edges ------------------------------------------------
  const edgeG = mainG.append("g").attr("id", "edges");
  for (const p of PROJECTS) {
    for (const depId of (p.dependencies || [])) {
      const src = pos[depId], tgt = pos[p.id];
      if (!src || !tgt) continue;
      const srcP  = PROJECT_MAP[depId];
      const cat   = srcP?.category || "infrastructure";
      const color = (CATEGORIES[cat] || CATEGORIES.infrastructure).color;

      const x1 = src.x + src.w,  y1 = src.y;
      const x2 = tgt.x,           y2 = tgt.y;

      let d;
      if (x2 >= x1 - 5) {
        // Forward arrow: smooth S-curve
        const cx = (x1 + x2) / 2;
        d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`;
      } else {
        // Backward / same-column: route below both bands via rounded path
        const srcBand = bands[srcP?.category || "infrastructure"];
        const tgtBand = bands[p.category];
        const belowY = Math.max(
          srcBand ? srcBand.y + srcBand.height : y1 + 40,
          tgtBand ? tgtBand.y + tgtBand.height : y2 + 40
        ) + 18;
        d = `M${x1},${y1} C${x1+28},${y1} ${x1+28},${belowY} ${x1},${belowY}` +
            ` L${x2},${belowY}` +
            ` C${x2-28},${belowY} ${x2-28},${y2} ${x2},${y2}`;
      }

      edgeG.append("path")
        .attr("class", "edge-path")
        .attr("data-source", depId).attr("data-target", p.id)
        .attr("d", d)
        .attr("stroke", color).attr("stroke-opacity", 0.55).attr("stroke-width", 1.75)
        .attr("fill", "none").attr("marker-end", `url(#arr-${cat})`);
    }
  }

  // ---- Nodes ------------------------------------------------
  const nodeG = mainG.append("g").attr("id", "nodes");
  for (const p of PROJECTS) {
    const np = pos[p.id]; if (!np) continue;
    renderNode(nodeG, p, np);
  }
}

// ---- Node rendering -----------------------------------------
function renderNode(parent, p, { x, y, w, h }) {
  const cat   = CATEGORIES[p.category] || CATEGORIES.infrastructure;
  const color = cat.color;

  const g = parent.append("g")
    .attr("class", "node-group")
    .attr("data-id", p.id).attr("data-cat", p.category)
    .attr("transform", `translate(${x},${y - h / 2})`);

  // Background
  g.append("rect")
    .attr("class", "node-rect")
    .attr("width", w).attr("height", h)
    .attr("rx", 6).attr("ry", 6)
    .attr("fill", hexAlpha(color, p.recommended ? 0.16 : 0.07))
    .attr("stroke", color)
    .attr("stroke-width", p.recommended ? 1.5 : 1)
    .attr("stroke-dasharray", p.recommended ? "none" : "5,3")
    .attr("stroke-opacity", p.recommended ? 1 : 0.6);

  // FTE scale badge (top-left): person dots + S/M/L label
  const fte = totalFTE(p);
  if (fte > 0) {
    const { label, dots } = fteScale(fte);
    const bx = 4, by = 4;
    const DOT_R = 2.5, DOT_GAP = 6;
    for (let d = 0; d < dots; d++) {
      // Head
      g.append("circle")
        .attr("cx", bx + d * DOT_GAP + DOT_R).attr("cy", by + DOT_R)
        .attr("r", DOT_R).attr("fill", hexAlpha(color, 0.7));
      // Body arc (small semicircle below head)
      const bx2 = bx + d * DOT_GAP + DOT_R;
      g.append("path")
        .attr("d", `M${bx2 - DOT_R},${by + DOT_R * 2 + 1} a${DOT_R},${DOT_R} 0 0,1 ${DOT_R * 2},0`)
        .attr("fill", hexAlpha(color, 0.7));
    }
    // Scale label
    const labelX = bx + dots * DOT_GAP + 3;
    g.append("text")
      .attr("x", labelX).attr("y", by + 5)
      .attr("dominant-baseline", "middle")
      .attr("font-size", "8.5").attr("font-weight", "700")
      .attr("fill", hexAlpha(color, 0.85))
      .attr("font-family", "Inter,sans-serif")
      .attr("pointer-events", "none").text(label);
  }

  // Title text — vertically centered below FTE badge area when badge present
  const titleCY = fte > 0 ? Math.round(11 + (h - 11) / 2) : Math.round(h / 2);
  const textW  = w - 12;
  const textCX = 6 + textW / 2;
  const lines  = wrapText(p.title, textW, 11);
  const lineH  = 13;
  lines.forEach((line, i) => {
    const ly = titleCY + (i - (lines.length - 1) / 2) * lineH;
    g.append("text")
      .attr("x", textCX).attr("y", ly)
      .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
      .attr("font-size", "11").attr("font-weight", "600")
      .attr("fill", "var(--graph-node-text, #e2e8f0)")
      .attr("font-family", "Inter,sans-serif")
      .attr("pointer-events", "none").text(line);
  });

  g.on("click",      ()      => { window.location.href = projectURL(p.id); })
   .on("mouseenter", (event) => { showTooltip(event, p); highlightConnected(p.id); })
   .on("mousemove",  (event) => { positionTooltip(event); })
   .on("mouseleave", ()      => { hideTooltip(); clearHighlight(); });
}

// ---- FTE scale: S/M/L buckets + dot count -------------------
// Small: < 1 mo, Medium: 1–5 mo, Large: 6+ mo
function fteScale(total) {
  if (total < 1)  return { label: "S", dots: 1 };
  if (total <= 5) return { label: "M", dots: 2 };
  return           { label: "L", dots: 3 };
}

// ---- Text wrap (SVG) ----------------------------------------
function wrapText(text, maxPx, fontSize) {
  const cpl = Math.floor(maxPx / (fontSize * 0.56));
  if (text.length <= cpl) return [text];
  const words = text.split(" ");
  const lines = []; let cur = "";
  for (const w of words) {
    const cand = cur ? `${cur} ${w}` : w;
    if (cand.length > cpl && cur) { lines.push(cur); cur = w; if (lines.length >= 2) break; }
    else cur = cand;
  }
  if (cur && lines.length < 2) lines.push(cur);
  return lines;
}

// ---- Highlight connected nodes + edges ----------------------
function highlightConnected(id) {
  const conn = new Set([id]);
  document.querySelectorAll(".edge-path").forEach(e => {
    if (e.dataset.source === id || e.dataset.target === id) {
      conn.add(e.dataset.source); conn.add(e.dataset.target);
    }
  });
  document.querySelectorAll(".node-group").forEach(n => {
    n.classList.toggle("dimmed",       !conn.has(n.dataset.id));
    n.classList.toggle("highlighted",   conn.has(n.dataset.id));
  });
  document.querySelectorAll(".edge-path").forEach(e => {
    const c = e.dataset.source === id || e.dataset.target === id;
    e.classList.toggle("dimmed", !c); e.classList.toggle("highlighted", c);
  });
}
function clearHighlight() {
  document.querySelectorAll(".node-group,.edge-path")
    .forEach(el => el.classList.remove("dimmed", "highlighted"));
}

// ---- Tooltip ------------------------------------------------
let tooltip = null;
function buildTooltip() {
  tooltip = document.getElementById("graph-tooltip") ||
    document.body.appendChild(
      Object.assign(document.createElement("div"),
        { id: "graph-tooltip", className: "graph-tooltip" })
    );
}
function showTooltip(event, p) {
  if (!tooltip) return;
  const cat = CATEGORIES[p.category] || CATEGORIES.infrastructure;
  const f = p.fte || {}, total = totalFTE(p);
  tooltip.innerHTML = `
    <div class="tooltip-title">${p.title}</div>
    <div class="tooltip-badges">
      <span class="badge badge--cat-${p.category}">${cat.label}</span>
      ${!p.recommended ? '<span class="badge badge--alt">Alternative</span>' : ''}
    </div>
    <table class="tooltip-fte-table">
      <tr><td>Science (code)</td><td>${f.science_code   || 0} mo</td></tr>
      <tr><td>Science (exp.)</td><td>${f.science_exp    || 0} mo</td></tr>
      <tr><td>Infrastructure</td><td>${f.infrastructure || 0} mo</td></tr>
      ${f.other ? `<tr><td>Project management</td><td>${f.other} mo</td></tr>` : ""}
      <tr><td><strong>Total</strong></td><td><strong>${total} mo</strong></td></tr>
    </table>
    <a class="tooltip-link" href="${projectURL(p.id)}">View details →</a>`;
  positionTooltip(event);
  tooltip.classList.add("visible");
}
function positionTooltip(ev) {
  if (!tooltip) return;
  const x = ev.clientX + 16, y = ev.clientY - 10;
  const tw = tooltip.offsetWidth || 240, th = tooltip.offsetHeight || 160;
  tooltip.style.left = (x + tw > window.innerWidth  - 10 ? x - tw - 32 : x) + "px";
  tooltip.style.top  = (y + th > window.innerHeight - 10 ? y - th       : y) + "px";
}
function hideTooltip() { tooltip?.classList.remove("visible"); }

// ---- Zoom controls (exported) -------------------------------
export function zoomIn()    { svgSel?.transition().duration(200).call(zoomBehavior.scaleBy, 1.3); }
export function zoomOut()   { svgSel?.transition().duration(200).call(zoomBehavior.scaleBy, 1 / 1.3); }
export function zoomReset() {
  const wrapper = document.getElementById("graph-wrapper");
  if (!wrapper || !svgSel || !zoomBehavior) return;
  const { totalH } = computeLayout();
  const svgW = LEFT_PAD + STAGE_ORDER.length * STAGE_COL_W + RIGHT_PAD;
  const svgH = totalH + 20;
  const wrapW = wrapper.clientWidth || 900;
  const scale = Math.min(wrapW / svgW, 820 / svgH, 1) * 0.95;
  svgSel.transition().duration(300).call(zoomBehavior.transform,
    d3.zoomIdentity
      .translate((wrapW - svgW * scale) / 2, (820 - svgH * scale) / 2)
      .scale(scale));
}
