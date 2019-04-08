---
date: "2019-04-08T00:00:00+00:00"
title: "The 0.2.0 Toolkit release, with RDKit support!"
tags: ["openforcefield toolkit", "cheminformatics toolkits", "SMIRNOFF"]
categories: ["news"]
draft: false
description: "Release of major new toolkit version, with open-source cheminformatics support."
markup: mmark
weight: 10
author: "Jeff Wagner"
---

We're excited to announce the public release of the [0.2.0 Open Force Field toolkit](https://github.com/openforcefield/openforcefield/tree/0.2.0)!
Most notably, this release implements the ability to run with a completely open-source backend, replacing the previous essential functions from the OpenEye Toolkit with equivalents from RDKit and AmberTools.
We're extremely grateful to the long list of contributors that have made this release possible. 

## What's new?

This version of the toolkit is a big step on the way to our 1.0.0 release.

First and foremost, the Open Force Field toolkit no longer requires an OpenEye license to operate. 
By default, the Open Force Field toolkit will now install with RDKit and AmberTools.
These open-source tools provide us the cheminformatics and molecular modeling support to parameterize systems in accordance with the SMIRNOFF spec.

We have also updated the [SMIRNOFF specification](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html) to version 0.2.
This document describes the science that our toolkit aims to cover, and shows how we expose the relevant variables in different energy components to enable experimentation and improvement. 

Behind the scenes, significant engineering has gone into making the toolkit extensible by other force field developers.
Specifically, the machinery that powers our SMIRKS-based typing has been exposed to a much larger degree. 
We hope that this will lower the technical barrier to entry for force field scientists and developers, so they can begin contributing and doing exciting science with less hassle.

Further, the toolkit has been developed to better fit into parameter fitting workflows. 
`ForceField` objects in the 0.2.0 toolkit enable programmatic access to their parameters, as well as support for non-spec keywords.
These features are essential in order to support the toolkit's use in iterative cycles of parameterization and optimization. 


## Accessing and running examples

We've updated several of our examples to work with the 0.2.0 release, and now present them in Jupyter notebooks.

You can view a static version of these examples in [the Open Force Field Github repository](https://github.com/openforcefield/openforcefield/tree/master/examples).

Several examples can be run interactively on [binder](https://mybinder.org/).
These have a special binder badge on their GitHub page. 
Clicking on the badge will start an interactive session on [mybinder.org](mybinder.org), where you can run and modify the examples in an interactive session.

To run our examples locally, [first install the toolkit using conda](https://open-forcefield-toolkit.readthedocs.io/en/latest/installation.html), and then further install jupyter.

```
conda install jupyter
```

Then, download the project data into your current directory using

```
git clone https://github.com/openforcefield/openforcefield.git
```

and access them using: 

```
cd openforcefield/examples/SMIRNOFF_simulation
jupyter-notebook run_simulation.ipynb
```

Please let us know which new examples you would like to see by posting requests on the [Open Force Field issue tracker](https://github.com/openforcefield/openforcefield/issues)

## How should I provide feedback?

One of our primary goals in putting this release out is to start gathering feedback.
If you have any questions or bugs to report, please post to the [Open Force Field issue tracker](https://github.com/openforcefield/openforcefield/issues) or contact us on the Open Force Field Slack.

We are especially interested in receiving feedback on:
* bugs that you encounter in the toolkit
* questions or suggestions for how to improve the toolkit API
* new examples that you would like to see
* issues with the installation or build process

We've worked hard to ensure that the Open Force Field toolkit has close-to-identical behavior whether it's using OpenEye or RDKit on the backend.
At this time, we expect the two toolkits to handle vast majority of molecules identically.
However, we are aware of certain motifs which are perceived differently by the toolkits, are are interested in learning about any more that you encounter.


## What's coming up?

At this early stage in the 0.2 toolkit series, we are hoping to rapidly put out new bugfix releases. 
These will be numbered 0.2.1, 0.2.2, and so on, and will initially see frequent (potentially weekly) updates.   


**Warning!** It is likely that our API will change between now and the 1.0.0 release. 
Please be aware of this if you are developing workflows based on the toolkit, as toolkit behavior may change significantly at that time.

Several features are not yet available in the toolkit, and will be rolled out in the coming months. These include:
 * more convenient and robust functions to export to other simulation packages
 * reading partial charges from SDF files
 * support for parameterizing biopolymers
 * assignment of library charges 
 * SMIRKS-based bond-charge corrections 
 * flexible partial charge calculations beyond AM1-BCC 
 * valence parameter interpolation based on fractional bond order 
 * SMIRKS-based GBSA parameterization
 * support for virtual sites. 

If you'd like to stay up to date on our progress toward these features, you can watch our progress on our [project milestones](https://github.com/openforcefield/openforcefield/milestones)

