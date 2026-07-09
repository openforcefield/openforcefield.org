---
id: surrogate-modelling
title: "Implementing surrogate modelling"
category: infrastructure
recommended: false
stages:
  - infra_updates
  - fitting
summary: "Implement surrogate models to accelerate vdW fitting and enabling exploration of parameter space beyond what local gradient descent can reach."
fte:
  infrastructure: 1
  science_code: 3
  science_exp: 6
timeline:
  - milestone: "Investigate state of existing code and audit requirements for modern fitting"
    date: "Q3 2026"
  - milestone: "Integrating with smee/descent"
    date: "Q4 2026"
  - milestone: "Experiments start"
    date: "Q1 2027"
metrics:
  - "Surrogate reproduces target property (density, ΔHvap, enthalpy of mixing) well with reference to full MD computation"
  - "Fewer MD simulation evaluations per optimization cycle"
  - "Faster fitting cycles"
go_no_go:
  - gate: "Q3 2026"
    condition: "smee/descent stack operational (hard dependency); if smee/descent development is delayed, this project is blocked."
  - gate: "Q1 2027"
    condition: "Surrogate-guided optimization produces a force field competitive with the smee/descent gradient baseline on both training and test sets. If accuracy falls significantly short, reassess approaches."
dependencies:
  - smee-descent
enables: []
---

## Goals

- Implement a multi-fidelity optimization framework based on Gaussian process surrogate modelling, as developed by Madin & Shirts (2023; *Digital Discovery*), adapted for the smee/descent fitting stack
- Train GP surrogate models that approximate the objective function (experimental physical property RMSE) as a cheap, fast function of LJ parameter vectors, using Latin hypercube sampling of initial simulation points
- Aim for substantial shortening and improvment of LJ fitting process


## Benefits

Surrogate modelling addresses a fundamental bottleneck: the most informative vdW fitting targets (condensed-phase simulations) are very expensive to evaluate repeatedly. The Madin & Shirts results also show that global search over surrogates finds improved parameter sets that local optimization cannot reach.

If successful, this would qualitatively improve the coverage and quality of vdW parameter optimization in OpenFF force fields, complementing the speed gains from smee/descent's gradient-based approach.
