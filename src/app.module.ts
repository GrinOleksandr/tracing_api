import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { ExceptionsFilter } from './common/filters';
import { TrackingModule } from './modules/tracking/tracking.module';

const routes = RouterModule.register([
  {
    path: `/trackings`,
    module: TrackingModule,
  },
]);

const imports = [
  // config
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env`,
  }),

  // DB
  MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
    dbName: process.env.MONGO_DB_NAME,
    authSource: process.env.MONGO_AUTH_SOURCE,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
  }),

  // register modules
  TrackingModule,
  routes,
];

const providers = [
  // Global Filter, Exception check
  { provide: APP_FILTER, useClass: ExceptionsFilter },

  // Global Pipe, Validation check
  // https://docs.nestjs.com/pipes#global-scoped-pipes
  // https://docs.nestjs.com/techniques/validation
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true, // transform object to DTO class
      whitelist: true,
    }),
  },
];

@Module({
  imports,
  controllers: [],
  providers,
})
export class AppModule {}
