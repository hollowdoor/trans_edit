const readChunk = require('read-chunk');
const fileType = require('file-type');
const mime = require('mime-types');

module.exports = function(pathname){
    const type =  fileType(readChunk.sync(pathname, 0, 4100));

    return type
    ? type.mime
    : mime.lookup(pathname);
};
