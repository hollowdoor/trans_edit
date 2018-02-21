const Promise = require('bluebird');
const got = require('got');
const isURL = require('is-url');
const isStream = require('is-stream');
const isPromise = require('is-promise');
const intoStream = require('into-stream');
const { createReadStream, createWriteStream } = require('./fs.js');
const send = require('./send.js');

function gotOpts(){
    const pkg = require('../package.json');
    return {
        headers: {
            'user-agent': `${pkg.name}/${pkg.version} (https://github.com/hollowdoor/${pkg.name.replace(/-/, '_')})`
        }
    };
}

module.exports = function(source, dest, value = null){

    if(value !== null){
        return isStream(value)
        ? send(value, dest)
        : Promise.resolve(value)
        .then(value=>{
            return send(intoStream(value + ''), dest)
        });
    }

    return typeof source === 'string'
    ? isURL(source)
    ? send(got.stream(source, gotOpts()), dest)
    : send(createReadStream(source), dest)
    : Promise.reject(new TypeError(`${source} is not a string.`));
}
