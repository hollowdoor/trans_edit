const view = require('./lib/view');
const { readFile, unlink } = require('./lib/fs.js');
const readResult = require('./lib/read_result');

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
        this._cleaned = false;
    }
    view(){
        return view(this.filename, this)
        .then(pathname=>{
            this.pathname = pathname;
            return pathname;
        });
    }
    clean(){
        return this._cleaned
        ? Promise.resolve(true)
        :(!this._cleaned && this.pathname)
        ? unlink(this.pathname)
        .then(v=>(this._cleaned = true))
        : Promise.resolve(false);
    }
    read(options = 'utf8'){
        return this.view()
        .then(pathname=>{
            return readFile(pathname, options)
            .then(content=>{
                return readResult({
                    pathname,
                    content
                });
            });
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
