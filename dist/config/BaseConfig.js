"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
const dotenv_1 = require("dotenv");
const path_1 = require("path");
class BaseConfig {
    constructor() {
        // Carga variables de entorno
        (0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, '../../.env') });
        this.env = process.env.NODE_ENV || 'development';
        this.validateEnvVariables();
    }
    // Método para validar variables requeridas
    validateEnvVariables() {
        const requiredEnvVars = [
            'DB_HOST',
            'DB_PORT',
            'DB_USER',
            'DB_PASS',
            'PORT',
            'SECRET_KEY'
        ];
        const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
        if (missingEnvVars.length > 0) {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
        }
    }
    // Métodos protegidos para acceder a las variables de entorno
    getEnvVar(key) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return value;
    }
    getEnvVarAsNumber(key) {
        const value = this.getEnvVar(key);
        const numberValue = parseInt(value, 10);
        if (isNaN(numberValue)) {
            throw new Error(`Environment variable ${key} is not a valid number`);
        }
        return numberValue;
    }
    // Método para verificar si estamos en producción
    isProduction() {
        return this.env === 'production';
    }
    // Método para verificar si estamos en desarrollo
    isDevelopment() {
        return this.env === 'development';
    }
    // Método para verificar si estamos en testing
    isTest() {
        return this.env === 'test';
    }
}
exports.BaseConfig = BaseConfig;
