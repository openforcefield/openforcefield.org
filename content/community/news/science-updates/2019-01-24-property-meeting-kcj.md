---
date: "2019-01-24T00:00:00+00:00"
title: "Property Calculator Meeting Summary (Jan 24, 2019)"
tags: ["PropertyCalculator", "API", "design", "convergence", "asynchronous reporting", "gradients", "datasets"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Jan 24, 2019"
slug: "propertycalculator-meeting-2019-01-24"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**API:** This meeting focused on API design aspects of [PropertyCalculator](https://github.com/openforcefield/propertyestimator), including how to tackle situations in which multiple properties with different convergence rates are computed from the same simulation. These properties could be reported asynchronously, as they are being computed, or they could only be returned upon successful completion of all property calculations. It has been decided to build the API with a possibility to allow asynchronous reporting in the future, although this feature is not expected to be implemented in the near-term future.  There will be optional parameters to choose property calculation method and target uncertainties. Gradients will be computed for one parameter set at a time. How to pass the initial coordinates to PropertyCalculator is still under discussion, although the long-term plan is to have automated system setup incorporated into the software. The documentation page for PropertyCalculator is [here](https://property-estimator.readthedocs.io/en/latest/propertyestimator.html).

**Datasets:** The question of editing permissions for datasets used in property calculations arose, but the general conclusion is that datasets used in OpenFF parameterization should not be tampered with, although a possibility to add custom datasets should exist. Data provenance is very important in this context.
