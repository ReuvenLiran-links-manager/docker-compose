const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')
const port = 3000
const path = require('path');
const request = require('request');
const url = require('url');
const LinksDB = require('./Database');
const crypto = require('crypto');

const {
  MONGO: MONGO_ENV,
} = process.env;

const MONGO = MONGO_ENV ||
'mongodb://linksrw:' + 
'qMKv9wQxy8PrDp1l' + 
'@cluster0-shard-00-00-5asla.mongodb.net:27017' +
',cluster0-shard-00-01-5asla.mongodb.net:27017' +
',cluster0-shard-00-02-5asla.mongodb.net:27017' + 
'/test?ssl=true&replicaSet=Cluster0-shard-0' + 
'&authSource=admin&retryWrites=true';

const db = LinksDB.getInstnace(MONGO);

const r = request.defaults({ 
  proxy:'http://localhost:8213',
  gzip: true
 })
var xFrameOptions = require('x-frame-options')

app.use(xFrameOptions());


// const renderer = require("./renderer");

const HEADERS = {
  // 'content-encoding': 'br',
  'Content-Type': 'text/html; charset=UTF-8',
  'x-frame-options': 'allow-from http://localhost:3000',
};

app.use(express.static(path.join(__dirname, "build")));
// app.use('/public', express.static(path.join(__dirname, "public")))

let siteBase;


const getDescription = async (url) => {
  const promise = await new Promise((resolve) => {

    let title = 'some title';
    const re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
    request
    .get(url)
    .on('response', function (response) {
      response.on('data', function (chunk) {
        const str=chunk.toString();
        const match = re.exec(str);
          if (match && match[2]) {
            title = match[2];
            // console.log(title);
            resolve(title);
          }
      });    
    });
  });
  return promise;
}

app.get('/links', async (req, res, next) => {
  try {
    const myLinks = await db.getLinks();
    res.json(myLinks);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});

app.get('/updateBase/:base/:title', (req, res) => {
  console.log(req.params);
  siteBase = decodeURIComponent(req.params.base);
  // console.log(siteBase);
});
// 2LpgzU85vm969ReP
app.get('/*', async (req, res) => {
  if (req.url.includes('proxy')) {
    const url = decodeURIComponent(req.url.split('/proxy/')[1]);
    const description = await getDescription(url);
    console.log({
      url,
      description,
    });
    db.insertLink({
      link: url,
      description,
    });
    r.get(url).pipe(res);
  } else if (req.url.includes('updateBase')) {
    const {
      '0': param,
    } = req.params;
    const base = param.split('updateBase/')[1];
    siteBase = decodeURIComponent(base);
    console.log({siteBase});  
  } else if (!req.url.includes('app')) {
    let newUrl = req.url;
    const regex = new RegExp("^(http[s]?:)");
    if (!newUrl.match(regex)) {
      newUrl = `${siteBase}${req.url}`;
    } 
    // console.log('OTHER', newUrl);

    r.get(newUrl).pipe(res);
    // const {
    //   socket,
    // } = res;
    // let buf1 = socket.read();
    // // console.log(res);
    // socket.once('readable', () => {
    //   let buf;
    //   while(true) {
    //       buf = socket.read();
    //       if (buf === null) break;
    //       const str = buf.toString('utf8') || '';
    //       console.log(str.toLowerCase().includes('foobar'));
    //    } 
    // })
    // res.writeHead(200, HEADERS);
  }
  // res.set('content-type') 
});

app.get('/app', (req, res) => {
  // res.sendFile('index.html');
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.get('/proxy/:url', function (req, res) {
  console.log('proxy', req.params.url)
  // res.writeHead('X-Frame-Options', 'Deny');
  // req['x-frame-options'] = 'Deny';
  r.get(req.params.url).pipe(res);
  // console.log(res);

  // res.writeHead('X-Frame-Options', 'Deny');

  // req['x-frame-options'] = 'Deny';
  // res.writeHead(200, HEADERS);
  // r.get('https://google.com').pipe(res)
  // r.get(req.params.url); //.pipe(res)
  // res.write('SSS')
  // res.end();
  // // res.json(["Tonysss","Lisa","Michael","Ginger","Food"]);
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use("^/$", renderer);
const server = app.listen(9000, function (req, res) {
  var host = server.address().address
  var port = server.address().port
  
  // res.setHeader('X-Frame-Options', 'Deny');
  // req['x-frame-options'] = 'Deny';

  console.log("Example app listening at http://%s:%s", host, port)
});

// server.on('connect', function (req, socket) {
//   console.log('CONNECT');
//   console.log(socket);
//   console.log(req);
//   socket.on('readable', function() {
//     let buf;
//     console.log('socket');

//     let reqHeader;

//     while(true) {
//       buf = socket.read();
//       if (buf === null) break;
//       const str = buf.toString('utf8') || '';
//       console.log(str.toLowerCase().includes('frame'));
//     }  
//   });
// });
// // const httpsOptions = {
// //   key: fs.readFileSync('./key.pem'),
// //   cert: fs.readFileSync('./cert.pem')
// // }
// // const server = https.createServer(httpsOptions, app).listen(port, () => {
// //   console.log('server running at ' + port)
// // })

 
// // const scrape = require('website-scraper');

// // let options = {
// //     urls: ['https://google.com/'],
// //     directory: './public',
// // };

// // scrape(options).then((result) => {
// //     console.log("Website succesfully downloaded");
// // }).catch((err) => {
// //     console.log("An error ocurred", err);
// // });


http.createServer(function(req, res) {
  res.writeHead(200, HEADERS);

  console.log('===================================');
  console.log(req);
  console.log('===================================');
  r.get('https://www.google.com').pipe(res);
  
  // res.write('8001\n');
  // res.write(JSON.stringify(req.headers, true, 2));
  // res.end();
}).listen(8001);


/*
http://localhost:9000/search?ie=ISO-8859-1&hl=iw&source=hp&biw=&bih=&q=justin+bieber&gbv=2&oq=justi&gs_l=heirloom-hp.3.0.0l10.21348.28760.0.31164.6.5.0.1.1.0.189.727.0j5.5.0....0...1ac.1.34.heirloom-hp..0.6.735.HxRR_XaWzJ0

https://www.google.com/search?ie=ISO-8859-1&hl=iw&source=hp&biw=&bih=&q=justin+bieber&gbv=2&oq=justi&gs_l=heirloom-hp.3.0.0l10.21348.28760.0.31164.6.5.0.1.1.0.189.727.0j5.5.0....0...1ac.1.34.heirloom-hp..0.6.735.HxRR_XaWzJ0

http://localhost:9000/https://www.google.com/search?ie=ISO-8859-1&hl=iw&source=hp&biw=&bih=&q=justin+bieber&gbv=2&oq=justi&gs_l=heirloom-hp.3.0.0l10.21348.28760.0.31164.6.5.0.1.1.0.189.727.0j5.5.0....0...1ac.1.34.heirloom-hp..0.6.735.HxRR_XaWzJ0
*/