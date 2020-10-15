---
date: "2019-04-30T00:00:00+00:00"
title: "Torsion Meeting Summary (Apr 30, 2019)"
tags: ["torsion", "QCFractal", "molecular graphs", "TorsionDrive", "DFT benchmarking", "QC datasets", "fitting"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on April 30, 2019"
slug: "torsion-meeting-2019-04-30"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**QCFractal:** This meeting focused on technical details of how our initial dataset for parameter fitting will be generated. As we prepare for our first major use of the [QCFractal](https://github.com/MolSSI/QCFractal) distributed computing system, we need to make decisions on the basis set and method that will be used for our geometry optimizations and energy evaluations, as well as several smaller technical issues.

Since the previous meeting, UCI’s and MSKCC’s HPC resources had been configured and were capable of contributing processing power to QCFracal's OpenFF resource group.

**Molecular Graphs:** C. Stern raised an issue that she had seen in some of her geometry optimizations. She found that some conformations of molecules generated during torsion scanning made or broke bonds. There were very few of these cases, but they had the potential to contaminate the training dataset. To detect these cases automatically, Chaya added functionality that calculates the [Wiberg bond orders](https://docs.eyesopen.com/toolkits/python/quacpactk/bondordertheory.html) of a system, defines bonds as having a Wiberg order over 0.8, and detects whether the molecular graph has changed from its initial configuration. She caught a few cases where this happened, mostly due to hydrogen transfer, and posed the questions of when to run these checks in the workflow, and what to do if the graph is rearranged. Y. Qiu suggested leaving the current infrastructure intact, and adding a post-processing step that runs the Wiberg bond order analysis. This was met with general agreement, and C. Stern, D. Smith, and J. Wagner will meet after this to talk about automating these checks over OpenFF scans in QCFractal.

**QC Datasets:** L.-P. Wang then presented on [his work](https://openforcefield.org/community/news/science-updates/2019-05-16-condicj/) setting up benchmarking calculations for method and basis set selection. Based on previous work in the field, Lee-Ping suggested a few different combinations to try, which seemed well-supported by the data, and generally had < 1 kcal/mol RMSE from a high-accuracy reference calculation. D. Smith added that the B97-3C or PBEh-3C families are expected to work as well as the best in the range that Lee-Ping selected, at an order of magnitude less in cost. Lee-Ping asked whether more time should be spent to evaluate the accuracy of three-body dispersion terms in the calculations, but it was generally agreed that we should move forward with the first round of data generation without these terms.
