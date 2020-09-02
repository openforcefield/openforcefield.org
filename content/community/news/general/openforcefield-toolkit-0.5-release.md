---
date: "2019-08-16T00:00:00+00:00"
title: "The Open Force Field Toolkit 0.5.0, adding GBSA support"
tags: ["news", "general", "OpenFF Toolkit", "GBSA", "SMIRNOFF", "cheminformatics", "software"]
categories: ["news"]
draft: false
description: "Major OFF Toolkit milestone, adding support for implicit solvation."
markup: mmark
weight: 10
author: "Jeff Wagner"
thumb: "openff-toolkit-logo.jpg"
---


[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3369469.svg)](https://doi.org/10.5281/zenodo.3369469)



This release adds support for the [GBSA tag in the SMIRNOFF specification](https://open-forcefield-toolkit.readthedocs.io/en/0.5.0/smirnoff.html#gbsa). Currently, the `HCT`, `OBC1`, and `OBC2` models (corresponding to AMBER keywords `igb=1`, `2`, and `5`, respectively) are supported, with the `OBC2` implementation being the most flexible. Unfortunately, systems produced using these keywords are not yet transferable to other simulation packages via ParmEd, so users are restricted to using OpenMM to simulate systems with GBSA.

OFFXML files containing GBSA parameter definitions are available, and can be loaded in addition to existing parameter sets, for example, with the command:

`ForceField('test_forcefields/smirnoff99Frosst.offxml', 'test_forcefields/GBSA_OBC1-1.0.offxml')`

A manifest of new SMIRNOFF-format GBSA files is below.

Several other user-facing improvements have been added, including easier access to indexed attributes, which are now accessible as `torsion.k1`, `torsion.k2`, etc. (the previous access method `torsion.k` still works as well). More details of the new features and several bugfixes are listed below.

A richer version of these release notes with live links to API documentation is available on [our ReadTheDocs page](https://open-forcefield-toolkit.readthedocs.io/en/0.5.0/releasehistory.html)

See our [installation instructions](https://open-forcefield-toolkit.readthedocs.io/en/latest/installation.html).

Please report bugs, request features, or ask questions through our [issue tracker](https://github.com/openforcefield/openforcefield/issues).

**Please note that there may still be some changes to the API prior to a stable 1.0.0 release.**




### New features
* [PR #363](https://github.com/openforcefield/openforcefield/pull/363): Implements `openforcefield.typing.engines.smirnoff.parameters.GBSAHandler`, which supports the [GBSA tag in the SMIRNOFF specification](https://open-forcefield-toolkit.readthedocs.io/en/0.5.0/smirnoff.html#gbsa). Currently, only GBSAHandlers with ``gb_model="OBC2"`` support setting non-default values for the `surface_area_penalty` term (default `5.4*calories/mole/angstroms**2`), though users can zero the SA term for `OBC1` and `HCT` models by setting `sa_model="None"`. No model currently supports setting `solvent_radius` to any value other than `1.4*angstroms`. Files containing experimental SMIRNOFF-format implementations of `HCT`, `OBC1`, and `OBC2` GBSA models are included with this release (see below). Additional details of these models, including literature references, are available on the [SMIRNOFF specification page](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html#supported-generalized-born-gb-models).
    * **WARNING:** The current release of ParmEd can not transfer [GBSA models produced by the Open Force Field Toolkit to other simulation packages](https://github.com/ParmEd/ParmEd/blob/3.2.0/parmed/openmm/topsystem.py#L148-L150). These GBSA forces are currently only computable using OpenMM.
* [PR #363](https://github.com/openforcefield/openforcefield/pull/363): When using `openforcefield.topology.Topology.to_openmm()`, periodic box vectors are now transferred from the Open Force Field Toolkit Topology into the newly-created OpenMM Topology.
* [PR #377](https://github.com/openforcefield/openforcefield/pull/377): Single indexed parameters in `openforcefield.typing.engines.smirnoff.parameters.ParameterHandler` and `openforcefield.typing.engines.smirnoff.parameters.ParameterType` can now be get/set through normal attribute syntax in addition to the list syntax.
* [PR #394](https://github.com/openforcefield/openforcefield/pull/394): Include element and atom name in error output when there are missing valence parameters during molecule parameterization.

### Bugfixes
* [PR #385](https://github.com/openforcefield/openforcefield/pull/385): Fixes [Issue #346](https://github.com/openforcefield/openforcefield/issues/346) by having `OpenEyeToolkitWrapper.compute_partial_charges_am1bcc` fall back to using standard AM1-BCC if AM1-BCC ELF10 charge generation raises an error about "trans COOH conformers"
* [PR #399](https://github.com/openforcefield/openforcefield/pull/399): Fixes issue where openforcefield.typing.engines.smirnoff.forcefield.ForceField constructor would ignore `parameter_handler_classes` kwarg.
* [PR #400](https://github.com/openforcefield/openforcefield/pull/400): Makes link-checking tests retry three times before failing.

### Files added
* [PR #363](https://github.com/openforcefield/openforcefield/pull/363): Adds `test_forcefields/GBSA_HCT-1.0.offxml`, `test_forcefields/GBSA_OBC1-1.0.offxml`, and `test_forcefields/GBSA_OBC2-1.0.offxml`, which are experimental implementations of GBSA models. These are primarily used in validation tests against OpenMM's models, and their version numbers will increment if bugfixes are necessary.
