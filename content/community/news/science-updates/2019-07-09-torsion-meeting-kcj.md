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
thumb: "torsion-meeting-summary.jpg"
---

**Fragmenter:** C. Stern is working making [fragmenter](https://github.com/openforcefield/fragmenter) more interoperable and more suitable for an automated pipeline. Some of the features include using [Omega](https://www.eyesopen.com/omega) to identify rotatable bonds and Wiberg bond order computations.

**QC datasets:** The "Roche set" (468 molecules) is almost done in terms of generating QC data for initial round of fitting with ForceBalance. The currently calculated data includes ~820 1-D torsion scans and geometry optimizations, and the next step is computing hessians. There are still several molecules that throw an error in [QCFractal](https://github.com/MolSSI/QCFractal), but Y. Qiu believes that it’s likely to be a bug in QCFractal and he will work with D. Smith to resolve it. The “Roche set” covers approximately ~50% of SMIRNOFF torsion parameters. The “coverage set” was built to complement the “Roche set” and it covers nearly all of SMIRNOFF parameter space. At the moment, only geometry optimizations have been performed for that set.

J. Chodera is preparing a molecule set containing boron, and C. Bayly noted that, while boron is usually trivalent in chemical databases, it is frequently tetravalent under physiological conditions. C. Bayly suggested that extra attention be paid to ensure that the boron molecule set includes tetravalent compounds. He also suggested silicon and selenium as two additional biologically interesting elements that should be considered for parameterization. J. Chodera asked about other possible sources of interesting molecules that could be used to generate QC data and provide decent chemical coverage. Suggestions like [DrugBank](https://www.drugbank.ca/), [Enamine](https://enamine.net/) subsets, and [Ligand Expo](http://ligand-expo.rcsb.org/) came up.

Y. Qiu and C. Stern will migrate all submitted datasets to [qca-dataset-submission](https://github.com/openforcefield/qca-dataset-submission) repo for provenance.

**Torsion diversity:** C. Bayly raised the question regarding chemical diversity associated with a particular torsion type and what are the options to enhance this diversity. He suggested using fingerprinting molecular after fragmenting, for example with [Extended-Connectivity Fingerprints (ECFP)](https://pubs.acs.org/doi/10.1021/ci100050t) to assess diversity of chemical groups around particular torsion and selecting a number of molecules with the most diverse chemical coverage. C. Stern suggested using Wiberg bond orders instead, which was a well received suggestion. Implementation of either approach would require a sizeable amount of development time, which is unfortunately limited at this point. J. Chodera will create an optimization dataset from Enamine and LigandExpo and do a quick scan of diversity for each torsion type present in the set and select diversity representatives randomly (quick and dirty solution), or if time allows, consider Wiberg bond order following C. Stern’s suggestion.

**Protonation states/ Tautomers:** The importance of relevant protonation states and tautomers in the datasets was discussed. C. Bayly said that it’s important that the molecules are close to their biological states and that the exclusion of charged species from the first parameterization round will likely lead to some significant parameter changes once in the next round when the charged molecules get included. The “Roche set” doesn’t currently contain charged molecules and a more detailed QM benchmarking on torsion drives is yet to be performed. Having anionic species would likely require use of diffuse basis sets, but it is not clear what would be a proper QM treatment of charged molecules at this stage and decision about whether to include them or not is postponed until later when this will be discussed with QM experts in the team.

C. Stern raised an issue with OE toolkit producing some dubious output when generating tautomers or alternative protonation states. C. Bayly believes that the latest version of the toolkit should deal with this reasonably well, but will look into her inputs and outputs to figure out where the problem might be.

**Stereochemistry:** Y. Qiu and J. Wagner are working on creating a feature that would allow importing a QCElemental molecule to OFF toolkit. The current pipeline is as follows: QCElement → CMILES → OpenEye toolkit → OFF toolkit and this feature will live for now in [ForceBalance-QCArchive repo](https://github.com/lpwgroup/forcebalance-qcarchive). One issue which has already occured is that, in rare cases, constrained QM geometry optimizations will force trivalent nitrogens into nearly-planar geometries. This raises an error, since that the molecular graph indicates the presence of a atomic stereocenter, but the molecular geometry makes it impossible to distinguish the chirality. The [OFF toolkit](https://github.com/openforcefield/openforcefield) requires stereochemistry to be defined around all trivalent nitrogens when loading molecules from OpenEye, but this behavior still under discussion, as different functionalizations around the nitrogen will change the lifetime of the nitrogen chirality.

**Torsion Periodicity:** According to C. Bayly, there are two approaches to periodicity treatment: *i)* unrestricted, where all periodicity values are present for each torsion during fitting, and the optimization process may choose to assign nonzero `k` values to any torsion term that improves the fit to data, and *ii)* chemical intuition based, i.e. defining the allowed periodicity values for a each torsion before fitting begins. He is partial to the latter approach. He thinks that phase angles should be restricted to 360/periodicity multiples of, as anything else would only make sense if there’s a chiral SMILES. At the moment, Y. Qiu does not allow ForceBalance to change phase angles during fitting, but noted that negative values of `k` effectively flip the phase by 180 in certain cases. C. Bayly suggested that `k` values should be allowed to become either positive or negative during the fit, however, humans should inspect whether the final `k` values are close to zero, as they are probably insignificant. C. Bayly said that the `k` parameters should not be strongly restrained to their initial (smirnoff99Frosst) values, but should be inspected if they vary from their original value by a large amount (> 2 kcal/mol).

**Decisions/tasks:**

* J. Chodera will generate quick diversity sets;
* C. Stern will contact OE with tautomer/protonation generation errors;
* C. Stern will cut fragmenter release with examples;
* Decision whether to include anionic molecules postponed until more info is available about the appropriate QM level of theory;
* ForceBalance fitting will:
  * vary k with weak restraints
  * not change periodicities/ change phases
* Y. Qiu and C. Stern will migrate submitted sets to [qca-dataset-submission](https://github.com/openforcefield/qca-dataset-submission) repo.
