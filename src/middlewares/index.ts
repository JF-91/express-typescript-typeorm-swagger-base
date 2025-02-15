import { Request, Response, NextFunction } from 'express';

// Middleware de autenticación
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Lógica de autenticación
    next();
};

// Middleware de manejo de errores
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
};

// Exportar todos los middlewares
export default {
    authenticate,
    errorHandler,
};