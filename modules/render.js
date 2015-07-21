var path = require("path"),
    fs = require("fs"),
    sideburns = require("bp-sideburns"),
    q = require("q"),
    render = function(basepath, filepath, data, options){
        var extension = options.extension || ".sb",
            def = q.defer(),
            file = fs.readFile(path.join(basepath, filepath), function(e, f){
                if(e) {
                    def.reject(e);
                } else {
                    this.send(200, sideburns(f, data, options, {'Content-Type': 'text/html'})).then(function(d){
                        def.resolve(true);
                    })
                }
            });
        return def.promise;
    }

module.exports = function(basepath) {
    return function(req, res){
        res.render = render.bind(res, basepath);
    }
}
