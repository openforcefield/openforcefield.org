---
id: water-model
title: "Co-optimised water model"
category: accuracy
recommended: true
stages:
  - infra_updates
  - data_generation
  - fitting
  - benchmarking
  - release
summary: "Develop and release a co-optimised water model with OpenFF small molecule parameters, improving mixture properties and solvation accuracy, and laying the groundwork for a future 4-site model."
fte:
  infrastructure: 0.5
  science_code: 1
  science_exp: 4
timeline:
  - milestone: "smee/descent water property fitting pipeline validated on TIP3P reference"
    date: "Q3 2026"
  - milestone: "Initial co-optimised 3-site water model fit complete"
    date: "Q4 2026"
  - milestone: "Comprehensive benchmarks complete: bulk properties, HFEs, condensed-phase properties"
    date: "Q1 2027"
metrics:
  - "Pure water properties reproduced well across the thermodynamic range relevant to biomolecular simulations (260–370 K, near-ambient pressure)"
  - "Mixture properties (enthalpies of mixing, mixture densities) improved vs TIP3P baseline for relevant small molecule solute classes"
  - "No regressions in Sage small molecule performance"
  - "Water model lessons and fitting workflow documented to facilitate future upgrade to a 4-site model"
go_no_go:
  - gate: "Q3 2026"
    condition: "Improved performance relative to OPC3; else, just use OPC3"
dependencies:
  - smee-descent
enables: []
---

## Goals

- Fit to additional data from NIST, in collaboration with ThermoML team
- Implement and validate the smee/descent condensed-phase fitting pipeline for water property calculations (density, dielectric constant, heat of vaporisation) and mixture properties (densities, heats of mixing)
- Co-optimise a water model alongside OpenFF small molecule Lennard-Jones parameters, ensuring water-solute cross-interactions are balanced against pure-water properties
- Fit against a training set covering pure water properties across the biomolecularly relevant temperature range and mixture properties with drug-like fragments
- Release the co-optimised water model as an officially supported OpenFF component, packaged alongside an updated Sage force field
- Document the fitting workflow and architecture choices to facilitate a future upgrade to a 4-site model

## Benefits

The choice of water model is one of the largest single sources of systematic error in solvation free energies and condensed-phase properties. OpenFF currently relies on TIP3P by convention — a model with well-documented limitations including an overestimated dielectric constant, incorrect diffusion coefficient, and suboptimal water-solute interactions for polar functional groups. As of Sage 2.3, there is concern we have over-fit our vdW to correct for TIP3P's deficiencies.

A co-optimised water model addresses these issues at the source rather than compensating for them with solute parameter adjustments. Improving mixture properties (enthalpies of mixing, mixture densities) is particularly important for accurately representing solvated drug-like systems. This work builds on collaboration with the Shirts lab and connects directly to the ion parameters project.

The current cycle targets a 3-site architecture (tractable with current infrastructure); documenting the workflow to enable a future 4-site model (e.g. TIP4P-like, with an off-atom charge site) keeps that upgrade path open for the next development cycle, once virtual site infrastructure is in place.
