var mwrouter = function (router, req, res, next) {
    return router.route(req.method, req.url, req, res);
}

module.exports = function(router){
    return mwrouter.bind(mwrouter, router);
}
