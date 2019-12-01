var http = require('http'),
    httpProxy = require('http-proxy');
const net = require('net'),
url = require('url'),
util = require('util');
const request = require('request');
//
// Create a proxy server with custom application logic
//

// var proxy = httpProxy.createProxyServer({});
const proxy = httpProxy.createServer();
let base;
 
function createServer(req, res) {
  util.puts('1Receiving reverse proxy request for:' + req.url);
  proxy.web(req, res, { target: req.url });
};


const server = http.createServer(createServer)
.listen(8213);

server.on('data', (d) => {
  utils.puts(d);
});

console.log("listening on port 8213")
 
server.on('connect', function (req, socket) {
  console.log('Receiving reverse proxy request for:' + req.url);
  
  var serverUrl = url.parse('https://' + req.url);
  if (base !== ('https://' + serverUrl.hostname)) {
    base = 'https://' + serverUrl.hostname;
    console.log({ base });
    const encodedUrl = encodeURIComponent(base);
    request(`http://localhost:9000/updateBase/${encodedUrl}`);    
  }
  
  // let reqBuffer = new Buffer('');
  
  // console.log(socket);
  var srvSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
    'Proxy-agent: Node-Proxy\r\n' +
    'X-Special-Proxy-Header: foobar\r\n' +
    // 'x-frame-options: Deny\r\n' +
    '\r\n');
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
});