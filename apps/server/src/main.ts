import { cli } from 'cleye';
import packageJson from '../package.json';
import { bootstrap } from './bootstrap';
import { start } from './commands/start';

cli({
  name: 'aigraphr',
  version: packageJson.version,
  help: { description: packageJson.description },
  commands: [start]
}, async () => {
  await bootstrap();
});
