---
title: "AI-enabled simulations of modified proteins at scale"
category: infrastructure
recommended: false
stages:
  - infra_updates
  - benchmarking
summary: "Make OpenFF's modified-protein support (landing in 3.0) robust enough that an agentic workflow, not just a computational chemistry expert, can clean up deficient PDB inputs and run the simulation, so any team can simulate proteins as they actually exist in vivo."
fte:
  infrastructure: 12
  science_code: 6
  science_exp: 6
metrics:
  - "A leading AI model, using our tools unassisted, reaches 90% success simulating a curated PDB benchmark of modified proteins"
go_no_go:
dependencies:
  - protein-forcefield
enables: []
---

## Goals

- Build out OpenFF 3.0's modified-protein handling with agentic-workflow-friendly surfaces — Python API points, CLIs, AI-facing docs, skill files, MCP tooling, or whatever else proves high-leverage — so an LLM can identify and fix deficient inputs (missing hydrogens, spurious crosslinks, ambiguous bond networks) without expert intervention
- Curate a benchmark set of modified proteins from the PDB and measure whether a leading AI model can use our tools to simulate them successfully, targeting 90%
- If we hit that target, put remaining effort into modified-residue handling in PDBFixer (the tool most workflows already use to prepare OpenFF inputs), so teams can start from lower-quality structures too

## Benefits

An estimated 50–90% of human proteins are post-translationally modified, so the unmodified form most workflows are forced to simulate is often effectively a different molecule than the one under study — and predictions will systematically fail to match experiment as a result. This isn't a niche case: GLP-1 drugs and Humira depend on engineered modifications, and SARS-CoV-2 spike glycosylation is inaccessible to unmodified-protein simulation.

Today, fixing a deficient modified-protein PDB file by hand only takes moderate chemistry judgement, not deep expertise — but that's still enough of a bar that most teams without a dedicated computational chemist either strip the modifications and hope they don't matter, or skip simulation entirely. Making input cleanup something an agentic workflow can do reliably removes that bottleneck without requiring any new modeling capability of our own.

There's useful spillover too: the AI-testing process will surface malformed PDB entries for curator review, stress-test gemmi and RDKit at scale, could seed synthetic modified-protein datasets for cofolding model training, and leaves us with openly available AI-facing docs, prompts, and best practices as a byproduct.
