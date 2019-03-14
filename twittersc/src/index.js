var http = require('http');
var server = http.createServer(function (request, response){
    console.log("server launched");
    response.write('started');
    response.end();
});

server.listen(3000);