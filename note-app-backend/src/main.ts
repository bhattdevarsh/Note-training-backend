import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { setupEventStore } from './event-store';
import { GLOBAL_API_PREFIX } from './constants/app-strings';

async function bootstrap() {
  const server = new ExpressAdapter(express());
  const app = await NestFactory.create(AppModule, server);
  app.enableCors();
  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  setupSwagger(app);
  setupEventStore(app);
  await app.listen(8000);
}
bootstrap();
