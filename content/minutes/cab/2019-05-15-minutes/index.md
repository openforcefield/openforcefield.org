---
date: "2019-05-15T00:00:00+00:00"
title: "May 15, 2019 Advisory Board Meeting"
tags: ["Open Force Field Consortium", "Advisory Board", "minutes"]
categories: ["Advisory Board Meeting Minutes"]
draft: false
description: "Meeting minutes"
weight: 10
author: "Karmen Condic-Jurkic and Arjun Narayanan"
---

The [Open Force Field Consortium Advisory Board](https://openforcefield.org/about/organization/#open-force-field-consortium) met on 15 May, 2019.
The minutes are summarized as follows:

#### Roadmap

* J. Chodera gave an overview of the [roadmap](roadmap-graphic-may-2019-update.pdf) for the remaining time of Year 1 and the accomplishments made so far.

#### Torsions update

- The selected set of molecules for initial torsion scanning contains 486 small and chemically diverse molecules provided by Roche (less than 30 heavy atoms)- [“Roche set”](https://github.com/openforcefield/open-forcefield-data/tree/master/Torsion-Drives/Roche-Reference-Compounds)- more fragments will be added to this set in the future.
- A subset of 820 1D torsions was selected for initial scanning, but this set will be expanded to include more torsion and 2D scans, which are currently omitted due to computational cost.
- Current level of theory used to compute torsion profiles is B3LYP-D3(BJ)/DZVP, but a subset of 15 torsions has been selected for further QM benchmarking (more details on datasets and benchmarking can be found in this [Science Update post](/community/news/science-updates/2019-05-16-condicj/)).
- [ForceBalance](https://github.com/leeping/forcebalance) is ready to compute torsion parameters.

#### Valence and impropers update

- Some initial refitting of impropers on trivalent nitrogens using a small set of molecules with different substituents on nitrogen has been done based on SMIRNOFF99Frosst parameters, but more molecules will be added to this dataset (pulled from eMolecule with fingerprint addition).
- Impropers are being scanned while keeping torsions fixed using [geomeTRIC](https://github.com/leeping/geomeTRIC)- simplified and independent fitting runs will be performed initially to test the framework, but ultimately, ForceBalance should be used for fitting with all data simultaneously.
- Data generated for torsions might be used for an initial valence fitting round.
- C. Bannan is working on using [Chemper](https://github.com/MobleyLab/chemper) to port AMBER protein force field parameters into SMIRNOFF format (work funded by MolSSI).

#### Property estimator update

- Modular and scalable design to compute any property of interest using simple code.
- Can be used both for assessment and parameterization loops.
- Early testing for the simulation and reweighting layer has been done.

#### Charges

* OpenFF will start with assigning the existing charges, but will eventually develop a way of applying new charges.

#### OpenFF Toolkit update

- A minimal working toolkit released on April 8 (0.2.0) and new versions will be released approximately once a month;
- Two main areas of development:
  - Fully support the SMIRNOFF spec
  - API improvements / bugfixes / SMIRNOFF spec updates
- Two bugfix releases (0.2.1, 0.2.2) made and 0.3.0 is coming up.
- Current milestones for the next release are focusing on Force Field I/O, versioning and provenance (0.3.0), and GBSA parameter assignment is expected in 0.4.0. [Milestones](https://github.com/openforcefield/openforcefield/milestones) and [issues](https://github.com/openforcefield/openforcefield/issues) can be tracked on [GitHub](https://github.com/openforcefield).
- Finishing tarball installer and scheduling 1:1 meetings with the partners.

#### Consortium

- Election for the Advisory Board- nominations to be sent to Karmen and David.
- Renewal for Year 2 - CRA needs to be signed by Sep 1. Industry partners need to check what is necessary for continuation and OFFI needs to provide necessary information and materials.
- Involvement in the subgroup meetings - a visible schedule to make it easier for interested parties to join. In the meantime, contact Karmen to provide more information;
- Better accessibility of slides and data -- Zenodo Community about to be formed to address this problem.
