---
date: "2019-07-08T00:00:00+00:00"
title: "Property Estimator Meeting Summary (Jun 27, 2019)"
tags: ["PropertyEstimator", "ForceBalance", "property selection", "mixtures","NIST", "gradients", "release-1", "fitting", "validation"]
categories: ["science"]
draft: false
description: "Summary from PropertyCalculator subgroup meeting on June 27, 2019"
slug: "propertyestimator-meeting-2019-06-27"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic, Owen Madin and Jeff Wagner"
thumb: "property-estimator-meeting-summary.jpg"
---

**Property selection:** Discussion about which properties and the exact amount of data to be requested from NIST continues. One of the challenges is to find the right balance between the current and future parameterization needs, which includes making decisions about specific properties to be used for the first optimization sprint and specific chemistry that will be covered in this sprint (and maybe in the next one). For the latter, finding a set of molecules (SMILES) that exercise all SMIRNOFF parameters is desirable and J. Fass’ [script](https://gist.github.com/maxentile/422f9d2caed60ef6ebe95eba4daf8617) can be used as a starting point to address chemical coverage space and associated number of property data points for each atom type. Suggested data structure should roughly correspond to `{smirks: {molecule: {minP maxP, minT, maxT, property counts } } }`.

[ForceBalance](https://github.com/leeping/forcebalance) is limited to the following properties: density, dielectric, heat capacity, surface tension, thermal expansion, and isothermal compressibility. To compute other properties, either extensions to ForceBalance, or a functional interface between [PropertyEstimator](https://github.com/openforcefield/propertyestimator) and ForceBalance is required, which is currently a work in progress. Some measure of cohesive energy is desirable, but it is not clear what is the best way to achieve this. The first optimization sprint (release-1) will likely focus on properties of neat organic liquids and mixtures. Using mixtures will require certain modifications of ForceBalance, but these tweaks are expected to be rather minor. M. Shirts suggested optimization on pure compounds first and validation against mixtures in the first sprint, using heats of vaporization or surface tensions, with more properties being added in the future, including solvation free energies. L.-P. Wang and Y. Qiu noted that surface tension requires longer sampling times than heat of vaporization. In addition, L.-P. Wang would refrain from fitting heat of vaporization to polar molecules without including polarization correction. Whether this correction should be included, remains to be decided in agreement with the other PIs not present at the meeting. L.-P. Wang also wants to avoid fitting to heat capacities due to quantum effects, although M. Shirts suggested that fitting to residual heat capacities (difference between the liquid and the gas phase) might circumvent the problem, although this should be validated first. M. Gilson noted that certain molecules don’t conformationally converge in property calculation and L.-P. Wang and M. Schauperl reported issues with  carboxylic acids and esters, respectively. It is not clear whether these molecules should be included in the first optimization sprint. The following actions/decisions are required:

* Building an appropriate chemical coverage set (specific moieties vs. specific molecules);
* Choosing heat of vaporization or surface tension for fitting (and whether to use polarization correction);
* Specifiying the list of properties for the first round.


**ForceBalance | PropertyEstimator interface:** L.-P. Wang noted that ForceBalance calculates a Jacobian at each optimization step, which PropertyEstimator does not currently provide. It was decided that the easiest solution would be to not use gradients from PropertyEstimator and instead rely on the finite difference method, which will be done if the interface is not ready by September. Y. Qiu added that ForceBalance can also introduce gradients for some hyperparameters, not just for physical properties, which are currently not supported in PropertyEstimator. S. Boothroyd suggested that any features that are not crucial for the first optimization sprint should be discussed and added later on. S. Boothroyd and Y. Qiu will continue working together on building the interface between ForceBalance and PropertyEstimator, starting from ForceBalance [example 17](https://github.com/yudongqiu/forcebalance/pull/7). S. Boothroyd will look into transformation of gradients from PropertyEstimator for use in ForceBalance.  
