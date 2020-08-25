---
date: "2019-06-25T00:00:00+00:00"
title: "Torsion Meeting Summary (Jun 25, 2019)"
tags: ["torsion", "QC datasets", "coverage set", "pipeline", "Hessians", "QCFractal", "3D structures", "conformer expansion", "automation"]
categories: ["science"]
draft: false
description: "Summary from torsion subgroup meeting on June 25, 2019"
slug: "torsion-meeting-2019-06-25"
weight: 10
markup: markdown
author: "Karmen Condic-Jurkic and Jeffrey Wagner"
thumb: "torsion-meeting-summary.jpg"
---


**QC datasets:** A new “coverage dataset” has been built in the Mobley lab, which contains 71 molecules and covers relatively large parameter space (only 17 `smirnoff99@Frosst` parameters missing). This dataset is to be included in the QC data production pipeline, from SMILES to optimization. The single atoms and ions present in the coverage dataset for which bonded terms cannot be computed will be excluded from the pipeline. The best way to construct this pipeline for generating QC data based on this molecular set was discussed during this meeting. D. Smith suggested the following general protocol: SMILES → 3D structures → QCFractal → Hessians. The first step of converting SMILES to 3D structures involves several subtasks and decisions, including conformer/tautomer expansion, varying protonation states, etc. C. Stern will start a document with questions/decisions that will have to be tackled in the 3D structure generating step and start working on the pipeline. Y. Qiu commented that automating the entire pipeline is not quite possible, as many steps still require a lot of human attention and intervention. Everyone agreed that more experience with exceptions and coming up with a better filtering rules (logic) based on the collected examples needs to precede automation. However, it is important to record decisions/scripts/selections/workflows in this process, which will enable automation later, and D. Smith suggested using https://github.com/openforcefield/qca-dataset-submission for that purpose. Other details about this dataset and its construction are recorded in the https://github.com/openforcefield/open-forcefield-data/tree/master/Utilize-All-Parameters repo.
