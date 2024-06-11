import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app/app.module';

export const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // @note: debug only, not prod ready
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'dist', 'apps', 'client'));

  // @note: this adds support for controller views using handlebars templates in views folder
  // app.setBaseViewsDir('views');
  // app.setViewEngine('hbs');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 AI Graphr is running on: http://localhost:${port}/`);
};
