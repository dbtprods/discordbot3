const http = require("http");
http.createServer((_, res) => res.end("Alive")).listen(8080)