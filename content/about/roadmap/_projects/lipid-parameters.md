---
id: lipid-parameters
title: "Lipid parameters"
category: domain
recommended: true
stages:
  - fitting
  - benchmarking
  - release
summary: "Support academic collaborators in developing lipid force field parameters co-optimised for compatibility with OpenFF small molecule parameters."
fte:
  infrastructure: 0.5
  science_code: 0.5
  science_exp: 1
timeline:
  - milestone: "Continue supporting lipid parameter re-fits from academic collaborators"
    date: "Q3 2026"
  - milestone: "Co-optimize with small molecule parameters while retaining lipid performance"
    date: "Q4 2026"
  - milestone: "Benchmarks"
    date: "Q1 2027"
metrics:
  - "Lipid bilayer structural properties (area per lipid, bilayer thickness)"
  - "No systematic decrease with Sage 2.x small molecule parameters"
go_no_go:
dependencies: []
enables: []
---

## Goals

- Collaborate with the Shirts lab and associated academic groups who are leading the lipid bilayer force field development, building on their existing OpenFF-compatible lipid parameter work
- Ensure lipid parameters are compatible with OpenFF small molecule parameters for membrane protein and drug-membrane studies
- Benchmark against structural membrane properties (area per lipid, bilayer thickness, NMR order parameters, lateral diffusion)
- Release as an officially supported OpenFF lipid force field

## Benefits

Lipid membranes are central to many drug discovery contexts: membrane permeability, membrane protein binding, and lipid nanoparticle formulation all require reliable lipid force fields. Currently, OpenFF users studying membrane systems must use parameters from other force field families.

Work by the Shirts lab has shown that existing Sage parameters show  deficiencies in benchmarks such as NMR order parameters and lateral diffusion. Co-optimised lipid parameters developed alongside OpenFF's water model and small molecule parameters should address these systematically, providing a self-consistent treatment for membrane simulations.
