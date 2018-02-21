const opn = require('opn');
const readChunk = require('read-chunk');
const tempDir = require('temp-dir');
const uniqueString = require('unique-string');
const hasha = require('hasha');
const mime = require('mime-types');
const path = require('path');
const transfer = require('./transfer.js');

module.exports = function view(source, {
    wait = true,
    app = undefined,
    encoding = 'utf8',
    open = true,
    uniq = false,
    value = null
} = {}){

    const tempname = uniq ? uniqueString() : hasha(source, {algorithm: 'md5'});
    const pathname = path.join(tempDir, tempname) + path.extname(source);
    const type = mime.lookup(source);

    encoding = type && /(^image)|(^video)/.test(type)
    ? null
    : encoding;

    app = encoding === 'utf8' && !app && process.env.EDITOR
    ? process.env.EDITOR
    : app;

    return open
    ? transfer(source, pathname, value)
    .then(pathname=>{
        return opn(pathname, {wait, app})
        .then(v=>pathname);
    })
    : transfer(src, pathname, value);
};
