---
color: orange
title: Data
---

##### All our datasets are available on [GitHub](https://github.com/openforcefield/) and on [QCArchive](http://qcarchive.molssi.org/), with those used in force field optimization and benchmarking are also available on Zenodo. Feel free to [contact us](mailto:info@openforcefield.org) if you have any questions!

{{< br >}}{{< br >}}
## Quantum chemistry data

The Open Force Field Initiative uses [QCArchive infrastructure](http://qcarchive.molssi.org/) to compute, store and access quantum chemistry data. Our data generation and submission scripts for each dataset are available in our [OpenFF QCArchive Dataset Submission](https://github.com/openforcefield/qca-dataset-submission) repository.

A select number of datasets used to train or benchmark our flagship force field or those routinely leveraged by our collaborators are also available as Zenodo records. These records contain "dataset views" and Docker images equiped with a Jupyter notebook entry points containing examples of how to access the data we use to fit our force fields. These dataset views are SQLite files exported from QCArchive with calculation records serialized with msgpack and compressed with zstandard, a combination that provides data with a lossless reduced size. 

**Datasets available on Zenodo as dataset views**

Flagship Forcefield Datasets

- [*QC Fitting Datasets for OpenFF SMIRNOFF Sage 2.0.0*](https://doi.org/10.5281/zenodo.15611784)
- [*QC Fitting Datasets for OpenFF SMIRNOFF Sage 2.1.0*](https://doi.org/10.5281/zenodo.15633037)
- [*QC Fitting Datasets for OpenFF SMIRNOFF Sage 2.2.0*](https://doi.org/10.5281/zenodo.15635099)

Benchmarking and Other Datasets

- [*QC Optimization Dataset: OpenFF Industry Benchmark Season 1 v1.2*](https://zenodo.org/uploads/15801401)
- [*QC Singlepoint Dataset: MLPepper RECAP Optimized Fragments v1.1*](https://zenodo.org/uploads/15801339)
- [*QC Singlepoint Dataset: OpenFF ESP Fragment Conformers v1.0*](https://zenodo.org/uploads/15785976)
- [*QC Torsiondrive Dataset: OpenFF Rowley Biaryl v1.0*](https://zenodo.org/uploads/15793709)
- [*QC Singlepoint Dataset: OpenFF ESP Fragment Conformers v1.0*](https://zenodo.org/uploads/15785976)

{{< br >}}{{< br >}}
## Physical properties

We use [NIST ThermoML](https://www.nist.gov/mml/acmd/trc/thermoml) archive to access condensed phase physical properties of various compounds included in our force field optimization and benchmarking. The utilities for automated selection and curation of these datasets are available as a part of [OpenFF Evaluator](https://github.com/openforcefield/openff-evaluator), developed by Simon Boothroyd.

An older version of selected physical properties datasets can be found in our [Open Forcefield Data](https://github.com/openforcefield/open-forcefield-data) repository.

{{< br >}}{{< br >}}
## Protein-ligand free energies

Our protein-ligand benchmarking dataset for calculating binding free energies can be accessed in our [ProteinLigandBenchmarks](https://github.com/openforcefield/PLBenchmarks) repository.

{{< br >}}{{< br >}}
## MiniDrugBank

Our [MiniDrugBank](https://github.com/openforcefield/MiniDrugBank) repository tracks the creation and evolution of the MiniDrugBank Molecule set, filtered from [DrugBank Release Version 5.0.1](https://www.drugbank.ca/releases/5-0-1).
{{< br >}}{{< br >}}
