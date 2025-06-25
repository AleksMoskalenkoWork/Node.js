const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3100;

const server = http.createServer((req, res) => {
  const logFileName = 'log.data';
  const currentRequestTime = new Date().toLocaleTimeString();
  const logTemplate = `${currentRequestTime} ${req.method} ${req.url}\r\n`;

  fs.writeFile(
    logFileName,
    logTemplate,
    {
      encoding: 'utf-8',
      flag: 'a+',
    },
    (error) => {
      if (error) throw new Error('Sorry! Something went wrong.');
    }
  );

  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Home Page');
  } else if (req.method === 'GET' && req.url === '/about') {
    res.setHeader('Content-Type', 'text/plain');
    res.end('About  Page');
  } else if (req.method === 'POST' && req.url === '/echo') {
    res.end(Date.now().toString());
  } else if (req.method === 'GET' && req.url === '/htmlfile') {
    const folderPath = path.resolve(__dirname, 'public');
    const fileName = 'file.html';

    fs.readFile(path.join(folderPath, fileName), 'utf8', (error, data) => {
      res.setHeader('Content-Type', 'text/html; charset=utf8');
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/image') {
    const folderPath = path.resolve(__dirname, 'public');
    const fileName = 'image.png';

    fs.readFile(path.join(folderPath, fileName), (error, data) => {
      res.setHeader('Content-Type', 'image/png');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(
    `Server listen port: ${port}, and run on http://localhost:${port}`
  );
});
