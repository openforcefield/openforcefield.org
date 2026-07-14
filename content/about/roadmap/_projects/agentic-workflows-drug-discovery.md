---
id: agentic-workflows-drug-discovery
title: "Agentic Workflows for Drug Discovery and Design"
category: usability
recommended: false
stages:
  - infra_updates
  - benchmarking
  - release
summary: "Make OpenFF and Open Free Energy AI-native: MCP interfaces, a hardened agentic workflow built on Genentech's OpenFE agent (already matching commercial tools on three internal targets), and guardrails against physically nonsensical setups, so non-experts and AI agents can run full binding free energy campaigns unassisted."
fte:
  infrastructure: 6
  science_code: 9
  science_exp: 3
metrics:
  - "A non-expert user or AI agent can run a full OpenFE binding free energy campaign end-to-end via MCP tooling, without expert troubleshooting, at accuracy matching Genentech's agent on its three original drug discovery programs"
  - "Agent guardrails catch common invalid setup errors (e.g. an unbound ligand, incorrect protonation state, or implausible system configuration) before a GPU job is submitted"
  - "(External goal) Alchemiscale supports agent-driven execution-state management — reading job status, handling restarts, adjusting strategy, and managing compute resources"
go_no_go:
dependencies: []
enables: []
---

## Goals

- Build standardized Model Context Protocol (MCP) interfaces and agentic workflows so OpenFF and OpenFE can be called reliably by AI agents
- (External goal) Partner with Genentech to generalize and harden their OpenFE agent workflow ([openfe_skill](https://github.com/Genentech/openfe_skill)) — which already matched or exceeded two leading commercial solutions on three proprietary internal targets — and develop additional community agentic workflows
- (External goal) Build agent guardrails that detect and prevent physically nonsensical calculation setups (e.g. a ligand not bound to the protein, an incorrect protonation state, or an implausible system configuration) before they waste GPU resources
- (External goal) Deliver the Alchemiscale infrastructure improvements these production agentic workflows need: letting agents read and manage execution state, handle restarts, adjust strategy, and manage compute resources

## Benefits

OpenFF and OpenFE are already the leading open-source stack for physics-based binding affinity prediction: a benchmark by 15 pharmaceutical companies across more than 1,700 ligands and 95 target systems found OpenFE's accuracy approaching leading commercial solutions at no licensing cost, using OpenFF Sage — which itself outperforms all publicly available alternatives in blind industry benchmarking. Both are core dependencies across academic and industry computational drug discovery workflows worldwide, with OpenFF alone used by more than 500 downstream repositories. But that scientific maturity hasn't translated into ease of use: running a full ligand design campaign still requires navigating multi-step workflows, cluster job submission, error interpretation, and configuration decisions that non-experts consistently struggle with — a barrier that has nothing to do with whether the underlying science is sound.

Genentech's OpenFE agent already shows this barrier is solvable: demonstrated at the 2026 OMSF workshop, it matched or beat two leading commercial tools on three proprietary internal drug discovery programs, unassisted, and is now open source. Generalizing and hardening that workflow — plus adding guardrails that catch invalid setups before they burn GPU time, and giving agents the execution-state control Alchemiscale currently lacks — turns a promising internal exemplar into infrastructure any researcher or agent can rely on. That keeps state-of-the-art binding free energy prediction available to teams without commercial-license budgets, not just those who can pay for it, and gives the wider community an extensible base into which new methods can be dropped and measured against real discovery projects.
