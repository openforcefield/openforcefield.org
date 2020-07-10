---
date: "2019-07-11T00:00:00+00:00"
title: "Property Estimator Meeting Summary (Jul 11, 2019)"
tags: ["PropertyEstimator", "ForceBalance", "property selection", "datasets","NIST", "DDB", "fitting"]
categories: ["science"]
draft: false
description: "Summary from PropertyEstimator subgroup meeting on July 11, 2019"
slug: "propertyestimator-meeting-2019-07-11"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Dataset sources**

*NIST update:* Data that was collected and curated in an automated process by NIST could be released as an open dataset, but not the manually curated uncertainties, which is the step that follows automated curation. Additional problem may arise from the fact that data from before 10 years ago simply isn’t present in ThermoML. Until the situation is clear from the legal perspective, it has been decided to move forward using the data from an older release of ThermoML which contained author-assigned uncertainties.

[Dortmund Data Bank](http://www.ddbst.com/free-data.html) was suggested as an alternative source of freely available property datasets, but clarification of their terms of use will be requested to ensure that this data can be publicly released. Any new datasets that will be used in the future will likely have to satisfy the following requirements: *i*) minimal property estimator inputs; *ii*) provenance metadata.

L.-P. Wang made a [list](https://docs.google.com/document/d/1NkmN0VWix2pcA094vcEC-3VeA1qhmgszzdCbMTQP-Ow/edit) of molecules based on a filtered list created by S. Boothroyd as a starting point for the initial round of fitting.

**PropertyEstimator | ForceBalance interface**

ForceBalance and PropertyEstimator appear to numerically agree in their property calculations and the runtime is equivalent, except PropertyEstimator exceeds ForceBalance performance in computing gradients. S. Boothroyd will continue to test ForceBalance for the property estimation purposes.
