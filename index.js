const http = require("http");
const { URL } = require("url");
const fs = require("fs");

let ad;

const server = http.createServer((req, res) => {
  ad = new URL(req.url);
  let path = ad.pathname;
  let file;
  if (path == "/") {
    file = "index.html";
  } else if (path == "/about") {
    file = "about.html";
  } else if (path == "/contact-me") {
    file = "contact-me.html";
  } else {
    file = "404.html";
  }
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
        console.error('File could not be found');
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end;
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end;
    }
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
