---
date: "2019-07-26T00:00:00+00:00"
title: "Property Estimator Meeting Summary (Jul 25, 2019)"
tags: ["PropertyEstimator", "ForceBalance", "ThermoML", "Lennard-Jones", "heat of vaporization", "release-1", "fitting", "validation"]
categories: ["science"]
draft: false
description: "Summary from PropertyEstimator subgroup meeting on July 25, 2019"
slug: "propertyestimator-meeting-2019-07-25"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

Today the PropertyEstimator group discussed our progress, moving forward towards our fitting process with ThermoML data and ForceBalance.  Decisions about fitting techniques and data have been made, and we are moving on to testing and production.

**Database readiness**

S. Boothroyd has algorithmically selected a basic set from the ThermoML archive with coverage of our selected Lennard Jones parameters.  For basic fitting, we are moving forward with this dataset; if time allows we will also include a hand-curated ThermoML dataset provided by Lee-Ping Wang.  For this release we will use solely ThermoML data, without additional data curation from other sources. We also discussed the formatting of heat of vaporization data in ThermoML, and discussed strategies to simulate heat of vaporization and treat less reliable data.

**PropertyEstimator | ForceBalance interface**

S. Boothroyd and Y. Qiu are finalizing the interface between the PropertyEstimator and ForceBalance, and Jeff Wagner is in the process of cutting a smirnoff99Frosst release with hydrogen bond constraints to accelerate the fitting process.  In the immediate future, fitting will be performed on a small subset to test infrastructure and timing.  After this is completed, the production fitting for select Lennard-Jones will begin.
