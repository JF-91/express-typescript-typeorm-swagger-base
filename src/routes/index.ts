import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '@entities/User.entity';

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
        this.router.get('/users', async (req: Request, res: Response) => {
            const userRepository = getRepository(User);
            const users = await userRepository.find();
            res.json(users);
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
        this.router.post('/users', async (req: Request, res: Response) => {
            const userRepository = getRepository(User);
            const user = userRepository.create(req.body);
            await userRepository.save(user);
            res.status(201).json(user);
        });
    }

    public getRoutes() {
        return this.router;
    }
}

export default new ConfigureRoutes();