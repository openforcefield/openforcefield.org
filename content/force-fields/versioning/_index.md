---
title: Versioning
---
[Semantic versioning](https://semver.org/) of force fields follows MAJOR(x).MINOR(y).PATCH scheme and new versions will be released as OpenFF x.y.z:

**x** : functional form change and/or major scientific update

**y** : parameter refit epoch

**z** : bugfix / hotfix

Generally, major increments MAY indicate a functional form or compatibility change, but don&#39;t NEED to. However, if compatibility DOES change, then major version number MUST increment.
{{< br >}}{{< br >}}
## Codenames:
Force field versions with major updates will be referred to as **generations** , not releases, for clearer communication purposes. Each new force field generation will have a specific **codename** associated with it, while the minor and patch releases will be captured in openff-x.y.z version names. The codenames will be given after herbs.
{{< br >}}{{< br >}}
## Biomolecular force fields:
amber14sb will be ported to amber14SB.offxml. After the first refit, biomolecular force field parameters will become a part of openff-x.y.z with documentation describing the details.
{{< br >}}{{< br >}}
