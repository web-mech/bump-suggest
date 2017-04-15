# bump-suggest

Suggest the next version of a project based on commits and current version

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Inspiration

 - https://github.com/conventional-changelog/standard-version
 - https://github.com/conventional-changelog-archived-repos/conventional-commits-parser
 - https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.gbbngquhe0qa
 - https://github.com/semantic-release/commit-analyzer
 - The simple need to be able to tell the next version based on commits and a previous version.

## Usage

```
const bumpSuggest = require('bump-suggest');

bumpSuggest(['fix(everything): Some test commit message'], '0.1.0'); //0.1.1
```


## Testing & Contributing

```
NODE_ENV=development npm install

npm test
```
