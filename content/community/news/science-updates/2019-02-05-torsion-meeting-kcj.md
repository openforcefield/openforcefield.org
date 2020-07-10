---
date: "2019-02-05T00:00:00+00:00"
title: "Torsion Meeting Summary (Feb 5, 2019)"
tags: ["torsion", "fragmentation", "conformers", "visualization", "SMILES", "QCFractal", "QM methods", "ANI-1"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on February 5, 2019"
slug: "torsion-meeting-2019-02-05"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**Conformer Generation:** C. Stern found that a better way of atom mapping is necessary to keep track of the original map after fragmentation, because sometimes indexed [SMILES](https://www.daylight.com/dayhtml/doc/theory/theory.smiles.html) get re-indexed after fragmentation, which results with the loss of the original map. Occasionally, certain groups that should remain whole end up fragmented.

**Torsions / QM Methods:** D. Smith suggested that [ANI-1](http://dx.doi.org/10.1039/C6SC05720A) could be a good, fast solution to evaluate energy. It has been decided, though, that for now ANI-1 and semiempirical methods won’t be used for computing torsion scans. V. Lim is working on finding molecules where QM mehods disagree. C. Stern needs to figure out if there is a strong correlation between bond order and torsion profiles and she’ll start computing AM1 [Wiberg bond orders](https://docs.eyesopen.com/toolkits/python/quacpactk/bondordertheory.html) immediately. She will also look into optimizing her fragmentation algorithm to ensure smallest fragments with relevant chemistry are produced. In the future, we might expect problems with finding out if a new molecule that needs to parameterized is already covered by the existing torsion types and whether those parameters are good (enough).

**QCFractal:** The codebase is undergoing a lot of changes at the moment and a closed beta release is planned for Feb 15 when the first production calculations are expected to run on the platform. Simple visualization of torsion scans is also in the pipeline, probably using Plotly to support a web/jupyter notebook interface, and the implementation is expected in the next month or so.
