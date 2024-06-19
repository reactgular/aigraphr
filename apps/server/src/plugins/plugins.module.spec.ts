import { DynamicModule } from '@nestjs/common';
import * as path from 'node:path';
import { isDynamicModule } from './is-dynamic-module';
import { PluginsModule, PluginsModuleOptions } from './plugins.module';

// Mocking the __non_webpack_require__ global function
(global as any).__non_webpack_require__ = jest.fn();

// Mocking path.join
jest.mock('node:path', () => ({
  join: jest.fn().mockImplementation((...args: string[]) => args.join('/')),
}));

describe('PluginsModule', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should load valid plugins correctly', async () => {
    const validDynamicModule: DynamicModule = {
      module: class TestModule {},
    };

    (global as any).__non_webpack_require__.mockImplementation((pluginPath: string) => ({
      default: validDynamicModule,
    }));

    const options: PluginsModuleOptions = {};
    const module = await PluginsModule.forRoot(options);

    expect(module).toBeDefined();
    expect(module.imports).toHaveLength(2); // Assuming 'core' and 'openai' plugins
    expect(isDynamicModule(module.imports![0])).toBe(true);
    expect(isDynamicModule(module.imports![1])).toBe(true);
  });

  it('should throw an error if a plugin does not export a module', async () => {
    (global as any).__non_webpack_require__.mockImplementation((pluginPath: string) => ({}));

    const options: PluginsModuleOptions = {};

    await expect(PluginsModule.forRoot(options)).rejects.toThrowError(
      `Plugin core doesn't export a module.`
    );
  });

  it('should throw an error if a plugin does not export a valid DynamicModule', async () => {
    (global as any).__non_webpack_require__.mockImplementation((pluginPath: string) => ({
      default: {},
    }));

    const options: PluginsModuleOptions = {};

    await expect(PluginsModule.forRoot(options)).rejects.toThrowError(
      `Plugin core doesn't export a valid module.`
    );
  });

  it('should handle a missing default export in the plugin', async () => {
    (global as any).__non_webpack_require__.mockImplementation((pluginPath: string) => ({}));

    const options: PluginsModuleOptions = {};

    await expect(PluginsModule.forRoot(options)).rejects.toThrowError(
      `Plugin core doesn't export a module.`
    );
  });

  it('should correctly join plugin paths', async () => {
    const validDynamicModule: DynamicModule = {
      module: class TestModule {},
    };

    (global as any).__non_webpack_require__.mockImplementation((pluginPath: string) => ({
      default: validDynamicModule,
    }));

    const options: PluginsModuleOptions = {};
    await PluginsModule.forRoot(options);

    expect(path.join).toHaveBeenCalledWith(__dirname, '..', '..', 'plugins', 'core', 'src', 'index.js');
    expect(path.join).toHaveBeenCalledWith(__dirname, '..', '..', 'plugins', 'openai', 'src', 'index.js');
  });
});
