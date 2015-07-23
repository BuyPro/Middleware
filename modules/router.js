var mwrouter = function (router, req, res, next) {
    var val = null;
    try {
        val = router.route(req.method, req.url, req, res);
    } catch (e) {
        if(e.message.indexOf("Router has no METHOD") > -1) {
            res.error();
        } else {
            throw e;
        }
    }
}

module.exports = function(router){
    return mwrouter.bind(mwrouter, router);
}
