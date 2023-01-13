import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  logging: true,
};

console.log(typeORMConfig);