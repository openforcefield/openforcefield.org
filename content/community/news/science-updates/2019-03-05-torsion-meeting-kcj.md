---
date: "2019-03-05T00:00:00+00:00"
title: "Torsion Meeting Summary (Mar 5, 2019)"
tags: ["torsion", "QCFractal", "QCArchive", "TorsionDrive", "documentation", "infrastructure"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on March 5, 2019"
slug: "torsion-meeting-2019-03-05"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---



**TorsionDrive:** Y. Qiu started working on [TorsionDrive](https://github.com/lpwgroup/torsiondrive) and was unable to replicate D. Smith's previously reported issue with 120 degree scan intervals. D. Smith confirmed that he was also unable to replicate and he suspects it might have been a version issue.

**QCFractal:** Stable version of [QCFractal](https://github.com/MolSSI/QCFractal) is out and should be installed through pip or conda - always `conda install qcportal -c conda-forge`. QCPortal might throw an error if an older version of QCFractal is used. Hessians are supported. Documentation on how to use [QCArchive](https://qcarchive.molssi.org/) can be found [here](https://qcfractal.readthedocs.io/en/latest/setup_compute.html), but it’s still work in progress. Otherwise, there are compute resources now available at [MolSSI](https://molssi.org/) and people can start submitting their jobs.
