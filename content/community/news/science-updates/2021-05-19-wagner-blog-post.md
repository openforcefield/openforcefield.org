---
date: "2021-05-19T00:00:00+00:00"
title: 'Infrastructure Lessons-learned'
tags: ["force field", "infrastructure", "specification", "testing"]
categories: ["science"]
draft: false
description: 'Nearly three years of organizational practices on the OpenFF infrastructure team'
slug: 'infrastructure-update-2021-05-19'
weight: 10
markup: markdown
thumb: "openff-rocket.png"
author: "Jeff Wagner"
---


It’s been more than a year since our last blog post, far longer than we could reasonably blame on lockdowns.
This post will be an update after a year of software development and operational lessons-learned.
In some ways this post may be interesting for an actual software person to read, since getting myself to this point required so many years of biology, chemistry, physics, and CS, that I never formally learned software engineering or project management, yet those have gradually become my primary roles in the organization.
So, I hope this is at least funny.
Subsequent posts from other team members will probably have more data and science, and be a bit more interesting!


## OpenFF’s transition to fully remote


OpenFF was fairly well-positioned for the transition to remote work -- Even before COVID, I had learned to avoid sitting on a bus during rush hour by scheduling meetings with folks in Europe and NYC in the morning, and only hopping on the bus afterwards.
I’m excited to head back to the labs in the next few months (especially when that commute involves the Pacific Surfliner!), but OpenFF has made a very real transition to a remote organization.
In the background of Zoom calls, I’ve been treated to the forests of New Zealand, the rolling hills of Germany, the mountain snow in Colorado, and had a technical walk-and-talk around San Diego while Matt showed me around a winter wonderland in Iowa.
It’s also been a year of really hard, fairly unrelenting work, and the piper will be paid later in 2021 when everyone takes a pandemic’s worth of vacation at the same time.


## Code review culture

Pull request (PR) reviews are a widely-accepted “good coding practice”.
However, they take additional work to request and document, end up splitting your and someone else’s attention, and delay you from moving your mind fully to the next thing.
The vast majority of trainees in computational sciences (myself included) earned their PhD through years of solo development, and so it’s jarring to start budgeting technical and emotional effort toward performing and requesting code reviews.


Also, the complexity of our specific domain adds to the cost of code reviews.
In theory, PR reviews are supposed to yield quick, useful feedback like:

&emsp; _Nice work! Be sure to lowercase the user input before you evaluate whether it matches a known value :)_

or

&emsp; _Here’s a safer parsing method that can handle Windows newline characters. Have a great day!_


Instead, there’s something mystical and confusing about the domain of chemistry that morphs these comments into:

&emsp; _Very cool! But you can’t just parse the first character of a PDB atom type to get the element because then you can’t_  
&emsp; _tell the difference between S and Se in (seleno)methionine. Sorry about that, could you redo your last three weeks_  
&emsp; _of work and add a test for MSE? :-/_

or a slurry of jargon, memes, and insults that reads like:

&emsp; _(blocking) meaningfully compare two connection tables without an aromaticity model you cannot. 9-substituted_   
&emsp; _fluorenes you must kekulize until your understand, padawan, otherwise fall for the lies of the stereocenter you shall_


We even had a weird experimental phase where, inspired by the use of “DangerBot” in other repos to [randomly assign each PR a reviewer from the organization](https://about.gitlab.com/blog/2019/10/23/reviewer-roulette-one-year-on/), [we tried our hand at it](https://github.com/openforcefield/dangerbot/blob/master/Dangerfile).
Turns out people are working on _really_ complicated stuff that takes a long time to understand, and that being randomly assigned to review a complex change to a complex codebase is not a task that can be reasonably completed in an afternoon.
Further, as a reviewer, requesting changes (the alternative to approving the PR) is deeply unrewarding as it makes the submitter do more work, and then requires your time and focus _again_ in a few days to re-review.
So there initially weren’t many incentives to requesting or doing PR reviews.


At this point, PR reviews are widely-adopted on our heavily-used repos ([openff-toolkit](https://github.com/openforcefield/openff-toolkit), [openff-evaluator](https://github.com/openforcefield/openff-evaluator), [openff-benchmark](https://github.com/openforcefield/openff-benchmark), [openff-qcsubmit](https://github.com/openforcefield/openff-qcsubmit), [qca-dataset-submission](https://github.com/openforcefield/qca-dataset-submission/), and [conda package feedstocks](https://github.com/conda-forge/openff-toolkit-feedstock/)), but things are more relaxed in more research-focused repos.
The incentive problem is solved somewhat because each of the heavily-used packages has a de-facto “major owner” who is called first if things go wrong (like if a user is frustrated by a change).
In this way, the primary owner is incentivized to provide thoughtful feedback on PRs.
We’ve also become slightly better at the code review process as an organization now that most team members have been on both sides of the “Approve” button.
But the big lesson-learned is that establishing a culture of reviews is as much a social and organizational challenge as a technical one.


Two problems around code review that we’re encountering now (which don’t seem to be specific to OpenFF) are 1) the timeliness of PR reviews and 2) reserving personnel-time for PR reviews.
Every active project on GitHub has a backlog of issues and PRs, and I don’t know at which point the number of open issues and PRs increases from “healthy project” to “we need to change how we’re doing this”.
As of the time of this writing, I think our current Issue and PR numbers seem to be creeping towards the latter.


## Testing


Another vector of effort that turns out to have a lot of overlap with code review culture is testing.


My workflow for reviewing PRs has gradually evolved, and now the first thing I do is to check the file diff to read over the [tests that were changed or added](https://github.com/openforcefield/openff-toolkit/pull/904/files#diff-97b3d6d5bcbac9c7503e6851bb19d2167984ee382450fcf91bd156f9960b7aadR323-R338).
Then I stare out a window for a minute or two and think about the implications of the new behavior, and whether it’s clearly the right thing without any further context.
If it passes that check, then I take the mindset that the PR is basically approved unless there’s something really unexpected in the description or proposed implementation.


But if the new behavior isn’t obvious and there’s a lot of history on the problem, or the PR changes an implementation but the change can’t be reflected in tests, then that’s when things get difficult.
I’ll write about this below.


Testing has been a great help to us.
The [MolSSI cookiecutter](https://github.com/MolSSI/cookiecutter-cms) deserves a ton of credit for providing clear instructions to scientific developers on how to set up and automate tests.
Of course, there is some maintenance burden associated with the tests -- If we change a behavior, several tests might begin failing, and then we have to spend time determining why the tests are failing, and whether the failures are appropriate given our original intentions, or whether they indicate a deeper problem.
In the worst cases, test failures caused by distant code changes reveal design flaws or undocumented assumptions in our models.


There are still many places where our [testing](https://github.com/openforcefield/openff-toolkit/tree/master/openff/toolkit/tests) can be expanded, but over the last year, the development of the test suite has helped me sleep much better at night.
Our current [code coverage](https://app.codecov.io/gh/openforcefield/openff-toolkit) is 88%, which means that 88% of our lines of source code are executed by at least one test.
And more importantly, our tests have become more sophisticated.
Frequently we can discover and accommodate behavior changes from new RDKit releases within hours.


## Design principles, or “When reviews aren’t easy”


Sometimes decisions around PRs aren’t obvious.


That’s when we have to start considering different paths on some fuzzy design landscape.
This is far from a science, and the cost of making and communicating these decisions is very high.


An approximate ranking of priorities for when we need to select between multiple paths is:

* Are there hard specifications for any of the steps in this process that rule out some approaches? (eg. “we need to roundtrip files from/to this format that supports double precision, so we _shouldn’t_ round this number internally”)


* Will this change be reverse-incompatible? (“changing the input for this function to strictly require a list is a good idea, but it will break a lot of existing user code, so is it really worth changing?”)


* Does this functionality reflect how the majority of users will _actually_ use it? (“This PR lets us read molecules from pictures of o-chem homework, but it breaks our SDF reader. Is that a good tradeoff?”)


* Will this new feature be worth the maintenance cost? (“It’s great that this PR lets the OpenFF toolkit order pizza, but we don’t know anything about payment APIs or how to maintain them”)


* Is the feature stable enough to put in a major package, or might it need changes faster than our release cycle will permit? (“This new analysis method is really handy, but the underlying logic is being updated every week. Let’s keep it in its own repo until a stable version is released, then we can consider bringing it in”)


* Will this change reduce the ability of a casual user to “just simulate the molecule” without surprises? Will it reduce the ability of a FF developer to configure everything they need during a FF fit without surprises?  (“We output 6 lines of warnings, and the default terminal is 24 lines tall. What else could we warn about in the remaining 18?)


* Will this new feature expand the API in a way that conflicts with planned future changes? (“this is a cool addition, but we’re actually planning to remove that field from our data structure soon”)


## Specifications


When I have to consult the list above, my favorite outcome is “the specification says X, therefore the only option is X”.


Specifications are a complete joy when they resolve a problem.
We’re doing our best to respect adjacent developers by being specification-first with [SMIRNOFF](https://open-forcefield-toolkit.readthedocs.io/en/latest/smirnoff.html).
It’s tempting at first glance to say that we should immediately write specifications for every facet of the project (and clever developers like Simon Boothroyd kinda do this by using packages like [Pydantic](https://github.com/samuelcolvin/pydantic/)), however it is very difficult to write a useful, stable spec before you try out solutions to a problem.
I’m still coming to appreciate the years of careful work that the OpenFF PIs did to craft the SMIRNOFF spec, not to mention the decades of progress in the simulation and cheminformatics communities that laid its foundation.
My one regret might be that SMIRNOFF is currently defined directly as XML, whereas I think it may be better to define it as a more generic schema that could be represented in a variety of on-disk serialization formats.


We’ve already found a few places where SMIRNOFF is underdefined or needs clarification, so we’re putting together a body of people to [guide further development of the SMIRNOFF specification](https://github.com/openforcefield/standards/pull/1).
Holding a specification together in a way that keeps it relevant and documented, but doesn’t restrict exploration or have its version numbers spinning like a slot machine will be a difficult task.
I know of some technical tricks for handling scaling -- in several areas of the codebase, we can keep our personnel-time requirements from scaling with the number of user requests by [exposing a “plugin interface”](https://open-forcefield-toolkit.readthedocs.io/en/latest/developing.html#modular-design-features), so that users can customize the behavior of our tools without needing to change our codebase.
However, there isn’t a clear analogy to a plugin interface when we’re talking about the human-intensive process of maintaining a specification.
So, if the SMIRNOFF spec userbase grows, so too will the workload of tracking exploratory variants and handling requests for modification/extension.
But, as the saying goes, “that would be a good problem to have”.


Right now computational chemistry has some broadly-adopted specifications, but it also has cases like the PDB format, where the pressure to experiment is so strong that it tears the real-world use of the format from its spec.
I’ve been on both sides of this -- as a grad student I wrote code that used the PDB format outside its spec, and now as a developer I get another grey hair every time I see such non-spec PDB files in the wild.
I don’t know what actual engineers are trained to do in this situation, but I’m hopeful that we can craft OpenFF software and the SMIRNOFF spec to have a positive impact in this regard.
I’m deeply appreciative to the people engaging in specification-defining efforts like [MMCIF/PDBx](https://mmcif.wwpdb.org/), and I hope that we can shape the OpenFF toolkit in a way that helps strong specifications gain ground in our field.


## What is the specification for a program?


Something about this conceptual framework has been bothering me all this time, though.
How do we get between well-specified objects?
What is the specification for a program?
For example, when the OpenFF Toolkit reads a SDF file and SMIRNOFF force field, and produces an OpenMM System, what is that process between meeting the input and output specifications, and can **that process** be specified?


This isn’t just an abstract concern.
We don’t want to require that everyone who wants to use our force fields must ALSO use our code.
Decoupling this is the _whole point_ of publishing a specification!
So we should also have clear instructions on how to validate an implementation of the SMIRNOFF molecule parameterization process.


After a lot of thought about the question, the current best answer I can provide is **the specification for the process is our test cases**.
This is far from a perfect answer, but it’s a useful heuristic.
There may be a more theoretical-computer-science-formal-proof way of expressing this that I don’t know about, but I’m tempted to say “anything that passes our test cases is equal to- or greater than- the OpenFF Toolkit”.
Of course, this is a nonrigorous statement: Someone could use a fuzzer to create an executable of random 0s and 1s that happens to pass our test cases.
But outside of thought experiments, it’s a practical definition.


To paraphrase a meeting a few weeks ago, between Jason Swails (the developer of [ParmEd](https://parmed.github.io/ParmEd/html/index.html)) and Matt Thompson (who’s developing a new System object for OpenFF)

&emsp; MT: _“How could we tell if my System object could be a replacement for ParmEd?”_

&emsp; JS: _“I’m not sure, but you’re probably there if you can pass all the ParmEd test cases”_


With this in mind, I’m starting to think about how we could publish a “reference” dataset, containing a bunch of input OFFXML and SDF files, and the expected parameters or energies that should come out for each of them.
I’d originally heard this idea at the [November 2019 MolSSI interoperability workshop](https://molssi.org/2019/07/29/molssi-workshop-molecular-dynamics-software-interoperability/), and it’s stuck with me.
This would be inexact in some areas -- we couldn’t expect to get identical partial charges from different AM1BCC implementations -- but it would at least be a starting point for iteration for parallel developers to have some way to validate their implementations.


## “The implementation is the specification”


This phrase comes up every few weeks in our developer meetings.
It has a literal meaning.
But based on how I’ve seen it used, it’s also a meme, a broadly negative sentiment, a joke, a profanity, and/or a decision.
It’s the real root cause when the PDB writer in Program A makes a PDB that isn’t understood by the PDB reader in Program B.
It’s a frequent pattern in comp chem software, almost to a point that it could be a law (“an output without a specification will remain without a specification until acted on by an outside force, at which point the first spec will be a reverse-engineering of whatever’s in the output”).


This is the natural way of things -- premature specification of data is analogous to premature optimization of code.
It will make you spend your effort _now_, and then restrict the flexibility of your program _later_.
OpenFF is on both sides of this, with new research rapidly iterating on formats as data is passed between scripts, file systems, and existing tools (as it must), but more mature software requiring strict adherence to input format specifications in order to do the science that the user wants.
We’re still working on figuring out when the metamorphosis from “research code” to “production code” happens.
Based on our experience so far, it begins when a project starts using one of the core toolkits to do some part of its workflow, matures when the work is published, and ends [when the functionality is merged into one of the core packages](https://github.com/openforcefield/cmiles/commit/79d4710618dd32cf7050acb2bf5a65fdd68778e6).

There’s also a more immediate reason for us to respect and promote specifications.
OpenFF follows a [dependency-heavy development model](https://github.com/conda-forge/openff-toolkit-feedstock/blob/master/recipe/meta.yaml).
Anyone who has installed our conda package knows that we stand on the shoulders of giants in our field (though with ~100 conda pacakges pulled in, it can feel more like a ["jenga tower" of dependencies](https://xkcd.com/2347/)).
When we outsource our internals to [AmberTools](https://ambermd.org/Installation.php), [RDKit](https://www.rdkit.org/), and [OpenEye](https://docs.eyesopen.com/toolkits/python/oechemtk/index.html), we are relying on those packages to provide reasonably stable on-disk representations and APIs.
If we hope to establish a culture among our neighbors where we want that stability from upstream, it is by extension our responsibility to be good neighbors to everyone downstream.
In the PR review priorities above, you’ll notice that “don’t be reverse-incompatible” is second only to “don’t violate a spec”.


Advocating for specifications is an uphill battle in any organization.
We are very fortunate to have our leadership, especially John Chodera, advocating for practices like specification in our work.
Last time I checked, testing and specification weren’t the shortest path between personnel-time and funding, but they do greatly improve the odds that our work will have the long-term impact that we want it to.


(And as an aside, rebuilding this jenga tower of dependencies after it’s fallen over several times has also made me genuinely appreciate the “if you’ve got a C compiler, then you can run the program” development model of existing comp chem packages.
As the toolkit’s behavior stabilizes I would like to start cutting down on the number and complexity of our dependencies, to the degree that we really can.)


## In closing


Folks like Daniel Smith and Lori Burns are experienced enough in this field to make these sweeping statements about architecture and open source that sound like strong opinions but are actually profound facts.
Daniel, Lori, and many others have been great mentors to me in this role.
You would enjoy their thoughts more than whatever it is I wrote, but their employers never made them "write as much as you want, about anything you want, by May 15."
So until they do, you can enjoy my discount, second-hand wisdom about open source comp chem.
Thanks to all of our users for their contributions, patience, bug reports, and additional patience.


For those interested in more information about the day-to-day of how OpenFF operates, we’ve opened up our [Infrastructure space on Confluence](https://openforcefield.atlassian.net/wiki/spaces/IN/overview). It’s a bit messy, and one team member described it as “a DDOS of information”, but it may be interesting to follow the meeting notes and see what's happening!
