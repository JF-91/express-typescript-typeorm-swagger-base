import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';

class SwaggerConfig {
    public static getSwaggerOptions(): Options {
        return {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                    description: 'Documentación de la API'
                },
                servers: [
                    {
                        url: 'http://localhost:3000/api',
                        description: 'Servidor de desarrollo'
                    }
                ]
            },
            apis: ['./src/routes/*.ts'] // Asegúrate de que esta ruta sea correcta
        };
    }

    public static getSwaggerDocs(options: Options) {
        return swaggerJsdoc(options);
    }

    public static getSwaggerUi() {
        return swaggerUi.serve;
    }

    public static getSwaggerUiSetup(docs: object) {
        return swaggerUi.setup(docs);
    }
}

export default SwaggerConfig;