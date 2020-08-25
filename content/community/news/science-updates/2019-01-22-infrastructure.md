---
date: "2019-01-22T00:00:00+00:00"
title: "Infrastructure Update"
tags: ["general", "maintainers"]
categories: ["science"]
draft: false
description: "Meeting of Open Force Field package developers"
weight: 10
markup: markdown
author: "Jeff Wagner"
---

## Participants

Caitlin Bannan (Mobley group), Simon Boothroyd (Chodera group), John Chodera (MSKCC), Hyesu Jang (Wang group), Victoria Lim (Mobley group), Jessica Maat (Mobley group), Owen Madin (Shirts group), David Mobley (UC Irvine), Levi Naden (MolSSI), Jessica Nash (MolSSI), Yudong Qiu (Wang group), Andrea Rizzi (Chodera group), Michael Schauperl (Gilson group), David Slochower (Gilson group), Daniel Smith (MolSSI), Chaya Stern (Chodera group), Jeff Wagner (OpenFF), Lee-Ping Wang (UC Davis)

## Glossary

[MolSSI Cookiecutter](https://github.com/MolSSI/cookiecutter-cms): The MolSSI project cookiecutter for compuational and molecular sciences projects.

[Travis](https://travis-ci.com/) (tranisitioning from [.org](https://travis-ci.org/): A Continuous Integration (CI) service that is free at the scale of our projects. Every time a commit is made to a significant branch of our repositories, Travis will spin up a clean virtual machine, install the repository and any dependencies, and run the repository's tests. The MolSSI cookiecutter comes with a vanilla Travis configuraiton file (`.travis.yml`).

[ReadTheDocs](https://readthedocs.org/): A documentation building and hosting service. The MolSSI cookiecutter comes with a vanilla ReadTheDocs directory (`docs`).

[CodeCov](https://codecov.io/): A service that receives a report from Travis indicating which lines of source code were run in the process of testing. CodeCov then puts up a clean visualization of the results.

[LGTM](https://lgtm.com/): A static code analysis tool, which reads the source code of a repository and flags bad or dangerous lines/blocks. The MolSSI cookiecutter comes with vanilla LGTM configuration files (`.lgtm.yml`, `setup.cfg`)

**Open Force Field Infrastructure Team**: Jeff Wagner (Open Force Field), Daniel Smith (MolSSI), and Simon Boothroyd (Chodera group).

**Open Force Field Developers**: Scientists developing Open Force Field project components.

## Background

- We want all Open Force Field repositories to use the same software infrastructure so that:
  - The infrastructure team can efficiently provide help to developers.
  - There are clear, evenly-applied standards across the project components.
  - The project components are can run under a single, easily distributed environment.
  - The infrastructure team can define a clear line where they assume responsibility from developers for build systems.
  - The project components are developed and documented in a standard fashion so new developers can easily get up to speed and contribute.

Our ultimate goal is to have all of the Open Force Field pacakges distributed on conda-forge, as it has an active community of expert maintainers, is already trusted by the open-source community to host hundreds of packages, and will work with developers to handle issues/updates as they arise.

## January Developers Workshop in Irvine

Two weeks prior to this meeting, the infrastructure team led a workshop at UC Irvine to lay out the technologies that will be used by developers in the Open Force Field Consortium. Some package developers were new to these technologies, while others were already familiar with many of them.

The main goal of the workshop was to get each package developer running with at least minimally functional Travis, CodeCov, ReadTheDocs, and LGTM integrations. To provide this functionality, each developer installed `cookiecutter` and used it to download and personalize their own version of the most recent MolSSI cookiecutter repository.

Depending on the maturity of the project, developers then either moved their source code inside of their newly-stamped  cookiecutter repo, or moved a few files (`.travis.yml`, `versioneer.py`, `CODE_OF_CONDUCT`, `lgtm.yml`, `setup.cfg`, ) and directories (`devtools`, `docs/`) from the newly-stamped repo into their existing source code.

Most of the workshop was focused on bringing Travis online for each component, as its build system enumerates package dependencies and lets us check whether the packages can build completely from conda-forge


## YAMLs

YAML is a general serialization format for data. In the context of the MolSSI cookiecutter, YAML files contain configuration instructions for the service integrations such as Travis. Since there are so many YAML files from the cookiecutter, we thought it would be helpful to put out a guide for which YAMLs should and shouldn't be modified from the cookiecutter.



* .travis.yml
  * You probably don't need to modify this.
  * May need changes such as OpenEye license files.
* devtools/conda-envs/test_env.yaml
  * Do update this
  * Try not to use pip dependencies if they can be avoided
  * Until we get these packages live on the anaconda cloud, this can be used to distribute your code
    * Run `conda env create -f devtools/conda-envs/test_env.yaml` and then `pip install -e .`
    * The pip install here is different from python setup.py install because it points directly to the files in the repo folder, instead of making a copy of what they are at that moment.
* devtools/conda-recipe/meta.yml
  * Don’t touch (we’ll get to this when we move on to conda-forge)
* .codecov.yml
  * Don’t touch
* .lgtm.yml
  * Don’t touch
