---
date: "2021-11-10T00:00:00+00:00"
title: 'Interchange project update'
tags: ["infrastructure", "interoperability"]
categories: ["general"]
draft: false
description: 'Interchange: Enabling the broader use of OpenFF force fields'
slug: 'interchange-update-2021-11-10'
weight: 10
markup: markdown
thumb: "foo.png"
author: "Matt Thompson"
---


Thus far, the only simulation engine natively supported by [export from the OpenFF software
stack](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.typing.engines.smirnoff.forcefield.ForceField.html#openff.toolkit.typing.engines.smirnoff.forcefield.ForceField.create_openmm_system)
has been OpenMM. OpenMM offers great performance on GPUs and excellent flexibility via its API, but
many scientists wish to use tools that are only compatible with other molecular simulation engines, like AMBER and GROMACS. There are tools that
can convert OpenMM objects to file formats understood by these other engines, but these steps can have
rough edges and add complexity to users' workflows. For this reason, OpenFF has started the Interchange project. The objective of the Interchange project is to
provide a first-class support for these operations with the OpenFF software stack. This enabled by
a Python package of the same name that is described below and in its
[documentation](https://openff-interchange.readthedocs.io/en/v0.1.3/index.html#).

This post aims to provide a high-level overview of the aims of the Interchange project, its current status,
present capabilities, and some future directions.

{{< note >}}
Like much of of OpenFF infrastructure, Interchange is rapidly evolving and details within this blog post are likely to be out of date in the future. Links in this post point to documentation versions that may be outdated.
{{< /note >}}

Code in this post should run if copy-pasted into a Jupyter notebook or Python interpreter. This is
being written in November 2021 and code snippets intended to be used with Interchange v0.1.3. The API is
not yet stable; the names, import paths, and structure of key components will likely be updated in
the future in accordance with user feedback. If you'd like to follow along, see installation
instructions at the bottom of the page; ``Interchange`` is distributed under the MIT license and all
functionality is accessible using only free and open-source tools.


## Contents of an Interchange object

To emphasize a detail above, the key objective of the Interchange project at present is to make it
easier to get OpenFF force fields in use in non-OpenMM workflows. The scope of this task is large,
but it is finite; the
[SMIRNOFF](https://openforcefield.github.io/standards/standards/smirnoff/)
specification used by OpenFF force fields provides clarity to many questions of information
content in force fields, which is key for developing an interface to it. The [OpenFF
Toolkit](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/topology.html) also already provides
convenient representations of molecular topologies and functions for parsing existing data into its
models. Note that this does not close the door on interfacing with non-OpenFF models, it simply
provides a starting point. Expanding this work outside of the OpenFF stack is discussed below
("Future work").

An `Interchange` object stores all the information known about a system; this includes its
chemistry, how that chemistry is represented by a force field, and how the system is organised in 3D
space. An `Interchange` object has four components, each of which is also an attribute of the core
Python class: a **chemical topology**, **handlers** storing the physical interactions, **positions**
of all particles, and **box vectors**, if the system is periodic.

The `topology` attribute stores chemical information in a graph-like structure, without specific information
about forces from the force field. Currently, this attribute is literally a
[`Topology`](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.topology.Topology.html#openff.toolkit.topology.Topology)
object from the OpenFF Toolkit. The OpenFF Toolkit Topology object includes necessary information for molecular
mechanics representations (masses, elements, and basic bond information) but also richer chemical
information used by cheminformatics toolkits and some portions of the SMIRNOFF specification (bond
orders, bond and atom stereochemistry, aromaticity). While this may change in the future, this does
mean that coarse-grained representations are not supported in any explicit way.

The `handlers` attribute is a mapping between chemical information and force field parameters as
they are applied to the system (i.e. post-parametrization). A unique identifier of a segment of the
chemical graph - for example, the four atoms participating in a dihedral - is mapped to a unique
identifier of the physical parameters assigned to them - in this example, the force constant, phase,
and periodicity of the dihedral force. This allows for some de-duplication of parameters; by
pointing to a representation of the force, each unique parameter is only stored once. The mapping
between chemical topology and force parameters serves as a way of connecting the forces actually
present in a simulation to how they were applied by the force field.

Particle positions are stored as a unit-tagged `Nx3` matrix, where `N` is the number of particles in
the topology.

Box vectors are as a unit-tagged `3x3` matrix, following
conventional periodic box vectors and the implementation in
[OpenMM](http://docs.openmm.org/7.6.0/userguide/theory/05_other_features.html#periodic-boundary-conditions).

Positions and box vectors are stored internally as nanometers using a custom
[Pint](https://github.com/hgrecco/pint/) registry. Attempts are made to automatically convert from
other unit represtnations, including
[`openmm.unit`](http://docs.openmm.org/7.6.0/api-python/generated/openmm.unit.quantity.Quantity.html#openmm.unit.quantity.Quantity)
and [`unyt`](https://unyt.readthedocs.io/en/stable/) representations. For each attribute, if
unitless arrays are passed to a setter, nanometers are assumed. If an array bearing different (but
compatible) units is passed, the conversion is done automatically.

It's worth briefly mentioning some things that are **not** within the scope of what is stored here
(at least now):
* Trajectory information, and other _results_ of simulation runs, is left for post-processing libraries such as [MDAnalysis](https://userguide.mdanalysis.org/stable/index.html#)  and [MDTraj](https://www.mdtraj.org).
* Runtime details, such as initial velocities, the choice of integrator, and how often to write to trajectory files, are left to the engine
* Hardware-specific details (i.e. which operations should be run on CPU vs. GPU cores) are also left
  to the engine
* Other parameters specific to free energy methods (or other schemes such as non-equilibrium dynamics) are not currently in scope, but this may change in the future.

For more on the information content of the ``Interchange`` object, see a [corresponding
section](https://openff-interchange.readthedocs.io/en/v0.1.3/using/design.html) in the documentation.


## Preparing data for parametrization

The high-level entry point for using Interchange with the OpenFF stack is
[Interchange.from_smirnoff](https://openff-interchange.readthedocs.io/en/v0.1.3/_autosummary/openff.interchange.components.interchange.Interchange.html#openff.interchange.components.interchange.Interchange.from_smirnoff).
The two required arguments are the key inputs for the construction of any molecular mechanics
system: a chemical topology and a force field, with information about how the latter should be
"applied." This post focuses on use with the OpenFF stack, but one could imagine replacements for
reach that are not part of OpenFF software.

Within the OpenFF stack, the two object models are
provided by the toolkit: its
[`Topology`](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.topology.Topology.html#openff.toolkit.topology.Topology)
and
[`ForceField`](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.typing.engines.smirnoff.forcefield.ForceField.html#openff.toolkit.typing.engines.smirnoff.forcefield.ForceField)
classes. This post will not go into detail about the different ways that input data can be prepared - there are [many
 ways](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/users/molecule_cookbook.html) to get chemical input data into this object model! The chemical topology will simply be a caffeine molecule and the latest mainline force field release from the Open Force Field Initiative: version 2.0.0 "Sage"

```python
from openff.toolkit.topology import Molecule, Topology
from openff.toolkit.typing.engines.smirnoff import ForceField

caffeine = Molecule.from_smiles("CN1C=NC2=C1C(=O)N(C(=O)N2C)C")
caffeine.generate_conformers(n_conformers=1)
topology = caffeine.to_topology()

sage = ForceField("openff_unconstrained-2.0.0.offxml")
```

To belabor the point about where exactly in a workflow we are focused, one can load in another [available force field](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.typing.engines.smirnoff.forcefield.get_available_force_fields.html#openff.toolkit.typing.engines.smirnoff.forcefield.get_available_force_fields) or generate a prepare a topology with an arbitrary number of different molecules.


## Using Interchange

Now that everything is prepared, we simply construct an ``Interchnage`` object with two lines of code:

```python
from openff.interchange.components.interchange import Interchange

interchange = Interchange.from_smirnoff(force_field=sage, topology=topology)
interchange
```
    Interchange with 24 atoms, non-periodic topology

This object is currently missing positions and box information. Let's use the conformer we generated
earlier and assign box vectors to something more than twice the cutoff that Sage uses (0.9 nanometers).

```python
interchange.box = [4, 4, 4]
interchange.positions = caffeine.conformers[0]
interchange.box
```
    array([[4., 0., 0.],
       [0., 4., 0.],
       [0., 0., 4.]]) <Unit('nanometer')>

(This step may be more streamlined in the future, possibly with changes directly in the toolkit!)

For more complex systems, there may be other steps involved at different points in a workflow, such
as adding solvent and counter-ions or combining multiple ``Interchange`` objects generated from
different force fields. But for this example, we're (partially) done! The ``Interchange`` object is
fully constructed and we can export its contents to objects understood by simulations engines.

As a brief aside,
[migrating](https://openff-interchange.readthedocs.io/en/v0.1.3/using/migrating.html#migrating-from-the-openff-toolkit)
existing code from using the OpenFF Toolkit's OpenMM interface to using Interchange directly is
straightforward. Wherever
[`ForceField.create_openmm_system](https://open-forcefield-toolkit.readthedocs.io/en/0.10.1/api/generated/openff.toolkit.typing.engines.smirnoff.forcefield.ForceField.html#openff.toolkit.typing.engines.smirnoff.forcefield.ForceField.create_openmm_system)
is was used, simply replace it with `Interchange.from_smirnoff` like so:

```python
# Existing code generating an OpenMM System
openmm_system = forcefield.create_openmm_system(topology)

# New code generating an Interchange object
interchange = Interchange.from_smirnoff(forcefield, topology)
```

The functions have different names and outputs, but their inputs are identical!


## Exporting to simulation engines

There are high-level API points for exporting to particular file formats. The focus of this project,
for the most part, does not cover run-time options such as the choice of integreator, thermostat,
and barostat. Discussions are underway on the possibility of providing partial input scripts that
require some manual edits but include important information contained within the force field (cutoff
methods and distances, in particular).

```python
# GROMACS
interchange.to_gro("out.gro")
interchange.to_top("out.top")

# Amber
interchange.to_inpcrd("out.inpcrd")
interchange.to_prmtop("out.prmtop")

# LAMMPS
interchange.to_lammps("out.lmp")

# OpenMM (`openmm.System`)
openmm_system = interchange.to_openmm()

# The OpenFF Toolkit provides direct exports to `openmm.app.Topology`!
openmm_topology = topology.to_openmm()
```

Internally, each of these methods call a function somewhere in the `openff.interchange.interop`
module; accessing them as methods on the core object is meant to make it easier to actually do each
operation.

For more on the export layer, see a [corresponding
section](https://openff-interchange.readthedocs.io/en/v0.1.3/using/output.html) in the documentation.


## Validating exports

There is, unfortunately, not much of a standard in place for ensuring that parametrizing a
chemical topology with a given force field produces the expected results. For the purposes of this
work, we will focus on validating the results of exporting ``Interchange`` objects to files and
objects understood by supported simulation engines. To this end, there are several functions in the
``openff.interchange.drivers`` module that each take in an ``Interchange`` object, call out to an
engine a single-point energy calculation, and store the result.

This snippet continues from above, since we have conveniently already done the work of constructing
our object. Note that these functions are relatively unintelligent at the moment and simply look to
see if each engine is installed (i.e. if `gmx`, `sander`, etc. are in `$PATH`). These might not run
on a machine that does not have them installed - feel free to skip lines if you're following along.

```python
from openff.interchange.drivers.amber import get_amber_energies
from openff.interchange.drivers.openmm import get_openmm_energies
from openff.interchange.drivers.gromacs import get_gromacs_energies
from openff.interchange.drivers.lammps import get_lammps_energies
```

```python
print(get_gromacs_energies(interchange))
```
    Energies:

    Bond:          		17.31004524230957 kJ / mol
    Angle:         		195.2955780029297 kJ / mol
    Torsion:       		13.520307540893555 kJ / mol
    Nonbonded:     		None
    vdW:           		43.82065216824412 kJ / mol
    Electrostatics:		-707.1108989715576 kJ / mol

(Note that all of these outputs will have a `None` for their nonbonded energy, since the underlying engines have separated this out into `vdW` and `Electrostatics` components already)

```python
print(get_amber_energies(interchange))
```
    Energies:

    Bond:          		4.1372 kcal / mol
    Angle:         		46.6767 kcal / mol
    Torsion:       		3.2314 kcal / mol
    Nonbonded:     		None
    vdW:           		43.8144296 kJ / mol
    Electrostatics:		-707.0098095999999 kJ / mol

```python
print(get_openmm_energies(interchange))
```
    Energies:

    Bond:          		17.309860229492188 kJ / mol
    Angle:         		195.29534912109375 kJ / mol
    Torsion:       		13.520315170288086 kJ / mol
    Nonbonded:     		None
    vdW:           		43.807859356853584 kJ / mol
    Electrostatics:		-707.037225348007 kJ / mol

```python3
print(get_lammps_energies(interchange))
```
    Energies:

    Bond:          		4.1371621 kcal / mol
    Angle:         		46.67671 kcal / mol
    Torsion:       		3.2314347718102 kcal / mol
    Nonbonded:     		None
    vdW:           		10.4644777915 kcal / mol
    Electrostatics:		-168.98040100000003 kcal / mol

There is also, for convenience of comparing these outputs, a high-level function that calls each of
the above functions and prepares the input to a single Pandas ``DataFrame``:

```python3
from openff.interchange.drivers.all import get_summary_data

summary_data = get_summary_data(interchange)
summary_data
```
                  Bond       Angle    Torsion        vdW  Electrostatics
    OpenMM   17.309860  195.295349  13.520315  43.807859     -707.037225
    Amber    17.310045  195.295313  13.520178  43.814430     -707.009810
    GROMACS  17.310045  195.295578  13.520308  43.820652     -707.110899
    LAMMPS   17.309886  195.295355  13.520323  43.783375     -707.013998

This allows us to quickly look see how much each engine tends to differ in its computation of each
component of the potential energy function:

```python3
summary_data.std()  # or .describe(), etc.
```
    Bond              0.000100
    Angle             0.000121
    Torsion           0.000069
    vdW               0.016327
    Electrostatics    0.046856
    dtype: float64

Are these errors on the order of 10<sup>-4</sup> - 10<sup>-2</sup> kJ/mol between engines'
evaluation of supposedly-equivalent inputs acceptable? That's an [open
question](https://dx.doi.org/10.1007%2Fs10822-016-9977-1) - and in this case, it's likely that the
``Interchange``'s exports to each have some small discrepancies and how each engine is called by its
driver is not entirely precise. Regardless, this is a useful framework for ensuring outputs to these
engines, and engines that may be supported in the future, are consistent with each other. This also
serves as a template for how reference energies could be distributed by force field developers:
given a molecule topology prepared in a prescribed way, force field XYZ should provide these
particular energies. At present, we have a decent idea of what engines _think_ these energies are
but not what the original developers intended them to be; reference energies would enable a more
direct route to testing engines and perhaps uncover bugs (relatively minor, but perhaps
non-negligible) in engines themselves.


## Python package

This project is hosted in a Python package (`openff-interchange`) which stores the actual `Interchange` class. Development occurs in public on a [GitHub repository](https://github.com/openforcefield/openff-interchange). The package itself is made up of pieces that have looked in the above sections. To a rough approximation, let's just look at some of the files and folders in the module:

```shell
$ tree -L 1 openff/interchange
openff/interchange
├── __init__.py
├── _version.py
├── components  # Core internal modules
├── conftest.py
├── data
├── drivers
├── energy_tests
├── exceptions.py
├── interop
├── interoperability_tests
├── models.py
├── py.typed
├── testing
├── types.py
├── unit_tests
└── utils.py
```

Many of these files and folers are for testing and/or Python-specific configuration, but some are the source of what we've looked at today. `components/` stores the key models used internally and the `Interchange` class itself, `/drivers/` stores the functions used in energy-based tests, and `interop/` stores the code used to actually _do_ each export.


## Future work

Development is currently underway on features that will enable the typing and parametrization of
biopolymers with SMIRNOFF-style force fields. This work is progressing alongside a significant
refactor to the OpenFF toolkit to support biopolymers in its `Molecule` and `Topology` models. The 
refactor is undergoing extensive internal testing as of November 2021 and we hope to have it in a
pre-release build of the OpenFF Toolkit in early 2021. This will enable Interchange to work with the
rest of the OpenFF stack on biopolymers, supporting our scientists currently working toward the first protein
force field produced by the initiative and external scientists who will use it in the future.

Surveys of OpenFF's user base indicate that most people use OpenMM, Amber, and/or GROMACS as their
engine of choice, so compatibility with those engines has been the focus of development. (Support
for LAMMPS was added on the basis of my experience with it.) In general, the current focus is on
improving the reliability and feature parity of the engines that are currently support.  On this
basis, support for other _exports_ is not highly-prioritized at the moment. If support for other
engines would enable the use of OpenFF force fields in your workflows, we'd be happy to hear from
you! (See "Feedback" at the end of this post).

The [SMIRNOFF](https://openforcefield.github.io/standards/standards/smirnoff/)
specification is not fully supported but we aim to fully support it in the future. Virtual sites and
bond order-based parameter interpolation are supported on an experimental basis but the GBSA section
is not currently prioritized due to relatively little scientific interest at the moment.

Lastly, support for _importing_ from other object models is planned in general terms but is not a
topic of active development at this moment. As a proof of concept that this is possible - that
``Interchange`` is not wholly specific to SMIRNOFF force fields and the OpenFF stack - we worked
with the [MoSDeF](https://mosdef.org) team at Vanderbilt University to add
[``Interchange.from_foyer``](https://openff-interchange.readthedocs.io/en/v0.1.3/_autosummary/openff.interchange.components.interchange.Interchange.html#openff.interchange.components.interchange.Interchange.from_foyer), which, as the name implies, creates an ``Interchange`` object from a
[Foyer](foyer.mosdef.org) force field and a minimal chemical graph. Note that the structure of
the function is similar (force field plus chemical topology) but with different object swapped in!
We hope that this can work be extended to support some amount of _importing_ from existing force
field infrastructure, such as using ligands parametrized with OpenFF force fields with proteins
parametrized with Amber force fields. We hope that ``Interchange`` has been engineered in a way
that makes swapping out components feasible not only for us but also other developers.

Again, if there are other features that would enable ``Interchange`` to get OpenFF force fields into
your workflows, please drop us a line.


## Installation

Interchange can be installed via `conda` (or `mamba`) on `conda-forge`:

```shell
$ conda install openff-interchange -c conda-forge
```

See [here](https://openff-interchange.readthedocs.io/en/v0.1.3/installation.html) for more details.


## Further reading

For more details, please consult the [full
documentation](https://openff-interchange.readthedocs.io/en/v0.1.3/index.html#).

Examples using Interchange are available via
[binder](https://mybinder.org/v2/gh/openforcefield/openff-system/master?filepath=%2Fexamples%2F),
which runs Jupyter notebooks in a web browser without the need to install anything locally.


## Feedback

For help with specific issues with the software or to
request features, please visit the [issue
tracker](https://github.com/openforcefield/openff-interchange/issues). For more general feedback or
discussions, please reach out to support@openforcefield.org
