var path = require("path"),
    fs = require("fs"),
    sideburns = require("bp-sideburns"),
    render = function(basepath, filepath, data){
        var file = fs.readFileSync(path.join(basepath, filepath));
        this.send(sideburns.render(file, data));
    }

module.exports = function(basepath) {
    return function(req, res){
        res.render = render.bind(res, basepath);
    }
}
