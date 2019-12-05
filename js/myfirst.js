var http = require("http");
var url = require("url");
var adr = window.location.href;
var q = url.parse(adr, true);

console.log(adr);

var qdata = q.query;
console.log(qdata.code);

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(req.url);
	res.end("Hello worlds!");
}).listen(8080);