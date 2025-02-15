import { config } from 'dotenv';
import { join } from 'path';


export type Environment = 'development' | 'production' | 'test';

export abstract class BaseConfig {
    protected env: Environment;
    private static instance: BaseConfig;

    constructor() {
        // Carga variables de entorno
        config({ path: join(__dirname, '../../.env') });
        this.env = (process.env.NODE_ENV as Environment) || 'development';
        this.validateEnvVariables();
    }

    // Método para validar variables requeridas
    private validateEnvVariables(): void {
        const requiredEnvVars = [
            'DB_HOST',
            'DB_PORT',
            'DB_USER',
            'DB_PASS',
            'PORT',
            'SECRET_KEY'
        ];

        const missingEnvVars = requiredEnvVars.filter(
            (envVar) => !process.env[envVar]
        );

        if (missingEnvVars.length > 0) {
            throw new Error(
                `Missing required environment variables: ${missingEnvVars.join(', ')}`
            );
        }
    }

    // Métodos protegidos para acceder a las variables de entorno
    protected getEnvVar(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }

    protected getEnvVarAsNumber(key: string): number {
        const value = this.getEnvVar(key);
        const numberValue = parseInt(value, 10);
        if (isNaN(numberValue)) {
            throw new Error(`Environment variable ${key} is not a valid number`);
        }
        return numberValue;
    }

    // Método para verificar si estamos en producción
    protected isProduction(): boolean {
        return this.env === 'production';
    }

    // Método para verificar si estamos en desarrollo
    protected isDevelopment(): boolean {
        return this.env === 'development';
    }

    // Método para verificar si estamos en testing
    protected isTest(): boolean {
        return this.env === 'test';
    }
}