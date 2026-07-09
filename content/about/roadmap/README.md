# OpenFF Roadmap Proposal 2026–2027

This repository contains the **staff proposal** for the Open Force Field Consortium's 2026–2027 research priorities. It is presented as an interactive website hosted on GitHub Pages.

> **This is a proposal, not a plan.** The projects and resource allocations described here represent staff recommendations and alternatives for discussion with the Consortium. Nothing here is final until ratified through the normal governance process.

## What this is

The roadmap presents 23 proposed projects across four categories:

- **Infrastructure / Fitting Pipeline** — tooling, automation, and pipeline improvements
- **Domain Expansion** — extending force field coverage to new chemical spaces
- **Accuracy Improvements** — refitting and benchmarking to improve existing parameters
- **Usability / Community** — documentation, training materials, and community engagement

Each project is annotated with estimated FTE effort (in person-months), pipeline stages, dependencies, success metrics, and go/no-go gates. Projects are marked as either **recommended** (staff's preferred portfolio) or **alternative** (lower priority or contingent options).

The total recommended portfolio is sized against available FTE: approximately 2.8 infrastructure FTE, 1–1.5 science FTE (including 0.5 donated), and 0.5 project management FTE over the two-year period.

## Repository structure

```
_projects/          One Markdown file per project (YAML frontmatter + prose body)
data/projects.js    Auto-generated from _projects/ by build.py — do not edit
js/                 ES module JavaScript (graph.js, project.js, utils.js, theme.js)
css/                Stylesheets
index.html          Overview page (dependency graph + project grid)
project.html        Individual project detail page
build.py            Build script: _projects/*.md → data/projects.js
requirements.txt    Python dependencies for build.py
.github/workflows/  GitHub Actions: runs build.py and deploys to GitHub Pages
```

## Editing projects

Each project lives in `_projects/<id>.md` with YAML frontmatter:

```yaml
---
id: my-project
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
timeline:
  - milestone: "First release"
    date: "Q3 2026"
metrics:
  - "Metric one"
go_no_go:
  - gate: "Q2 2026"
    condition: "Condition for proceeding"
dependencies: []            # list of project ids this depends on
enables: []                 # list of project ids this unlocks
---

Markdown prose body (goals, benefits, background) goes here.
```

After editing any `.md` file, regenerate the data file:

```bash
pip install -r requirements.txt   # first time only
python build.py
```

The GitHub Actions workflow runs `build.py` automatically on every push to `main`, so you do not need to commit `data/projects.js` — it is regenerated at deploy time.

## Local development

No build step is needed for the front-end. Open `index.html` directly in a browser, or serve with any static file server:

```bash
python -m http.server 8000
```

Note: ES modules require a server (not `file://`), so use the server approach if you want to test JavaScript locally.

## Deploying to GitHub Pages

1. Push the repository to GitHub (repo must be public for free GitHub Pages)
2. Go to **Settings → Pages** and set the source to **GitHub Actions**
3. The site deploys automatically on every push to `main`

## Acknowledgements

This website was designed and built with significant assistance from [Claude](https://claude.ai) (Anthropic). The project content reflects OpenFF staff priorities and judgement; Claude assisted with site architecture, styling, and interactive features.

© 2026 Lily Wang
