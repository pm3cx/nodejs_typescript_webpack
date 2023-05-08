import { IncomingMessage, ServerResponse } from "http";
import * as fs from 'fs';
import * as path from 'path';

export const indexMiddleware =  (request: IncomingMessage, response: ServerResponse) => {
    fs.promises.readFile(path.join(__dirname, 'public', 'index.html'), { encoding: 'utf-8'})
        .then(html => {
            response.setHeader("Content-Type", "text/html");
            response.writeHead(200);
            response.end(html);
        })
        .catch(err => {
            response.writeHead(500);
            response.end(err);
            return;
    });
};