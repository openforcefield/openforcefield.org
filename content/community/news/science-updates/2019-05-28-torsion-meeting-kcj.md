---
date: "2019-05-28T00:00:00+00:00"
title: "Torsion Meeting Summary (May 28, 2019)"
tags: ["torsion", "QCFractal", "QCArchive", "ForceBalance", "RDKit", "Fragmenter", "OFF Toolkit"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on May 28, 2019"
slug: "torsion-meeting-2019-05-28"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**QCFractal:** D. Smith announced that version 0.7 is out and update is recommended. Currently, QCPortal doesn’t check the QCFractal versions, so some unexpected errors may occur if users do not upgrade from 0.6. The [QCArchive](https://qcarchive.molssi.org/) team is also planning to migrate the database from MongoDB to PostgreSQL during this week for some long-term benefits, including speed, smaller size and data integrity. More details about this migration should come in a blog post.

**RDKit:** C. Stern raised an issue with [RDKit](http://rdkit.org/) updates affecting some InChi and InChi Key definitions, specifically for molecules with stereocenters. She notes that every time an update changes the behavior of a cheminformatics toolkit with respect to stereochemistry, it requires a substantial effort to investigate how the changes affect her pipeline. Since these changes have only affected ~0.1% of the dataset, J. Wagner recommended recording each instance of perception changes due to external packages in a GitHub Issue (recording the RDKit version numbers and status of CMILES master branch), and resetting the regression tests to expect the new behavior.

**Fragmenter:** Combinatorial fragmenting is now possible. Also, ongoing efforts at the Mobley lab are making use of code from [Fragmenter](https://github.com/openforcefield/fragmenter), and some additional functionality could be added or derived from the C. Stern’s code. J. Wagner recommended that, since the Mobley Lab workflows are still experimental, that C. Stern not devote time to supporting their use cases. Work to repurpose Fragmenter code for Mobley lab workflows will not be C. Stern’s responsibility. D. Smith suggested that code-sharing between project components will become more straightforward by, for example, breaking down TorsionDrive into several modules that could be used in different workflows (modular design).

**ForceBalance:** Y. Qiu gave an update on the recent [ForceBalance](https://github.com/leeping/forcebalance) developments, including integration with the latest version of OFF toolkit. The toolkit was performing many redundant operations, which was accounting for a large fraction of the runtime of the fitting workflow. Y. Qiu implemented performance optimizations in his local workflow to get around this issue. J. Wagner reported that the OFF Toolkit is planning on adding a `System object` in the next 4-5 months which would allow ForceBalance to more efficiently adjust parameters for gradient fits. Y. Qiu also found over/underfitting issues in some molecules due to low gradients that arise as a result of conformer minimization, and is changing the penalty function to account for these cases. He is also looking into perturbing bonds and angles in a small set of molecules and computing gradients, but more data should come from a new student in D. Mobley’s lab working on the list of bonds and angles that should be scanned.

**OFF Toolkit:** New [toolkit](https://github.com/openforcefield/openforcefield) update coming up on Friday with a different XML format and some changes of cosmetic parameters access/IO.
