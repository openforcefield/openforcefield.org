---
id: protein-forcefield
title: "A folded protein force field"
category: domain
recommended: true
stages:
  - fitting
  - benchmarking
  - release
summary: "Support academic collaborators in developing a co-optimised small molecule + protein force field, with OpenFF responsible for small-molecule compatibility and release."
fte:
  infrastructure: 0
  science_code: 0
  science_exp: 3
timeline:
metrics:
  - "Folded protein stability benchmarks competitive with AMBER"
  - "Small molecule benchmarks not worsened"
  - "Full benchmark dataset, force field file (.offxml), and reproduction scripts publicly released"
go_no_go:
  - gate: "Q4 2026"
    condition: "Small-molecule compatibility checks pass across QM benchmarks; if significant incompatibilities found, attempt targeted refit before release"
dependencies:
  - peptide-forcefield
enables: []
---

## Goals

- Coordinate with the Chapin Cavender, who is leading the work, and assist with any roadblocks
- Assist with benchmarking
- Ensure co-optimised protein parameters are compatible with OpenFF small molecule parameters
- Package, document, and release the combined force field under OpenFF infrastructure with full reproducibility materials

## Benefits

A supported co-optimized small molecule and protein force field is one of the most consistently requested capabilities from OpenFF's industrial and academic user base. Having both protein and small molecule parameters under the same SMIRNOFF framework — rather than a patchwork of AMBER proteins + OpenFF ligands — provides a uniquely consistent treatment for protein-ligand systems and simplifies simulation setup substantially.

