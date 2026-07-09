---
id: charge-model
title: "Next-generation charge model"
category: accuracy
recommended: true
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Train a next-generation GNN-based partial charge model on modern infrastructure and directly to QM properties, which we expect to improve electrostatics. Fit force field parameters with this new force field."
fte:
  infrastructure: 1
  science_code: 2
  science_exp: 8
timeline:
  - milestone: "Next-gen GNN infrastructure available; expanded training dataset curated"
    date: "Q3 2026"
  - milestone: "New charge model trained and validated against AshGC baseline"
    date: "Q4 2026"
  - milestone: "Force field refit with new charges; compatibility benchmarks complete"
    date: "Q1 2027"
  - milestone: "OpenFF Charge Model 2.0 and updated Sage force field released"
    date: "Q2 2027"
metrics:
  - "QM benchmarks improved with new charge model"
  - "QM, physical property, free energy benchmarks improved with new force field"
go_no_go:
  - gate: "Q3 2026"
    condition: "NAGL replacement infrastructure operational (hard dependency); if delayed, this project cannot proceed"
  - gate: "Q1 2027"
    condition: "New charge model shows measurable and statistically significant improvement in independent benchmarks"
dependencies:
  - nagl-replacement
enables: []
---

## Goals

- Leverage the refactored GNN infrastructure (from the NAGL replacement project) to train a next-generation partial charge model
- Curate an expanded, more chemically diverse training dataset, extending coverage beyond the current AshGC training set — with particular attention to underrepresented functional groups
- Experiment with different architectures beyond GraphSage
- Train and validate the new charge model using QM properties such as ESP and electric field
- Refit the OpenFF force field with the new charges to ensure consistency, and benchmark the combined force field
- Benchmark force field
- Release the charge model and updated force field

## Benefits

The current AshGC charge model yields charges of AM1-BCC quality and performs competitively on benchmark sets. However, it has inherited the flaws of AM1-BCC, is limited in chemical space coverage, and the training process depends on DGL infrastructure that is being replaced.

A next-generation model trained on a larger, more diverse dataset with a modern architecture would improve performance and simplify downstream porting outside Python.