import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import chalk from 'chalk';
import * as process from 'node:process';
import { CompilerService } from '../compiler/compiler.service';
import { getBrandConfig } from '../config/brand.config';
import { MainModule } from '../main.module';
import { PluginsService } from '../plugins/plugins.service';
import { WorkspacesService } from '../workspaces/workspaces.service';

const brand = getBrandConfig();

export interface Bootstrapped {
  close: () => Promise<void>;

  compiler: CompilerService;

  plugins: PluginsService;

  start: () => Promise<void>;

  workspaces: WorkspacesService;
}

export interface BootstrapOptions {
  logging?: boolean;

  pluginsPath?: string;
}

export const bootstrap = async ({ logging, pluginsPath }: BootstrapOptions): Promise<Bootstrapped> => {
  // @todo need to check if project was properly initialized
  console.log(chalk.green(`${brand.name} ${brand.version}`) + ' - ' + chalk.blue(`${brand.description}`));

  const app = await NestFactory.create<NestExpressApplication>(
    MainModule.forBootstrap({ pluginsPath }),
    {
      logger: logging
        ? ['error', 'warn', 'log', 'debug', 'verbose']
        : ['error', 'warn']
    }
  );

  app.useStaticAssets('client');
  // app.setBaseViewsDir('views');
  // app.setViewEngine('hbs');

  // Allows the app to be shutdown by a signal from the OS
  app.enableShutdownHooks();

  return {
    start: async () => {
      const port = process.env.PORT || 3000;
      await app.listen(port);
      Logger.log(`🚀 AI Graphr is running on: http://localhost:${port}/`);
    },
    close: async () => {
      Logger.log('Shutting down...');
      await app.close();
    },
    compiler: app.get(CompilerService),
    workspaces: app.get(WorkspacesService),
    plugins: app.get(PluginsService)
  } satisfies Bootstrapped;
};
