---
title: Collaborative projects
color: red
class: color-footer
---

## Project 1: Scalable fitting of torsions and valence terms using OptimizationDatasets ##

**Advisors:** Lee-Ping Wang, David Mobley, John Chodera

Generating 1D TorsionDrive datasets to fit torsions for new molecules can be very time consuming, and the additional cost of generating 2D or nD TorsionDrive datasets is essentially prohibitive. Instead, it&#39;s very inexpensive to use

##### molecule.generate\_conformers() #####

to enumerate multiple distinct conformations that are displaced from minimum-energy conformations. When these are fed to the OptimizationDataset generation pipeline using qcsubmit, optimization trajectories that include multiple configurations with associated quantum chemical energies and gradients are generated. In principle, all of this data---which primarily explores the region around the minima---can be used to simultaneously fit torsions along with other valence terms (bonds, angles, impropers).

**Questions to answer:**

- Using the existing data in QCArchive, how well can we fit bonds, angles, and torsions?
- With a Class I MM force field which cannot fit QM exactly, what is the best way to fit to this QM data (by analogy to how torsions are fit by constraining the torsion and allowing the other dof to minimize)?
- Would adding Class II MM force field coupling terms, or Urey-Bradley terms, allow us to directly fit energies and gradients of snapshots without this issue?
- Does a standard OptimizationDataset provide enough information about torsions, or are we systematically missing information about the high-energy regions that require an alternative strategy to map?
- Will using optimizers that seek saddle points or large discrete perturbations help map out the torsion energy barriers while still keeping the method O(N)?

{{< br >}}{{< br >}}
## Project 2: Testing OpenFF force fields on crystallographic data such as from the CCDC ##

**Advisors:** David Mobley, Christopher Bayly

**Additional collaborators:** Pharma partners

CCDC has expressed some willingness to release a single digit percentage of their small molecule crystal structure database openly for use in testing/improving force fields to our initiative. There is also the Crystallography Open Database. [crystallography.net/cod](https://www.crystallography.net/cod/). These may have real value for force field fitting and/or benchmarking, though how valuable they are is not yet determined. We would mainly want to examine whether, when removed from the crystal, the relevant small molecule geometries ought to still be relatively low energy (low strain). We could evaluate energies of the crystallographic geometries with our force field(s) being benchmarked and compare to the energies of optimized geometries. Relatedly, if we explore all stable optimized geometries of a given molecule, we ought to be able to generate geometries which are relatively similar (by TFD or RMSD) to the crystal geometry.

Another possible avenue of inquiry is to examine a full crystal itself. However, this may not be the best test as we know that accurate energetics for crystals can be quite challenging and these are not our main focus with our current force fields.

**Questions to answer:**

- If we extract crystallographic geometries from crystals and energy minimize them with force fields of increasing fidelity to QM data, is agreement with the crystal structure an indicator of quality? e.g. do better force fields (e.g. OpenFF 1.2 or 1.2 relative to SMIRNOFF99Frosst) stay closer to crystal geometries?
- Do better force fields predict lower strain energies for crystal geometries?
- What parameters would change if crystal geometries were allowed to impact force field optimization? How would this impact performance in benchmarks?
- In view of the above, are there clear ways we ought to incorporate crystal data into fitting and/or benchmarking of our FFs routinely?

{{< br >}}{{< br >}}
## Project 3: Off-site charge SMIRKS definition/fitting/benchmarking ##

**Advisors:** David Mobley, Christopher Bayly, Jeffrey Wagner

**Additional collaborators:** Trevor Gokey, Paul Nerenberg, Michael Schauperl

With our 0.8 toolkit release, we will have support for a wide variety of off-site charges, and ForceBalance would be able to fit force fields which transfer charge to selected site locations, so all the infrastructure is place for a great project to fit off-site charges for key locations and see how these impact accuracy, where they ought to be placed for greatest effect, etc. Some prior literature provides hints, e.g. [dx.doi.org/10.1007/s10822-011-9528-8](https://dx.doi.org/10.1007/s10822-011-9528-8) and [doi.org/10.1021/acs.jctc.0c00204](https://doi.org/10.1021/acs.jctc.0c00204) . We would need to select target locations for off-site charges and appropriate fitting data (e.g. electrostatic potentials, etc.), fit force fields with and without off-site charges in various locations, and see how these impact downstream performance.

**Questions to answer:**

- Which groups most need off-site charges to reproduce electrostatic potential and other properties well?
- How does inclusion of these charges impact predictive accuracy in benchmarks?
- Which properties are most impacted by placement of these sites and thus are most critical for inclusion in benchmarking?
- What is the cost/benefit tradeoff of using off-site charges? Is the evidence compelling enough that we can make the case to package developers to improve support of off-site charges?
- Are there locations where off-site charges are not needed though conventional chemistry might suggest they ought to be present?

If you are interested in collaborating on any of the given topics or have your own suggestions, please reach out at [info@openforcefield.org](mailto:info@openforcefield.org) or contact the listed OpenFF advisors. More collaboration projects are coming up soon!
{{< br >}}{{< br >}}
