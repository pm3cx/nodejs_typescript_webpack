import { ClientModel } from "./models/client.model";
import { Server } from "./server/server";
import crypto from "crypto";
import { routes } from "./routes/routes";

const server = new Server(); // initial server
const client = new ClientModel(); // initial client
const port = 8000; // port

// WebSocket Connection
server.ws.on('connection', (connection, r) => {
    const uuid = crypto.randomUUID();
    client.saveClient(uuid, connection)
    connection.on('close', () => client.removeClient(uuid));
});

// Routes
server.http.addListener('request', routes);

// Server
server.http.listen(port, () => {
    console.log(`WebSocket server listening on port ${port}`);
});
