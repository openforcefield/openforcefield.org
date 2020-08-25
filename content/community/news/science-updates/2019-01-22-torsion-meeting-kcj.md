---
date: "2019-01-22T00:00:00+00:00"
title: "Torsion Meeting Summary (Jan 22, 2019)"
tags: ["torsion", "Fragmenter", "fragmentation", "ForceBalance", "QCArchive", "DOI assignment", "QC datasets"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on January 22, 2019"
slug: "torsion-meeting-2019-01-22"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**QCArchive/QCFractal:** A stable version of [QCArchive](https://qcarchive.molssi.org/) is coming on Feb 11 and open beta version around Mar 15. The main focus of development are object models instead of using JSON throughout the Python-based ecosystem, and distributed computing testing. It’s possible that QCArchive will move to [Parsl](http://parsl-project.org/) for workflow management. Addition of compute resources to QC Archive cloud is expected soon, after some debugging in collaboration with C. Stern and Y. Qiu.

QCArchive can provide the Hessians and a small piece of code will be created to create frequencies from these Hessians, but it is not yet clear where this will be kept. It should be possible to to get *coordinates + Hessians + masses* from QCArchive data models, and there is existing code in [PSI4](http://www.psicode.org/) that interconverts hessians into frequencies pretty well. For ESP calculations, it will be necessary to provide grids in advance, as tasking QCArchive with grid generation is not feasible.

**QCArchive / ForceBalance Interface:** [ForceBalance](https://github.com/leeping/forcebalance) probably won’t submit jobs to QCArchive, but instead it will just pull down all the available data (or a selected subset) and use that for parameterization. J. Chodera suggested that employing the same native object model used in QCArchive would be preferred over downloading files and reading them from disk. D. Smith recommended to steer away from  pulling any data from the global QCArchive at the moment due to instability, but recommended some simple local data to test [ForceBalance interface](https://github.com/lpwgroup/forcebalance-qcarchive). J. Chodera was interested in preserving provenance information and possible assignment of DOIs to datasets used in ForceBalance parameter fitting. L.-P. will look into DOI assignment, but in the meantime the provenance information can be preserved in the target data folder.

[**Fragmenter:**](https://github.com/openforcefield/fragmenter) C. Stern reported that kinase inhibitor fragmentations are in progress, but 2D torsion scans seem to be computationally intensive. One way to reduce the amount of CPU hours needed is to do high-resolution scans for central bonds and a coarser scan for outer bonds, but the exact order of magnitude for the amount of CPU time is yet to be determined.

**Datasets:** Mobley lab (Caitlin, Vickie, Jordan) is working on a molecule set for initial force field fitting, in particular, finding molecules where force fields are in disagreement and where QM can be challenging.

Generating conformations in a clever way for torsion drive was discussed and general consensus is that it is a non-trivial task and it should be decided whether external tools should be used for this purpose or developed internally.
