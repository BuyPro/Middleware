var path = require("path"),
    fs = require("fs"),
    sideburns = require("bp-sideburns"),
    render = function(basepath, filepath, data, options){
        var file = fs.readFileSync(path.join(basepath, filepath));
        this.send(sideburns.render(file, data, options), {'Content-Type': 'text/html'});
    }

module.exports = function(basepath) {
    return function(req, res){
        res.render = render.bind(res, basepath);
    }
}
