---
date: "2019-08-06T00:00:00+00:00"
title: "Torsion Meeting Summary (August 6, 2019)"
tags: ["release-1","torsion", "fragmenter", "stereochemistry", "periodicity", "QC datasets", "fitting", "ELF"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on August 6, 2019"
slug: "torsion-meeting-2019-08-06"
weight: 10
markup: markdown
author: "Jeffrey Wagner and Karmen Condic-Jurkic"
thumb: "torsion-meeting-summary.jpg"
---


**Release-1:**: In this meeting, L.-P.Wang and Y. Qiu reported on the results of a newly-implemented workflow which performs a MM minimization of torsion-driven structures before parameter optimization. Y. Qiu showed some [results of the fitting with this change](https://github.com/lpwgroup/forcebalance-qcarchive/releases/tag/v0.0.7). It was generally agreed that this additional step improved the quality of the fitting, and was helpful in almost all cases. It was suggested that L.-P. Wang and Y. Qiu prepare a blog post of this information, but in the interest of time, this was deprioritized until after release-1. D. Mobley asked how much the additional step adds to the time required for fitting, and Y. Qiu reported that this step was not time constraining to begin with, and that the additional time cost is minimal.

H. Jang, Y. Qiu, and D. Mobley discussed the idea of removing structures which large electrostatic energy components. It was decided that H. Jang would try to develop an OpenMM-based [ELF-like](https://docs.eyesopen.com/toolkits/cpp/quacpactk/molchargetheory.html#elf-conformer-selection) method to automatically find these structures. Meanwhile, T. Gokey from the Mobley lab would be tasked with manual review of the QM geometries, to identify structures with clear intramolecular hydrogen bonding. The results of the H. Jang's implementation of the approach mentioned above can be found [here](https://github.com/lpwgroup/forcebalance-qcarchive/releases/tag/v0.0.9))

Y. Qiu reported that one angle in particular -- the C-C-C angle for cyclopropyl groups -- has an extremely high initial `k` value, which was decreasing by a factor of nearly 50% in the fitting process. It was agreed that the original value of this parameter was not intended to be quantitatively accurate, but rather to be “very high”. To resolve this, Y. Qiu should manually decrease the initial angle `k` value from `700 kilocalories_per_mole/radian**2` to `200`.

D. Mobley said that, in the future, a useful way to understand the results of parameter fitting would be a tool where one could click on a parameter, and see the molecules and QC geometries which contributed to its current value. It was agreed that this would be very useful, but that this wasn’t of critically high priority for the current release.

**Fragmenter:** C. Stern announced [a new fragmenter release containing new functionality and examples](https://github.com/openforcefield/fragmenter/releases).

**QCArchive:** J. Wagner said that the QCArchive queue is nearing empty, and that more molecules could be added. However, it was generally agreed that all necessary QC calculations for release-1 had been completed, and that we should not spend effort curating or submitting other sets until afterwards.
