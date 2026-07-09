---
id: mixing-rules
title: "Investigating different mixing rules"
category: accuracy
recommended: false
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Investigate and potentially adopt non-Lorentz-Berthelot mixing rules for Lennard-Jones parameters"
fte:
  infrastructure: 0.5
  science_code: 1
  science_exp: 7
timeline:
  - milestone: "SMIRNOFF and OpenMM/OpenFF Interchange infrastructure support for alternative mixing rules"
    date: "Q3 2026"
  - milestone: "Experiments start"
    date: "Q4 2026"
metrics:
go_no_go:
dependencies: []
enables: []
---

## Goals

- Evaluate alternatives to the Lorentz-Berthelot combining rules for LJ cross-interactions: candidate approaches include Waldman-Hagler rules
- Implement the necessary infrastructure changes in the SMIRNOFF specification and OpenFF Interchange to support non-standard mixing rules without hacking the parameter format
- Refit force field LJ parameters under the chosen alternative mixing rule scheme and benchmark comprehensively
- Make a transparent release decision: publish an updated force field if benchmarks support it, or document the outcome clearly if the improvement is insufficient
