import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import config from './src/config/Config';

loadEnv();

const dataSource = new DataSource(config.getTypeOrmConfig());

export default dataSource;