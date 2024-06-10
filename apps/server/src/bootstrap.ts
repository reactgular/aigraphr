import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 AI Graphr is running on: http://localhost:${port}/`);
};
