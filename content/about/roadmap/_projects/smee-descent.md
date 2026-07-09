---
id: smee-descent
title: "Finish building smee+descent based fitting stack"
category: infrastructure
recommended: true
stages:
  - infra_updates
summary: "Replace the legacy ForceBalance-based fitting stack with the modern smee and descent libraries, enabling GPU-accelerated gradient-based force field fitting with valence fitting times reduced to ~48 GPU hours and support for co-optimising valence and vdW parameters simultaneously. We expect this to substantially reduce maintenance burden of our fitting stack."
fte:
  infrastructure: 2
  science_code: 5
  science_exp: 2
timeline:
  - milestone: "Production force field fits migrated to smee/descent; retire workflows with ForceBalance"
    date: "Q3 2026"
metrics:
  - "Valence fitting wall-clock time ≤48 GPU hours on standard hardware"
  - "vdW fitting wall-clock time not increased vs ForceBalance baseline on equivalent hardware"
go_no_go:
dependencies: []
enables:
  - surrogate-modelling
  - water-model
  - virtual-sites
  - data-driven-smirks
---

## Goals

- Complete the smee condensed-phase property calculation package so that densities, dhmixes, etc etc can be computed as differentiable functions of force field parameters
- Demonstrate and validate **co-optimisation of valence and vdW parameters** simultaneously
- Migrate all active production force field fits from ForceBalance to smee/descent and retire ForceBalance as a hard dependency
- Provide a stable, well-documented Python API that downstream projects (surrogate modelling, water model, virtual sites, data-driven SMIRKS) can build on
- Tutorials for community members
- Implement desired fitting targets
- Implement regularisation
- Implement checkpointing

## Benefits

This is the foundational infrastructure project for OpenFF's next generation of force field development.

**Lower maintenance burden.** ForceBalance is a complex codebase with a long history that OpenFF does not control.

**Valence fitting time reduced to ~48 GPU hours.** Compared to ForceBalance, which requires multi-day CPU runs for valence fitting, smee/descent achieves the same task in approximately 48 GPU hours by fitting solely to AbInitio targets.

Completing this stack directly unblocks four major downstream science projects: surrogate modelling, co-optimised water model, virtual sites, and data-driven SMIRKS typing.
