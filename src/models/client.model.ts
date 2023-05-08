export const Clients: { [key: string] : {} } = {};
export const Servers = [
    { url: 'http://localhost:4001' },
    { url: 'http://localhost:4002' },
    { url: 'http://localhost:4003' },
    { url: 'http://localhost:4004' },
    { url: 'http://localhost:4005' },

];

export class ClientModel {
    private readonly _id: string;
    private readonly _ip: string|undefined;

    constructor(id: string, ip: string|undefined) {
        this._id = id;
        this._ip = ip;
    }

    get id() {
        return this._id;
    }

    get ip() {
        return this._ip;
    }
}