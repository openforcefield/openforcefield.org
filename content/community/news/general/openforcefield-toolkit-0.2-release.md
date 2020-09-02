---
date: "2019-04-08T00:00:00+00:00"
title: "The 0.2.0 Toolkit release, now with RDKit support!"
tags: ["news","general","OpenFF Toolkit", "cheminformatics","SMIRNOFF", "software"]
categories: ["news"]
draft: false
description: "Release of major new toolkit version, with open-source cheminformatics support."
markup: mmark
weight: 10
author: "Jeff Wagner"
thumb: "rdkit-logo.jpg"
---

We're excited to announce the public release of the [Open Force Field toolkit version 0.2.0](https://github.com/openforcefield/openforcefield/releases/tag/0.2.0)! Most notably, this release adds the ability to assign SMIRNOFF parameters and AM1-BCC charges with a completely open-source backend, adding support for [the RDKit](http://rdkit.org) and [AmberTools](http://ambermd.org/AmberTools.php) via a new [ToolkitWrapper](https://open-forcefield-toolkit.readthedocs.io/en/latest/utils.html#toolkit-wrappers) infrastructure that can be extended in the future to support additional cheminformatics toolkits. The [OpenEye Toolkit](https://www.eyesopen.com/toolkit-development) will continue to be supported, as well as used internally our parameter-fitting pipelines in the short term. We're extremely grateful to the [long list of contributors](https://github.com/openforcefield/openforcefield/graphs/contributors) that have made this release possible, especially [Shuzhe Wang from the Riniker group](http://www.riniker.ethz.ch/the-group.html) for piloting much of the RDKit functionality.

## Installing and using the toolkit

See the [conda installation instructions](https://open-forcefield-toolkit.readthedocs.io/en/latest/installation.html). A ZIP installer containing all dependencies will be made available shortly.

Source code for the [0.2.0 release](https://github.com/openforcefield/openforcefield/releases/tag/0.2.0) can be found [on GitHub](https://github.com/openforcefield/openforcefield/tree/0.2.0), documentation on [readthedocs](http://open-forcefield-toolkit.readthedocs.io), and the latest development code can always be found [on the `master` branch](https://github.com/openforcefield/openforcefield).

To report any issues you come across with using the toolkit, please use the [GitHub issue tracker](https://github.com/openforcefield/openforcefield/issues).

## What's new?

This version of the toolkit is a big step on the way to our 1.0 release.

First and foremost, the Open Force Field toolkit no longer requires an OpenEye license to assign SMIRNOFF parameters and partial charges. By default, [`conda`](https://conda.io) installation of the Open Force Field toolkit will now install open source cheminformatics toolkits ([the RDKit](http://rdkit.org) and [AmberTools](http://ambermd.org/AmberTools.php)) that provide capabilities to perceive chemical environments, assign charges, and parameterize systems in accordance with the [SMIRNOFF specification](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html).

We have also made significant updates to SMIRNOFF the [SMIRNOFF spec v0.2](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html). The specification lays out a flexible data model for describing force fields that encompasses the broad range of science that our toolkit aims to enable, and shows how we expose relevant parameters in different energy components to enable rapid experimentation and improvement. While the SMIRNOFF spec currently describes an [XML serialization format](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html#xml-representation), future iterations will also support other internet-friendly serialization schemes, like [JSON](https://www.json.org/) or [MessagePack](https://msgpack.org/index.html).

Behind the scenes, significant engineering has gone into making the toolkit extensible and easier to use by other force field developers. Specifically, the machinery that powers our SMIRKS-based typing has been exposed to a much larger degree, exposing [new portable molecular topology objects](https://open-forcefield-toolkit.readthedocs.io/en/latest/topology.html) and [modular parameter classes](https://open-forcefield-toolkit.readthedocs.io/en/latest/typing.html). We aim for these tools to lower the technical barrier to entry for force field scientists and developers so they can begin contributing to the Open Force Field ecosystem and doing exciting science with less hassle.

Further, the toolkit has been developed to better fit into parameter fitting workflows. [`ForceField`](https://open-forcefield-toolkit.readthedocs.io/en/latest/api/generated/openforcefield.typing.engines.smirnoff.forcefield.ForceField.html#openforcefield.typing.engines.smirnoff.forcefield.ForceField) objects in the 0.2.0 release enable programmatic access to SMIRNOFF force field parameters via an easy-to-use object model that mirrors the [SMIRNOFF data model](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html), while still allowing annotations or extensions to be added without breaking compatibility. These features are essential in order to support the toolkit's use in iterative cycles of parameterization and optimization.

## Accessing and running examples

We've updated several of our examples to work with the 0.2.0 release, and now present them in [Jupyter notebooks](https://jupyter.org/) to make it easy to get illustrative, annotated examples up and running.

You can view a static version of these examples in [the Open Force Field Github repository](https://github.com/openforcefield/openforcefield/tree/master/examples), where GitHub's Jupyter notebook renderer will allow you to immediately view the contents of these notebooks or download them directly to your machine for interactive use.

Several examples, such as the [protein-ligand examples](https://github.com/openforcefield/openforcefield/tree/master/examples/using_smirnoff_with_amber_protein_forcefield) illustrating the use of [ParmEd](https://github.com/ParmEd/ParmEd) to combine SMIRNOFF and Amber and export to other simulation packages, can be run interactively on [binder](https://mybinder.org/) by clicking the Binder badge:
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/openforcefield/openforcefield/master?filepath=examples%2Fusing_smirnoff_with_amber_protein_forcefield%2FBRD4_inhibitor_benchmark.ipynb)
Clicking on the badge will start an interactive session on [mybinder.org](mybinder.org), where you can run and modify the examples in an interactive session through your browser.

To run our examples locally, [first install the toolkit using conda](https://open-forcefield-toolkit.readthedocs.io/en/latest/installation.html), and then install Jupyter:
```bash
conda install jupyter
```
Download the project data into your current directory:
```bash
git clone https://github.com/openforcefield/openforcefield.git
```
You can now run the notebook by launching Jupyter:
```bash
cd openforcefield/examples/SMIRNOFF_simulation
jupyter-notebook run_simulation.ipynb
```
Please let us know which new examples you would like to see by posting requests on the [Open Force Field issue tracker](https://github.com/openforcefield/openforcefield/issues)

## Providing feedback and reporting issues

One of our primary goals in putting this release out is to start gathering feedback from users and developers.
If you have any questions or bugs to report, please post to the [Open Force Field Toolkit issue tracker](https://github.com/openforcefield/openforcefield/issues) or contact us on the [Open Force Field Slack](http://openforcefieldgroup.slack.com).

We are especially interested in receiving feedback on:
* bugs that you encounter in the toolkit
* questions or suggestions for how to improve the toolkit API
* new examples that you would like to see
* issues with the installation or build process

We've worked hard to ensure that the Open Force Field toolkit has close-to-identical behavior whether you're using the OpenEye or RDKit cheminformatics toolkits, and will continue to work with toolkit developers to ensure that it is possible to get reproducible parameters and charges regardless of toolkit in the future. At this time, we expect the two toolkits to handle vast majority of molecules identically. However, we are aware of certain motifs which are perceived differently by the toolkits, are are interested in learning about any more that you encounter.

## What's coming up?
At this early stage in the 0.2 toolkit series, we expect to initially release a series of rapid (potentially even weekly) bugfix and optimization releases (0.2.1, 0.2.2, ...) and feature releases (0.3.0, 0.4.0, ...) following [standard versioning practices](https://www.python.org/dev/peps/pep-0440/).

**Warning!** It is likely that our API will change between now and the 1.0 fully stable release. Please be aware of this if you are developing workflows based on the toolkit, as toolkit behavior may change significantly at that time.

Several features are not yet available in the toolkit, and will be rolled out in the coming months.
These include:
 * reading partial charges from SDF files
 * assignment of library charges   
 * valence parameter interpolation based on fractional bond order
 * SMIRKS-based GBSA parameterization
 * more convenient and robust functions to take parameterized systems from the `openforcefield` toolkit to ParmEd and/or InterMol for export to other simulation packages

We also expect to make several other changes and enhancements on a somewhat longer timescale:
  * SMIRKS-based bond-charge corrections
  * flexible partial charge calculations beyond AM1-BCC
  * support for virtual sites
  * support for parameterizing biopolymers

If you'd like to stay up to date on our progress toward these features, you can follow our progress on [toolkit project milestones](https://github.com/openforcefield/openforcefield/milestones) page on GitHub.
