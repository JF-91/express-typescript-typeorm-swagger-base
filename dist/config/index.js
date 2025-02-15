"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseConfig_1 = require("./BaseConfig");
class Config extends BaseConfig_1.BaseConfig {
    constructor() {
        super();
    }
    getDatabaseConfig() {
        return {
            host: this.getEnvVar('DB_HOST'),
            port: this.getEnvVarAsNumber('DB_PORT'),
            user: this.getEnvVar('DB_USER'),
            password: this.getEnvVar('DB_PASS'),
            database: this.getEnvVar('DB_DATABASE')
        };
    }
    getServerConfig() {
        return {
            port: this.getEnvVarAsNumber('PORT'),
            secretKey: this.getEnvVar('SECRET_KEY')
        };
    }
    getJwtConfig() {
        return {
            secretKey: this.getEnvVar('JWT_SECRET_KEY'),
            expiresIn: this.getEnvVar('JWT_EXPIRES_IN')
        };
    }
    getMailConfig() {
        return {
            host: this.getEnvVar('MAIL_HOST'),
            port: this.getEnvVarAsNumber('MAIL_PORT'),
            user: this.getEnvVar('MAIL_USER'),
            password: this.getEnvVar('MAIL_PASS')
        };
    }
    isDevelopment() {
        return super.isDevelopment();
    }
    isProduction() {
        return super.isProduction();
    }
}
exports.default = new Config();
