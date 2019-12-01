// renderer.js

const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// import main App component
const App = require("../client/src/App");

module.exports = (req, res, next) => {
  // point build index.html
  const filePath = path.resolve("client", "./build", "index.html");

// read in html file
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      return res.send(err).end();
    }
    // render the app as a string
    const html = ReactDOMServer.renderToString(<App />);

// inject the rendered app into our html and send it
    return res.send(
      // replace default html with rendered html
      htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
};