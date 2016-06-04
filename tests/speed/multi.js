var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < 3; i++) {
    cluster.fork();
  }

  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  // Worker processes have a http server.
  http.Server(function(req, res) {
    setTimeout(function() {
        res.writeHead(200);
        res.end("hello world\n");
    }, 1000);
  }).listen(8080);
}