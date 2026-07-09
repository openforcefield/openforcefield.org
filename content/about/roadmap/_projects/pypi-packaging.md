---
id: pypi-packaging
title: "PyPI packaging"
category: usability
recommended: true
stages:
  - infra_updates
summary: "Move core OpenFF packages to PyPI with optional AmberTools dependency, drastically lowering the barrier to installation for new users and enabling use in pip-only environments."
fte:
  infrastructure: 1.5
  science_code: 0
  science_exp: 0
timeline:
  - milestone: "openff-toolkit and openff-interchange available on PyPI"
    date: "Q3 2026"
metrics:
  - "pip install openff-toolkit works without conda for all core use cases (parameterisation, system building, export)"
  - "Core functionality available without AmberTools (already optional); users needing AmberTools can install it via conda (or other means)"
  - "CI green on pip-only environments (Linux, macOS) with modern Pythons"
  - "Conda packages derived from PyPI package requirements; conda packaging and dependency management tested and working"
  - "Migration communicated to community via documentation updates, blog post, and Slack/mailing list announcements"
  - "Installation instructions in all tutorials updated to offer pip as the default path"
  - "Number of unique monthly PyPI downloads tracked as adoption signal post-release"
go_no_go:
  - gate: "Q3 2026"
    condition: "All hard conda-only dependencies either resolved or confirmed scopeable to optional features; if a core dependency cannot be PyPI-published within the timeline, reassess scope to a partial release"
dependencies: []
enables: []
---

## Goals

- Publish openff-toolkit and openff-interchange (and any key supporting packages) to PyPI with appropriate version pinning. AmberTools is already optional; users who need AM1-BCC charges or sander-based energy/force evaluations can install AmberTools via conda (or other means)
- **Set up and test conda packaging and dependency management that derives from PyPI package requirements**, automating as much as possible to reduce the maintenance burden of supporting both distribution channels
- **Communicate the migration to the community** — update documentation, publish a blog post, and announce via Slack and mailing lists so existing users understand the new installation options and any changes to their workflows
- Update all documentation, tutorials, and workshop materials to list pip as the primary installation method

## Benefits

Currently, OpenFF packages are only available via conda, which creates a significant barrier for the large population of Python users who work exclusively in pip environments. This includes data scientists using Google Colab or JupyterHub, developers building Docker images or CI workflows, and users in corporate environments where conda is not available or is prohibited by IT policy.

PyPI availability dramatically expands OpenFF's accessible user base, enables installation in cloud and container environments without special setup, removes the conda requirement from tutorials and workshops (reducing friction for new learners), and aligns OpenFF with the standard Python packaging ecosystem. Several industrial users have specifically cited the conda-only requirement as a barrier to broader internal adoption.

RDKit — historically a major conda-only dependency — is now available on PyPI for Linux, macOS, and Windows, removing what was previously the largest blocker.
