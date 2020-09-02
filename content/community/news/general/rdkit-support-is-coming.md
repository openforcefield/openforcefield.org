---
date: "2018-09-30T00:00:00+00:00"
title: "Support for open source cheminformatics toolkits is coming!"
tags: ["news", "general", "OpenFF Toolkit", "cheminformatics", "RDKit", "OpenEye", "software"]
categories: ["news"]
draft: false
description: "A rundown of coming changes and improvements in the openforcefield toolkit."
markup: mmark
weight: 10
author: "John Chodera"
thumb: "openff-toolkit-logo.jpg"
---

We've been hard at work with a large-scale infrastructure overhaul of our main [openforcefield toolkit](http://github.com/openforcefield/openforcefield) following the [Open Force Field Toolkit 0.1.0 prerelease](https://github.com/openforcefield/openforcefield/releases/tag/0.1.0), which provided an initial reference implementation of the [SMIRNOFF 0.1 specification](https://doi.org/10.1101/286542) for direct chemical perception.
Many thanks to all the users who provided helpful feedback in how we could improve overall usability!

While we expect the updated toolkit to be released very soon, we wanted to provide a summary of the coming changes to give you an idea of what we've been up to:

### Support for fully open source cheminformatics toolkits

While the [Toolkit 0.1.0 prerelease](https://github.com/openforcefield/openforcefield/releases/tag/0.1.0) required the [OpenEye Toolkits](https://docs.eyesopen.com/toolkits/python/index.html) to provide facilities for molecule reading/writing, chemical perception via SMARTS, conformer generation, and partial charge assignment, we have been working hard to allow fully open cheminformatics toolkits (such as [The RDKit](http://www.rdkit.org/)) to be easily used instead.

We are introducing [Toolkit Wrappers](https://open-forcefield-toolkit.readthedocs.io/en/topology/utils.html#toolkit-wrappers), which provide a simple, unified API to multiple toolkits to expose the cheminformatics features required by the openforcefield toolkit.

These features include:
* Reading and writing molecules from standard file formats (Tripos mol2, SDF, PDB, etc.)
* Conversion to/from SMILES strings
* Enumeration of tagged-atom SMARTS (SMIRKS) matches within chemical structures
* Partial charge assignment with corrected semiempirical charge assignments (e.g. AM1-BCC)

Initially, we are adding support for the following toolkits:
* The [OpenEye Toolkit](https://docs.eyesopen.com/toolkits/python/index.html) will continue to be supported, though a [license](https://www.eyesopen.com/pricing) is required for their use
* The [RDKit](http://www.rdkit.org), which provides support for molecule reading/writing, conversion to/from SMILES, and SMARTS matching, but does not provide AM1-BCC charge assignment capabilities
* The [AmberTools](http://ambermd.org/AmberTools.php) for assigning AM1 and AM1-BCC charges via `sqm`

Initially, this means that the RDKit and AmberTools together can provide complete functionality for assignment of [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html) parameters for small molecules.
We will include automatic installation of both of these toolkits as part of the next `conda` release of the openforcefield toolkit.

### A new draft SMIRNOFF 1.0 specification

While the [SMIRNOFF 0.1 specification](https://doi.org/10.1101/286542) was a significant step forward in automated chemical perception based force fields, it was incomplete and inconsistent in some ways that would hinder its growth.
This release will include a new backwards-incompatible [draft SMIRNOFF 1.0 specification](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html) that will support rapid improvements in force field accuracy over the next year, featuring multiple improvements:

* Aromaticity model now defaults to `OEAroModel_MDL`, and aromaticity model names drop OpenEye-specific prefixes
* Top-level tags are now required to specify units for any unit-bearing quantities to avoid the potential for mistakes from implied units.
* Potential energy component definitions were renamed to be more general:
    * `<NonbondedForce>` was renamed to `<vdW>`
    * `<HarmonicBondForce>` was renamed to `<Bonds>`
    * `<HarmonicAngleForce>` was renamed to `<Angles>`
    * `<BondChargeCorrections>` was renamed to `<ChargeIncrementModel>` and generalized to accommodate an arbitrary number of tagged atoms
    * `<GBSAForce>` was renamed to `<GBSA>`    
* `<PeriodicTorsionForce>` was split into `<ProperTorsions>` and `<ImproperTorsions>`
* `<vdW>` now specifies 1-2, 1-3, and 1-4 scaling factors via `scale12` (default: 0), `scale13` (default: 0), and `scale14` (default: 0.5) attributes. Coulomb scaling parameters have been removed from `StericsForce`.
* Added the `<Electrostatics>` tag to separately specify 1-2, 1-3, and 1-4 scaling factors for electrostatics, as well as the method used to compute electrostatics (`PME`, `reaction-field`, `Coulomb`) since this has a huge effect on the energetics of the system.
* Made it clear that `<Constraint>` entries do not have to be between bonded atoms.
* `<VirtualSites>` has been added, and the specification of charge increments harmonized with `<ChargeIncrementModel>`
* The `potential` attribute was added to most forces to allow flexibility in extending forces to additional functional forms (or algebraic expressions) in the future. `potential` defaults to the current recommended scheme if omitted.
* `<GBSA>` now has defaults specified for `gb_method` and `sa_method`
* Changes to how fractional bond orders are handled:
    * Use of fractional bond order is now are specified at the force tag level, rather than the root level
    * The fractional bond order method is specified via the `fractional_bondorder_method` attribute
    * The fractional bond order interpolation scheme is specified via the `fractional_bondorder_interpolation`
* Section heading names were cleaned up.
* Example was updated to reflect use of the new `openforcefield.topology.Topology` class
* Eliminated "Requirements" section, since it specified requirements for the software, rather than described an aspect of the SMIRNOFF specification
* Fractional bond orders are described in `<Bonds>`, since they currently only apply to this term.

The current draft SMIRNOFF 1.0 specification can be found here: [Draft SMIRNOFF 1.0 specification](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html)

### New openforcefield `Molecule` and `Topology` objects

Specifying the system to parameterize with [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/topology/smirnoff.html) previously required passing along a set of OpenEye Toolkit [`OEMol`](https://docs.eyesopen.com/toolkits/python/oechemtk/OEChemClasses/OEMol.html) objects.
To support the migration toward broader support for fully open source toolkits, we have introduced two new classes intended to aid the reading and manipulation of biomolecular systems for parameterization:
* [`Molecule`](https://open-forcefield-toolkit.readthedocs.io/en/topology/topology.html#molecule): A simple pure Python class for manipulating molecules and interconverting with different toolkits
* [`Topology`](https://open-forcefield-toolkit.readthedocs.io/en/topology/topology.html#topology): A simple pure Python class for manipulating collections of molecules to simplify application of parameters

These classes aim to simplify reading chemical descriptions of systems from several popular formats to generate parameterized molecular systems.
For example, to read small molecule from an RDKit `rdmol`:
```python
# Create an openforcefield Molecule object from an RDKit Mol molecule
molecule = Molecule.from_rdkit(rdmol)
```
or from a file
```python
# Create an openforcefield Molecule object from a Tripos mol2 file using whatever toolkit(s) are available
from openforcefield.topology import Molecule
molecule = Molecule.from_file(mol2_filename)
```
Creating a `Topology` object from one or more `Molecule` objects is easy:
```python
# Create an openforcefield Topology object consisting of a single openforcefield Molecule
from openforcefield.topology import Topology
topology = Topology.from_molecules(molecule)
```
While we have not yet added biomolecular force fields in SMIRNOFF format, reading of PDB files containing small molecules will also be straightforward if your small molecules is also available (with any atom ordering) in some format that can be read from a file (such as a Tripos mol2 file):
```python
# Create an openforcefield Topology object from a PDB file and Tripos mol2 files defining each component of the PDB file
from simtk.openmm import app
pdbfile = app.PDBFile(pdb_filename)
unique_molecules = [ Molecule.from_file(mol2_filename) for mol2_filename in mol2_filenames ]
topology = Topology.from_openmm(pdbfile.topology, unique_molecules=unique_molecules)
```

Soon, `Molecule` and `Topology` will also support serialization to a standard that will make data interchange for biomolecular systems easier.

### A new SMIRNOFF reference implementation (`ForceField`) API

The original SMIRNOFF 0.1 reference implementation (`openforcefield.typing.engines.ForceField`) followed the OpenMM `simtk.openmm.app.ForceField` API very closely.
As we seek to make the toolkit less OpenMM-centric and easier to use with various molecular simulation packages directly, we have refined its API to make this process easier, in addition to conforming with Python PEP8 naming standards.

Generation of parameterized OpenMM `System` objects is still easy:
```python
# Create an OpenMM System object from the openforcefield Topology object
from openforcefield.typing.engines import ForceField
forcefield = ForceField('smirnoff99frosst')
openmm_system = forcefield.create_openmm_system(topology)
```
but now you will also be able to create input files for other packages easily via [ParmEd](http://github.com/parmed/parmed) (which will also be automatically installed with the `conda` package):
```python
# Generate a ParmEd Structure object from the openforcefield Topology object, attaching positions
parmed_structure = forcefield.create_parmed_structure(topology, positions)
# Write AMBER input files
parmed_structure.save('amber.inpcrd')
parmed_structure.save('amber.prmtop')
# Write gromacs input files
parmed_structure.save('gromacs.gro')
parmed_structure.save('gromacs.top')
# Write CHARMM input files
parmed_structure.save('charmm.psf')
parmed_structure.save('charmm.crd')
```

### Improved toolkit documentation and examples

A preview of the updated toolkit documentation can be found [here](https://open-forcefield-toolkit.readthedocs.io/en/topology).
Throughout the documentation, numerous examples are provided to make it easy for users to simply copy-and-paste simple solutions to common tasks.
