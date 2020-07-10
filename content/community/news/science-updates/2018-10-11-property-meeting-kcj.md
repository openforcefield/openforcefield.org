---
date: "2018-10-11T01:00:00+00:00"
title: "Property Calculator Meeting Summary (Oct 11, 2018)"
tags: ["PropertyCalculator", "surrogate models", "RJMC", "AIS-RJMC", "ThermoML", "datasets"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Oct 11, 2018"
slug: "propertycalculator-meeting-2018-10-11"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Surrogate models/RJMC:** O. Madin and R. Messerly presented reversible-jump Monte Carlo (RJMC) performance study focused on L-J parameter space and compared it with numerical integration of probability regions in an analytical surrogate model. These preliminary results show that the two methods are in qualitative agreement, but quantitative discrepancies are suspected to arise due to grid spacing in numerical integration or scaling maps. The main goal of this exercise was to validate RJMC sampling coverage. Some of the planned next steps include rewriting RJMC sampler in a more modular fashion and verification of the detailed balance condition using some simple models, building a framework for cross-dimensional jumps in RJMC and sensitivity analysis for priors. More tests might follow to include additional analytical models to sample from and perform RJMC over larger systems and with more data than just density. In the future, [Annealed Importance Sampling RJMC (AIS-RJMC)](https://www.tandfonline.com/doi/abs/10.1080/10618600.2013.805651) may be required in order to efficiently propose new jumps in higher-dimensional space where analytical maps aren’t available. J. Fass is currently working on AIS-RJMC on a test bed.

**Datasets:** L. Naden discussed the ThermoML interface and details are listed in a [PR on GitHub](https://github.com/openforcefield/openforcefield/pull/99). One of the issues with ThermoML database is presence of many implicit measurements, e.g. in a three-component mixture (A, B, C), the fraction of each component can be directly defined only for two (A=50%, B=30%), while the third is implied (C=20%). D. Mobley suggested focusing only pure compounds at the beginning and figure out with NIST later what to do about more complex systems. The property estimator setup should include the following steps:

1. Programmatically access the ThermoML archives and create a python object describing the system and measured quantity;
2. Build a simulation system out of a step 1) object (based on the work from Shirts lab);
3. Compare simulation outputs to step 1;
4. Integrate to iterative force field development/benchmarking.
