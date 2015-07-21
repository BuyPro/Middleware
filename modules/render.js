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
                    if(e.message.indexOf("ENOENT") > -1) {
                        def.resolve(false); // ENOENT represents no file found;
                    } else {
                        def.reject(e);
                    }
                } else {
                    res.send(200, sideburns(f.toString(), data, options), {'Content-Type': 'text/html'});
                    def.resolve(true);
                }
            });
        return def.promise;
    }

module.exports = function(basepath) {
    return function(req, res){
        res.render = function(filepath, data, options) {
            var def = q.defer();
            //Intercept render promise and send an error if rendering failed,
            //Either way provide a better formed promise result
            render.call(res, basepath, filepath, data, options).then(function(d) {
                if(d) {
                    def.resolve([req, res]);
                } else {
                    res.error(500, {code: 500, message: "Badly configured template request", details: {req: req, res: res}});
                    def.resolve([res, res]);
                }
            });
            return def.promise;
        };
    }
}
