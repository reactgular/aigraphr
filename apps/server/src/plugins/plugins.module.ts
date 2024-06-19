import { DynamicModule, Module } from '@nestjs/common';
import * as path from 'node:path';

export interface PluginsModuleOptions {
  pluginsPath?: string;
}

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: []
})
export class PluginsModule {
  public static async forRoot({ pluginsPath }: PluginsModuleOptions): Promise<DynamicModule> {

    const plugins = ['core', 'openai'];
    const imports = plugins.map((plugin) => PluginsModule.loadPlugin(plugin));

    return { module: PluginsModule, imports };
  }

  private static loadPlugin(name: string): DynamicModule {
    // @todo needs to be updated to load via npm package names
    const pluginPath = path.join(__dirname, '..', '..', 'plugins', name, 'src', 'index.js');
    const library = __non_webpack_require__(pluginPath);

    if (library.default) {
      if (typeof library.default === 'function') {
        return library.default;
      } else {
        throw new Error(`Plugin ${name} doesn't export a valid module.`);
      }
    } else {
      throw new Error(`Plugin ${name} doesn't export a module.`);
    }
  }
}
