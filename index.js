const semver = require('semver');

const parser = require('./lib/parser');

const priority = {
    'break': 1,
    'feat': 2,
    'docs': 3,
    'fix': 4,
    'test': 5,
    '': 6
};

const changeReleaseMap = {
    'break': 'major',
    'feat': 'minor',
    'fix': 'patch',
    'docs': 'patch',
    'test': 'patch',
    '': ''
};

module.exports = function(commits, base, config) {
    let changeType = commits
        .map((commit) => parser(commit, config))
        .filter((commit) => !!commit)
        .reduce((type, commit) => {
            if (commit.notes.length) {
                return 'break';
            }

            if (priority[commit.type] <= priority[type]) {
                return commit.type;
            }
            return type;
        }, '');
    let releaseType = changeReleaseMap[changeType];
    return semver.inc(base, releaseType);
};