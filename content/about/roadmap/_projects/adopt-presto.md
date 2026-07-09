---
id: adopt-presto
title: "Adopt Presto"
category: usability
recommended: false
stages:
  - community_maintenance
summary: "Take over maintenance of Presto (the successor to BespokeFit) from the Cole group, ensuring ongoing user support and ecosystem compatibility for consortium members."
fte:
  infrastructure: 3
  science_code: 0
  science_exp: 0
  other: 0
timeline:
  - milestone: "Maintenance handover from Cole group complete; CI and release pipeline running under OpenFF infrastructure"
    date: "Q3 2026"
  - milestone: "User support channel established; documentation reviewed and updated"
    date: "Q4 2026"
go_no_go:
  - gate: "Q3 2026"
    condition: "Handover from Cole group is feasible; Presto codebase is in a maintainable state and CI can be established under OpenFF infrastructure. If the codebase requires substantial rework to become maintainable, reassess scope."
metrics:
  - "CI passing under OpenFF infrastructure across Linux and macOS"
  - "At least one OpenFF community member successfully runs a bespoke torsion workflow using Presto with current Sage force fields"
  - "User support requests responded to within the standard OpenFF support window"
  - "No unresolved compatibility breakages with openff-toolkit or openff-interchange for more than one release cycle"
dependencies: []
enables: []
---

## Goals

- Accept maintenance responsibility for Presto from the Cole group, including CI infrastructure, PyPI releases, and dependency management
- **Familiarise OpenFF staff with the Presto codebase** in preparation for ongoing support duties — this includes revising documentation and examples, adding tests to improve coverage and confidence, and building internal knowledge of the code's architecture and edge cases
- Ensure Presto remains compatible with current OpenFF Toolkit and Interchange APIs as these evolve
- Provide user support for consortium members running bespoke torsion parameterisation workflows

## Benefits

Bespoke torsion parameterisation — fitting torsion profiles specifically for each ligand rather than relying on generic SMIRKS patterns — is a popular approach for accuracy improvement in RBFE campaigns. 

BespokeFit accumulated significant technical debt and proved difficult to maintain, with the result that it is now deprecated; Presto is a cleaner, modern update developed by the Cole group. Taking over maintenance ensures this capability remains accessible to consortium members as BespokeFit is retired, without requiring OpenFF to fund new scientific development — the principal cost is infrastructure continuity and user support.
