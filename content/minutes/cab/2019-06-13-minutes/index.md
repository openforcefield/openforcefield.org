---
date: "2019-06-13T00:00:00+00:00"
title: "Jun 13, 2019 Advisory Board Meeting"
tags: ["Open Force Field Consortium", "Advisory Board", "minutes"]
categories: ["Advisory Board Meeting Minutes"]
draft: false
description: "Meeting minutes"
weight: 10
author: "Karmen Condic-Jurkic and Jeff Wagner"
---

The [Open Force Field Consortium Advisory Board](https://openforcefield.org/about/organization/#open-force-field-consortium) met on 13 June, 2019.
The minutes are summarized as follows:


#### The first optimized force field

* The aim is to have the first force field released by Sept 1 and evaluations performed by Oct 1. Specific discussion about it takes place in `#release-1` channel on Slack.

* **Types:** The same typing tree as smirnoff99Frosst will be used, but the differentiable parameters in (a subset of) torsion, valence, and Lennard-Jones parameters will be optimized;

* **Parameterization:** A subset of torsion, valence and Lennard-Jones parameters will be refitted, depending on the available condensed phase data. The final stage is aiming at simultaneous optimization;

* **Datasets:** We are working on building and curating datasets for refitting. QCArchive will store all the QM data required for parameterization. At the moment:

 - Roche set nearly done -- extending it by a greedy set cover from eMolecules constructed by D. Mobley’s student (only 17 params missing from smirnoff99Frosst );
 - Initial set of properties from ThermoML is being curated;
 - Host-guest binding data for assessment are being prepared;
 - All training/benchmarking datasets will be accessible on GitHub and tagged with a DOI

* **Assessment:** Comparison of the optimized force field to smirnoff99frosst, GAFF, GAFF2, and preferably against OPLS, if possible
* The results will be publicly available on the website, but the exact form of this communication is to be further explored.
* New parameters available on GitHub with a DOI attached;
* Overall, FF production is following the expected timeline (torsions are being fitted, condensed property estimation is done separately at the moment).

#### Torsion/Valence

* D. Mobley gave an update on torsion/valence fitting based on [Y. Qiu’s report](torsion-fitting-update.pdf);
* Roche set is nearly done, but some problematic cases need to be re-examined and fixed.
* In this first phase of minimal changes, only force constants are fitted, but not the phase, which will be included in the later optimization stages.
* Suggestion -- setting the minimum to zero in torsion profiles for the sake of comparison between QM and MM curves.
* An open invitation to all partners to contribute more interesting molecules to cover wider chemical space.

#### Property Calculator

* M. Shirts gave an update on property calculations and data selection. At the moment, OpenFF has a tarball from NIST with the uncertainties, but what can be released in public domain is still under discussion.
* The current plan for the first pass is to have densities and heats of vaporization.
* PropertyCalculator is about to get plugged into ForceBalance (~ 1 month away), which will be followed by LJ optimizations, preferably with OpenMM.

#### OpenFF Toolkit 0.4.0 release

* This [version](https://github.com/openforcefield/openforcefield/releases/tag/0.4.0) features:

 - Performance improvements (for example, shorter preparation times for simulation systems);
 - Bugfixes;
 - Adds 0.3 SMIRNOFF spec, as well as tools to convert SMIRNOFF 0.1 and 0.2 spec files to the new format;
 - Significantly more detailed release notes with a text-search functionality, clear descriptions of changes and links to API documentation -- API-breaking changes are now clearly marked as such. It has been suggested to add unstable API/deprecation warnings wherever possible in the future.

* Next release is 0.5.0 and it will include some bugfixes that have been reported a while ago, but this bufixed might be released in 0.4.1 if the version 0.5.0 will take longer than planned. 0.5.0 version is also expected to have GBSA parameters (OBC1, OBC2, HCT, more specs [here](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html#gbsa))

#### Website / August meeting

* Summaries of the meeting notes for #torsions and #propertycalculator subgroups from the end of the 2018 up to this moment are now available on the website under [Science Updates](/community/news/science-Updates) and these summaries will be released on a regular basis from now on after the meeting.
* The OpenFF Consortium Workshop will be held in San Diego from Aug 30 - Sep 1 at the School of Pharmacy, UCSD. The first two days of the meeting will cover all the relevant updates about the progress made and future planning for OpenFF. More information and the meeting schedule will soon be posted on the website, in the mean time contact Karmen with any questions.


#### Consortium

* It’s time to start preparing the paperwork for Year 2 renewals and preferably, pharma partners should let OpenFF Initiative know as soon as possible about their renewal intentions to plan the budget;
* The current representatives in the Governing Board / Advisory Board functions have been re-elected for another 6-month term:

 - Governing Board: Katharina Meier (Bayer) and Thomas Fox (Boehringer-Ingelheim)
 - Advisory Board Chair: Daniel Kuhn (Merck)
 - Advisory Board Vice-Chair: Ian Craig (BASF)
 - Advisory Board Secretary: Arjun Narayanan (Vertex)

* D. Kuhn will prepare a slide containing logos of all the participating companies that can be sent for approval to their respective legal departments for use in talks and posters presenting OpenFF work;
* Feedback mechanisms and reporting use cases:

 - GitHub issue tracker;
 - 1:1 sessions welcome;
 - Other suggestions welcome!
