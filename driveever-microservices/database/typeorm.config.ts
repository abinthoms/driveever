// TypeORM Configuration for DriveEver Microservices
// Centralized database configuration for all services

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (serviceName: string): TypeOrmModuleOptions => {
  const configService = new ConfigService();
  
  return {
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('POSTGRES_USER', 'postgres'),
    password: configService.get('POSTGRES_PASSWORD', 'password'),
    database: configService.get(`DB_NAME_${serviceName.toUpperCase()}`, `driveever_${serviceName}`),
    entities: [__dirname + `/../${serviceName}/src/**/*.entity{.ts,.js}`],
    synchronize: configService.get('NODE_ENV') === 'development',
    logging: configService.get('NODE_ENV') === 'development',
    migrations: [__dirname + `/migrations/${serviceName}/*{.ts,.js}`],
    migrationsRun: true,
    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
  };
};

// Service-specific database configurations
export const promptServiceDbConfig = getDatabaseConfig('prompts');
export const aiServiceDbConfig = getDatabaseConfig('ai');
export const analyticsServiceDbConfig = getDatabaseConfig('analytics');
export const userServiceDbConfig = getDatabaseConfig('users');
export const vehicleServiceDbConfig = getDatabaseConfig('vehicles');
export const notificationServiceDbConfig = getDatabaseConfig('notifications');




