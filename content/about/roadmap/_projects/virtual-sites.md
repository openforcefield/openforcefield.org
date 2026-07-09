---
id: virtual-sites
title: "Virtual sites"
category: accuracy
recommended: true
stages:
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Develop and release a SMIRNOFF force field incorporating virtual sites to better capture sigma holes, lone pairs on nitrogen, and other anisotropic electrostatic features. This has been tried previously, but we have since made substantial updates to our workflows and found errors in the data we were training with."
fte:
  infrastructure: 0.5
  science_code: 1
  science_exp: 6
timeline:
  - milestone: "Virtual site SMIRNOFF infrastructure validated in smee/descent"
    date: "Q3 2026"
  - milestone: "First complete virtual site force field fit complete"
    date: "Q4 2026"
  - milestone: "Benchmarking"
    date: "Q1 2027"
metrics:
  - "Improved treatment of ESP"
  - "Improved dimer profiles"
  - "Physical property benchmarks not worsened"
go_no_go:
  - gate: "Q1 2027"
    condition: "Virtual site force field does not degrade benchmarks; otherwise, reassess approach"
dependencies:
  - smee-descent
enables: []
---

## Goals

- A prototype virtual site force field addressing sigma holes and pyridine lone pair without worse performance on physical properties

## Benefits

Virtual sites allow more complex treatments of electrostatic interactions, especially in places where the QM ESP is anisotropic and cannot be well represented by a single atom-centered partial charge. We hypothesize this will fix systematic errors in certain regions of chemistry, such as enthalpies of mixing between pyridine and other compounds, and be important in directional applications such as binding sites for RBFEs.
