const parser = require('conventional-commits-parser/lib/parser');

const regex = require('conventional-commits-parser/lib/regex');

const defaults = {
    headerPattern: /^(\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'subject'],
    referenceActions: [
        'close',
        'closes',
        'closed',
        'fix',
        'fixes',
        'fixed',
        'resolve',
        'resolves',
        'resolved'
    ],
    issuePrefixes: ['#'],
    noteKeywords: ['BREAKING CHANGE'],
    fieldPattern: /^-(.*?)-$/,
    revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
    revertCorrespondence: ['header', 'hash'],
    warn: function() {},
    mergePattern: null,
    mergeCorrespondence: null
};

module.exports = function(msg, options) {
    options = Object.assign({}, defaults, options || {});
    let reg = regex(options);
    return parser(msg, options, reg);
};