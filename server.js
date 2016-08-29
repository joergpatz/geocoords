require("babel-register");
require("babel-polyfill");

var restify = require('restify');
var server = restify.createServer({name: 'geocoords'});

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.throttle({burst: 20, rate: 10, ip: true}));
server.pre(restify.pre.sanitizePath());

var port = normalizePort(process.env.NODE_PORT) || 3000;

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var routes = require('./routes')['default'](server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
