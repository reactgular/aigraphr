import { cli } from 'cleye';
import { bootstrap } from './bootstrap';
import { start } from './commands/start';
import { getBrandConfig } from './config/brand.config';

const brand = getBrandConfig();

cli({
  name: `${brand.name}ing`, // fix: spelling mistake
  version: brand.version,
  help: { version: brand.version, description: brand.description },
  commands: [start],
  flags: {}
}, async () => {
  await bootstrap();
});
