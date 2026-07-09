---
id: espaloma
title: "Espaloma"
category: accuracy
recommended: false
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Support academic collaborators developing Espaloma (enabling continuous typing with GNN parameterisation), and ensure OpenFF infrastructure can support continuous typing workflows."
fte:
  infrastructure: 2
  science_code: 0
  science_exp: 1
timeline:
  - milestone: "New modular infrastructure prototype software completed"
    date: "Q3 2026"
  - milestone: "Infrastructure requirements for continuous typing assessed; gaps identified"
    date: "Q4 2026"
go_no_go:
metrics:
  - "Academic collaborators have been supported with OpenFF needs"
dependencies: []
enables: []
---

## Goals

- Provide infrastructure support to academic collaborators as needed
- Assess the requirements for OpenFF tooling to support continuous typing: inference integration with Toolkit and Interchange, parameter export in SMIRNOFF-compatible formats

## Benefits

Espaloma represents a fundamentally different approach to force field parameterisation: rather than discrete atom types with hand-crafted SMIRKS patterns, a GNN assigns parameters continuously as a function of molecular graph environment. This removes the need for expert-curated chemical environment definitions and may offer better transferability across chemical space, particularly for underrepresented functional groups.

As with many OpenFF projects, this will begin as an academic project and transition to an OpenFF-led project if results are promising.

