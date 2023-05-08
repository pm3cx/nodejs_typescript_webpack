import { ClientModel, Clients } from "./models/client.model";
import { Server } from "./server/server";
import crypto from "crypto";
import {indexMiddleware} from "./middlewares/index.middleware";

const server = new Server(); // initial server
const port = 8000; // port

const handleDisconnect = (userId: string) => {
    if (Clients[userId]) {
        delete Clients[userId];
        console.log(`${userId} disconnected.`);
    }
}

// WebSocket Connection
server.ws.on('connection', (connection, r) => {
    const uuid = crypto.randomUUID();
    const client = new ClientModel(uuid, r.socket.remoteAddress);
    Clients[client.id] = connection;
    console.log(`${uuid} connected.`);
    connection.on('close', () => handleDisconnect(uuid));
});

// Routes
server.http.addListener('request', indexMiddleware);

// Server
server.http.listen(port, () => {
    console.log(`WebSocket server listening on port ${port}`);
});






// import { createServer, IncomingMessage, ServerResponse } from 'http';
// import net from 'net';
// import httpProxy from 'http-proxy';
//
// let details = {
//     name: os.type(),
//     architecture: os.arch(),
//     platform: os.platform(),
//     release: os.release(),
//     version: os.version(),
//     uptime: os.uptime(),
//     userInfo: os.userInfo(),
//     totalMemory: os.totalmem(),
//     freeMemory: os.freemem()
// };
//
// const servers = [
//     { url: 'http://localhost:4000' },
//     { url: 'http://localhost:4201' },
//     { url: 'http://localhost:4200' }
// ]
// const proxy = httpProxy.createProxyServer();
//

