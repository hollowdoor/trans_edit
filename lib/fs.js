const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
const writeFile = Promise.promisify(require('fs').writeFile);
const unlink = Promise.promisify(require('fs').unlink);
const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;

module.exports = {
    readFile,
    writeFile,
    unlink,
    createReadStream,
    createWriteStream
};
