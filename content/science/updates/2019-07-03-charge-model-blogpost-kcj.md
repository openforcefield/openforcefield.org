---
date: "2019-07-03T00:00:00+00:00"
title: "Towards New Fixed Charge Models"
tags: ["charge model", "RESP1", "RESP2", "mixing parameter", "Hessians", "QCFractal", "3D structures", "conformer expansion", "automation"]
categories: ["science"]
draft: false
description: "An update from the electrostatic subgroup about fixed charge models based on RESP fitting"
slug: "fixed-charge-model-update-2019-07-03"
weight: 10
markup: markdown
author: "Michael Schauperl"
---

**A new version of the Restrained Electrostatic Potential Method (RESP2):** RESP2 aims to improve the electrostatic description via point charges, in comparison to the popular existing RESP (here referred to as “RESP1”) and AM1-BCC methods. [RESP1](https://doi.org/10.1021/j100142a004) is dependent on  gas-phase quantum calculation at the HF/6-31G* level of theory. Due to beneficial error compensation, these RESP1 gas-phase charges can be used in solvent simulations. The goal of this project is to improve the accuracy of the electrostatics component of a forcefield, and with that also the overall accuracy.

RESP2 mixes higher-level QM (PW6B95/aug-cc-PVDdZ) gas-phase **q** charges with charges from an implicit solvent calculation **q**



The level of theory was determined by an initial study comparing the accuracy and costs of various QM levels (see [talk](http://doi.org/10.5281/zenodo.3243679) at [OFFC workshop in January 2019](https://openforcefield.org/news/jan-2019-meeting-agenda/)). The actual mixing ratio is determined by a mixing parameter δ, which can be adjusted to match experimental properties.


**New charges with smirnoff99@Frosst parameters:** The RESP2 charge model was mixed with smirnoff99Frosst parameters for bonded and Lennard Jones terms. It was tested to reproduce experimentally measured densities, heats of vaporizations, hydration free energies and dielectric constants of 30 molecules. We found that, to increase the quality of the predicted densities and heats of vaporization, more gas-phase-like (for RESP2) or generally smaller absolute charges are necessary. On the other hand, for hydration free energies and dielectric constants, more solvent-like charges (or in general higher absolute charges) are necessary to find better agreement with experiment. Overall, the change of charges does not lead to a significant improvement of the predicted properties.

![density](density.png

**New charges with new Lennard Jones parameters**: The same calculations as above were performed, using ForceBalance to train LJ parameters on a portion of the available experimental data, and then measuring performance on a test set consisting of the rest of the experimental data. Using optimized LJ parameters (instead of those from smirnoff99Frosst), we were able to significantly improve the performance compared to smirnoff99Frosst with RESP1 charges (red lines).The most significant improvements were found for dielectric constants, which were not included in the training data, but which benefit from the higher level QM method. For hydration free energies, which were also not included in the training data, the results were similar to those from smirnoff99Frosst with RESP1 charges. However, when the LJ parameters were optimized in context of a given charge set, the study showed that a wide variety of charges can lead to similar results. This highlights the strong relationship between LJ and charge parameters.

**Outlook:** The reference data will be extended with molecular dipole moments and host, guest binding data. Additionally, a more detailed analysis of the adjusted LJ parameters will follow.
