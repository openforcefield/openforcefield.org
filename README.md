# Open Force Field Initiative website source

This website is hosted by [GitHub Pages](https://pages.github.com/) at http://openforcefield.org

## Making changes

Changes should be contributed as pull requests.

Only the source files in `openforcefield/` should be changed.

You will primarily want to focus on changing the following Markdown files in `openforcefield/content/`:
* `_index.md`: main landing page content (some detail is in `themes/kube/layouts/index.html`)
* `news/`: Add new news posts here as separate Markdown files, using a header like
```yaml
---
date: "2017-04-10T16:42:50+01:00"
draft: false
weight: 180
description: "Smoothly and reliably collapse elements for extra convenience"
title: "Collapse"
bref: "A demo to collapsable elements"
---
```
with the fields replaced with their equivalents.
* `forcefields/_index.md`: information about available force field releases
* `datasets/_index.md`: information about available datasets
* `science/_index.md`: overview of planned science, timelines, science updates, etc.
* `data/publications/publications.yaml`: publications and white papers
   * `content/publications/img/`: thumbnail images for publications and white papers
* `consortium/_index.md`: information about the Open Force Field Consortium and other federal funding sources
* `faq/_index.md`: frequently asked questions

See the [Kube for Hugo GitHub repo](https://github.com/jeblister/kube) for more examples of Markdown content.

### Adding new members

1. Add an image to `content/members/img/` (e.g. `firstname-lastname.jpg`).
2. Add a YAML file `firstname-lastname.yaml` to `openforcefield/data/members/` in the following format:
```YAML
name: John D. Chodera
role: Primary Investigator
lab: Chodera lab
title: Assistant Member
institution: Sloan Kettering Institute
img: john-chodera.jpg
webpage: "http://choderalab.org"
description: Automated Bayesian force field fitting and prediction of systematic error
google_scholar: http://goo.gl/qO0JW
ORCID: 0000-0003-0542-119X
```
where `role` can be `Researcher` or `Primary Investigator`.

### Adding new publications

1. Add a thumbnail image to `content/publications/img`
2. Add an entry to the YAML file `data/publications/publications.yaml` in the following format:
```YAML
- title: "Toward learned chemical perception of force field typing rules"
  authors: "Camila Zanette, Caitlin C. Bannan, Christopher I. Bayly, Josh Fass, Michael K. Gilson, Michael R. Shirts, John Chodera, and David L. Mobley"
  summary: This paper introduces the SMIRNOFF format in the context of traditional force fields, explains the development and validation of our new small molecule force field smirnoff99Frosst, and highlights some directions the initiative is headed.
  img: smarty.jpg
  preprint:
    server: chemRxiv
    url: https://chemrxiv.org/articles/Toward_Learned_Chemical_Perception_of_Force_Field_Typing_Rules/6230627
    license: "CC-BY 4.0"
    date: 2018-08-06
  github:
    url: https://github.com/openforcefield/smarty
- title: "Uncertainty quantification confirms unreliable extrapolation toward high pressures for united-atom Mie $\\lambda$-6 force field"
  authors: "Richard A. Messerly, Michael R. Shirts, and Andrei F. Kazakov"
  summary: We demonstrate how Bayesian approaches can be used to estimate the reliability of predictions made with molecular mechanics force fields.
  img: mie-potential.png
  published:
    doi: https://doi.org/10.1063/1.5039504
    journal: The Journal of Chemical Physics
    volume: 149
    pages: 114109
    year: 2018
    license: "Public Domain"
    date: 2018-09-21
```
The `preprint`, `published`, and `github` fields are optional, though at least one should be specified.

## Building and deploying

1. [Download and install Hugo](https://gohugo.io/getting-started/installing/).
2. In `openforcefield/`, run `./hugo` to rebuild the static site
3. Make sure any new files in `docs/` are added to the commit:
```bash
git add docs/*
```
4. Commit the changes and push the repository to `master`
