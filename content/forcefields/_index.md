+++
description = "Force fields produced by the Open Force Field Initiative"
title = "Open Force Fields"
draft = false

+++

All force fields listed here are installed with the latest version of the Open Force Field Toolkit. They can also be installed separately, by running:
```
conda install -c omnia openforcefields
```

Previous installations of the "openforcefields" package can be updated by running:
```
conda update -c omnia --no-update-deps openforcefields
```

Installation of a particular force field can be verified by loading it into the Open Force Field Toolkit:
```
python -c "from openforcefield.typing.engines.smirnoff import ForceField; ff = ForceField('openff-1.0.0.offxml')"
```

<a id="parsley120"></a>
# Open Force Field 1.2 Parsley Update

[![Version](https://img.shields.io/badge/release-1.2.0-BLUE.svg)](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.2.0)
![Status: Experimental](https://img.shields.io/badge/status-benchmarked-green.svg?style=flat)
[![License: CC-BY 4.0](https://img.shields.io/github/license/openforcefield/openforcefields.svg?style=flat)](https://creativecommons.org/licenses/by/4.0/)


This release contains a new, carefully designed quantum chemical dataset used in training valence parameters in the force field and the removal of redundancy in t108 SMIRKS pattern.


[[Fitting]](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.2.0) |
[[Parameters]](https://github.com/openforcefield/openforcefields/tree/1.2.0/openforcefields/offxml)


<a id="parsley110"></a>
# Open Force Field 1.1 Parsley Update

[![Version](https://img.shields.io/badge/release-1.1.0-BLUE.svg)](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.1.0)
![Status: Experimental](https://img.shields.io/badge/status-benchmarked-green.svg?style=flat)
[![License: CC-BY 4.0](https://img.shields.io/github/license/openforcefield/openforcefields.svg?style=flat)](https://creativecommons.org/licenses/by/4.0/)

This release contains results of valence parameter re-fitting, with small modifications in the input force field. 

[[Fitting]](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.1.0) |
[[Parameters]](https://github.com/openforcefield/openforcefields/tree/1.1.0/openforcefields/offxml)



<a id="parsley100"></a>
# Open Force Field 1.0 small molecule force field (codename "Parsley")

[![Version](https://img.shields.io/badge/release-1.0.0-BLUE.svg)](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.0.0)
![Status: Experimental](https://img.shields.io/badge/status-benchmarked-green.svg?style=flat)
[![License: CC-BY 4.0](https://img.shields.io/github/license/openforcefield/openforcefields.svg?style=flat)](https://creativecommons.org/licenses/by/4.0/)

The first optimized small molecule force field from the Open Force Field Initiative, a refit of the AMBER-lineage <a href="#smirnoff99Frosst">smirnoff99Frosst</a> to quantum chemical data that uses the [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html) direct chemical perception specification.

[[Blog post]](http://openforcefield.org/news/introducing-openforcefield-1.0/) |
[[Fitting]](https://github.com/openforcefield/openforcefield-forcebalance/releases/tag/v1.0.0) |
[[Benchmarks]](https://github.com/openforcefield/release-1-benchmarking) |
[[Parameters]](https://github.com/openforcefield/openforcefields/tree/1.0.0/openforcefields/offxml)

<a id="smirnoff99Frosst"></a>
# smirnoff99Frosst

[![Version](https://img.shields.io/github/release/openforcefield/smirnoff99frosst.svg?style=flat)](https://github.com/openforcefield/smirnoff99Frosst/releases)
![Status: Experimental](https://img.shields.io/badge/status-experimental-orange.svg?style=flat)
[![License: CC-BY 4.0](https://img.shields.io/github/license/openforcefield/smirnoff99Frosst.svg?style=flat)](https://creativecommons.org/licenses/by/4.0/)

A minimalist AMBER-compatible general small molecule force field with excellent coverage of druglike chemical space,
using the [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/0.3.0/smirnoff.html) direct chemical perception specification.

[[Preprint]](https://doi.org/10.1101/286542) |
[[Publication]](10.1021/acs.jctc.8b00640) |
[[GitHub]](https://github.com/openforcefield/smirnoff99Frosst) |
[[Download]](https://github.com/openforcefield/smirnoff99Frosst/releases)

*This force field achieves [comparable accuracy to GAFF](https://doi.org/10.1101/286542) in physical properties, but with with a decrease in complexity from over 6000 lines of parameters to only ~300 lines using the SMARTS-based [direct chemical perception](https://doi.org/10.1101/286542) possible with [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html).
This force field is intended to be a starting point for rapid cycles of automated optimization to rapidly improve accuracy for modeling protein - small molecule interactions.*
