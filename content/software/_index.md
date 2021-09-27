---
color: lightblue
title: Software
---

##### The following software repositories are developed and/or used by the Open Force Field Initiative for force field parameterization and benchmarking. Check the infrastructure roadmap for the upcoming functionalities and features.

{{< center >}}
{{<button href="https://openforcefield.atlassian.net/wiki/spaces/IN/pages/202834351/Infrastructure+Roadmap+2020" text="Infrastructure Roadmap" >}}
{{</ center >}}
{{< br >}}

The OpenFF development process, decision making and meeting notes are recorded on Confluence in the publicly available [Infrastructure Space](https://openforcefield.atlassian.net/wiki/spaces/IN/overview). Please note that this space is "under construction" and those who dare visit, come armored with patience and curiosity! We are planning to make information in this space more accessible soon.

{{< center >}}
{{<button href="https://openforcefield.atlassian.net/wiki/spaces/IN/overview" text="Infrastructure Confluence" >}}
{{</ center >}}
{{< br >}}

# Core infrastructure
##### Software listed below is actively used in force field parameterization and benchmarking.
{{< br >}}
## ForceBalance

ForceBalance is free, open source software for systematic and reproducible force field parameterization developed in the [Wang group](http://www.lpwchem.org/) at UC Davis. It is highly versatile and can optimize nearly any set of parameters using experimental measurements and/or _ab initio_ calculations as reference data.

Lead Developer: Lee-Ping Wang

{{<button href="https://github.com/leeping/forcebalance" text="GitHub" >}}
{{<button href="http://leeping.github.io/forcebalance/doc/html/index.html" text="Documentation" >}}

{{< br >}}
## geomeTRIC

This is a geometry optimization code for molecular structures developed in the [Wang group](http://www.lpwchem.org/) at UC Davis. The code works by calling external software for the energy and gradient through wrapper functions. Q-Chem, TeraChem, Psi4, and Molpro are supported quantum chemistry codes through the command line interface. The PySCF and QCArchive packages also provide interfaces to geomeTRIC for optimization. MM optimizations using OpenMM and Gromacs are also supported through the command line interface.

Lead Developer: Lee-Ping Wang

{{<button href="https://github.com/leeping/geomeTRIC/" text="GitHub" >}}
{{< br >}}{{< br >}}

## OpenFF Toolkit

The OpenFF Toolkit, built by the [Open Force Field Initiative](http://openforcefield.org/), is a Python toolkit for the development and application of modern molecular mechanics force fields based on direct chemical perception and rigorous statistical parameterization methods.

The toolkit currently covers two main areas we have committed to stably maintain throughout their lifetimes:

- Tools for using the [SMIRKS Native Open Force Field (SMIRNOFF) specification](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html)
- Tools for [direct chemical environment perception](https://dx.doi.org/10.1021/acs.jctc.8b00640) and manipulation

Lead Developer: Jeffrey Wagner

{{<button href="https://github.com/openforcefield/openforcefield" text="GitHub" >}}
{{<button href="https://open-forcefield-toolkit.readthedocs.io/en/latest/" text="Documentation" >}}
{{<button href="https://open-forcefield-toolkit.readthedocs.io/en/latest/installation.html" text="Installation" >}}
{{< br >}}{{< br >}}
## OpenFF Evaluator

The OpenFF Evaluator is an automated, scalable framework for the curation of condensed phase physical property data sets from open data sources, and for estimating those data sets using a combination of molecular simulation and molecular simulation data.

Lead Developer: Simon Boothroyd

{{<button href="https://github.com/openforcefield/openff-evaluator" text="GitHub" >}}
{{<button href="https://openff-evaluator.readthedocs.io/" text="Documentation" >}}
{{< br >}}{{< br >}}
## QCFractal

QCFractal is a distributed compute and database platform for quantum chemistry developed and maintained by MolSSI.

Lead Developer: Ben Pritchard (previously Daniel Smith)

{{<button href="https://github.com/molssi/qcfractal" text="GitHub" >}}
{{<button href="http://docs.qcarchive.molssi.org/projects/QCFractal/en/stable/" text="Documentation" >}}
{{< br >}}{{< br >}}
## TorsionDrive

TorsionDrive is a software package for scanning the potential energy surface of molecules along the torsional degrees of freedom developed in the Wang group at UC Davis.

Lead Developer: Yudong Qiu (alumnus)

{{<button href="https://github.com/lpwgroup/torsiondrive/" text="GitHub" >}}
{{<button href="https://torsiondrive.readthedocs.io/en/latest/" text="Documentation" >}}
{{< br >}}{{< br >}}
## pyMBAR

pyMBAR is a software package to calculate free energies, thermodynamic observables, and potentials of mean force from combinations of simulations performed at different simulation conditions.

Lead Developer: Michael Shirts

{{<button href="https://github.com/choderalab/pymbar/" text="GitHub" >}}
{{<button href="https://pymbar.readthedocs.io/en/master/" text="Documentation" >}}
{{< br >}}{{< br >}}{{< br >}}

# Expanded infrastructure
##### Software repositories listed below are at different stages of maturity, and they represent either work in progress toward future additions to the force field optimization workflow, or exploratory tools underpinning various research projects.
{{< br >}}

## BenchmarkFF

BenchmarkFF comprises code to extract molecule datasets from QCArchive, run energy minimizations with various force fields, and analyze the resulting geometries and energies with respect to QM reference data from QCArchive. BenchmarkFF was developed in the Mobley lab for exploratory purposes.

Lead Developer: Victoria Lim

{{<button href="https://github.com/vtlim/benchmarkff" text="GitHub" >}}
{{<button href="https://github.com/vtlim/benchmarkff/blob/master/README.md" text="Documentation" >}}
{{< br >}}{{< br >}}
## BespokeFit

This code is work in progress, aiming to create support for bespoke parameterization of individual molecules. This is developed by the Open Force Field Initiative in collaboration with the Anwar lab.

Lead Developer: Joshua Horton

{{<button href="https://github.com/openforcefield/bespoke-fit" text="GitHub" >}}
{{< br >}}{{< br >}}

## ChemPer

This repository contains a variety of tools that will be useful in automating the process of chemical perception for the SMIRNOFF format. ChemPer can be used to automatically generate SMIRKS patterns to match clustered molecular fragments. The algorithms implemented here were inspired by [SMARTY and SMIRKY](https://github.com/openforcefield/smarty) which were proven to be too inefficient for practical use in force field parameterization. This is work in progress, developed in the Mobley lab.

Lead Developer: Caitlin Bannan (alumna)

{{<button href="https://github.com/MobleyLab/chemper/" text="GitHub" >}}
{{< br >}}{{< br >}}
## CMILES

CMILES can generate canonical identifiers for chemical databases, specifically quantum chemical data, developed in the Chodera lab. CMILES seeks to address several issues:

- Link the QC molecule to its cheminformatics molecular graph to make QC data useful to the force field and machine learning communities.
- Generation of canonical identifiers from a molecular graph
- Canonical ordering of QC molecular geometries
- Standardize representation of compounds with multiple tautomeric/protometic states

Lead Developer: Chaya Stern (alumna)

{{<button href="https://github.com/openforcefield/cmiles" text="GitHub" >}}
{{< br >}}{{< br >}}

## Fragmenter

Fragmenter, can be used to fragment (large) molecules for quantum mechanics torsion scans. Wiberg bond orders are used to identify the smallest fragment with the most similar representation of the electronic environment for each rotatable bond in the molecule. This code has been developed in the Chodera lab.

Lead Developer: Chaya Stern (alumna)

{{<button href="https://github.com/openforcefield/fragmenter" text="GitHub" >}}
{{<button href="https://fragmenter.readthedocs.io/en/latest/" text="Documentation" >}}
{{< br >}}{{< br >}}
## OFF Nitrogens

The purpose of this repository is to explore the planar or pyramidal nature of conjugated nitrogens for research purposes, developed in the Mobley lab.

Lead Developer: Victoria Lim

{{<button href="https://github.com/MobleyLab/off_nitrogens" text="GitHub" >}}
{{< br >}}{{< br >}}
## pAPRika

pAPRika is an advanced toolkit for binding free energy calculations following the attach-pull-release (APR) protocol. It can be used for setting up, running, and analyzing free energy molecular dynamics simulations. pAPRika is developed by the Gilson lab at UC San Diego.

Lead Developer: Jeffry Setiadi (previously David Slochower)

{{<button href="https://github.com/slochower/pAPRika" text="GitHub" >}}
{{< br >}}{{< br >}}

## Quanformer

Quanformer is a Python-based pipeline for generating conformers, preparing quantum mechanical (QM) calculations, and processing QM results for a set of molecules and their conformers, developed in the Mobley lab for exploratory purposes.

Lead Developer: Victoria Lim

{{<button href="https://github.com/MobleyLab/quanformer" text="GitHub" >}}
{{<button href="https://quanformer.readthedocs.io/en/latest/" text="Documentation" >}}
{{< br >}}{{< br >}}

## RESPPOL

RESPPOL is a tool for electrostatic fitting, including polarization, developed in the Gilson lab for exploratory purposes.

Lead Developer: Michael Schauperl

{{<button href="https://github.com/MSchauperl/resppol" text="GitHub" >}}
{{< br >}}{{< br >}}

## Respyte

Respyte is a free-standing and open source implementation of the RESP method, developed in the Wang lab.

Lead Developer: Hyesu Jang

{{<button href="https://github.com/lpwgroup/respyte" text="GitHub" >}}
{{< br >}}{{< br >}}{{< br >}}
# Key external software

##### The Open Force Field Initiative also relies heavily on existing molecular modeling software packages and the most important ones are listed below in alphabetical order:
{{< br >}}
### [AmberTools](http://ambermd.org/AmberTools.php)

AmberTools consists of several independently developed packages that work well by themselves, and with Amber MD engine. The suite can also be used to carry out complete molecular dynamics simulations, with either explicit water or generalized Born solvent models.


{{< br >}}

### [GROMACS](http://www.gromacs.org/)

GROMACS is a versatile package to perform molecular dynamics, i.e. simulate the Newtonian equations of motion for systems with hundreds to millions of particles. It is primarily designed for biochemical molecules like proteins, lipids and nucleic acids that have a lot of complicated bonded interactions, but since GROMACS is extremely fast at calculating the nonbonded interactions (that usually dominate simulations) many groups are also using it for research on non-biological systems, e.g. polymers.

{{< br >}}

### [OpenEye](https://www.eyesopen.com/)

OpenEye Scientific Software Inc. is a privately held company headquartered in Santa Fe, NM, founded in 1997 to develop large-scale molecular modeling applications and toolkits aimed primarily towards drug discovery and design. The software is designed for scientific rigor, as well as speed, scalability and platform independence. OpenEye provides a number of [licensing options for the academic community](https://www.eyesopen.com/academic-licensing), including Free Public Domain Research License for pure non-commercial research.

{{< br >}}

### [OpenMM]((http://openmm.org/))

OpenMM is a high performance toolkit for molecular simulation, which can be used as a library, or as an application. It includes extensive language bindings for Python, C, C++, and even Fortran. The code is open source and actively maintained on Github, licensed under MIT and LGPL. Part of the [Omnia](http://www.omnia.md/) suite of tools for predictive biomolecular simulation.

{{< br >}}

### [ParmEd](https://parmed.github.io/ParmEd/html/index.html)

ParmEd is a general tool for aiding in investigations of biomolecular systems using popular molecular simulation packages, like Amber, CHARMM, and OpenMM written in Python. It can be used for a variety of modeling purposes, like manipulating system topologies (i.e., the _atoms_, _bonds_, and other bonded terms like valence angles) and translating between file formats (e.g. PDB, mmCIF/PDBx, Amber _prmtop_, and CHARMM _psf_) and even other APIs (e.g. PyRosetta). What sets ParmEd apart from tools like OpenBabel is that it stores and tracks force field parameters so that the resulting files can be used to carry out molecular mechanics simulations with tools like Amber, OpenMM, NAMD, and CHARMM.

{{< br >}}

### [PSI4]((http://www.psicode.org/))

PSI4 is an open-source suite of ab initio quantum chemistry programs designed for efficient, high-accuracy simulations of a variety of molecular properties. It is very easy to use and has an optional Python interface.

{{< br >}}

### [QCArchive](https://qcarchive.molssi.org/)

The Quantum Chemistry Archive aims to provide an open, community-wide quantum chemistry database to both facilitate and capture hundreds of millions of hours of computing time to enable large-scale force field construction, physical property prediction, new methodology assessment, and machine learning from data that would otherwise end up siloed or inaccessible. The QCArchive offers FAIR access to millions of computational molecular science results in a highly structured and performant manner. These include curated interaction energy, thermochemical, and conformational datasets from the literature; data from partner groups; and data donated to or computed by MolSSI. You are also welcome to submit your own data.

The Open Force Field Initiative uses QCArchive infrastructure to compute, store and access quantum chemistry data.

{{< br >}}

### [RDKit]((http://rdkit.org/))

RDKit is an open source toolkit for cheminformatics, or more precisely, a collection of cheminformatics and machine-learning software written in C++ and Python.

{{< br >}}
