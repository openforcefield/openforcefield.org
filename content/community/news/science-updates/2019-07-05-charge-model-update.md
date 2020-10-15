---
date: "2019-07-05T00:00:00+00:00"
title: "Towards New Fixed Charge Models"
tags: ["fixed charge model", "RESP", "RESP2", "solvation", "mixing parameter", "Lennard-Jones", "SMIRNOFF99Frosst", "properties"]
categories: ["science"]
draft: false
description: "An update from the electrostatic subgroup on fixed charge models based on RESP fitting"
weight: 10
markup: markdown
author: "Michael Schauperl"
---

The Open Force Field Initiative continues to explore new partial charge assignment models for both fast parameterization (to allow billion-compound sets to be rapidly parameterized for docking) and a more accurate "bespoke" parameterization pipeline for torsions and partial charges (intended for use with more accurate but more costly methods, such as free energy calculations)."

**A new version of the Restrained Electrostatic Potential Method (RESP2):** RESP2 aims to improve the electrostatic description via point charges, in comparison to the popular existing RESP (here referred to as “RESP1”) and AM1-BCC methods. [RESP1](https://doi.org/10.1021/j100142a004) is dependent on  gas-phase quantum calculation at the HF/6-31G* level of theory. Due to beneficial error compensation these RESP1 gas-phase charges can be used in solvent simulations. The goal of this project is to improve the accuracy of the electrostatics component of a forcefield, and with that also the overall accuracy. RESP2 mixes higher-level QM (PW6B95/aug-cc-PVDdZ) gas-phase **q**<sup>gas</sup> charges with charges from an implicit solvent calculation **q**<sup>solv</sup>:

<center>**q**<sup>FF</sup> = δ **q**<sup>gas</sup> + (1-δ) **q**<sup>solv</sup></center>


The level of theory was determined by an initial study comparing the accuracy and costs of various QM levels (see [talk](http://doi.org/10.5281/zenodo.3243679) at the [OFFC workshop in January](https://openforcefield.org/community/news/general/jan-2019-meeting-agenda/)). The actual mixing ratio is determined by a mixing parameter δ, which can be adjusted to match experimental properties.

**New charges with SMIRNOFF99Frosst parameters:** The RESP2 charge model was mixed with smirnoff99Frosst parameters for bonded and Lennard Jones terms. It was tested to reproduce experimentally measured densities, heats of vaporizations, hydration free energies and dielectric constants of 30 molecules. We found that, to increase the quality of the predicted densities and heats of vaporization, more gas-phase-like (for RESP2) or generally smaller absolute charges are necessary. On the other hand, for hydration free energies and dielectric constants, more solvent-like charges (or in general higher absolute charges) are necessary to find better agreement with experiment. Overall, the change of charges does not lead to a significant improvement of the predicted properties.

<center>
![density](density.png "density")
![Hvap](Hvap.png "Hvap")

*Mean relative error in reproducing experimental heats of vaporizations and densities for a test set of 15 molecules.* </center>

**New charges with new Lennard Jones parameters:** The same calculations as above were performed, using [ForceBalance](https://github.com/leeping/forcebalance) to train Lennard-Jones (LJ) parameters on a portion of the available experimental data, and then measuring performance on a test set consisting of the rest of the experimental data. Using optimized LJ parameters (instead of those from SMIRNOFF99Frosst), we were able to significantly improve the performance compared to SMIRNOFF99Frosst with RESP1 charges (red lines). The most significant improvements were found for dielectric constants, which were not included in the training data, but which benefit from the higher level QM method. For hydration free energies, which were also not included in the training data, the results were similar to those from SMIRNOFF99Frosst with RESP1 charges. However, when the LJ parameters were optimized in context of a given charge set, the study showed that a wide variety of charges can lead to similar results. This highlights the strong relationship between LJ and charge parameters.


**Outlook:** The reference data will be extended with molecular dipole moments and host guest binding data. Additionally, a more detailed analysis of the adjusted LJ parameters will follow.
