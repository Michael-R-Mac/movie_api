const url = require('url');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const q = url.parse(request.url, true);
  const file = `.${q.pathname}`;
  if (file === './documentation') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('documentation.html', null, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.write('Whoops! File not found!');
      } else {
        response.write(data);
      }
      response.end();
    });
  } else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', null, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.write('Whoops! File not found!');
      } else {
        response.write(data);
      }
      response.end();
    });
  }
  const time = `TimeStamp: ${new Date().toLocaleDateString('en-us', {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'CET', timeZoneName: 'short',
  })}`;
  fs.writeFile('log.txt', `${time} URl: ${file}`, (err) => {
    if (err) {
      throw err;
    }
  });
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
