---
id: ion-parameters
title: "Co-optimised ion parameters"
category: accuracy
recommended: true
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Support academic collaborators in developing ion parameters co-optimised with OpenFF's water and small molecule force fields, including implementation of new target properties such as ion RDFs and osmotic coefficients."
fte:
  infrastructure: 0.5
  science_code: 0.5
  science_exp: 1
timeline:
  - milestone: "Osmotic coefficients and ion RDFs implemented in dimsim"
    date: "Q3 2026"
  - milestone: "Co-optimization experiments with water can start"
    date: "Q4 2026"
metrics:
  - Improved performance on benchmarks
go_no_go:
dependencies: []
enables: []
---

## Goals

- Implement ion radial distribution function (RDF) and osmotic coefficient fitting targets in the OpenFF fitting infrastructure
- Support collaborators in developing ion parameters with a co-optimised water model

## Benefits

Ion parameters should be co-optimized to water models, and we plan to re-fit a water model. Ions are important in many biological simulations.