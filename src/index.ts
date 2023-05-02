import os from 'os';
import { createServer, IncomingMessage, ServerResponse } from 'http';

let details = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version(),
    uptime: os.uptime(),
    userInfo: os.userInfo(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem()
};

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    switch (request.url) {
        case '/': {
            if (request.method === 'GET') {
              response.end(JSON.stringify(details));
            }
            break;
        }
        default: {
            response.statusCode = 404;
            response.end();
        }
    }
});


const host = 'localhost';
const port = 8000;

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});