# Open Force Field Initiative website source

This website is hosted by [GitHub Pages](https://pages.github.com/) at http://openforcefield.org . The website content is in the `gh-pages` branch of this repo.

## Making changes

Changes should be contributed as pull requests.

You will primarily want to focus on changing the following Markdown files in `content/`:
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

### Adding Science Updates

1. Create a new file in `content/science/updates/` using the format `YYYY-MM-DD-lastname.md` (e.g. `2018-10-11-chodera.md`)
2. Populate the file in Markdown with the following header style:
```yaml
---
date: "2018-10-11T00:00:00+00:00"
title: "Introducing Open Force Field Science Updates"
tags: ["general"]
categories: ["science"]
draft: false
description: "Open Force Field Science Updates will help you keep track of research and engineering activities from the Open Force Field Initiative"
weight: 10
author: "John D. Chodera"
---
```
3. If you have images to post, create a subdirectory in `content/science/updates/` using the format `YYYY-MM-DD-lastname/` (e.g. `2018-10-11-chodera/`) and put your images there. You can reference them with
```
![GAFF densities](gaff-densities.jpg "GAFF densities")
```
where the file `gaff-densities.jpg` is located in `content/science/updates/YYYY-MM-DD-lastname/gaff-densities.jpg`

### Adding new members

1. Add an image to `content/members/img/` (e.g. `firstname-lastname.jpg`).
2. Add a YAML file `firstname-lastname.yaml` to `data/members/` in the following format:
```YAML
name: John D. Chodera
role: Primary Investigator
lab: Chodera lab
title: Associate Member
institution: Sloan Kettering Institute
img: john-chodera.jpg
webpage: "http://choderalab.org"
description: Automated Bayesian force field fitting and prediction of systematic error
google_scholar: http://goo.gl/qO0JW
ORCID: 0000-0003-0542-119X
twitter: jchodera
github: jchodera
```
where `role` for active members can be `Researcher`, `Advisor`, `Software Scientist`, `Primary Investigator`, or `alum`.

### Adding new publications

1. Add a thumbnail image to `content/publications/img`
2. Add an entry to the YAML file `data/publications/publications.yaml` in the following format:
```YAML
- title: "Escaping atom types using direct chemical perception"
  authors: "David Mobley, Caitlin C. Bannan, Andrea Rizzi, Christopher I. Bayly, John D. Chodera, Victoria T Lim, Nathan M. Lim, Kyle A. Beauchamp, Michael R. Shirts, Michael K. Gilson, and Peter K. Eastman"
  summary: This paper introduces the SMIRNOFF format in the context of traditional force fields, explains the development and validation of our new small molecule force field smirnoff99Frosst, and highlights some directions the initiative is headed.
  img: smirnoff-v0.1.png
  date: 2018-10-11
  preprint:
    server: bioRxiv
    url: https://doi.org/10.1101/286542
    license: "CC BY 4.0"
    date: 2018-07-13
  published:
    doi: 10.1021/acs.jctc.8b00640
    journal: Journal of Chemical Theory and Computation
    date: 2018-10-11
    volume: 14
    pages: 6076
    year: 2018
    pmcid: PMC6245550
- title: "Toward learned chemical perception of force field typing rules"
  authors: "Camila Zanette, Caitlin C. Bannan, Christopher I. Bayly, Josh Fass, Michael K. Gilson, Michael R. Shirts, John Chodera, and David L. Mobley"
  summary: Here, we introduce a proof of principle for automatically sampling chemical perception compared to traditional atom typed force fields and our SMIRNOFF format.
  img: smarty.jpg
  date: 2018-12-04
  preprint:
    server: chemRxiv
    url: https://chemrxiv.org/articles/Toward_Learned_Chemical_Perception_of_Force_Field_Typing_Rules/6230627
    license: "CC BY 4.0"
    date: 2018-08-06
  published:
    doi: 10.1021/acs.jctc.8b00821
    journal: Journal of Chemical Theory and Computation
    date: 2018-12-04
    volume: 15
    pages: 402
    year: 2019
    nihmsid: 1012523
  github: openforcefield/smarty
```
* The `preprint`, `published`, and `github` fields are optional, though at least one should be specified.
* For preprints, `server` can either be `bioRxiv` or `chemRxiv`.
* For published papers, the `pmcid` ([PubMed Central PMCID](https://www.mbl.edu/osp/2015/08/31/nih-pmid-vs-pmcid-whats-the-difference/)) should be specified. If the article doesn't yet have a PMCID, be sure to [submit it to PubMed Central](https://www.nihlibrary.nih.gov/services/editing/pubmed-central-submission-assistance) and report the `nihmsid` instead. Failure to do so will jeopardize our NIH grants.
* Each `preprint` block should list a `url`, while `published` blocks should report a `doi` (not a URL).
* The `license` can be one of `CC BY 4.0` or `Public Domain`. Please ensure all manuscripts are available via one of these licenses, as other licenses violate the terms of the Open Force Field Consortium.

## Preview the website locally

0. [Download and install Hugo](https://gohugo.io/getting-started/installing/).
1. In the top-level directory, run `hugo server -D`
2. Copy the Web address from this line (in this example, it is `localhost:1313`):
```
Web Server is available at //localhost:1313/ (bind address 127.0.0.1)
```
3. Paste the Web address into your browser

## Making changes

1. Create a new branch with `git checkout -b <mybranch>`, where `<mybranch>` is the name of your new branch.
2. Commit the changes (`git commit .`) and push the repository to your branch (`git push origin <mybranch>`)
3. Open a PR and request review

## Deploying

Deploying is handled by a Travis build service. Commits/PRs into master will trigger a new build, which can be monitored [here](https://travis-ci.org/openforcefield/openforcefield.org). Once built, travis will push the content to the `gh-pages` branch of `openforcefield.org`, which the website is now served from.
