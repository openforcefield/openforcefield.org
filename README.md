# openforcefield.org website source

OpenFF website is built on [Hugo](https://gohugo.io/) and hosted on [GitHub Pages](https://pages.github.com/).
Detailed content structure documentation is available in `content/manual/_index.md`.
 
## Making changes

1. Create a local copy of the OpenFF website repo: `git clone https://github.com/openforcefield/openforcefield.org`. Make sure you are on the default `v2` branch (`git checkout v2`) before you  `git pull`.   
2. Create a new branch with `git checkout -b <mybranch>`, where `<mybranch>` is the name of your new branch.
3. Make changes and preview the site locally in your browser (see below) to make sure that your page display as intended.
4. Commit the changes (`git commit .`) and push the repository to your branch (`git push origin <mybranch>`).
5. Open a PR and request review.
6. When ready, merge your PR into the `v2` branch. Deployment is automatically handled by a [GitHub Action](https://github.com/openforcefield/openforcefield.org/actions) named ` Deploy Hugo site to Pages` followed by the automated GitHub deployment using the new [GitHub Actions method](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/).

See more detailed instructions for creating or updating content below.

## Preview the website locally

0. [Download and install Hugo](https://gohugo.io/getting-started/installing/). Note that the published version of the website will be built with Hugo v0.108.0 (this isn't the latest version).
1. In the top-level directory, run `hugo server -D`
2. Copy the Web address from this line (in this example, it is `localhost:1313`):
```
Web Server is available at //localhost:1313/ (bind address 127.0.0.1)
```
3. Paste the Web address into your browser

If you have NPM installed, the appropriate version of Hugo can be installed and executed in one command, without interfering with any existing installations:

```shell
npx hugo-bin@0.108.0 server -D
```

Then open the provided link as above.

## Creating and updating content

### About

### Community

### Science

### Software

### Data

### Force fields
