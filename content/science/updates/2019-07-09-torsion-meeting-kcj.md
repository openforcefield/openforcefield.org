---
date: "2019-07-09T00:00:00+00:00"
title: "Torsion Meeting Summary (Jul 9, 2019)"
tags: ["torsion", "fragmenter","stereochemistry", "periodicity", "QC datasets", "torsion diversity", "ECFP", "WBO"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on July 9, 2019"
slug: "torsion-meeting-2019-07-09"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
---

**Fragmenter:** C. Stern is working making [fragmenter](https://github.com/openforcefield/fragmenter) more interoperable and more suitable for an automated pipeline. Some of the features include using [Omega](https://www.eyesopen.com/omega) to identify rotatable bonds and Wiberg bond order computations.

**QC datasets:** "Roche set" (468 molecules) is almost done in terms of generating QC data for initial round of fitting with ForceBalance. The currently calculated data includes ~820 1-D torsion scans and geometry optimizations, and the next step is computing hessians. There are still several molecules that throw an error in [QCFractal](https://github.com/MolSSI/QCFractal), but Y. Qiu believes that it’s likely to be a bug in QCFractal and he’s waiting for D. Smith to have a look. “Roche set” covers approximately ~50% of SMIRNOFF torsion parameters. The “coverage set” was built to complement “Roche set” and it covers nearly all SMIRNOFF parameters space. At the moment, only geometry optimizations have been performed for that set. J. Chodera has prepared a set containing boron, and C. Bayly noted that boron is usually tetrahedrally coordinated under physiological conditions and that the set should include tetravalent compounds, too, in addition to the common trivalent molecules. He also suggested silicon and selenium as two additional biologically interesting elements that should be considered for parameterization. J. Chodera asked about other possible sources of interesting molecules that could be used to generate QC data and provide decent chemical coverage. Suggestions like [DrugBank](https://www.drugbank.ca/), [Enamine](https://enamine.net/) subsets, and [Ligand Expo](http://ligand-expo.rcsb.org/) came up.

Y. Qiu and C. Stern will migrate all submitted datasets to [qca-dataset-submission](https://github.com/openforcefield/qca-dataset-submission) repo for provenance.

**Torsion diversity:** C. Bayly raised the question regarding chemical diversity associated with a particular torsion type and what are the options to enhance this diversity. He suggested using fingerprinting molecular after fragmenting, for example with [Extended-Connectivity Fingerprints (ECFP)](https://pubs.acs.org/doi/10.1021/ci100050t) to assess diversity of chemical groups around particular torsion and selecting a number of molecules with the most diverse chemical coverage. C. Stern suggested using Wiberg bond orders instead, which was a well received suggestion. Implementation of either approach would require a sizeable amount of development time, which is unfortunately limited at this point. J. Chodera will create an optimization dataset from Enamine and LigandExpo and do a quick scan of diversity for each torsion type present in the set and select diversity representatives randomly (quick and dirty solution), or if time allows, consider Wiberg bond order following C. Stern’s suggestion.

**Protonation states/ Tautomers:** The importance of relevant protonation states and tautomers in the datasets was discussed. C. Bayly said that it’s important that the molecules are close to their biological states and that the exclusion of charged species from the first parameterization round will likely lead to some significant parameter changes once in the next round when the charged molecules get included. “Roche set” doesn’t currently contain charged molecules and a more detailed QM benchmarking on torsion drives is yet to be performed. Having anionic species would likely require use of diffuse basis sets, but it is not clear what would be a proper QM treatment of charged molecules at this stage and decision about whether to include them or not is postponed until later when this will be discussed with QM experts in the team.

C. Stern raised an issue with OE toolkit producing some dubious output when generating tautomers or alternative protonation states. C. Bayly believes that the latest version of the toolkit should deal with this reasonably well, but will look into her inputs and outputs to figure out where the problem might be.

**Stereochemistry and periodicity:** Y. Qiu and J. Wagner are working on creating a feature that would allow importing a QCElement molecule to OFF toolkit. The current pipeline is as follows: QCElement → CMILES → OpenEye toolkit → OFF toolkit and this feature will live for now in [ForceBalance-QCArchive repo](https://github.com/lpwgroup/forcebalance-qcarchive). One of the issues that occurs with this is when OFF toolkit is trying to assign stereochemistry to atoms that are not stereocenters according to the QC geometries. [OFF toolkit](https://github.com/openforcefield/openforcefield) should allow for undefined stereochemistry and J. Wagner is working on it.

According to C. Bayly, there are two approaches to periodicity treatment: *i)* unrestricted -- anything to fit the data, i.e. higher periodicity, and *ii)* chemical intuition based, i.e. defining periodicity for a specific torsion. He is partial to the latter approach. He thinks that functionals should be restricted to 360/periodicity in terms of symmetry, and anything else  would only makes sense if there’s a chiral SMILES. At the moment, ForceBalance doesn’t allow phase changes, but the parameters are allowed vary and adopt negative values. However, if values are small and negative (close to zero), someone should inspect them. Overall, the parameters should be allowed to change a lot, but if they do (> 2 kcal/mol), they should be flagged and inspected.

**Decisions/tasks:**

* J. Chodera will generate quick diversity sets;
* C. Stern will contact OE with tautomer/protonation generation errors;
* C. Stern will cut fragmenter release with examples;
* Decision whether to include anionic molecules postponed until more info is available about the appropriate QM level of theory;
* ForceBalance fitting will:

  - vary k with weak restraints
  - not change periodicities/ change phases

* Y. Qiu and C. Stern will migrate submitted sets to [qca-dataset-submission](https://github.com/openforcefield/qca-dataset-submission) repo.
