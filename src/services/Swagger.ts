import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { join } from 'path';

interface SwaggerSpec {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    servers: Array<{
        url: string;
        description: string;
    }>;
    paths: Record<string, any>;
    components?: {
        securitySchemes?: Record<string, any>;
        schemas?: Record<string, any>;
    };
}

class SwaggerService {
    private static options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Express TypeScript API',
                version: '1.0.0',
                description: 'API documentation for Express TypeScript application'
            },
            servers: [
                {
                    url: '/api',
                    description: 'Local server'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
            security: [{
                bearerAuth: []
            }]
        },
        apis: [
            join(__dirname, '../modules/**/controllers/*Controller.ts'),
            join(__dirname, '../modules/**/schemas/*.schema.ts'),
            join(__dirname, '../modules/**/*.schema.ts')
        ],
        explorer: true
    };

    public static setup(app: any) {
        try {
            console.log('📚 Configurando Swagger...');
            console.log('🔍 Buscando archivos en:', this.options.apis);
            
            const specs = swaggerJSDoc(this.options) as SwaggerSpec;
            
            if (!specs.paths || Object.keys(specs.paths).length === 0) {
                console.warn('⚠️ No se encontraron rutas en la documentación Swagger');
            } else {
                console.log('✅ Rutas encontradas:', Object.keys(specs.paths).length);
            }

            app.use('/api-docs', 
                swaggerUi.serve, 
                swaggerUi.setup(specs, {
                    explorer: true,
                    swaggerOptions: {
                        persistAuthorization: true,
                        docExpansion: 'list',
                        filter: true,
                        showRequestDuration: true,
                    }
                })
            );

            console.log('📖 Documentación Swagger disponible en /api-docs');
        } catch (error) {
            console.error('❌ Error al configurar Swagger:', error);
        }
    }
}

export default SwaggerService;