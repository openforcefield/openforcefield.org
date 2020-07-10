---
date: "2019-04-16T00:00:00+00:00"
title: "Torsion Meeting Summary (Apr 16, 2019)"
tags: ["torsion", "OFF Toolkit","OFFXML", "ForceBalance", "QC datasets", "torsion workflow"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on April 16, 2019"
slug: "torsion-meeting-2019-04-16"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
thumb: "torsion-meeting-summary.jpg"
---

This meeting generally focused on planning for the first round of parameter optimization.

**OFF Toolkit:** J. Wagner presented the initial release of the [Open Force Field Toolkit](https://github.com/openforcefield/openforcefield), which includes specific Force Field modification tools that could be used by the [Lee-Ping Wang lab](http://www.lpwchem.org/) / [ForceBalance](https://github.com/leeping/forcebalance) to more robustly handle OFFXML files and workflow integration.

**Torsion Workflow:** J. Chodera led a short discussion on the overall shape of the final workflow, and what the interface would be to push molecules through it. The workflow will eventually automate the process of moving data from molecules → fragments → torsions → QM → QCArchive result entries. For the initial rounds of processing, many of these steps will be run manually, however we expect to automate it as  we gain experience.

It was decided that we would prioritize working with the Chodera and Mobley groups to get their HPC systems contributing processing power to the QCFractal OpenFF resource pool as soon as possible.

**QC Datasets:** The majority of the meeting was then spent on deciding on an initial dataset to use for the optimization, ultimately resulting in the decision to use a diverse set of [fragments contributed by Roche](https://github.com/openforcefield/open-forcefield-data/tree/master/Torsion-Drives/Roche-Reference-Compounds). Y. Qiu was selected to do the initial submission of these molecules to the workflow.
