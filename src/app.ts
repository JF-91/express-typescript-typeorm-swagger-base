import Config from './config/Config'
import express, { Application } from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import ConfigureRoutes from './routes';
import { errorHandler } from './middlewares';
import compression from 'compression';
import morgan from "morgan";
import SwaggerConfig from './services/Swagger';

class App {
    private app: Application;
    private config: typeof Config;

    constructor() { 
        this.app = express();
        this.config = Config;
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

        // Configuración de Swagger
        const swaggerOptions = SwaggerConfig.getSwaggerOptions();
        const swaggerDocs = SwaggerConfig.getSwaggerDocs(swaggerOptions);
        this.app.use('/api-docs', SwaggerConfig.getSwaggerUi(), SwaggerConfig.getSwaggerUiSetup(swaggerDocs));
    }

    public async start(): Promise<void> {
        try {
            this.middlewares();
            this.routes();
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

    private routes(): void {
        const apiRoutes = ConfigureRoutes.getRoutes();
        this.app.use('/api', apiRoutes);
    }

    private errorHandler(): void {
        this.app.use(errorHandler);
    }
}

const app = new App();
app.start();