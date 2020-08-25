# openforcefield.org website source

Detailed content structure documentation is available in `content/manual/_index.md`

## Preview the website locally

0. [Download and install Hugo](https://gohugo.io/getting-started/installing/).
1. In the top-level directory, run `hugo server -D`
2. Copy the Web address from this line (in this example, it is `localhost:1313`):
```
Web Server is available at //localhost:1313/ (bind address 127.0.0.1)
```
3. Paste the Web address into your browser

## Making changes

1. Create a new branch with `git checkout -b <mybranch>`, where `<mybranch>` is the name of your new branch.
2. Commit the changes (`git commit .`) and push the repository to your branch (`git push origin <mybranch>`)
3. Open a PR and request review

## Deploying

Deploying is handled by a Travis build service. Commits/PRs into master will trigger a new build, which can be monitored [here](https://travis-ci.org/openforcefield/openforcefield.org). Once built, travis will push the content to the `gh-pages` branch of `openforcefield.org`, which the website is now served from.
