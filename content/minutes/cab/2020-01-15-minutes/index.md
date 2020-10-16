---
date: "2020-01-15T00:00:00+00:00"
title: "Jan 15, 2020 Advisory Board Meeting"
tags: ["Open Force Field Consortium", "Advisory Board", "minutes"]
categories: ["Advisory Board Meeting Minutes"]
draft: false
description: "Meeting minutes"
weight: 10
author: "Karmen Condic-Jurkic"
---

The [Open Force Field Consortium Advisory Board](https://openforcefield.org/about/organization/#open-force-field-consortium) met on January 15, 2020.
The minutes are summarized as follows:

#### Protein-ligand benchmarking

* D. Hahn gave an [update](2020-01-15-PLBenchmark-Update-David-Hahn.pdf) on his progress with protein-ligand benchmarking of [Parsley](https://github.com/openforcefield/openforcefields) -- he is currently working on developing a [repository](https://github.com/openforcefield/PLBenchmarks) for storing and presenting data used for protein-ligand benchmarking studies, which stores only primary data reported in cited publications (derived data, for example dG, is converted on the fly from IC50, Kd, etc).
* D. Hahn coordinates an effort to write a living document ([LiveCoMS](https://www.livecomsjournal.org/) review) capturing the current state of knowledge in this domain and everyone interested in contributing should reach out to him.
* Protein-ligand systems used in this study were primarily selected based on the pre-existing computational studies for easier comparison, but this initial set is expected to expand in the future and potentially divide into more specialised subsets appropriate for specific benchmarking tasks.
* Free energy calculations are following the same workflow developed by Vytas Gapsys based on the [non-equilibrium alchemy](https://pubs.rsc.org/en/content/articlehtml/2020/sc/c9sc03754c) and [pmx](https://onlinelibrary.wiley.com/doi/full/10.1002/jcc.23804) tools implemented in Gromacs. D. Hahn is using protein structures already used in the mentioned study by Gapsys et al. study for easier comparison with Parsley.
* D. Hahn might also perform a comparison between OPLS3e and QM optimized structures used in Parsley parameterization as a part of benchmarking study.
* Limited computational resources have an impact on the total progress made so far, although additional resources might become available in the future.


#### OpenMM support for SMIRNOFF and GAFF force fields
* J. Chodera gave an overview of the recently implemented [OpenMM support for SMIRNOFF and GAFF force fields](https://github.com/openmm/openmm-forcefields).
* An example for swapping Amber with OFF parameters can be found [here](https://github.com/openforcefield/openforcefield/tree/master/examples/swap_amber_parameters).


#### Torsion drive discussion

* L.-P. Wang gave a brief [update](2020-01-15-torsiondrive-discusion-LPWang.pdf) of the recent (Slack) discussion about torsion drive procedures and the effects of conformations with intramolecular hydrogen bonds on the resulting surface.
* X. Lucas noticed that some molecules in the torsion drive datasets had a capability to form an intramolecular H-bond, but these conformations haven’t been captured in torsion drive scans.
* Torsion drive procedure is recursive to avoid hysteresis, discontinuities and getting stuck in high-energy minima, but there is no guarantee that torsion drive will be able to find a global minimum. However, it is able to stitch together results from multiple starting structures, for example, multiple starting points can be provided (“known” local minima) for torsion scans, which can subsequently decrease calculation walltime.
* Torsion drive manuscript is nearly completed and submission is expected in the next month after it goes through the approval process.
* Preliminary decision is to create two torsion drive datasets for the next round of fitting - one with intramolecular H-bonds and one without to investigate the effect of intramolecular H-bond on parameters.
* Molecules inspected in the mentioned torsion drive scans are up to 30 heavy atoms and have not been fragmented.
* Another question to consider is how to prevent overbinding in gas-phase and how to include implicit solvent in gas phase? L.-P. Wang suggested using the same implicit solvent model for QM and MM computations (PCM/COSMO for example, as implemented in Tinker for AMOEBA).
* The final torsion drive surface always contains only the lowest lying points, but the high energy conformations could be included, generated in the process.
* J. Chodera suggested using optimization datasets already stored in QCArchive with different conformations and associated gradients as additional source of information, but the most appropriate use cases for this incidentally generated data remains to be determined.
* J. Horton is working on bespoke workflow for fragmentation and torsion drives, but it may take time to get software ready, even though the science behind it has been done.


#### Properties

* Discussion around NIST/DIPPR property data selection can be followed [here](https://github.com/openforcefield/nistdataselection/issues/12).


#### Other topics

* The next in-person meeting will be held on May 4-5 in Cambridge, MA just before [2020 Workshop on Free Energy Methods in Drug Design](http://www.alchemistry.org/wiki/2020_Workshop_on_Free_Energy_Methods_in_Drug_Design) (May 6-8).
* K. Condic-Jurkic will reach out and collect photos from the Board members for the new website.
