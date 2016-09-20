
console.info('starting webserver');

var Express = require('express');

var webserver = new Express();

webserver.use('/', Express.static('built/client'));

var port = 5050;

webserver.listen(port, function() {
	console.info('Express server started at http://localhost:' + port);
});
