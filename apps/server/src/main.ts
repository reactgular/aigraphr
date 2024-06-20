import { cli } from 'cleye';
import { bootstrap } from './bootstrap/bootstrap';
import { compile } from './commands/compile';
import { info } from './commands/info';
import { start } from './commands/start';
import { getBrandConfig } from './config/brand.config';

const brand = getBrandConfig();

cli({
  name: brand.name,
  version: brand.version,
  help: { version: brand.version, description: brand.description },
  commands: [start, compile, info],
  flags: {
    pluginsPath: {
      type: String,
      description: 'Path to the plugins directory'
    }
  }
}, async (parsed) => {
  const boot = await bootstrap({ pluginsPath: parsed.flags.pluginsPath });
  await boot.start();
});
