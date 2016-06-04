var http = require('http');
  
http.Server(function(req, res) {
    setTimeout(function() {
        res.writeHead(200);
        res.end("hello world\n");
    }, 1000);
}).listen(8080);