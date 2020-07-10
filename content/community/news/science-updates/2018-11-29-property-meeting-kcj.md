---
date: "2018-11-29T00:00:00+00:00"
title: "Property Calculator Meeting Summary (Nov 29, 2018)"
tags: ["PropertyCalculator", "framework", "design", "use cases", "surrogate models", "MBAR", "MCMC"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Nov 29, 2018"
slug: "propertycalculator-meeting-2018-11-29"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Property Calculator:** This call focused on the Property Calculator Framework and outlining some basic design concepts and use cases. The shortest term application is benchmarking for force field parameters. Certain design aspects need further discussion, but the initial rough kernel for setting up simulations at chosen properties/parameters should contain simplistic building blocks: *smiles → smirnoff parameters → energy minimization → simulation.* MBAR/surrogate model levels are yet to be defined, including model specification options. Some expected use cases of this framework, either self-standing or in combination with other tools, include:

* Providing results of a simulation with a defined model, at defined state point, with a list of desired properties in the context of *i*) benchmarking; *ii*) fitting new parameters;
* Performing multilevel optimization of parameters to match a set of experimental properties given a defined model with some specified variable parameters (in combination with other tools);
* Performing multilevel MCMC sampling of parameters to match a set of experimental properties given a defined model with some specified variable parameters (in combination with other tools);
* Potentially retrieving predictions of a previously trained surrogate model for property estimation.
* Retrieving predictions from a surrogate model, which is adaptively refined using MCMC sampling or optimization until it fits certain criteria.

**MBAR/GCMC:** R. Messerly is working on a manuscript that uses MBAR instead of traditionally used weighted histogram analysis in GCMC.

**Assigned tasks:**

* Chodera lab is to merge existing components into one place with the API documentation;
* Shirts lab has to come up with a set of specific examples of what pseudocode should be available in the API;
* S. Boothroyd should reach out to L.-P. Wang to get an input about API needs with respect to ForceBalance;
* D. Mobley potentially assigning a benchmarking project for simulations from API to an undergrad student.
