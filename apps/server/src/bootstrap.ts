import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'node:process';
import { MainModule } from './main.module';

export interface BootstrapOptions {
  pluginsPath?: string;
}

export const bootstrap = async ({pluginsPath}: BootstrapOptions) => {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.useStaticAssets('client');

  // app.setBaseViewsDir('views');
  // app.setViewEngine('hbs');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 AI Graphr is running on: http://localhost:${port}/`);
};
