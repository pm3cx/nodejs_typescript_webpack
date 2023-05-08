import http from "http";
import { WebSocketServer } from "ws";

export class Server {
    private readonly server;
    private readonly wsServer;

    constructor() {

        this.server = http.createServer();
        this.wsServer = new WebSocketServer({ server: this.server })
    }

    get ws() {
        return this.wsServer;
    }

    get http() {
        return this.server;
    }
}