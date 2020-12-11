---
date: "2020-10-27T00:00:00+00:00"
title: "Announcing two new releases!"
tags: ["OpenFF","news","general","announcement", "OpenFF Toolkit", "force field"]
categories: ["news"]
draft: false
description: "Open Force Field Initiative releases the latest Parsley update (OpenFF-1.3.0) and OpenFF Toolkit version 0.8.0."
weight: 10
author: "David Mobley, Karmen Condic-Jurkic"
thumb: "openff-rocket.png"
---

<br>

We're pleased to announce TWO releases are now available!

#### Force fields

OpenFF-1.3.0, a minor update to Parsley that improves performance on amide geometries. Detailed release notes are available [here](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.3.0).

#### OpenFF Toolkit

The Open Force Field Toolkit version 0.8.0. This release adds our largest feature yet, SMARTS-based creation of VirtualSites (also known as off-center charges), as well as functionality to handle bond parameter interpolation based on partial bond orders. Detailed release notes are available at [here](https://open-forcefield-toolkit.readthedocs.io/en/0.8.0/releasehistory.html).

The latest version of the toolkit can be installed into a new environment using `conda`, with `conda create -n openforcefield -c conda-forge -c omnia openforcefield`. `conda` packages for both are available now on the `omnia` channel:

- https://anaconda.org/omnia/openforcefield/files
- https://anaconda.org/omnia/openforcefields/files

Single-file installers are available in the ["assets" section of the GitHub release](https://github.com/openforcefield/openforcefield/releases/tag/0.8.0).

To provide feedback on performance of the OpenFF force fields, we highly recommend using the issue tracker at http://github.com/openforcefield/openforcefields. For toolkit feedback, use http://github.com/openforcefield/openforcefield. Alternatively, inquiries may be e-mailed to `support@openforcefield.org`, though responses to e-mails sent to this address may be delayed and GitHub issues receive higher priority.
