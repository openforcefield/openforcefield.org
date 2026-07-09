---
id: training-materials
title: "Improve training materials"
category: usability
recommended: true
stages:
  - community_maintenance
summary: "Audit and update OpenFF documentation, convert legacy Jupyter notebooks to Marimo."
fte:
  infrastructure: 1
  science_code: 0
  science_exp: 0
timeline:
  - milestone: "Notebooks converted to Marimo and verified reproducible"
    date: "Q4 2026"
metrics:
  - "All priority notebooks run correctly in Marimo from a fresh environment without modification"
go_no_go: []
dependencies: []
enables: []
---

## Goals

- Convert notebooks to Marimo

## Benefits

Jupyter notebooks have a lot of flaws; they include hidden state and are hard to diff on GitHub.

Marimo is a reactive notebook format:

- **Reactive execution**: Marimo builds a directed acyclic graph (DAG) of cell dependencies. When a variable changes, downstream cells recompute automatically. There is no hidden state — the notebook is always in a consistent, reproducible state.
- **Pure Python storage**: Marimo notebooks are stored as `.py` files, not JSON. This makes them diffable, versionable with git, and executable as scripts without a notebook server.
- **Deployable as apps**: A Marimo notebook can be served as an interactive web app (e.g. a parameterisation demo with live molecule input) with no additional code.
- **Reactive UI elements**: Interactive widgets (sliders, dropdowns, molecule viewers) are bound directly to Python variables and trigger reactive recomputation — dramatically cleaner than Jupyter's ipywidgets.

For training materials specifically, the reproducibility guarantee is the most important property: a new user cloning an OpenFF tutorial should be able to run it immediately, without debugging execution order or hunting for the cell that set a now-stale variable.

## Benefits

Training materials are the first point of contact for new OpenFF users — academic collaborators, industrial users setting up new workflows, and students. Converting to Marimo and updating the documentation directly reduces support burden: fewer GitHub issues about broken notebooks, fewer onboarding questions in Slack, and faster time-to-productivity for new consortium users. For workshops and tutorials at conferences, Marimo's reproducibility guarantee is particularly valuable — workshop attendees can run examples without environment debugging consuming the session.
