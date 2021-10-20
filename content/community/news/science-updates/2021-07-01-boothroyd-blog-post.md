---
date: "2021-07-01T00:00:00+00:00"
title: 'How to train your force field'
tags: ["force field", "infrastructure"]
categories: ["science"]
draft: false
description: 'Building a force field from entirely within a Jupyter notebook'
slug: 'ff-training-example-2021-07-01'
weight: 10
markup: markdown
thumb: "2021-07-01-boothroyd-blog-post.png"
author: "Simon Boothroyd"
---

Within Open Force Field (as the name might suggest) a lot of time and effort is spent exploring exactly how should
force fields be trained - what data should be fit to? how should that data influence the optimization e.g. L1, L2? what
classical functional forms should be used for the force field interactions? or should everything just be machine learned
*a la* ANI and friends.

A big part of this process is automation. No one wants to manually trawl through millions of molecules by hand when
building a train / test set, or painstakingly set up and store thousands of quantum chemical calculations to train
against. Ideally, training a force field should be at the level of 'these are the kinds of chemistry's I'm interested
in, this is the type of data I want to train against, let me vary these hyperparameters, and let me hit a big green GO
button!'.

It is this level of abstraction that Open Force Field is working towards, both in terms of its software pipelines and
its general workflows and procedures, and it is these that I will be diving into as part of this blog post!

{{< note >}}
The Open Force Field infrastructure is currently rapidly evolving and so parts of this blog post may become
out of date as time progresses.
{{< /note >}}

I will be writing this post as if it were to be written in a Jupyter notebook (indeed, I am writing this in a Jupyter
notebook!) so that you the reader can follow along and in principle build your own force field!

It will be structured into several parts:

* first, we will be locally generating a small quantum chemical data set of torsion drives that we can train the
  parameters in our force field against.

* next, we will complement the torsion drives with a set of optimised geometries that we will retrieve from the
  bountiful [QCArchive](https://qcarchive.molssi.org/) repository

* after that, we will create a *schema* (essentially a blueprint) defining how the force field will be trained

* and finally, we will hit the big green GO button and train the force field!

### Following along

If you would like to follow along with the steps that I will be showing here I recommend first creating a new [conda
environment](https://gist.github.com/SimonBoothroyd/2405bd7d15c2908227ad42bfe3a79064#file-environment-yml) with all of the neccessary dependencies:

```python
!conda env create --name build-a-force-field --file do-you-want-to-train-a-force-field.yml
!conda activate build-a-force-field
```

A completed Jupyter notebook [can be found on MyBinder](https://mybinder.org/v2/gist/SimonBoothroyd/2405bd7d15c2908227ad42bfe3a79064#file-how-to-build-a-force-field-ipynb/HEAD?filepath=how-to-build-a-force-field.ipynb).

## Generating a QC torsion drive training set

As you might expect, the first step in training a new force field is generating a suite of reference data to train
against. While the Open Force Field consortium routinely works with both QC and [experimental physical property
data](https://openff-evaluator.readthedocs.io/en/latest/datasets/curation.html) when building its force fields,
I will 'only' be talking about training to QC data here to keep things short and sweet!

The two main players in Open Force Fields QC data generation are the MolSSI QC ecosystem ([QCFractal](
http://docs.qcarchive.molssi.org/projects/qcfractal/en/latest/) in particular) and the [OpenFF QCSubmit](
https://openff-qcsubmit.readthedocs.io/en/latest/) package.

So what do these two packages do? Well, to quote their documentation, QCFractal is

>  a distributed compute and database platform for quantum chemistry.

and QCSubmit provides

> automated tools for submitting molecules to QCFractal and retrieving the results

Simply put, QCSubmit allows us to curate large datasets of molecules that QCFractal can then perform QC calculations on
in a way that scales across hundreds of compute resources without human intervention - i.e. no more manually runing
Psi4 or Gaussian :tada:!

### Preparing the training set

So how we do use these packages? Let's start by specifying a bunch of molecules that we want to train our force field
against!

While the consortium is currently working on procedures to fully automate the process of [selecting training sets](
https://www.youtube.com/watch?v=HBpzVZI2rkI&ab_channel=OpenForceFieldInitiative) to ensure comprehensive swathes of
relevant chemical spaces are covered, it does not yet provide packaged tools to do this (watch this space!).

Instead, for this blog post we will be training a force field for (wait for it) some linear alkanes :tada::tada::tada:!
Ok it may not be the most exciting set, but I mainly want to show the process by which we can train a force field
without needing a whole supercomputers worth of resources. This process itself can (and routinely does) handle datasets
of thousands of unique molecules with diverse chemistry's.

Let's define these molecules now:


```python
from openff.toolkit.topology import Molecule

training_smiles = [
    "CC",
    "CCCC",
]

training_molecules = [Molecule.from_smiles(smiles) for smiles in training_smiles]
```

We have the molecules, but how do we turn these into a set of QC calculations to run? This is where QCSubmit comes in!
The package allows us to create a 'factory' that does exactly this mapping.

Let's create the factory we'll be using:


```python
from openff.qcsubmit.common_structures import QCSpec
from openff.qcsubmit.factories import TorsiondriveDatasetFactory
from openff.qcsubmit.workflow_components import (
    Scan1D, ScanEnumerator, StandardConformerGenerator
)

torsion_drive_factory = TorsiondriveDatasetFactory(
    qc_specifications={
        "default": QCSpec(
            method="B3LYP-D3BJ", basis="DZVP", program="psi4"
        ),
    },
    workflow=[
        ScanEnumerator(
            torsion_scans=[
                Scan1D(
                    smarts1="[*:1]-[#6:2]-[#6:3]-[*:4]",
                    scan_range1=(-150, 180),
                    scan_increment=[30]
                )
            ]
        ),
        StandardConformerGenerator(toolkit="rdkit", max_conformers=10)
    ],
)
```

As you can probably see we have here created a `TorsiondriveDatasetFactory` that will be used to produce, as you can
probably guess, datasets of QC torsion drives. You probably also won't be surprised to learn that QCSubmit provides
[several types of factories](https://openff-qcsubmit.readthedocs.io/en/latest/api.html) for the different types of QC
calculation supported by QCFractal. For now though, let's focus on torsion drives.

We provide 2 key ingredients to our factory:

* a set of QC 'specifications' - a QC specification is where we define the level of theory as well as the program with
  which we want to run our calculations. Here we have used the 'Open Force Field defaults' which were carefully chosen
  to provide a balance of speed and accuracy at reproducing conformational energies.

* a 'workflow' - the workflow contains a set of processing steps that will be applied to an input set of molecules.
  These range from generating a set of conformers for each molecule to start the torsion drive from, enumerating all
  tautomers and protomers of the input molecules, fragmenting the input molecules to speed up the QC calculations and
  much more!

Here we have used two workflow components: i) a conformer generator which ensures that [we have several conformers to
start the torsion drive from](https://torsiondrive.readthedocs.io/en/latest/) and ii) a component that defines exactly
which torsions should be scanned. As with most things in the OpenFF ecosystem, we have used a [SMARTS pattern](
https://docs.eyesopen.com/toolkits/cpp/oechemtk/SMARTS.html) to define the chemical environments that we would like to
scan. This particular pattern will match all unique torsions around a C-C single bond.

Great - we have our molecules and we have a factory. Let's now combine the two and create the dataset of QC calculations
that QCFractal should run:


```python
torsion_drive_dataset = torsion_drive_factory.create_dataset(
    molecules=training_molecules,
    dataset_name="Alkane Torsion Drives",
    description="A very basic dataset containing three linear alkanes: "
    "ethane, propane, and butane.",
    tagline="A very basic dataset containing three linear alkanes.",
)
```

### Computing the training set

With the QC dataset prepared, we can move on to actually running the calculations that will be used in training.

The workhorse of the Open Force Field QC data generation is the QCFractal package and its [surrounding ecosystem](
http://docs.qcarchive.molssi.org/en/latest/). It provides a simple interface for computing and storing data sets of QC
calculations, being able to scale from a single laptop all the way up to multiple supercomputers located around the
globe.

While the bulk of the QC training and test sets the Open Force Field uses (as we will see later in this post) are
computed and stored in MolSSIs public QCFractal instance ([the QCArchive](https://qcarchive.molssi.org/)), here we will
be spinning up a temporary local QCFractal to better showcase how simple generating new QC data is:


```python
from qcfractal import FractalSnowflakeHandler
from qcportal.client import FractalClient

local_fractal_instance = FractalSnowflakeHandler(ncores=16)
local_fractal_client = FractalClient(local_fractal_instance)
```

*see the [main QCFractal documentation](http://docs.qcarchive.molssi.org/projects/qcfractal/en/latest/setup_quickstart.html)
for more information about setting up local instances to compute and store your non-public data*

Submitting, computing, and finally storing a QC dataset is as easy as calling the submit command and providing the
address of the server that should handle the submission:


```python
submission = torsion_drive_dataset.submit(local_fractal_client)
```

We can check on the progress of our calculations by querying the fractal instance:


```python
local_fractal_client.query_procedures(procedure="torsiondrive", status=None)
```




    [TorsionDriveRecord(id='1', status='INCOMPLETE'),
     TorsionDriveRecord(id='2', status='INCOMPLETE'),
     TorsionDriveRecord(id='3', status='INCOMPLETE')]



Let's query the server every 60 seconds until we get the all clear that our calculations have finished:


```python
from time import sleep, time

n_completed = 0
n_errored = 0

start_time = time()

while n_completed + n_errored != torsion_drive_dataset.n_records:

    sleep(60)

    n_completed = len(local_fractal_client.query_procedures(
        procedure="torsiondrive", status="COMPLETE"
    ))
    n_errored = len(local_fractal_client.query_procedures(
        procedure="torsiondrive", status="ERROR"
    ))

print(f"N COMPLETED: {n_completed} N ERRORED: {n_errored} ELAPSED={time() - start_time}s")
```

    N COMPLETED: 3 N ERRORED: 0 ELAPSED=3485.364670276642s


If everything went well we should see that we have three completed torsion drives and zero errored.

And that's it - we now have a set of torsion drives ready to train our force field against!

## Retrieving a remote QC optimization training set

Almost all the QC data that Open Force Field generates, whether that be for production force fields or smaller
scientific studies, are made available via the public [QCArchive](https://qcarchive.molssi.org/) repository. This
is not only part of the consortiums' effort to make all the science it performs completely accessible and reproducible,
but so that anyone can use it as part of their efforts!

We are going to retrieve a set of optimised geometries for our training molecules that were computed as part of a
previous Open Force Field dataset. To do this we will again be using the fantastic QCSubmit package.

The QCSubmit package, in addition to data curation and submission, contains a suite of utilities for retrieving
data from a running QCFractal instance. This functionality is provided by several ['result collections'](
https://openff-qcsubmit.readthedocs.io/en/latest/examples/retrieving-results.html) - one for each type of QC data that
can be retrieved.

To pull down optimization data we will (surprise, surprise) using the optimization result collection:


```python
# Create a client which allows us to connect to the main QCArchive server.
qcarchive_client = FractalClient()

# Retrieve the data set containing the molecules of interest.
from openff.qcsubmit.results import OptimizationResultCollection

optimization_result_collection = OptimizationResultCollection.from_server(
    client=qcarchive_client,
    datasets=["OpenFF Sandbox CHO PhAlkEthOH v1.0"],
    spec_name="default"
)
```

Here we have retrieved the 'OpenFF Sandbox CHO PhAlkEthOH v1.0' dataset which, as the name may suggest, contains
a collection of optimised geometries of alkyl, aryl, and hydroxyl containing molecules composed only of carbon, oxygen
and hydrogen.

We can see that it contains thousands of unique molecules and corresponding optimized geometries:


```python
print(f"N RESULTS:   {optimization_result_collection.n_results}")
print(f"N MOLECULES: {optimization_result_collection.n_molecules}")
```

    N RESULTS:   12271
    N MOLECULES: 10301


Ideally we'd like to filter down this collection to only include our molecules of interest... luckily, QCSubmit provides
exactly this functionality:


```python
from openff.qcsubmit.results.filters import SMILESFilter

optimization_result_collection = optimization_result_collection.filter(
    SMILESFilter(smiles_to_include=training_smiles)
)

print(f"N RESULTS:   {optimization_result_collection.n_results}")
print(f"N MOLECULES: {optimization_result_collection.n_molecules}")
```

    N RESULTS:   2
    N MOLECULES: 2


Much better! The filters provided by QCSubmit go well beyond simple SMILES based filtering - I'd highly recommend taking
a look at the [QCSubmit documentation](https://openff-qcsubmit.readthedocs.io/en/latest/examples/retrieving-results.html#Filtering-result-collections)
for more details!

To finish off, we will also retrieve the torsion drive results that we generated earlier on and store a reference to
them in a result collection:


```python
from openff.qcsubmit.results import TorsionDriveResultCollection

torsion_drive_result_collection = TorsionDriveResultCollection.from_server(
    client=local_fractal_client,
    datasets=torsion_drive_dataset.dataset_name,
    spec_name="default"
)

print(f"N RESULTS:   {torsion_drive_result_collection.n_results}")
print(f"N MOLECULES: {torsion_drive_result_collection.n_molecules}")
```

    N RESULTS:   3
    N MOLECULES: 2


## Defining the training procedure

We now have all the data that we will be training against. It's time to begin preparing the actual training process
itself.

In particular, we need to:

* load the starting force field that we will be training

* specify **which** parameters within the force field should be trained

* specify the hyper-parameters that control **how** the parameters will be trained

* define the 'targets' that we are training the parameters against

All of this is made easy by the [OpenFF Bespoke](https://github.com/openforcefield/bespoke-fit) package. The OpenFF
Bespoke package not only provides the functionality for creating tailor made force fields for individual molecules of
interest, but also provides all the tools needed to train a general transferable force field.

{{< note >}}
The OpenFF Bespoke package is still pre-release and is rapidly being developed. While every effort has been made to
ensure scientific correctness, bugs do happen, and we advise caution when using this package.
{{< /note >}}

### Defining the parameters to train

Starting from the top then, we need to load in the force field that we will be training. Here we are going to retrain a
subset of the parameters from the OpenFF 1.3.0 force field:


```python
from openff.toolkit.typing.engines.smirnoff import ForceField

initial_force_field_path = "openff_unconstrained-1.3.0.offxml"
initial_force_field = ForceField(initial_force_field_path)
```

The force field contains hundreds of parameters that cover a huge span of chemical space. From these, we can easily
extract those parameters that are relevant to our training set by generating a parameter 'coverage' report:


```python
coverage = optimization_result_collection.smirnoff_coverage(initial_force_field)

print("BONDS")
print([smirks for smirks in coverage["Bonds"]])
print("ANGLES")
print([smirks for smirks in coverage["Angles"]])
print("PROPER TORSIONS")
print([smirks for smirks in coverage["ProperTorsions"]])
```

    BONDS
    '[#6X4:1]-[#6X4:2]', '[#6X4:1]-[#1:2]'
    ANGLES
    '[*:1]~[#6X4:2]-[*:3]', '[#1:1]-[#6X4:2]-[#1:3]'
    PROPER TORSIONS
    '[#6X4:1]-[#6X4:2]-[#6X4:3]-[#6X4:4]', '[#1:1]-[#6X4:2]-[#6X4:3]-[#6X4:4]',
    '[#1:1]-[#6X4:2]-[#6X4:3]-[#1:4]'


As can be seen there are two bond, two angle and three torsion parameters. If you aren't familiar with [SMIRKS](
https://www.daylight.com/dayhtml/doc/theory/theory.smirks.html) patterns then the above may look a bit daunting...
Quite simply, a SMIRKS pattern encodes a particular chemical environment. The OpenFF force fields, or more precisely,
[SMIRNOFF](https://openforcefield.github.io/standards/standards/smirnoff/) force fields, use these patterns to define
which parameters should be applied to which chemistries.

As an example let's take a look at the SMIRKS parameter associated with our first bond parameter: `'[#6X4:1]-[#6X4:2]'`.
In a more human language, this pattern defines a chemical environment composed of two sp3 carbon atoms that are joined
by single bond.

Here we are going to train to all the parameters identified by the coverage report:


```python
from openff.bespokefit.schema.smirks import AngleSmirks, BondSmirks, ProperTorsionSmirks

target_parameters = [
    *[
        BondSmirks(smirks=smirks, attributes={"k", "length"})
        for smirks in coverage["Bonds"]
    ],
    *[
        AngleSmirks(smirks=smirks, attributes={"k", "angle"})
        for smirks in coverage["Angles"]
    ],
    *[
        ProperTorsionSmirks(smirks=smirks, attributes={"k1"})
        for smirks in coverage["ProperTorsions"]
    ],
]
```

We must specify both the SMIRKS pattern associated with the parameters that we want to train, as well as the
individual attributes (e.g. the force constant `k`, the bond `length`, the torsion barrier height `k1`)

For each type of parameter (e.g. bond, angle, proper torsion, etc.) that we will be training we must also specify the
settings that will control how that parameter will be trained. Currently, the only hyper-parameter is a 'prior' to place
on each type of parameter.

Borrowing the language of Bayesian statistics, a 'prior' in this context refers to a light restraint placed on each
type of parameter that ensures that parameter does not change too much from its initial (usually physically motivated)
value. For more details I would recommend watching [this fantastic talk](https://youtu.be/F_CKbbhiaWQ?t=1070) by
Lee-Ping Wang who created the [ForceBalance](https://github.com/leeping/forcebalance) tool that drives most of the
parameter training undertaken by Open Force Field.


```python
from openff.bespokefit.schema.smirnoff import (
    AngleAngleSettings,
    AngleForceSettings,
    BondForceSettings,
    BondLengthSettings,
    ProperTorsionSettings,
)

parameter_settings=[
    BondForceSettings(prior=1.0e02),
    BondLengthSettings(prior=1.0e-01),
    AngleForceSettings(prior=1.0e02),
    AngleAngleSettings(prior=2.0e01),
    ProperTorsionSettings(target="k", prior=1.0),
]
```

### Defining the fitting 'targets'

With the parameters that will be trained defined, we now need to define the 'targets' that we will be training them
against.

A fitting 'target' defines how deviations from the reference data we defined earlier should contribute to our
loss ( / objective) function. Here we will be using two targets that are routinely used when training new Open Force
Field force fields:

#### OptGeo

The OptGeo (short for optimised geometry) fitting target penalizes force field parameters that cause conformers that
have been minimised using the force field being trained to deviate strongly from the same conformer minimised using
the reference QM method.

#### TorsionProfile

The torsion profile target penalizes based on the average RMSE between the QM and MM energies evaluated at each scanned
torsion angle.

To define these targets we at minimum need to provide the QC reference data:


```python
from openff.bespokefit.schema.targets import (
    OptGeoTargetSchema,
    TorsionProfileTargetSchema,
)

targets = [
    TorsionProfileTargetSchema(reference_data=torsion_drive_result_collection),
    OptGeoTargetSchema(reference_data=optimization_result_collection),
]
```

Each of these targets can take a multitude of options which I won't go into detail here, but will be described in much
more detail in the soon to be published OpenFF Bespoke documentation.

## Training the force field

We are now finally ready to train the force field! We have stated which parameters will be training, we have defined
the contributions to the loss function (in terms of 'fitting targets') that we will be trying to minimise, and all that
is left is to tie it all together.

We do this by defining the overall 'optimization schema' - this is a compact python object that encodes every single
input that will be used to train the force field:


```python
from openff.bespokefit.schema.fitting import OptimizationSchema
from openff.bespokefit.schema.optimizers import ForceBalanceSchema

optimization_schema = OptimizationSchema(
    id="linear-alkanes",
    # Define the force field that we will train
    initial_force_field=initial_force_field_path,
    # Define the optimizer
    optimizer=ForceBalanceSchema(
        max_iterations=50,
        step_convergence_threshold=0.01,
        objective_convergence_threshold=0.1,
        gradient_convergence_threshold=0.1,
        n_criteria=2,
        initial_trust_radius=-1.0,
    ),
    # Define the torsion profile targets to fit against.
    targets=targets,
    # Define the parameters to refit and the priors to place on them.
    target_parameters=target_parameters,
    parameter_settings=parameter_settings,
)
```

as can be seen it is the combination of the starting force field, an optimization engine, the fitting targets, and
the parameters to be trained. It can trivially be saved to disk:


```python
with open("optimization-schema.json", "w") as file:
    file.write(optimization_schema.json())
```

allowing anyone to try and reproduce the training that was performed simply be reloading the schema and using it as the
input.

Training our force field is as simply as calling `optimize`:


```python
from openff.bespokefit.optimizers.forcebalance import ForceBalanceOptimizer

results = ForceBalanceOptimizer.optimize(optimization_schema)
results
```

Under the hood, the OpenFF Bespoke is creating all the required input files that will be required, and then calling
out to the optimization engine (in this case ForceBalace) to perform the actual training.

## Inspecting the final parameters

The results object returned after training the force field contains information collected during the training as well as
the final force field parameters.

Let's print out our initial and final parameters to convince ourselves that something has actually changed!


```python
final_force_field = ForceField(results.refit_force_field)

for handler_name in ["Bonds", "Angles", "ProperTorsions"]:

    print(handler_name.upper() + "\n")

    for smirks in coverage[handler_name]:

        initial_parameter = initial_force_field[handler_name].parameters[smirks]
        final_parameter = final_force_field[handler_name].parameters[smirks]

        print(smirks)
        print(f"INITIAL: {initial_parameter}")
        print(f"FINAL:   {final_parameter}")

    print("\n")
```
    BONDS

    [#6X4:1]-[#6X4:2]
        INITIAL: length: 1.521 A  k: 517.219 kcal/(A**2 mol)
        FINAL:   length: 1.526 A  k: 517.246 kcal/(A**2 mol)
    [#6X4:1]-[#1:2]
        INITIAL: length: 1.094 A  k: 754.071 kcal/(A**2 mol)
        FINAL:   length: 1.096 A  k: 754.054 kcal/(A**2 mol)

    ANGLES

    [*:1]~[#6X4:2]-[*:3]
        INITIAL: angle: 113.657 deg  k: 99.234 kcal/(mol rad**2)
        FINAL:   angle: 114.532 deg  k: 58.458 kcal/(mol rad**2)
    [#1:1]-[#6X4:2]-[#1:3]
        INITIAL: angle: 114.294 deg  k: 66.552 kcal/(mol rad**2)
        FINAL:   angle: 111.392 deg  k: 60.785 kcal/(mol rad**2)

    PROPER TORSIONS

    [#6X4:1]-[#6X4:2]-[#6X4:3]-[#6X4:4]
        INITIAL: k1:  0.116 kcal/mol
        FINAL:   k1:  0.094 kcal/mol
    [#1:1]-[#6X4:2]-[#6X4:3]-[#6X4:4]
        INITIAL: k1:  0.084 kcal/mol
        FINAL:   k1: -0.091 kcal/mol
    [#1:1]-[#6X4:2]-[#6X4:3]-[#1:4]
        INITIAL: k1:  0.201 kcal/mol
        FINAL:   k1: -0.013 kcal/mol




## Conclusions

And that's all there is to it! As I've hopefully proved here, the ecosystem provided by the Open Force Field consortium
enables entire force fields to be re-trained from within a single jupyter notebook.

It is an ecosystem that is rapidly evolving, expanding, and improving, and ultimately aims to allow anyone to build
their own force fields without requiring a whole team of researchers. If you found that something was unclear or did not
work as you would expect, the team would love to hear from you! Please reach out to support@openforcefield.org if you
have any feedback or, alternatively, open an issue on one of the consortiums [many GitHub repositories](
https://github.com/openforcefield).
