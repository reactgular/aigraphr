import { cli } from 'cleye';
import { bootstrap } from './bootstrap';
import { compile } from './commands/compile';
import { start } from './commands/start';
import { getBrandConfig } from './config/brand.config';

const brand = getBrandConfig();

cli({
  name: brand.name,
  version: brand.version,
  help: { version: brand.version, description: brand.description },
  commands: [start, compile],
  flags: {}
}, async () => {
  await bootstrap({});
});
