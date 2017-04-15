const expect = require('chai').expect;
const bumpSuggest = require('..');
const ocotnode = require('octonode');
const repository = 'web-mech/bump-suggest-test';
const client = ocotnode.client();
const repo = client.repo(repository);
const base = '0.1.0';

describe('bump suggest', () => {

  it('detects fix commits and outputs a patch release suggestion.', function (done) {
    expect(bumpSuggest(['fix(everything): Some test commit message'], base)).to.equal('0.1.1');
    repo.compare('master', 'patch', function(err, results) {
      expect(bumpSuggest(results.commits.map((commit) => commit.commit.message), base)).to.equal('0.1.1');
      done();
    });
  });

  it('detects feature commits and outputs a minor release suggestion.', function (done) {
    repo.compare('master', 'minor', function(err, results) {
      expect(bumpSuggest(results.commits.map((commit) => commit.commit.message), base)).to.equal('0.2.0');
      done();
    });
  });

  it('detects breaking changes and outputs a major release suggestion.', function (done) {
    repo.compare('master', 'major', function(err, results) {
      expect(bumpSuggest(results.commits.map((commit) => commit.commit.message), base)).to.equal('1.0.0');
      done();
    });
  });
});

