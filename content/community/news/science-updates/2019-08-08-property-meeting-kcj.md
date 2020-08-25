---
date: "2019-08-08T00:00:00+00:00"
title: "Property Estimator Meeting Summary (Aug 08, 2019)"
tags: ["PropertyEstimator", "ForceBalance", "ThermoML", "Lennard-Jones", "heat of vaporization", "density", "fitting", "dielectric constants", "minimum dataset", "release-1"]
categories: ["science"]
draft: false
description: "Summary from PropertyEstimator subgroup meeting on August 8, 2019"
slug: "propertyestimator-meeting-2019-08-08"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic"
thumb: "property-estimator-meeting-summary.jpg"
---

**Datasets:** Still waiting for NIST approval for data release from ThermoML. [DIPPR](https://www.aiche.org/dippr/) was contacted to explain the terms of use for their data in more details. DIPPR contains pure component data on industrially important chemical compounds.


**PropertyEstimator:** PropertyEstimator (PE) and ForceBalance (FB) seem to be working well based on the preliminary tests run by S. Boothroyd, and the infrastructure is ready for the initial LJ fitting. There are some differences in the gradients calculated by PE and FB. Although this is likely due to noise in the calculations, the differences may possibly arise from the slightly different approaches employed - S. Boothroyd is working to resolve this issue. Everything else looks good and stable.

**Fitting:** S. Boothroyd is ready to start with the first iteration of LJ fitting and uncertainties will not be used in this phase. At the moment, selected properties include densities, heats of vaporization and dielectric constants. S. Boothroyd has collated a minimal data set such that each Van der Waal (VdW) parameter is exercised by at least one data point of each property, resulting in at least 3 data points per VdW parameter. This [set](minimum_property_set.pdf) contains a total of 43 data points covering 15 unique molecules to be optimized against. This will require approximately 30 unique simulations to be performed. More details about property data selection and scripts used in the process can be found [here](https://github.com/openforcefield/nistdataselection). General conclusion is that fitting parameters not covered with sufficient data points, for example, a single density value, should be avoided. M. Shirts suggested using dimensionality reduction of parameter space to avoid overfitting, but this will not be tested now and could become a part of the future work in property estimation area. At the moment, all LJ values are allowed to change, although LP Wang suggested using strong regularization to prevent parameters from drifting too much.

**Calls:** Torsion and property estimator calls will be merged into a single weekly meetings on release-1 until the end of August. Separate meetings will be rescheduled again in September and a new set of regular calls for benchmarks will be established.
