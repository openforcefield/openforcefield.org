---
date: "2019-05-02T00:00:00+00:00"
title: "Property Calculator Meeting Summary (May 02, 2019)"
tags: ["PropertyCalculator", "best practices", "benchmarking", "pAPRIka", "datasets", "host-guest", "YANK", "protein-ligand", "documentation", "Manubot", "LiveCOMS"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on May 02, 2019"
slug: "propertycalculator-meeting-2019-05-02"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Benchmarking protein-ligand free energy:** A set of suitable protein-ligand structures that will be used for the initial force field fitting/benchmarking during Year 1 (likely in September) needs to be selected. J. Chodera suggested the D3R Grand Challenge set as a starting point, but it needs to be filtered to remove any structures that might make benchmarking more complicated. For example, the structures with binding sites containing metals or histidines, titratable ligands that might change protonation states upon binding, buried sites, protein dimers, etc. shouldn’t be a part of this dataset. D. Slochower has already looked into generating a dataset that satisfies these criteria (or at least to an extent) and found ~60 structures that seem reasonable (< 200 AA), but could be further refined if necessary. Ultimately, the choice of the structures in the final dataset will depend on the goals of benchmarking and what is being tested, i.e. force field performance or method performance. This preliminary dataset will be uploaded to the [Alchemistry soft benchmark set](https://github.com/alchemistry/soft-benchmarks), where industry partners can provide their feedback regarding the selection.
From the infrastructure perspective, a new [`PhysicalPropertyDataset`](https://property-estimator.readthedocs.io/en/latest/propertydatasets.html) type for receptor-ligand thermodynamics and a specific subclass that interfaces with BindingDB is needed. Each congeneric series in BindingDB should have at least one PDB structure assigned to it, and hybrid docking can be used to generate protein-ligand complexes for other ligands. These starting complexes can then be fed into a workflow for GPU binding free energy calculations leveraging [Yank](https://github.com/choderalab/yank) that is almost ready for use.

**Host-guest calculations:** D. Slochower presented his benchmark calculation schema for host-guest binding free energies with [pAPRika](https://github.com/slochower/pAPRika). The goal is to be able to draw from databases containing physical protocols and resulting measurements, and have a clear and systematic way to set up equivalent benchmark calculations. This initial dataset will be manually prepared from ~ 100 high-quality binding thermodynamics data and eventually deposited in a public repository (GitHub or Zenodo). The experimental provenance information is highly desirable for later usage, but it could take significant effort to manually populate BindingDB. The question on how to systematically describe different experimental conditions also needs to be solved, and Mixture InChi were proposed as a way to encompass several of them. D. Slochower also presented a potential pAPRIka API for the property calculator, but synchronization with S. Boothroyd will be necessary to achieve a more general information flow, which is important for capturing all relevant conditions. The priority is to have the workflow ready for September and feature development will be prioritized based on the timeline.

**Best practices documentation:** As there is no clear definition for “best practices” (and in fact it can vary in different contexts) it is important to note that the term “best practices” in this context represents a set of approaches currently agreed upon to be the most appropriate for performing certain tasks, based on the available data and/or literature sources. These best practices are expected to change over time. M. Shirts suggested separation of best practices documentation into two layers:

* “Scientific” documentation describing protocols at a more general level and types of algorithms used, agnostic of any particular implementation. This will exist as a GitHub repo intended for submission as a LiveCOMS article;
* “Technical” documentation describing a particular implementation of the aforementioned algorithms and protocols and choices of parameters. This will be kept in the [property calculator documentation](https://property-estimator.readthedocs.io/en/latest/).

These two documents should be linked and contain appropriate literature references to justify the choices made. Technical details behind this document are yet to be fully determined, but the LiveCOMS article will likely be formatted as a [Manubot](https://github.com/manubot/rootstock) paper hosted on GitHub.
