"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const routes_1 = __importDefault(require("./routes"));
const middlewares_1 = require("./middlewares");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config = config_1.default;
        this.initialize();
    }
    initialize() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, cors_1.default)({ origin: '*' }));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.middlewares();
                this.routes();
                this.errorHandler();
                const { port } = this.config.getServerConfig();
                this.app.listen(port, () => {
                    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
                    console.log('📚 Ambiente:', this.config.isDevelopment() ? 'development' : 'production');
                });
            }
            catch (error) {
                console.error('❌ Error al iniciar el servidor:', error);
                process.exit(1);
            }
        });
    }
    middlewares() {
        this.app.use((0, body_parser_1.json)());
    }
    routes() {
        const apiRoutes = routes_1.default.getRoutes();
        this.app.use('/api', apiRoutes);
    }
    errorHandler() {
        this.app.use(middlewares_1.errorHandler);
    }
}
const app = new App();
app.start();
