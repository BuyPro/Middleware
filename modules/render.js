var path = require("path"),
    fs = require("fs"),
    sideburns = require("bp-sideburns"),
    q = require("q"),
    render = function(basepath, filepath, data, options){
        if(typeof options === "undefined"){
            options = {};
        }
        var res = this,
            extension = options.extension || ".sb",
            def = q.defer(),
            file = fs.readFile(path.join(basepath, filepath) + extension, function(e, f){
                if(e) {
                    def.reject(e);
                } else {
                    res.send(200, sideburns(f.toString(), data, options), {'Content-Type': 'text/html'});
                    def.resolve(true);
                }
            });
        return def.promise;
    }

module.exports = function(basepath) {
    return function(req, res){
        res.render = render.bind(res, basepath);
    }
}
