---
title: "Enable MLIP model setup and inference"
category: infrastructure
recommended: false
stages:
  - infra_updates
  - benchmarking
summary: "Interface OpenFF with Modelforge to enable automated system setup with full MLIP or ML/MM"
fte:
  infrastructure: 12
  science_code: 0
  science_exp: 0
metrics:
  - "MLIP setup and benchmarking tooling for complex biomolecular systems (OpenFF + Modelforge) shipped — 6 months"
go_no_go:
dependencies: []
enables: []
---

## Goals

- Interface OpenFF with Modelforge so MLIP and ML/MM (mixed MLIP + force field) systems can be set up and run automatically for complex biomolecular systems
- (External goal) Enable OpenFE to extend binding free energy workfows to utilize MLIPs.

## Benefits

Physics-based free energy simulation is the pharmaceutical industry's state of the art for drug design, and its accuracy is capped by the underlying force field. MLIPs — neural-network potentials trained bottom-up on QM energies and forces — are emerging as a near-QM-accuracy alternative, with foundation models already extrapolating well to unseen chemistry at a fraction of QM cost. But that's only useful to our users if they can actually set MLIPs up and run them through OpenFF/OpenFE; right now that tooling doesn't exist.

This project puts OpenFF's existing force-field-fitting infrastructure to work on that gap, rather than leaving MLIP adoption in drug design to fragmented, one-off efforts. Downstream, it gives Open Free Energy's existing user base a path to MLIP-accuracy binding free energy calculations, and gives the wider community trustworthy, drug-design-specific benchmarks and leaderboards to evaluate MLIP architectures against — filling a real gap, since existing community MLIP benchmarks (e.g. ML-PEG) target materials science, not drug design.
