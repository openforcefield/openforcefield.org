---
date: "2018-12-13T00:00:00+00:00"
title: "Property Calculator Meeting Summary (Dec 13, 2018)"
tags: ["PropertyCalculator", "framework", "best practices", "documentation", "model requirements"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Dec 13, 2018"
slug: "propertycalculator-meeting-2018-12-13"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

A number of decisions will have to be made about the [PropertyCalculator](https://github.com/openforcefield/propertyestimator) framework and it has been decided to create two best practice documents for the purpose of property estimation within the OpenFF effort:

1. The best practice document for calculating properties in general (from a theoretical standpoint);
2. A specific document which contains best practices for computing properties using OFF tools and force fields, i.e. a specific implementation of the practices described in the document 1.

Further decision points include specifying the model requirements (surrogate / reweighting / direct simulation) and how the arguments will be passed to PropertyCalculator, which type of calculations should be performed at each layer, system size definition, etc. Interfacing PropertyCalculator with QCFractal will require a rather strict definition of procedures because QC Fractal doesn’t have a way for the master node to send new procedures to the worker nodes. Every change to the workers on the distributed computing infrastructure will require a decent amount of engineering work. *Note from June 2019: It was decided that the first generation of the property calculator will not share an infrastructure with QCFractal.*
