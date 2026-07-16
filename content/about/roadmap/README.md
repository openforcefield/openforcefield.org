# OpenFF Roadmap Proposal 2026–2027

This directory contains the **staff proposal** for the Open Force Field Consortium's 2026–2027 research priorities, published as part of [openforcefield.org](https://openforcefield.org) under `/about/roadmap/`.

> **This is a proposal, not a plan.** The projects and resource allocations described here represent staff recommendations and alternatives for discussion with the Consortium. Nothing here is final until ratified through the normal governance process.

## What this is

The roadmap presents proposed projects across four categories:

- **Infrastructure / Fitting Pipeline** — tooling, automation, and pipeline improvements
- **Domain Expansion** — extending force field coverage to new chemical spaces
- **Accuracy Improvements** — refitting and benchmarking to improve existing parameters
- **Usability / Community** — documentation, training materials, and community engagement

Each project is annotated with estimated FTE effort (in person-months), pipeline stages, dependencies, success metrics, and go/no-go gates. Projects are marked as either **recommended** (staff's preferred portfolio) or **alternative** (lower priority or contingent options).

## Repository structure

```
projects/           One Markdown file per project (real Hugo pages, YAML frontmatter + prose body)
css/                Stylesheets
_index.md           Overview page (intro copy + the project grid, via the roadmap-grid shortcode)
```

Project pages are rendered by `/layouts/_default/roadmap-project.html` (site-root layout, selected via
the `layout: roadmap-project` cascade set in `projects/_index.md`). The project grid on the overview
page is rendered by the `{{< roadmap-grid >}}` shortcode (`/layouts/shortcodes/roadmap-grid.html`).
Category/stage labels live in `/data/roadmap/{categories,stages}.yaml` (Hugo site data, not Python).

There is no separate build step: `hugo`/`hugo server` renders everything directly from
`projects/*.md`, the same as any other page on the site.

## Editing projects

Each project lives in `projects/<id>.md` with YAML frontmatter:

```yaml
---
title: "My Project"
category: accuracy          # infrastructure | domain | accuracy | usability
recommended: true           # true = recommended, false = alternative
stages:
  - fitting
  - benchmarking
summary: "One-sentence summary shown in the project grid."
fte:
  infrastructure: 2
  science_code: 1
  science_exp: 0.5
  other: 0                  # project management / travel
metrics:
  - "Metric one"
go_no_go:
  - gate: "Q2 2026"
    condition: "Condition for proceeding"
dependencies: []            # list of other project ids (filenames) this depends on
enables: []                 # list of project ids this unlocks
---

Markdown prose body (goals, benefits, background) goes here.
```

The project's id is just its filename (`projects/charge-model.md` → `charge-model`) — used for
`dependencies`/`enables` cross-references and the URL. A bad `category`/`stages` value, a missing
required field, or a `dependencies`/`enables` reference to a project id that doesn't exist will fail
the Hugo build with a clear error (see `roadmap-project.html`), rather than silently falling back to
a default.

## Local development

From the site root: `hugo server`. No Python dependencies, no separate build script — projects render
as ordinary Hugo pages.

## Acknowledgements

This website was designed and built with significant assistance from [Claude](https://claude.ai) (Anthropic). The project content reflects OpenFF staff priorities and judgement; Claude assisted with site architecture, styling, and interactive features.

© 2026 Lily Wang
