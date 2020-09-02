---
date: "2019-12-02T00:00:00+00:00"
title: "Webinar by Andreas Krämer: Automated Optimization Approaches for the CHARMM Lipid Force Field (Dec 17, 2019)"
tags: ["news", "general", "Andreas Krämer", "webinar","CHARMM", "force field", "lipids", "Lennard-Jones"]
categories: ["news"]
draft: false
description: "Andreas Krämer will talk about automated optimization of the CHARMM36 lipid force field on Dec 17 at 2 pm (ET)."
markup: mmark
weight: 10
author: "Karmen Condic-Jurkic"
thumb: "webinar-kraemer-dec2019.png"
---

[Andreas Krämer](https://www.lobos.nih.gov/cbs/groupmembers.shtml) (NIH) will give a talk about development of an automated optimization approach to improve the CHARMM36 lipid force field using pair-specific LJ parameters. Join the seminar via [Zoom](https://meetmsk.zoom.us/j/628310560) in real time on Dec 17 at 2 pm (ET), or watch it later on our [YouTube channel](https://www.youtube.com/channel/UCh0aJSUm_sYr7nuTzhW806g).

</br>
**Abstract:** The [CHARMM36 (C36) lipid force field](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2922408/) is well-validated for many properties of monolayers and bilayers and has been cited in over 2000 studies of membrane simulations. Problematic aspects of C36 include its hard-wired fine-tuning to the TIP3P water model as well as intricacies regarding the Lennard-Jones (LJ)
interactions. Concretely, the LJ switch distance is inconsistent between the C36
protein and lipid force fields and monolayer surface tensions only agree with experiment when long-range dispersion is incorporated. In contrast, bilayer properties
were optimized without [long-range dispersion](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2922408/).

To improve this situation, we first explore the water-model dependence and develop
an automated optimization approach to better [reproduce membrane permeabilities](https://pubs.acs.org/doi/10.1021/acs.chemrev.8b00486)
using [pair-specific LJ parameters](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6602074/). We then carry out a reweighting-based
optimization of the force field to consistently introduce [long-range dispersion](https://pubs.acs.org/doi/10.1021/acs.jctc.7b00948).
The initial results for 1,2-dipalmitoyl-sn-glycero-3-phosphocholine (DPPC) show that
within few iterations the match with experiment is improved for many important lipid
properties, such as bilayer and monolayer surface areas, compressibilities, order
parameters, and headgroup hydration.
