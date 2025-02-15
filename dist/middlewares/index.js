"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.authenticate = void 0;
// Middleware de autenticación
const authenticate = (req, res, next) => {
    // Lógica de autenticación
    next();
};
exports.authenticate = authenticate;
// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message });
};
exports.errorHandler = errorHandler;
// Exportar todos los middlewares
exports.default = {
    authenticate: exports.authenticate,
    errorHandler: exports.errorHandler,
};
