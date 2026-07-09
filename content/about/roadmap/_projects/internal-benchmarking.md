---
id: internal-benchmarking
title: "Wide-ranging internal benchmarking"
category: usability
recommended: true
stages:
  - benchmarking
summary: "Re-run comprehensive benchmarks of OpenFF force fields across QM, condensed phase, hydration free energies, solvation free energies, and relative binding free energies."
fte:
  infrastructure: 0.5
  science_code: 0
  science_exp: 1
timeline:
  - milestone: "Re-run and publish all benchmark results for OpenFF force fields"
    date: "Q3 2026"
  - milestone: "Re-run and publish benchmark results for public external force fields, e.g. GAFF, CGENFF"
    date: "Q4 2026"
metrics:
  - "All five benchmark categories covered: QM torsions, condensed-phase properties, HFEs, SFEs, RBFEs"
  - "Results compared against at least GAFF2"
  - "All benchmark datasets, scripts, and raw results publicly deposited for reproducibility"
  - "Identified failure modes documented at the SMIRKS level with sufficient detail to guide targeted fitting"
go_no_go:
  - gate: "Q3 2026"
    condition: "Benchmark infrastructure (YAMMBS for QM, Alchemiscale for FEs) operational and producing interpretable outputs; if systematic tooling issues block automated runs, resolve before expanding scope"
dependencies: []
enables: []
---

## Goals

- Re-run all benchmark categories for current Sage 2.x and any new force field releases from this development cycle
- Compare OpenFF performance against AMBER, CHARMM, and OPLS (?) on the same benchmark datasets
- Identify and document specific failure modes with enough chemical specificity to guide future fitting work

## Benefits

Our benchmarking procedures have updated enough that it is impossible to compare earlier benchmark results; this gives us, and the public, a good idea of where we stand.