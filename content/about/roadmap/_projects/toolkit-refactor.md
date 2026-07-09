---
id: toolkit-refactor
title: "Refactor OpenFF Toolkit"
category: infrastructure
recommended: false
stages:
  - infra_updates
summary: "Consolidate the OpenFF Toolkit and Interchange into a single repository — reducing maintenance burden and simplifying the codebase. Optionally, make the main repository RDKit-only (moving OpenEye support to a separate repo) and add a tensor representation for direct translation to smee."
fte:
  infrastructure: 3
  science_code: 0
  science_exp: 0
timeline:
metrics:
  - "Toolkit and Interchange installable from a single package with unified versioning"
  - "OpenEye-dependent functionality maintained in a separate repository; main Toolkit repo CI runs without proprietary licenses"
go_no_go:
dependencies: []
enables: []
---

## Goals

- **Consolidate Toolkit and Interchange into a mono-repo** with unified versioning, CI, and release process — eliminating cross-repo synchronisation issues and making atomic changes across the parameterisation and system-export stack possible in a single PR. This may also include folding in smaller supporting packages such as openff-utilities, openff-units, and similar minor repos
- *(Optional)* **Make the main Toolkit repository RDKit-only**, moving OpenEye-dependent functionality to a separate repository. This allows external contributors to participate fully — submitting PRs, running CI, and reviewing code — without the headaches of the proprietary OpenEye license restriction, while still maintaining OpenEye support for users who need it
- *(Optional)* **Add a tensor representation** that enables direct translation from parameterised systems to smee tensors, bypassing the current Interchange object model

## Benefits

**Reduced maintenance burden.** The Toolkit and Interchange are tightly coupled but currently live in separate repositories, requiring coordinated releases, cross-repo CI, and careful version pinning. Merging them into a mono-repo eliminates this coordination overhead and makes refactoring across the parameterisation boundary straightforward.

**Unblocks external contributions.** The OpenEye backend requires a proprietary license key stored as a CI secret. Because GitHub Actions does not expose secrets to pull requests from forks, PRs from external contributors always fail the OpenEye tests. The only workaround would be granting public write access to the main repository so contributors can push branches directly — which is not acceptable from a security standpoint. This effectively blocks the open-source contribution model for any code that touches cheminformatics. Moving OpenEye support to a separate repository eliminates this problem — the main repo's CI runs without proprietary licenses, so forks work cleanly.

**Faster setup for force field fitting.** Creating smee tensor representations natively will save time when setting up force field fits using large datasets of molecules. Further, this will more tightly integrate the core stack with the fitting stack, creating new opportunities for further optimization.