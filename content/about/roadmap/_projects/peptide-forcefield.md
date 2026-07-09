---
id: peptide-forcefield
title: "A peptide force field"
category: domain
recommended: true
stages:
  - benchmarking
  - release
summary: "Benchmark SMIRNOFF force field candidates on peptides, and conditionally release a supported OpenFF peptide force field if performance is sufficient. The key benefits of this project are prototyping the unification of peptide and small molecule parameters for when the protein force field is ready."
fte:
  infrastructure: 0
  science_code: 1
  science_exp: 4
timeline:
  - milestone: "Peptide benchmark suite finalised covering acyclic and cyclic peptides; initial results on Gilson-lab SMIRNOFF candidates computed"
    date: "Q3 2026"
  - milestone: "Release workflow prototyped: refit/release process validated to retain performance on both peptide and small molecule benchmarks simultaneously"
    date: "Q4 2026"
  - milestone: "Peptide force field released, possibly as Rosemary 3.0 or a Sage 2.x, with benchmark dataset (conditional on performance gate)"
    date: "Q1 2027"
metrics:
  - "Good performance on a/cyclic peptide benchmarks"
  - "Performance on small molecule benchmarks not decreased relative to Sage 2.2"
  - "Release workflow documented: process for producing a combined peptide/protein/small molecule force field validated end-to-end"
  - "Force field released as .offxml with benchmark data and reproduction scripts"
go_no_go:
  - gate: "Q3 2026"
    condition: "At least one SMIRNOFF candidate demonstrates good performance on the peptide benchmark suite for both acyclic and cyclic peptides, including potentially Sage 2.3. If no protein FF candidate achieves good performance, we do not proceed with the rest of the release pipeline."
  - gate: "Q4 2026"
    condition: "Release workflow successfully produces a force field that retains performance on both peptide/protein and small molecule benchmarks simultaneously. If this cannot be achieved, delay release until resolved."
dependencies: []
enables:
  - protein-forcefield
---

## Goals

- Define a set of peptide benchmarks
- Evaluate SMIRNOFF force field candidates on peptide benchmarks
- Prototype and validate a **release workflow** for a combined peptide/protein force field that retains good performance across peptide/protein benchmarks *and* small molecule benchmarks simultaneously — this is a key deliverable in its own right, independent of whether a final release occurs
- Release if performance works
- Document the release workflow and lessons learned to directly accelerate the [protein force field](project.html?id=protein-forcefield) project

## Benefits

While we continue working on folded protein parameters, our current SMIRNOFF candidates appear to perform well on peptides. This puts a peptide force field in the hands of the community. In addition, working out the release process where small molecule parameters and peptide/protein parameters can be co-optimized and performance in both domains retained, is work that directly accelerates our overall goal of a protein force field.