const expect = require('chai').expect;
const bumpSuggest = require('..');
const base = '0.1.0';

describe('bump suggest', () => {

  it('detects docs and treats as a patch', function() {
    expect(bumpSuggest(['docs(readme): better link'], base)).to.equal('0.1.1');
  });

  it('detects fix commits and outputs a patch release suggestion.', function () {
    expect(bumpSuggest(['fix(everything): Some test commit message'], base)).to.equal('0.1.1');
  });

  it('detects feature commits and outputs a minor release suggestion.', function () {
    expect(bumpSuggest(['feat(*): Some shiny new feature'], base)).to.equal('0.2.0');
  });

  it('detects breaking changes and outputs a major release suggestion.', function () {
    expect(bumpSuggest(['feat(*): Some shiny new feature.\nsubject\ndescription\nBREAKING CHANGE:\nthis changes everything.'], base)).to.equal('1.0.0');
  });

  it('allows override of parser options', function () {
    expect(bumpSuggest(['feat(*): Some shiny new feature.\nsubject\ndescription\nBREAKING THING:\nthis changes everything.'], base, {
      noteKeywords: ['BREAKING THING'],
    })).to.equal('1.0.0');
  });
});

