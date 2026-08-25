module.exports = function header(req, res, next) {
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            res.set('X-Test-Header', 'ok');
        }
        return originalJson(body);
    };
    next();
};