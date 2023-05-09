import WebSocket from 'ws';

export class ClientModel {
    private readonly Clients: { [key: string] : {} };

    constructor() {
        this.Clients = {};
        this.saveClient = this.saveClient.bind(this)
    }

    saveClient(id: string, connection: WebSocket.WebSocket) {
        this.Clients[id] = connection;
        console.log(`${id} connected.`);
    }

    removeClient(id: string) {
        if (this.Clients[id]) {
            delete this.Clients[id];
            console.log(`${id} disconnected.`);
        }
    }
}