import {IncomingMessage, ServerResponse} from "http";
import * as url from 'url';
import * as fs from 'fs';
import { join } from "path";

const render = (path: string, response: ServerResponse) => {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
};

export const routes =  (request: IncomingMessage, response: ServerResponse) => {
    let current_url = request.url ?  url.parse(request.url).pathname : null;
    const file_path = __dirname + current_url;

    const tmp = file_path.lastIndexOf('.');
    const ext = file_path.substring(tmp + 1);

    if (ext === 'js') {
        response.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
    } else if (ext === 'css') {
        response.writeHead(200, {
            'Content-Type': 'text/css'
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
    }

    switch (current_url) {
        case '/':
            render(join(__dirname, 'public', 'index.html'), response);
            break;
        case '/assets/js/main.js':
            render(join(__dirname, 'public', 'assets', 'js', 'main.js'), response);
            break;
        case '/main.css':
            render(join(__dirname, 'public', 'main.css'), response);
            break;
        default:
            response.writeHead(404);
            response.write('Page not found!');
            response.end();
    }
}