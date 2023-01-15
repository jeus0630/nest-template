import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { envConfig } from './config/env.config';
import { HealthCheckController } from './health-check/health-check.controller';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';
import { TypeOrmConfig } from './config/tyeporm.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    TerminusModule,
    HttpModule,
    UserModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService, { provide: APP_GUARD, useClass: RateLimiterGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
