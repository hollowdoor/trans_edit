const view = require('../');
const argv = require('minimist')(process.argv.slice(2), {
    default: {
        'app': 'gedit',
        'file': 'afile'
    }
});
console.log('using app ', argv.app);
console.log('opening ', argv.file);
view(argv.file, {app: argv.app})
.read()
.then(complete)
.catch(onError);

function complete({content, type}){
    console.log('type ', type)
    if(!/^image/.test(type)){
        console.log(content);
    }
}

function onError(err){
    console.error(err);
}
