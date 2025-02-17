import { BaseConfig } from './BaseConfig';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

class Config extends BaseConfig {
    constructor() {
        super();
    }

    public getDatabaseConfig() {
        return {
            host: this.getEnvVar('DB_HOST'),
            port: this.getEnvVarAsNumber('DB_PORT'),
            user: this.getEnvVar('DB_USER'),
            password: this.getEnvVar('DB_PASS'),
            database: this.getEnvVar('DB_DATABASE')
        };
    }

    public getServerConfig() {
        return {
            port: this.getEnvVarAsNumber('PORT'),
            secretKey: this.getEnvVar('SECRET_KEY')
        };
    }

    public getJwtConfig() {
        return {
            secretKey: this.getEnvVar('JWT_SECRET_KEY'),
            expiresIn: this.getEnvVar('JWT_EXPIRES_IN')
        };
    }

    public getMailConfig() {
        return {
            host: this.getEnvVar('MAIL_HOST'),
            port: this.getEnvVarAsNumber('MAIL_PORT'),
            user: this.getEnvVar('MAIL_USER'),
            password: this.getEnvVar('MAIL_PASS')
        };
    }

    public isDevelopment(): boolean {
        return super.isDevelopment();
    }

    public isProduction(): boolean {
        return super.isProduction();
    }

    public getCorsOptions() {
        return cors({
            origin: this.isProduction() ? process.env.ORIGIN : '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        });
    }

    public getRateLimitConfig() {
        return rateLimit({
            windowMs: this.getEnvVarAsNumber('RATE_LIMIT_WINDOW_MS'),
            max: this.getEnvVarAsNumber('RATE_LIMIT_MAX'),
            message: this.getEnvVar('RATE_LIMIT_MESSAGE')
        });
    }
}

export default new Config();