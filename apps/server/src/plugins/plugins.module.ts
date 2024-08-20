import { DynamicModule, Module } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { BOOTSTRAP_PLUGINS } from './plugins.tokens';

export interface PluginsModuleOptions {
  pluginsPath?: string;
}

@Module({})
export class PluginsModule {
  public static async forRoot({ pluginsPath }: PluginsModuleOptions): Promise<DynamicModule> {

    const plugins = ['core', 'openai'];
    const imports = plugins.map((plugin) => PluginsService.load(plugin));

    return {
      module: PluginsModule,
      imports,
      providers: [
        { provide: BOOTSTRAP_PLUGINS, useValue: plugins },
        PluginsService
      ],
      exports: [PluginsService]
    };
  }
}
