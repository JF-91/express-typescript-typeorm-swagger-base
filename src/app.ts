import 'reflect-metadata';
import express, { Application } from 'express';
import config from './config/Config';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { json } from 'body-parser';
import { useContainer as useRoutingContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import { errorHandler } from './modules/shared/middlewares/errorHandler';
import SwaggerService from './services/Swagger';
import configureRoutes from './routes/configureRoutes';

// Configurar typedi como el contenedor de inyección de dependencias para routing-controllers
useRoutingContainer(Container);

class App {
    private app: Application;
    private config = config;

    constructor() {
        this.app = express();
        this.initialize();
    }

    private initialize(): void {
        this.app.use(json());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(this.config.getCorsOptions());
        this.app.use(this.config.getRateLimitConfig());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));

        // Configuración de rutas con prefijo global
        const routingControllersOptions = {
            routePrefix: '/api',  // Añadir prefijo global
            controllers: [__dirname + '/modules/*/controllers/*{.ts,.js}'],
            defaultErrorHandler: false
        };

        useExpressServer(this.app, routingControllersOptions);
        
        // Configuración de Swagger
        SwaggerService.setup(this.app);

        // Configuración de rutas
        configureRoutes(this.app);
    }

    public async start(): Promise<void> {
        try {
            this.middlewares();
            this.errorHandler();

            const { port } = this.config.getServerConfig();
            
            this.app.listen(port, () => {
                console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
                console.log('📚 Ambiente:', this.config.isDevelopment() ? 'development' : 'production');
                console.log(`📄 Documentación de la API disponible en http://localhost:${port}/api-docs`);
            });
        } catch (error) {
            console.error('❌ Error al iniciar el servidor:', error);
            process.exit(1);
        }
    }

    private middlewares(): void {
        this.app.use(json());
    }

    private errorHandler(): void {
        this.app.use(errorHandler);
    }
}

const app = new App();
app.start();