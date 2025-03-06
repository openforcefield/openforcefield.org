---
date: "2025-03-07T00:00:00+00:00"
title: "Interchange 1.0 roadmap"
tags: ["news","general","newsletter","Open Force Field Initiative"]
categories: ["news"]
draft: false
description: "The roadmap for Interchange version 1.0"
weight: 10
author: "Matt Thompson"
thumb: "openff-rocket.png"
---

Interchange is a project (and object) for storing, manipulating, and converting molecular mechanics data and currently functions as the interoperability backend within OpenFF's software stack. It has been used for years as the workhorse behind `ForceField.create_openmm_system` but has also been used for preparing GROMACS, Amber, and LAMMPS simulations in both academic research groups and industry. Recently, some users have chained together `Interchange.from_openmm` and `Interchange.combine` in workflows to prepare systems with both OpenFF and external tooling which mix SMIRNOFF and other force fields.

Interchange has been in various states of alpha/beta testing and pre-release for years, but it has quietly performed well since it was fully integrated in the OpenFF software stack in 2023. Its API has become increasingly stable since then, and major features have been implemented. The time has come for a 1.0 release which better communicates that core features of Interchange are ready for general use. This is far from the end of the project - interoperability in this space will always be an ongoing effort - but it is a good time to solidify the API and feature scope of a first major release.

In February, the OpenFF Infrastructure team conducted a survey directed at users of OpenFF software and force fields to better understand what features should go into the first stable 1.0 release of Interchange. We were happy to find that people were broadly satisfied with

- the scope of features provided by Interchange
- the ease of installation
- the quantity and quality of provided examples and documentation
- generally how well it enables the use of OpenFF force fields in different molecular simulation engines.

We did not find major gaps in feature coverage that necessitate major feature development, but we did take some helpful suggestions for minor feature additions which are included in the roadmap below. This roadmap also includes commitment to a set of core features that we believe compose most use cases. Some other features which are used by comparatively fewer people are left in place. Nothing significant is slated for removal with 1.0.

Minor features

- Virtual sites processed when calling `Interchange.from_openmm`
- Packmol wrapper functions part of a public API
- Improved runtime performance on systems containing biopolymers
- Improved interoperability testing on systems containing biopolymers

Maintenance committments

- Portions of the SMIRNOFF specification supported by OpenFF Toolkit 0.16.8
- All mainline OpenFF force fields
- Exports to OpenMM, GROMACS, and Amber, except features not supported by those engines
- Current public API, including `Interchange.from_openmm` and `Interchange.combine`

Lower-priority features left in place

- Export to LAMMPS files
- Export to vectorized representations
