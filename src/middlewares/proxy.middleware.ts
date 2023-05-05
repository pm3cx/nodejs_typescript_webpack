import { IncomingMessage, ServerResponse } from "http";
import httpProxy from 'http-proxy';
const proxy = httpProxy.createProxyServer();
import { Clients } from "../models/client.model";

const proxyMiddleware = (request: IncomingMessage, response: ServerResponse) => {
    const currentServer = Math.floor(Math.random() * Object.keys(Clients).length);


    // proxy.web(request, response, {
    //    target: servers[currentServer].url
    // });
}
