// // http = require('http'),
// // httpProxy = require('http-proxy');

// // httpProxy.createServer({
// //   target:'http://localhost:9003'
// // }).listen(8003);

// // //
// // // Target Http Server
// // //
// // http.createServer(function (req, res) {
// //   res.writeHead(200, { 'Content-Type': 'text/plain' });
// //   res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
// //   res.end();
// // }).listen(9003);

// var http = require('http');
// var httpProxy = require('http-proxy');
// var proxy = httpProxy.createProxyServer({});

// // httpProxy.createServer(function (req, res, proxy) {

// //   res.oldWriteHead = res.writeHead;
// //   res.writeHead = function(statusCode, headers) {
// //     /* add logic to change headers here */
// //     var contentType = res.getHeader('content-type');
// //     res.setHeader('content-type', 'text/plain');

// //     // old way: might not work now
// //     // as headers param is not always provided
// //     // https://github.com/nodejitsu/node-http-proxy/pull/260/files
// //     // headers['foo'] = 'bar';       

// //     res.oldWriteHead(statusCode, headers);
// //   }

// //   proxy.proxyRequest(req, res, {
// //     host: 'localhost',
// //     port: 5000
// //   });
// // }).listen(8000);

// http.createServer(function(req, res) {
//     proxy.web(req, res, { target: 'http://localhost:9000' });
// }).listen(8000);

// http.createServer(function (req, res) {
//   res.oldWriteHead = res.writeHead;
//   res.writeHead = function(statusCode, headers) {
//     /* add logic to change headers here */
//     var contentType = res.getHeader('content-type');
//     res.setHeader('content-type', 'text/plain');
//     console.log(contentType, res);

//     // old way: might not work now
//     // as headers param is not always provided
//     // https://github.com/nodejitsu/node-http-proxy/pull/260/files
//     // headers['foo'] = 'bar';       

//     // res.oldWriteHead(statusCode, headers);
//   }

//   // res.writeHead(200, { 'Content-Type': 'text/plain' });
//   // res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(9000);

// var http = require("http");
 
// //Create the server listening on port 8888
// http.createServer(function(request, response) {
//     //Log the URL for debugging etc.
//     console.log(request.url);
 
//     //Create a new http request with the data at hand
//     var parsedURL = require("url").parse(request.url);
//     const a = {
//       port: request.port, 
//       host: request.headers["host"],
//       method: request.method,
//       headers: request.headers,
//       path: parsedURL.pathname + (parsedURL.search ? parsedURL.search : "")
//     };
//     console.log(a);
//     var proxyRequest = http.request(a)
 
//     //When there is a response;
//     proxyRequest.addListener("response", function (proxyResponse) {
//         proxyResponse.on("data", function(chunk) {
//             response.write(chunk, "binary");
//         });
 
//         //End the response
//         proxyResponse.on("end", function() {
//             response.end();
//         });
 
//         //Manipulate some headers - Here we repeat the original requests origin to the fake response
//         if(request.headers["origin"]) {
//             proxyResponse.headers["access-control-allow-origin"] = request.headers["origin"];
//             //Set any other headers you need
//             //proxyResponse.headers["access-control-allow-credentials"] = "true";
//         }
//         response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
//     });
 
//     //return a 404 when the forwarded request throws an error
//     proxyRequest.on("error", function(err) {
//         response.statusCode = "404";
//         response.end();
//     });
 
//     //Copy any data in the original request to the forwarded request
//     request.addListener("data", function(chunk) {
//         proxyRequest.write(chunk, "binary");
//     });
 
//     //End the proxy request
//     request.addListener("end", function() {
//         proxyRequest.end();
//     });
// }).listen(8888);


// var http = require('http');

// http.createServer(function(request, response) {
//   var proxy = http.createClient(80, request.headers['host'])
//   var proxy_request = proxy.request(request.method, request.url, request.headers);
//   proxy_request.addListener('response', function (proxy_response) {
//     proxy_response.addListener('data', function(chunk) {
//       response.write(chunk, 'binary');
//     });
//     proxy_response.addListener('end', function() {
//       response.end();
//     });
//     response.writeHead(proxy_response.statusCode, proxy_response.headers);
//   });
//   request.addListener('data', function(chunk) {
//     proxy_request.write(chunk, 'binary');
//   });
//   request.addListener('end', function() {
//     proxy_request.end();
//   });
// }).listen(8080);


// var http = require('http'),
//     net = require('net'),
//     httpProxy = require('http-proxy'),
//     url = require('url'),
//     util = require('util');

// var proxy = httpProxy.createServer();

// var server = http.createServer(function (req, res) {
//   util.puts('Receiving reverse proxy request for:' + req.url);

//   proxy.web(req, res, {target: req.url, secure: false});
// }).listen(8213);

// server.on('connect', function (req, socket) {
//   util.puts('Receiving reverse proxy request for:' + req.url);

//   var serverUrl = url.parse('https://' + req.url);

//   var srvSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
//     socket.write('HTTP/1.1 200 Connection Established\r\n' +
//     'Proxy-agent: Node-Proxy\r\n' +
//     '\r\n');
//     srvSocket.pipe(socket);
//     socket.pipe(srvSocket);
//   });
// });

// const scrape = require('website-scraper');

// let options = {
//     urls: ['https://google.com/'],
//     directory: './node-homepage',
// };

// scrape(options).then((result) => {
//     console.log("Website succesfully downloaded");
// }).catch((err) => {
//     console.log("An error ocurred", err);
// });

var http = require('http'),
    net = require('net'),
    httpProxy = require('http-proxy'),
    url = require('url'),
    util = require('util');

var proxy = httpProxy.createServer();

var server = http.createServer(function (req, res, err) {
    console.log(err);
    res.setHeader('X-Frame-Options', 'Deny');

  console.log('Receiving reverse proxy request for:' + req.url);

  // res.oldWriteHead = res.writeHead;
  // res.writeHead = function(statusCode, headers) {
  //   /* add logic to change headers here */
  //   var contentType = res.getHeader('content-type');
  //   res.setHeader('content-type', 'text/plain');
  //   console.log(contentType, res);

  //   // old way: might not work now
  //   // as headers param is not always provided
  //   // https://github.com/nodejitsu/node-http-proxy/pull/260/files
  //   // headers['foo'] = 'bar';       

  //   // res.oldWriteHead(statusCode, headers);
  // }

  // // res.writeHead(200, { 'Content-Type': 'text/plain' });

  proxy.web(req, res, {target: req.url, secure: false});
  proxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('proxyReq');
    proxyReq.setHeader('X-Frame-Options', 'Deny');
  });
  proxy.on('proxyRes', function (proxyRes, req, res) {
    proxyRes.setHeader('X-Frame-Options', 'Deny');
  
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
  });
  
}).listen(8213);

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

proxy.on('proxyRes', function (proxyRes, req, res) {
  proxyRes.setHeader('X-Frame-Options', 'Deny');

  console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});


server.on('connect', function (req, socket) {
  console.log('Receiving reverse proxy request for:' + req.url);

  var serverUrl = url.parse('https://' + req.url);

  var srvSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
    'Proxy-agent: Node-Proxy\r\n' +
    '\r\n');
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
});

