---
date: "2019-03-21T00:00:00+00:00"
title: "Property Calculator Meeting Summary (Mar 21, 2019)"
tags: ["PropertyCalculator", "ThermoML", "uncertainties", "reweighting", "data formatting", "ITC"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on Mar 21, 2019"
slug: "propertycalculator-meeting-2019-03-21"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Datasets:** S. Boothroyd reported that NIST uncertainty values disappeared after a reformat of the stored data. He has also raised an issue with target uncertainties in the simulations because ThermoML has very low uncertainties and simulations might have to be significantly extended to reach an order of magnitude smaller values. There are several potential ways to address this problem, including running simulations to an absolute uncertainty and analyzing existing entries in ThermoML to understand the range of uncertainties. In addition, computation of some properties is more expensive than others, for example, computing densities is about 10 times cheaper than estimating dielectric constants. It could happen that lowering of standards for uncertainty will be necessary, as was noted in some previous work in J. Chodera’s lab. M. Shirts suggested that in case of a hierarchical search, the initial estimates don’t have to be as precise as the final estimates, i.e. the estimates can be fine-tuned to more precise values iteratively, but it’s important to keep tabs to avoid running into high computational costs. When it comes to reweighting, it is not clear how the confidence regions will interact with the parameter steps (in terms of added efficiency), but M. Shirts thinks it may be possible to estimate how the uncertainty will be affected by finite changes in parameters. The conclusion on uncertainty propagation is to choose a target uncertainty in the direct simulation layer that will suffice for parameter changes within provided trust radius.

K. Kellet will contact J. Chodera about ITC measurement records/formatting, but Nathan Baker and M. Gilson should also be included in this discussion about what standards to follow for ITC data storage. For now, publication standards will be followed with data and experimental conditions stored on GitHub.
