const {createWriteStream} = require('./fs.js');
const Promise = require('bluebird');

module.exports = function(source, sendTo){

    return new Promise((resolve, reject)=>{
        const ws = source
        .pipe(createWriteStream(sendTo));

        ws.on('finish', ()=>{
            resolve(sendTo);
        });

        source.on('error', reject);
        ws.on('error', reject);
    });
};
