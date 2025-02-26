---
date: "2025-02-27T00:00:00+00:00"
title: "Interchange 1.0 roadmap"
tags: ["news","general","newsletter","Open Force Field Initiative"]
categories: ["news"]
draft: false
description: "The roadmap for Interchange version 1.0"
weight: 10
author: "Matt Thompson"
thumb: "openff-rocket.png"
---

(More prose summarizing survey feedback)

Interchange 1.0 will include a more stable API, following traditional semantic versioning.

Minor features

* Virtual sites will be processed when calling `Interchange.from_openmm`
* The Packmol wrapper functions will be part of a public API
* Improved runtime performance on system containing biopolymers
* Improved interoperability testing on systems containing biopolymers

Maintenance committments

* Complete (current) SMIRNOFF specification
* All mainline OpenFF force fields
* Exports to OpenMM, GROMACS, and Amber, except features not supported by those engines
* Current public API, including `Interchange.from_openmm` and `Interchange.combine`

Lower-priority features left in place

* Export to LAMMPS files
* Export to vectorized representations
