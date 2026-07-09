---
id: alcohols-amines
title: "Improve parameters for alcohols and amines"
category: accuracy
recommended: true
stages:
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Refit and release an OpenFF force field with improved accuracy for alcohol and amine functional groups."
fte:
  infrastructure: 0
  science_code: 0
  science_exp: 6
timeline:
  - milestone: "Proof-of-concept fit with alternative alcohol electrostatics complete"
    date: "Q3 2026"
  - milestone: "Force field re-fitting complete, with multiple iterations"
    date: "Q4 2026"
  - milestone: "Benchmarking complete"
    date: "Q1 2027"
  - milestone: "Candidate period and release"
    date: "Q2 2027"
metrics:
  - "Physical properties improved for alcohols and amines"
  - "SFEs improved for alcohols and amines"
  - "No regressions across other chemical classes (full Sage benchmark suite passes)"
go_no_go:
  - gate: "Q3 2026"
    condition: "Root cause and possible fixes for alcohol/amine errors identified. If systematic re-fit of electrostatics or virtual sites required, prioritize Neural Network Charges or Virtual Sites"
dependencies: []
enables: []
---

## Goals

- Perform systematic error analysis on the performance of current Sage 2.x parameters for alcohols and amines, specifically targeting solvation free energies and physical properties
- Re-fit relevant LJ and valence parameters, splitting as necessary.
- Determine general solution, such as releasing with updated BCCs or retraining AshGC

## Benefits

Alcohols and amines are important functional groups, but recent experiments and close inspection of performance with water has indicated poor performance with physical properties (densities and enthalpies of mixing). We propose to spend specific effort improving this area, particularly focusing on nonbonded parameters.

A targeted data-and-fitting approach is more robust than ad-hoc fixes: it addresses the underlying causes of errors rather than patching individual failure cases. The methodology established here also provides a template for applying similar targeted improvements to other functional group classes in future development cycles.
