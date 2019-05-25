const http = require('http');
const fs = require('fs');
const child_process = require('child_process');

const hostname = "127.0.0.1";
const port = 3000;

function rescmd(res,cmd) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    g3dupd_cp = child_process.exec(cmd, []);
    g3dupd_cp.stdout.on('data', (chunk) => {
        res.write(chunk);
    });
    g3dupd_cp.stderr.on('data', (chunk) => {
        res.write(chunk);
    });
    g3dupd_cp.on("exit", () => {
        res.end();
    });
}

const pages = {
    "/": (res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(fs.readFileSync("index.html"));
    },
    "/g3dupd": (res) => {
        // G3D-fun UPDate
        rescmd(res,"git submodule update --remote");
    },
    "/build": (res) => {
        rescmd(res,"cmd /c build.bat");
    },
    "notfound": (res) => {
        res.statusCode = 404;
        res.end("404 Not Found");
    }
};

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url in pages) {
        pages[req.url](res);
    } else {
        pages["notfound"](res);
    }
    res.statusCode = 200;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});