import { DataSource } from 'typeorm';
import config from '@config/Config';

const dataSource = new DataSource(config.getTypeOrmConfig());

export default dataSource;