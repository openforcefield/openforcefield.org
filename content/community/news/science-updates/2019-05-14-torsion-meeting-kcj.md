---
date: "2019-05-14T00:00:00+00:00"
title: "Torsion Meeting Summary (May 14, 2019)"
tags: ["torsion", "valence", "TorsionDrive", "chemical space", "WBO", "CMILES", "QC datasets", "fitting", "infrastructure", "fragmentation"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on May 14, 2019"
slug: "torsion-meeting-2019-05-14"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---

**TorsionDrive:** Y. Qiu updated [TorsionDrive](https://github.com/lpwgroup/torsiondrive) with visualization and more documentation. He is planning to add functionality to TorsionDrive to store gradients, which are currently computed, but not recorded. D. Smith suggested having a schema defined for TorsionDrive jobs for future use, to facilitate using it in larger project infrastructure.

**Torsion/Valence Fitting:** There was discussion of when fitting with ForceBalance might start. L.-P. Wang estimated that, provided with our first round of finished QC calculations, [ForceBalance](https://github.com/leeping/forcebalance) might take about a day to run before providing an optimized set of parameters. Chris Bayly suggested use of torsional QM data as a first approximation of equilibrium valence parameters, which would require inclusion of gradients for further processing by ForceBalance. D. Smith confirmed that gradients have been computed during torsional scans and the new functionality that Y. Qiu is adding to TorsionDrive will enable the data to be pulled down. ForceBalance can optimise torsional and valence parameters separately or simultaneously. Considering that ForceBalance doesn’t require a lot of compute time, an easy and potentially useful experiment might be to combine torsions+valence fitting based on torsion QM data only, and compare it later to the results of parameters obtained from QM data obtained specifically for valence fitting to see the effect on final results. Similarly, it would be interesting to compare valence and torsion parameters obtained from independent and combined ForceBalance optimization runs.

**Chemical Space Coverage:** Chris Bayly asked how the consortium is steering FF optimization through chemical space, pointing out that the rate limiting step is generation of QM data. Currently, the [“Roche set”](https://github.com/openforcefield/open-forcefield-data/tree/master/Torsion-Drives/Roche-Reference-Compounds) of druglike fragments is being used and the whole set is ~500 molecules with associated ~20,000 torsion profiles, many of which are redundant and 820 representative torsions were selected for initial computation. A subset of 16 torsions was further selected for QM benchmarking study aimed at selecting the most appropriate level of theory for future calculations of torsion profiles. This dataset will be further expanded with fragments/chemistry relevant to the industry partners as a priority. A decision needs to be made on whether to use QCArchive and computing resources to generate more torsion scan data for fitting, or to begin scans focused on valence parameters like bonds and angles. C. Stern will provide some additional fragments from the kinase inhibitor set from the Chodera lab in the next few days.

A related question is how to assess the fraction of existing torsion parameters (in [smirnoff99Frosst](https://github.com/openforcefield/smirnoff99Frosst)) that are actually being scanned in the Roche dataset. D. Smith and D. Mobley made a plan to pull down the molecules already in the QCArchive and perform parameter labeling using the Open Force Field toolkit. Y. Qiu further pointed out that, during optimization, ForceBalance will report a gradient of “0” for parameters for which it has no data. Either of these strategies could be used to analyze the available QM dataset at any time to report the fraction of smirnoff99Frosst parameters that are being fit.

**Wiberg Bond Order:** C. Bayly further asked about conformational dependence of Wiberg Bond Order (WBO) and C. Stern said that use of their [ELF (Electrostatically Least-interacting Functional groups) conformer selection method](https://docs.eyesopen.com/applications/quacpac/theory/molcharge_theory.html#elf-conformer-selection) seems to generate fairly reproducible results for WBO, although there are exceptions. This approach seems like it might be a  “good enough” solution for the current purposes. Daniel pointed out that there is a lot of QM data stored in QCArchive, and a neural network could be trained to predict bond orders, but the question remains which type of bond order should it be trained for.

**CMILES:** [RDKit]((http://rdkit.org/)) has undergone SMILES/InChi-changing updates in the latest release and this underscored the importance of pinning RDKit versions to [CMILES](https://github.com/openforcefield/cmiles). This will have to be looked into in the future for more resilient approach when it comes to RDKit updates.

**Infrastructure:** A new group call dedicated to QCFractal users and their issues will be established.
