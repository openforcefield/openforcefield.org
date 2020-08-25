---
date: "2019-10-17T00:00:00+00:00"
title: "Property Calculator Meeting Summary (October 17, 2019)"
tags: ["PropertyCalculator", "benchmarking", "pAPRIka", "datasets", "protein-ligand"]
categories: ["science"]
draft: false
description: "Summary from Property Calculator subgroup meeting on October 17, 2019"
slug: "propertycalculator-meeting-2019-10-17"
weight: 10
markup: markdown
author: "Jeff Wagner and Owen Madin"
thumb: "property-estimator-meeting-summary.jpg"
---

This meeting was the first dedicated Property Estimator call after several weeks of focus on producing and benchmarking release-1 (Parsley / `openff-1.0.0.offxml`). It focused on deciding future directions toward publication, infrastructure development, and lining up for the next FF release.

* Once Simon Boothroyd begins work in Colorado, Simon and Owen will present a proposed Property Estimator paper outline to the consortium. This will involve choosing which of several existing questions to address, including:
    * The extent to which our current functional form introduces errors in polyhalogenated compounds, due to an inability to model sigma holes.
    * How much value is added by fitting to Hvap
    * Results of using the large release-1 physical property test set as a training set
    * The effect of including/excluding dielectric constants from training
* David Hahn (not present at this meeting) will pitch a LiveCOMS paper for benchmarking PL binding affinity predictions
* Jeffrey Wagner will work on implementing BCCs in the Open Force Field toolkit, and will propose a SMIRNOFF spec change which allows more flexibility in the first stage of charge generation (should be flexible enough to handle eventual implementations of RESP2,  graph convolutional networks, variable numbers of conformers for various AM1 implementations)
* Michael Shirts and Owen Madin will look into EPA physprop database
* Some combination of Simon and Owen (with assistance from Hyesu Jang and David Mobley) will be in charge of the running the next force field refit.
    * In preparation for this, Owen will contact Yudong Qiu and Hyesu Jang to follow their progress in writing a tutorial on the release-1 fitting
* The next property estimator meeting will be in 3 weeks
