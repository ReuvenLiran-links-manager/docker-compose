const express = require('express')
const app = express()
var xFrameOptions = require('x-frame-options')

app.use(xFrameOptions());

var http = require('http'),
    net = require('net'),
    httpProxy = require('http-proxy'),
    url = require('url'),
    util = require('util');

var proxy = httpProxy.createServer();
app.use('/', (req) => proxy({
  onProxyReq: (proxyReq, req, res) => {
    console.log('onProxyReq');
    // add custom header to request
    proxyReq.setHeader('x-added', 'foobar')
    // or log the req
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('onProxyRes');
    proxyRes.headers['x-added'] = 'foobar' // add new header to response
    delete proxyRes.headers['x-removed'] // remove header from response
  },
  onProxyReqWs: (proxyReq, req, socket, options, head) => {
    console.log('onProxyReqWs');
    // add custom header
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar')
  },
  onOpen: (proxySocket) => {
    console.log('onOpen');
    // listen for messages coming FROM the target here
    proxySocket.on('data', hybiParseAndLogMessage)
  },
  onClose: (res, socket, head) => {
    console.log('onClose');
    // listen for messages coming FROM the target here
    console.log('Client disconnected')
  },
  target: req.url, 
  changeOrigin: true 
}))
const server = app.listen(8213)

// var server = http.createServer(function (req, res, err) {
//     console.log(err);
//     res.setHeader('X-Frame-Options', 'Deny');

//   console.log('Receiving reverse proxy request for:' + req.url);

//   // res.oldWriteHead = res.writeHead;
//   // res.writeHead = function(statusCode, headers) {
//   //   /* add logic to change headers here */
//   //   var contentType = res.getHeader('content-type');
//   //   res.setHeader('content-type', 'text/plain');
//   //   console.log(contentType, res);

//   //   // old way: might not work now
//   //   // as headers param is not always provided
//   //   // https://github.com/nodejitsu/node-http-proxy/pull/260/files
//   //   // headers['foo'] = 'bar';       

//   //   // res.oldWriteHead(statusCode, headers);
//   // }

//   // // res.writeHead(200, { 'Content-Type': 'text/plain' });

//   proxy.web(req, res, {target: req.url, secure: false}, (...a) => {
//     console.log(a);
//   } );
// }).listen(8213);

proxy.on('error', function (err, req, res) {
  console.log(err)
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end("Oops");
});

// proxy.on('proxyRes', function(proxyRes, req, res) {
//   console.log('ProxyRes');
//   res.setHeader('X-Frame-Options', 'Deny');
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
// });
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  console.log('proxyReq');
  proxyReq.setHeader('X-Frame-Options', 'Deny');

  // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});
proxy.on('proxyRes', function (proxyRes, req, res) {
  proxyRes.setHeader('X-Frame-Options', 'Deny');

  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});


server.on('connect', function (req, socket) {
  console.log('Receiving reverse proxy request for:' + req.url);
  // console.log(socket);
  var serverUrl = url.parse('https://' + req.url);

  var srvSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
    'Proxy-agent: Node-Proxy\r\n' +
    '\r\n');
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
});

