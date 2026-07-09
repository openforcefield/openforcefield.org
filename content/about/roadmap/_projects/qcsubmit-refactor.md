---
id: qcsubmit-refactor
title: "Refactor and simplify QCSubmit"
category: infrastructure
recommended: true
stages:
  - infra_updates
summary: "Refactor QCSubmit to reduce maintenance burden and make it fit for purpose as a daily tool for OpenFF scientists"
fte:
  infrastructure: 1.5
  science_code: 1
  science_exp: 0
timeline:
  - milestone: "Audit complete; pain points catalogued; deprecation plan agreed with team and communicated to external users"
    date: "Q4 2026"
  - milestone: "Refactored QCSubmit released with streamlined API"
    date: "Q1 2027"
metrics:
  - "Scientific workflows can practically use QCSubmit instead of converting to a different format at the earliest opportunity"
go_no_go:
dependencies: []
enables: []
---

## Goals

- **Add direct export to smee+descent style datasets**, so scientists can go from QCArchive data to the modern fitting stack without manual conversion steps or workarounds
- **Remove currently unused API points and behaviours** — strip out defunct dataset types, dead code paths, and features that no longer serve any active workflow
- **Refactor to match modern QCFractal design patterns** — much of QCSubmit's internal design reflects old QCFractal conventions that no longer exist in the current QCFractal server; aligning with the modern API reduces confusion and eliminates compatibility shims
- **Improve speed for dataset creation, filtering, and retrieval operations** — current performance is a significant bottleneck for scientists working with large datasets, particularly torsiondrive downloads
- **Migrate from Pydantic v1 to Pydantic v2** — QCSubmit currently depends on Pydantic v1, which is incompatible with Python 3.14 due to changes in typing internals. This migration is required to keep QCSubmit installable on modern Python versions

## Benefits

**Reduced maintenance burden.** QCSubmit has accumulated substantial legacy functionality — dataset types from defunct workflows, compatibility layers for old QCFractal APIs, and abstraction layers that add complexity without adding value. Removing dead code and aligning with modern QCFractal patterns will make the codebase significantly easier to maintain and reason about.

**A tool scientists can actually use day-to-day.** The existing API is slow and painful to use, especially with the smee software stack, where hacks are currently needed to download torsiondrives with acceptable speed. Adding native smee+descent export and improving performance would make QCSubmit the natural tool for the job rather than something scientists work around.
