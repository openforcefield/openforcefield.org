---
id: nagl-replacement
title: "Replace NAGL with next-gen charge model infrastructure"
category: infrastructure
recommended: true
stages:
  - infra_updates
summary: "Refactor or replace NAGL to remove unmaintained DGL dependencies, enabling continuous updates to OpenFF's neural network partial charge models."
fte:
  infrastructure: 1
  science_code: 1
  science_exp: 0
timeline:
  - milestone: "DGL dependency removed; PyTorch Geometric-based training pipeline operational"
    date: "Q3 2026"
  - milestone: "Existing AshGC charge model ported to new infrastructure"
    date: "Q4 2026"
  - milestone: "New infrastructure released as openff-nagl v2.0; DGL no longer required"
    date: "Q1 2027"
metrics:
  - "AshGC charges reproduced within numerical tolerance using new infrastructure (no regression)"
  - "Training pipeline runs without DGL; all GNN operations use PyTorch Geometric or equivalent actively maintained library"
go_no_go:
  - gate: "Q3 2026"
    condition: "A collaboration is underway to build a new modular typing library for general continuous typing. If this becomes ready in time, port AshGC over to this new library for training and inference. If not, update NAGL instead."
dependencies: []
enables:
  - charge-model
---

## Goals

- Remove the DGL (Deep Graph Library) dependency from the NAGL charge model package; DGL development has stalled and is no longer reliably maintained
- Establish a maintainable GNN training pipeline based on actively supported libraries — PyTorch Geometric is the primary candidate, with fallback to other maintained graph neural network frameworks
- Retrain the existing AshGC charge model on new infrastructure and verify numerical equivalence with the current production model
- Release the refactored infrastructure as a stable package that the next-generation charge model project can build on immediately

## Benefits

NAGL underpins OpenFF's state-of-the-art AshGC GNN-based partial charge model, which outperforms AM1-BCC across diverse drug-like chemical space and in some benchmarks approaches the accuracy of QM-derived charges. However, the current implementation depends on DGL, whose development has effectively stalled, creating growing compatibility problems with modern Python and PyTorch environments.

Without addressing this dependency, OpenFF cannot reliably update or retrain its charge models as training data, model architectures, or Python environments evolve. This infrastructure project is a direct prerequisite for the next-generation charge model project and ensures OpenFF's GNN charge infrastructure remains viable for multiple future development cycles.
