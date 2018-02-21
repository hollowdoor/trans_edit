const view = require('./lib/view');
const { readFile } = require('./lib/fs.js');
const getType = require('./lib/get_type');

class View {
    constructor(filename, {
        wait = true,
        app = null,
        open = true,
        uniq = false,
        value = null
    } = {}){
        this.filename = filename;
        this.wait = wait;
        this.app = app;
        this.open = open;
        this.uniq = uniq;
        this.value = value;
    }
    view(){
        return view(this.filename, this);
    }
    read(options = 'utf8'){
        return this.view()
        .then(pathname=>{
            return readFile(pathname, options)
            .then(content=>({
                content,
                pathname,
                get type(){
                    return getType(pathname);
                }
            }));
        });
    }
    stream(options){
        return this.view()
        .then(pathname=>{
            return createReadStream(pathname, options);
        });
    }
}

function viewFile(source, options){
    return new View(source, options);
}

module.exports = viewFile;
module.exports.view = viewFile;
module.exports.ViewFile = View;
