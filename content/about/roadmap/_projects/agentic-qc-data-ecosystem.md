---
id: agentic-qc-data-ecosystem
title: "Agentic QC data-to-force-field ecosystem"
category: infrastructure
recommended: false
stages:
  - infra_updates
  - fitting
  - benchmarking
summary: "Modernize the OpenFF/QCArchive fitting pipeline so an agent can drive it end-to-end — curating QC data, generating more on-the-fly via active learning, and specializing a general force field for a target chemistry — cutting today's month-long, expert-orchestrated process to weeks."
fte:
  infrastructure: 24
  science_code: 12
  science_exp: 12
metrics:
  - "An agent can go from a target chemistry to curated QC data to fitted, benchmarked, specialized force field parameters without expert orchestration"
  - "(External goal) QCArchive supports chemical (sub)structure search and agent-specific permissions for safe, autonomous dataset growth"
go_no_go:
dependencies: []
enables: []
---

## Goals

- Make OpenFF's fitting pipeline active-learning capable, by expanding parameter validation metrics to drive on-the-fly generation of whatever QC training data a given specialization run actually needs
- Streamline interoperability between QCArchive and OpenFF so an agent can go from "chemistry of interest" to curated data to fitted, benchmarked, specialized parameters without the manual hand-offs the pipeline requires today

## Benefits

Specializing a general OpenFF force field for a specific chemistry currently takes months and requires an expert to hand-carry data through QC curation, fitting, and benchmarking, moving between QCArchive and OpenFF tooling by hand at every stage. That expertise bottleneck is largely why teams working with novel chemistry rarely refit and just accept whatever accuracy the general force field happens to give them on their actual target.

Making the pipeline something an agent can drive unsupervised removes that bottleneck directly: QCArchive becomes queryable and safely agent-operable, and OpenFF's fitting side gains the active-learning loop needed to decide what QC data to generate next. OpenFF's tools already sit behind 500+ dependent public repositories, and QCArchive is the only proven open framework of its kind for the QC calculations force field development needs — so this positions us as the first open source agentic force field specialization workflow, rather than leaving that capability to emerge only in closed, vendor-controlled ecosystems.
