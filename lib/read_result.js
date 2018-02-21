const getType = require('./get_type');

module.exports = function({
    pathname,
    content
} = {}){
    let type = null;
    const typeObj = ()=>(type
        ? type
        : getType(pathname)
    );

    return {
        pathname,
        content,
        get type(){
            return typeObj().mime;
        },
        get ext(){
            return typeObj().ext;
        }
    };
}
