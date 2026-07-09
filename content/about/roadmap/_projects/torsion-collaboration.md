---
id: torsion-collaboration
title: "Targeted improvement on partner dataset"
category: accuracy
recommended: true
stages:
  - data_generation
  - fitting
  - benchmarking
summary: "Collaborate with Thomas Steinbrecher (Genentech) on a dataset of 25,000 informative torsion fragments to identify and fix systematic torsion errors in OpenFF."
fte:
  infrastructure: 0
  science_code: 1
  science_exp: 3
metrics:
  - "OpenFF torsion RMSE on the 25k Genentech fragment set reduced"
  - "No regressions on existing Sage torsion benchmark suite"
go_no_go: []
dependencies:
  - smee-descent
enables: []
---

## Goals

- Classify failure modes: identify whether errors are due to too-general SMIRKS coverage, poorly constrained existing parameters, or other limitations
- Generate and fit to additional data
- Validate the improvement against the 25k benchmark
- Collaborate on publication


## Benefits

**Real-world MedChem relevance.** The fragment set was curated by a pharma partner includes chemistry that is directly relevant to drug discovery. Failures in this set are likely not obscure edge cases. Improvements in this area are likely to have real impact for our users.

**A ready-made benchmark set.** The dataset is a substantial expansion of the current torsion coverage and can offer us direction for targeted improvements.
