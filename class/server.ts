import express from 'express';

export default class Server {

    public app: express.Application;
    public port: number = 30001;

    constructor() {
        this.app = express();
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }

}