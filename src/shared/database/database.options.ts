import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, type DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as 'mysql' | 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/entity/*.entity{.js,.ts}'],
  migrations: ['dist/migration/*{.js,.ts}'],
  migrationsTableName: 'migration',
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(dataSourceOptions);
