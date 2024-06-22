import { DynamicModule, Inject, Injectable } from '@nestjs/common';
import path from 'node:path';

/**
 * @deprecated this could be replaced when the workspace JSON file defines what plugins to load.
 */
export const BOOTSTRAP_PLUGINS = 'BOOTSTRAP_PLUGINS';

@Injectable()
export class PluginsService {
  public constructor(
    @Inject(BOOTSTRAP_PLUGINS) private readonly bootstrapPlugins: Array<string>
  ) {
  }

  public static load(name: string): DynamicModule {
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

  public plugins(): Array<string> {
    return this.bootstrapPlugins;
  }
}
