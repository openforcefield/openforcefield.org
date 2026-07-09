---
id: data-driven-smirks
title: "Data-driven SMIRKS typing"
category: accuracy
recommended: false
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Develop a data-driven approach to generate SMIRKS atom-typing patterns, moving beyond hand-crafted rules to a more systematic typing scheme. Current experiments suggest that adding thousands of specific terms, especially torsions, substantially improves the performance of Sage on small molecule benchmarks and does not systematically decrease performance on physical property benchmarks."
fte:
  infrastructure: 0
  science_code: 1
  science_exp: 6
timeline:
  - milestone: "SMIRKS generation and clustering workflow prototyped and validated"
    date: "Q3 2026"
  - milestone: "Algorithm integrated with smee/descent; end-to-end fit on small test system complete"
    date: "Q4 2026"
  - milestone: "Full drug-like chemical space force field fit with data-driven SMIRKS benchmarked"
    date: "Q1 2027"
  - milestone: "Force field released if benchmarks are competitive"
    date: "Q2 2027"
metrics:
  - "Force field fit with data-driven SMIRKS matches or exceeds Sage on behcnmarks"
  - "SMIRKS generation process is fully automated, version-controlled, and reproducible"
go_no_go:
  - gate: "Q1 2027"
    condition: "Data-driven SMIRKS force field benchmarks show performance competitive with Sage"
dependencies:
  - smee-descent
enables: []
---

## Goals

- Develop an automated algorithm to generate SMIRKS chemical environment patterns from QM data, moving beyond hand-crafted expert rules
- Integrate the algorithm with the smee/descent fitting pipeline to enable end-to-end automated type assignment and parameter fitting
- Benchmark
- Release a data-driven SMIRKS force field if benchmarks are competitive

## Benefits

Current SMIRNOFF force fields rely entirely on hand-crafted SMIRKS patterns developed by expert chemists. While these patterns encode substantial domain knowledge, they are time-consuming to develop, difficult to systematically improve, and can leave coverage gaps for unusual chemical environments encountered in modern drug discovery.

An automated data-driven approach could discover optimal chemical environment distinctions directly from QM data, potentially improving transferability and coverage while substantially reducing the expert curation burden for future force field development cycles. This is particularly valuable for extending OpenFF to new chemical domains (e.g. lipids). The Cole group has done some experimentation with this with hyper-specific SMIRKS, and seen some performance improvements when applied to torsions. We may be able to cluster these to reduce the number of parameters.
