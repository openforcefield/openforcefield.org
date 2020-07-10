---
date: "2019-02-19T00:00:00+00:00"
title: "Torsion Meeting Summary (Feb 19, 2019)"
tags: ["torsion", "fragmentation", "atom order", "SMILES", "QCFractal", "TorsionDrive", "geomeTRIC", "SAPT", "fitting"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on February 19, 2019"
slug: "torsion-meeting-2019-02-19"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**Atom Order:** There can be multiple ways to tag [SMILES](https://www.daylight.com/dayhtml/doc/theory/theory.smiles.html) involving self-symmetry and C. Stern raised the question of how to ensure the same geometry always gets assigned the same atom ordering. D. Smith said that a string comparison is currently possible, where string is contained in a QCEngine job description. J. Chodera thinks that having identical geometries with different atom ordering is highly improbable and should not be a major concern.

**Fragmentation:** The underlying assumption of torsion fitting is that the MM energy can be decomposed and decoupled from other terms, leaving the clean torsion energy profile as a single function to fit. J. Chodera is interested in how to validate this assumption. D. Smith suggested looking into AMOEBA SAPT, which identifies specific orbital pairs to calculate energies between, and label them as required to correspond to certain MM terms. David Sherrill might be a good person to reach out to for more details about [SAPT calculations](https://aip.scitation.org/doi/am-pdf/10.1063/1.4927575).

Due to licensing issues with using [OpenEye](https://www.eyesopen.com/) tools, it’s desirable that fragmentation is performed in OE-independent way in the future. D. Smith suggested fragmenting based on Wiberg bond orders and potentially training a neural network based on that data.

**QCFractal:** MolSSI expects to launch the QCFractal closed beta soon, although later than planned, but that gives more time to integrate QCFractal into everyone’s CI and for local testing. This period will likely introduce many API breaking changes.

**TorsionDrive / geomeTRIC:** [geomeTRIC]((https://github.com/leeping/geomeTRIC)) now achieves faster convergence and redundant files are removed. [TorsionDrive]((https://github.com/lpwgroup/torsiondrive)) can now run with limited ranges for torsion scans. It can break the symmetry of the torsion map, but the user should know what they’re doing. For 2D scans, it is possible to set ranges independently.
