const semver = require('semver');

const parser = require('./lib/parser');

const priority = {
    'break': 1,
    'feat': 2,
    'fix': 3,
    '': 4
};

const changeReleaseMap = {
    'break': 'major',
    'feat': 'minor',
    'fix': 'patch',
    '': ''
};

module.exports = function(commits, base) {
    let changeType = commits
        .map((commit) => parser(commit))
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