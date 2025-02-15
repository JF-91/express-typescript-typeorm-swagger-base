import { Router, Request, Response } from 'express';

class ConfigureRoutes {
    private router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Obtiene una lista de usuarios
         *     responses:
         *       200:
         *         description: Lista de usuarios
         */
        this.router.get('/users', (req: Request, res: Response) => {
            res.json({ message: 'Hello World' });
        });

        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Crea un nuevo usuario
         *     responses:
         *       201:
         *         description: Usuario creado
         */
        this.router.post('/users', (req: Request, res: Response) => {
            res.status(201).json({ message: 'Usuario creado' });
        });
    }

    public getRoutes() {
        return this.router;
    }
}

export default new ConfigureRoutes();