import { cli } from 'cleye';
import { bootstrap } from './bootstrap';
import { start } from './commands/start';
import { getBrandConfig } from './config/brand.config';

const brand = getBrandConfig();

// Adding a fix for a fake bug to test release
const x = 123;

cli({
  name: brand.name,
  version: brand.version,
  help: { version: brand.version, description: brand.description },
  commands: [start],
  flags: {}
}, async () => {
  await bootstrap();
});
