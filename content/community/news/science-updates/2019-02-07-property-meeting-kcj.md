---
date: "2019-02-07T00:00:00+00:00"
title: "Property Calculator Meeting Summary (Feb 07, 2019)"
tags: ["PropertyCalculator", "API", "host-guest", "reweighting", "gradients", "uncertainties"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Feb 07, 2019"
slug: "propertycalculator-meeting-2019-02-07"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Host-guest calculator:** The main topic of discussion was the API design for host-guest calculations. There is a number of decisions that have to be made with respect to input/output requirements, handling different rates of convergence between different systems, how to define and reach targeted uncertainties etc. The current plan envisages the following solutions:

* [PropertyCalculator](https://github.com/openforcefield/propertyestimator) would run a simulation in a loop and pause at given intervals to check for convergence and return value, associated uncertainties and location of data files, which is necessary for reweighting, but it will be implemented later on;
* Initial analysis implementation will involve independent simulations instead of an ensemble analysis to meet a target uncertainty (per-window uncertainty);
* Returning gradients will be an optional argument, probably in the second generation of fitting with reweighting;
* As a job input, the estimator should receive a ForceField object and a description of the measured chemical mixture and conditions that it will estimate. The estimator will contain the automation required to generate the subsequent data (such as starting configuration) for defined data sources. [BindingDB](https://www.bindingdb.org/bind/index.jsp) is a likely source in this case, but D. Slochower will think some more about the initial coordinate generation mechanism.
