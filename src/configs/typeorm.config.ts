import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

/* eslint-disable unicorn/numeric-separators-style */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 55004,
  username: 'postgres',
  password: 'postgrespw',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
