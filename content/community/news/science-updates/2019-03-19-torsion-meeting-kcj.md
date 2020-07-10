---
date: "2019-03-19T00:00:00+00:00"
title: "Torsion Meeting Summary (Mar 19, 2019)"
tags: ["torsion", "charges", "QCArchive", "CMILES", "TorsionDrive", "QC datasets", "Jupyter notebook"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on March 19, 2019"
slug: "torsion-meeting-2019-03-19"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**QCArchive:** C. Stern is working on a more automated workflow for submitting molecules to [QCArchive](https://qcarchive.molssi.org/) and getting them run with appropriate defaults. Using [OpenEye](https://www.eyesopen.com/) tools and [CMILES](https://github.com/openforcefield/cmiles) could be a problem for running things on QCArchive due to licensing. A lot of work has been done on QCArchive and a press release about how QCArchive interfaces with Open Force Field is coming up soon.

**Charges:** A charge model API spec is under construction, which should support simple alternatives to AM1 and convert BCC atom types to [SMIRKS](https://daylight.com/dayhtml_tutorials/languages/smirks/), among other things. More discussion to follow in #charge-model channel.

**TorsionDrive:** M. Feng created a [Jupyter notebook](https://github.com/fengmudong/notebook/blob/master/torsiondrive.ipynb) connected to [geomeTRIC](https://github.com/leeping/geomeTRIC) that aids in visualizing calculation results. L.-P. Wang suggested adding something similar in [TorsionDrive](https://github.com/lpwgroup/torsiondrive).

**QC Datasets:** Set of molecular fragments provided by Roche under consideration for torsion drives.
