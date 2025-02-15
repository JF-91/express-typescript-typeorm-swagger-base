"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ConfugureRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/users', (req, res) => {
            res.json({ message: 'Hello World' });
        });
        this.router.post('/users');
    }
    getRoutes() {
        return this.router;
    }
}
exports.default = new ConfugureRoutes();
