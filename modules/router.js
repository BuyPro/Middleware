var mwrouter = function (router, req, res, next) {
    var val = null;
    try {
        val = router.route(req.method, req.url, req, res);
    } catch (e) {
        if(e.message.indexOf("Router has no METHOD") > -1) {
            res.error(405, {code: 405, message: "Method " + req.method + " Supported for " + req.url});
        } else {
            throw e;
        }
    }

    return val;
}

module.exports = function(router){
    return mwrouter.bind(mwrouter, router);
}
