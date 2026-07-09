---
id: industry-benchmarking
title: "Industry benchmarking collaboration"
category: usability
recommended: false
stages:
  - benchmarking
  - community_maintenance
summary: "Coordinate a large-scale collaborative benchmarking exercise with industry partners, evaluating OpenFF force fields on real datasets and revealing key areas of improvement."
fte:
  infrastructure: 6
  science_code: 0
  science_exp: 0
  other: 2
timeline:
  - milestone: "Industry participants confirmed and on board"
    date: "Q3 2026"
  - milestone: "Standardised benchmarks running across partner datasets"
    date: "Q4 2026"
  - milestone: "Results compiled and shared with all participating partners"
    date: "Q1 2027"
  - milestone: "Publication or public report released (with partner approval)"
    date: "Q2 2027"
metrics:
  - "At least 3 industry consortium members participating with proprietary protein-ligand benchmark datasets"
  - "Results published or shared publicly with partner approval"
go_no_go:
  - gate: "Q3 2026"
    condition: "At least 3 industry partners have confirmed participation with datasets of sufficient size and quality; if fewer than 3 partners commit or datasets are inadequate, reassess scope before proceeding"
dependencies: []
enables: []
---

## Goals

- Recruit industry members willing to contribute datasets and time
- Design a shared benchmark protocol acceptable to all partners: standardised simulation workflows, analysis pipelines, and reporting formats. Agree on scope wrt QM-only or RBFEs
- Run standardised benchmarks using OpenFF force fields
- Compile, analyse, and share results with all participants; publish findings publicly

## Benefits

A collaborative benchmarking exercise both gives OpenFF the best view into areas where it can improve performance, as well as getting working workflows and infrastructure installed onto partner machines.
