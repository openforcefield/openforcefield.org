# openforcefield.org website source

OpenFF website is built on [Hugo](https://gohugo.io/) and hosted on [GitHub Pages](https://pages.github.com/).
Detailed content structure documentation is available in `content/manual/_index.md`.
 
## Making changes

1. Create a local copy of the OpenFF website repo: `git clone https://github.com/openforcefield/openforcefield.org`. Make sure you are on the default `v2` branch (`git checkout v2`) before you  `git pull`.   
2. Create a new branch with `git checkout -b <mybranch>`, where `<mybranch>` is the name of your new branch.
3. Make changes and preview the site locally in your browser (see below) to make sure that your page display as intended.
4. Commit the changes (`git commit .`) and push the repository to your branch (`git push origin <mybranch>`).
5. Open a PR and request review.
6. When ready, merge your PR. Deploying is handled by a Travis build service. Commits/PRs into master will trigger a new build, which can be monitored [here](https://travis-ci.org/openforcefield/openforcefield.org). Once built, travis will push the content to the `gh-pages` branch of `openforcefield.org`, which the website is now served from.

See more detailed instructions for creating or updating content below.

## Preview the website locally

0. [Download and install Hugo](https://gohugo.io/getting-started/installing/).
1. In the top-level directory, run `hugo server -D`
2. Copy the Web address from this line (in this example, it is `localhost:1313`):
```
Web Server is available at //localhost:1313/ (bind address 127.0.0.1)
```
3. Paste the Web address into your browser


## Creating and updating content

### About

### Community

### Science

### Software

### Data

### Force fields
