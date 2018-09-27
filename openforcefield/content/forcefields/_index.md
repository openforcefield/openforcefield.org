+++
description = "Force fields produced by the Open Force Field Initiative"
title = "Open Force Fields"
draft = false

+++

# smirnoff99Frosst

![Status: Experimental](https://img.shields.io/badge/status-experimental-orange.svg?style=for-the-badge)
[![License: CC-BY 4.0](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg)](https://creativecommons.org/licenses/by/4.0/)

A minimalist AMBER-compatible general small molecule force field with excellent coverage of druglike chemical space,
using the [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html) direct chemical perception specification.

[[Preprint]](https://doi.org/10.1101/286542) |
[[GitHub]](https://github.com/openforcefield/smirnoff99Frosst) |
[[Download]](https://github.com/openforcefield/smirnoff99Frosst/releases)

*This force field achieves [comparable accuracy to GAFF](https://doi.org/10.1101/286542) in physical properties, but with with a decrease in complexity from over 6000 lines of parameters to only ~300 lines using the SMARTS-based [direct chemical perception](https://doi.org/10.1101/286542) possible with [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html).
This force field is intended to be a starting point for rapid cycles of automated optimization to rapidly improve accuracy for modeling protein - small molecule interactions.*
