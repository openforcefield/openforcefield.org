---
date: "2022-01-17T00:00:00+00:00"
title: "We can have nice things"
tags: ["documentation", "infrastructure"]
categories: ["science"]
draft: true
description: "OpenFF's documentation ecosystem."
slug: 'docs-update-2022-1-17'
weight: 10
markup: markdown
thumb: "thumb.svg"
author: "Josh Mitchell"
---

I think in scientific computing we can be so focused on the problems we're
solving that we're slow to pick up new tooling that merely makes our lives
easier. It's like we imagine that, since we're scientists, we have to make do
with what we've got because we don't have time to get anything better. But we
can have nice things too; in this day and age, we are fortunate to have an
enormous amount of high-quality tooling that means that many errors are caught
before they make it to a release: GitHub Actions, conda-forge, PyTest, Black,
Mamba, MyPy. With a little diligence, a lot of the frustration of building and
maintaining working code can be mitigated.

I should say, this frustration can be mitigated as long as it happens in code.
Documentation tooling has not had the same attention. I firmly believe we can
have nice things in documentation as well. I'd like to tell you about what
we've done with documentation in the last year, and where we could take
OpenFF's documentation tooling in 2022.

## The Book and The Reference

I've noticed two patterns that software documentation seems to fall into. I call
these patterns "The Book" and "The Reference". I'm [not the first] person to
draw this distinction, but I think it's helpful, so let me describe it.

The Book explains the design of the software and gently introduces the reader,
starting with the simplest or most common use cases and building up. It is
designed to be read cover-to-cover, or at least for sections or chapters to be
read in their entirety. It is linear in structure. It's very helpful for
users when they're getting started with a piece of software. It must have a
structure that facilitates a gentle learning curve and so cannot mirror the
structure of the codebase.

The Reference describes the entire public API of a piece of software and
everything it can do. It is designed to be easy to navigate so that the reader
can quickly and easily find the precise bit of info they need. It repeats
information liberally so that the user can find what they're looking for
easily. It is hierarchical in structure. It needs to be easier to read than the
source code or else it's pretty pointless. It's very helpful when users are
familiar with an API but just need to find the signature of that one function,
or when users only need an isolated behavior from a library and don't want to
read The Book in its entirety to find that behavior. It can mirror the
structure of the codebase itself, which is already organized by behavior.

The popular documentation tools in the Python ecosystem --- Sphinx and
Mkdocs --- are designed around writing The Book. They provide tools to document
the API as well, but the natural result of their design produces docs that are
hybrids of The Book and The Reference. The [Python Standard Library docs] are a
great example, as is the documentation for [Sphinx itself]. I think this causes
a trade-off between having a logically coherent narrative with a gentle
learning curve on one hand, and on the other having a structured document that
experienced users can navigate quickly. Once you get used to them, the Python
docs are fine, but when you first read them it can be confusing: Do I want the
`str()` function, or the `str` class, or the `string` module? Probably parts
from all three, as well as the section on collections. By contrast, when you
first read the Sphinx docs they tell a clear story; but when I'm experienced
and want to understand an extension, where are the docs for the `Sphinx` class?
Oh yeah, under the "Application API" heading. Naturally. 

[not the first]: https://www.youtube.com/watch?v=Wz2oFEDwiOk
[Python Standard Library docs]: https://docs.python.org/3/library/index.html
[Sphinx itself]: https://www.sphinx-doc.org/en/master/

## Automating documentation

Book-style documentation is organized to be read, not to be referenced.
Reference-style documentation is organized to be referenced, not read. But our
users need to both read and reference our documentation, and we don't have time
to maintain two parallel sets of documentation --- unless we can automate one
of them.

A sign of good Python code is that it is well documented with docstrings. Each
API endpoint, whether method, attribute, function, class, or module, provides a
textual description of what it is and how it should be used. Code that has
well-written docstrings and correct type annotations and is in a module that
makes sense already has well organized, complete documentation that is even
partially tested in CI. All we need to do is format it nicely, add
cross-references, and put it on the web!

In 2021, we experimented with fully automated API docs in two new projects,
[Interchange] and [BespokeFit]. Both projects already use type annotations
extensively, so we get [clear, cross-referenced documentation], even between
projects, even with only minimal docstrings. We use the builtin Sphinx
extensions [Autosummary] and [Autodoc], the fantastic third party extension
[autodoc_pydantic], as well as a few [custom templates] to produce these API
docs directly from our library code, and I've also been able to contribute code
back upstream. With solid, well-maintained tools, an error in the API reference
reflects an error in our code, whether it be a missing type annotation, a
misleading docstring, or a semantically private function missing a leading
underscore. 

I've also written Book-style docs for BespokeFit. I don't think The Book will be
automated in the near future, and I'm not sure it should be. Automating The
Reference works because it's about describing what the code does to a human.
The Book is much more about why; its about developers (or expert users, or some
chump who nags the developers a lot) explaining to users why the code is a
certain way, or why they should do this and not that. The machine just does
what its told and doesn't ask why, and so that's what the machine can teach the
user. Maybe one day AI will be able to infer the developers motivations, but I
can't imagine that being better than hearing it from the developer themselves.

In 2021, I've learned a few things about writing The Book and automating The
Reference:

- Automate what you reliably can, and no more.
- Try not to repeat info from The Reference in The Book, just link to it. This
  helps keep The Book correct and in date, and also keeps the focus of The Book
  on understanding the software rather than detailing all of its behavior.
- A lot of documentation decisions become code decisions when you automate the
  API reference, and managing privacy and re-exports is very important. I think
  this can lead to a clearer API structure, but changing the API without
  breaking it is always fraught.
- People prefer Markdown to reStructuredText.

In 2022, I want to take Reference automation further. In 2021 I added support
for the Python `__all__` attribute to Autosummary so that devs can have their
public API reflected in the docs; this year I want to come up with a similar
way to specify whether a module or package should be documented or private
without requiring devs to rename it. I also want to move forward in automating
the API reference for the Toolkit, which may involve rethinking how we approach
organising that API. Finally, I'd love to be able to write docstrings in
Markdown; Autodoc's output is currently hard-coded as rST, and extending this is
a [big enough project] that it hasn't been attempted yet. I'm hoping to spend a
few cycles investigating this issue more deeply.

[Interchange]: https://openff-interchange.readthedocs.io/en/latest/_autosummary/openff.interchange.html
[BespokeFit]: https://openff-bespokefit.readthedocs.io/en/latest/_autosummary/openff.bespokefit.html
[clear, cross-referenced documentation]: https://openff-bespokefit.readthedocs.io/en/latest/_autosummary/openff.bespokefit/workflows/bespoke/openff.bespokefit.workflows.bespoke.BespokeWorkflowFactory.html#openff.bespokefit.workflows.bespoke.BespokeWorkflowFactory.optimization_schemas_from_molecules
[Autosummary]: https://www.sphinx-doc.org/en/master/usage/extensions/autosummary.html
[Autodoc]: https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html
[autodoc_pydantic]: https://github.com/mansenfranzen/autodoc_pydantic
[custom templates]: https://github.com/openforcefield/openff-interchange/tree/master/docs/_templates/autosummary
[big enough project]: https://github.com/sphinx-doc/sphinx/issues/8018

## Testing documentation

Documentation goes out of date. It seems to go out of date proportionately to
how tightly it is coupled to code:

* Function signatures: Out of date means there's a bug
* Code examples that are tested in CI: Usually correct, but not always the
  best method
* Type annotations: Commonly too lax or too strict, but usually correct
* Docstrings: Slowly drift out of date, but fairly easy to correct and usually
  checked in code review
* Prose in The Book: Probably needs to be re-read and revised at least every year
* Books published more than a year or two ago: Wrong 

A lot of this is just life, and someone needs to do the work to keep it in date.
Even then, it would be fantastic to develop tooling to help remind authors to
check The Book. Habitually linking to the API reference for code that's being
explained provides a warning when that link goes out of date, but perhaps it
could also give a hint to the author if the code itself has been changed since
then. Perhaps the markup could include a timeline over which the author expects
to have to check it, and CI could buzz the author or raise a GitHub issue when it
needs checking.

But some documentation can actually be tested. The classic example of this is
code examples. If the docs include example code, it seems clear that the
examples should be tested in CI. Python provides [`doctest`] for exactly this
purpose, and [pytest supports it]. Unfortunately, doctest is designed to mimic
an interactive Python session. Every line of code must be prepended by a
prompt, all output must be included, test sessions operate on the level of
files rather than text blocks, and the author has very little control over the
presentation. To get the benefit of tested code examples, every code block must
follow all of these conventions. If the prompt is forgotten, the test passes
silently.

Maybe I'm [spoiled by rustdoc], but I want all of my code examples to be tested,
whether the author formats them a certain way or not. I want to be able to
write code examples in the way that best facilitates understanding, which I
think is usually not a prompt. I don't want my examples to be poisoned by
whatever other examples are on the page. And I want to be able to decide to
hide a boring import line or ignore the exception I'm demonstrating.

In 2021, I got started writing a [doctest framework] of my own for Python. In
2022, I hope to complete it, give it a better name, and be able to rely on it
in production. It currently supports all the above features, and I'm using it
experimentally on the in-progress BespokeFit docs in CI.

An alternative approach that already exists is to write pages with code examples
as Jupyter notebooks. Tools like [MyST-NB] and [nbsphinx] allow notebooks to be
written in more-or-less ordinary Markdown and be executed or rendered to the
web as needed. We already use this approach in the [Toolkit docs], but my goal
with my doctest framework is for it to work on every code block automatically,
not just the ones that have been specially prepared.

[`doctest`]: https://docs.python.org/3/library/doctest.html
[pytest supports it]: https://docs.pytest.org/en/6.2.x/doctest.html
[spoiled by rustdoc]: https://doc.rust-lang.org/rustdoc/documentation-tests.html
[doctest framework]: https://github.com/Yoshanuikabundi/doctest_oxide
[MyST-NB]: https://myst-nb.readthedocs.io/en/latest/use/markdown.html
[nbsphinx]: https://nbsphinx.readthedocs.io/en/0.8.8/custom-formats.html#Example:-Jupytext
[Toolkit docs]: https://open-forcefield-toolkit.readthedocs.io/en/latest/users/molecule_cookbook.html

## The other stuff

OpenFF's documentation has had some other nice things this year. We've moved to
a [new look] that's unified across the project. This is maintained as our own
[Sphinx theme]. I want to integrate the ReadTheDocs versioning system into the
theme in 2022 for a uniform look. We also introduced [a couple] of
[refreshed examples] demonstrating use of the Toolkit and its software
ecosystem. In 2022, I expect to refresh, prune and write new examples featuring
new projects like [Interchange] and [BespokeFit]!

We've also been talking about some extra special new things in 2022, like
unifying the documentation under the [openforcefield.org] domain and even
adding some video documentation. Stay tuned!

[new look]: https://open-forcefield-toolkit.readthedocs.io/en/latest/index.html
[Sphinx theme]: https://github.com/openforcefield/openff-sphinx-theme/
[a couple]: https://github.com/openforcefield/openff-toolkit/tree/stable/examples/toolkit_showcase
[refreshed examples]: https://github.com/openforcefield/openff-toolkit/tree/stable/examples/forcefield_modification
[Interchange]: https://openff-interchange.readthedocs.io/en/latest/_autosummary/openff.interchange.html
[BespokeFit]: https://openff-bespokefit.readthedocs.io/en/latest/_autosummary/openff.bespokefit.html
[openforcefield.org]: https://openforcefield.org