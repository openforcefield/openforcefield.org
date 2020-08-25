---
date: "2019-07-23T00:00:00+00:00"
title: "Torsion Meeting Summary (July 23 and 24, 2019)"
tags: ["torsion", "fragmenter", "periodicity", "impropers", "QC datasets"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meetings on July 23 and 24, 2019"
slug: "torsion-meeting-2019-07-23"
weight: 10
markup: markdown
author: "Jeffrey Wagner and Karmen Condic-Jurkic"
thumb: "torsion-meeting-summary.jpg"
---

_This summary describes both the regularly scheduled Torsions meeting on July 23 as well as a followup meeting that was deemed necessary on July 24_

**Datasets**: Y. Qiu reported on the current status of QM data generation and parameter fitting. Currently, the two major datasets are the [“Roche” set](https://github.com/openforcefield/open-forcefield-data/tree/master/Torsion-Drives/Roche-Reference-Compounds), and the [“coverage” set](https://github.com/openforcefield/qca-dataset-submission/tree/aae895e03a402910ac389e6b5dcb5686c1e9fceb/2019-06-25-smirnoff99Frost-coverage). QM calculations on these sets have been scheduled to generate optimized geometries, torsion energy profiles, and hessians for each molecule. At this time, all of the geometry optimizations are done, most of the torsion drives are complete, and the hessians have yet to start. 

QCFractal’s current highest-priority dataset in queue is a set of boron-containing molecules. It was decided that these should be deprioritized so that the hessian calculations can be run for existing datasets. D. Smith requested that a perpetual GitHub issue be opened to record dataset priority.

**Fragmenter**: C. Stern is ready to make a pre-release of Fragmenter, designated version 0.0.3. This release was made following the meeting, and details are available [here](https://github.com/openforcefield/fragmenter/releases/tag/v0.0.3)

**Fitting**: Preliminary fitting experiments have been run using these datasets to test different strategies. These strategies include changing the number of allowed torsion periodicity values and testing a functional form for restraining values that would be suitable for fitting to improper torsions. One important issue that was identified is that torsion terms with their initial k set to 0 can experience significant noise during the k-fitting process, as in the absence of other strong energetic factors, changes in sign of this k term will drastically change the minimized geometry of the molecule. Other tests found that multi-periodicity torsions generally only see the appropriate torsion `k` terms changing over the course of a fit, indicating that it is OK to be somewhat liberal with the number of torsion terms/periodicities we allow a torsion to fit. In the case of impropers, we found that the desired restraints involved a functional form that is not currently supported by ForceBalance, and so this capability will be added after release-1 is made.

**Fitting strategy**: Y. Qiu presented several torsion drives of molecules where the QM relaxation yielded an energy range of < ~5 kcal/mol, but MM energies of equivalent conformations were as high as 20 kcal/mol. It was noted that, without relaxation of coordinates in the MM force field, these high energies probably stemmed largely from repulsive Lennard-Jones interactions, which are very sensitive to small changes in geometry. C. Bayly pointed out that, while a few extreme examples were being discussed, the same issue is likely to be present in a large fraction of the dataset, just to a lesser degree. J. Chodera suggested calculating the vdW component of each conformation and removing those with likely steric clashes. C. Bayly suggested that the ELF method would serve to identify conformations with strong electrostatic contributions to MM energy. There was general agreement that we should experiment with allowing the LJ terms to change during torsion fitting, to see if clashes could be resolved that way. C. Bayly further recommended performing a constrained minimization in a MM force field of all QM-minimized structures, to resolve steric clashes. J. Wagner suggested that, due to time constraints before the initial release, the approach taken for the current sprint should default to discard likely-problematic structures, rather than try to rush methods/infrastructure to handle them.

Several ideas were proposed about how to handle this, and a continuation of the meeting was scheduled the next day to resolve this issue. During the second meeting, D. Mobley and J. Chodera expressed agreement that C. Bayly’s suggestion of a separate MM minimization scheme. Y. Qiu said that his experiments with letting the vdW parameters vary during torsion fitting caused unacceptably large changes in those terms. Therefore, it was decided that two parallel approaches would be taken:

  * Y. Qiu and LP. Wang will attempt to build infrastructure that takes each minimized QM geometry and performs a second, constrained minimization using an MM force field. These two conformations would be considered “equivalent” and the torsions would be fit to the QM energy, but using the MM-minimized geometry. This approach is intended to reduce the effect of strong steric or electrostatic repulsions which are poorly described by the current MM force field.
  * Members of the Mobley lab will begin to investigate the datasets by eye, and flag structures which are likely to have significant steric noise. These structures could be discarded from the training if needed.
