import { Logger } from '@nestjs/common';
import { command } from 'cleye';
import { bootstrap } from '../bootstrap/bootstrap';

export const info = command({
  name: 'info',
  flags: {
    pluginsPath: {
      type: String,
      description: 'Path to the plugins directory'
    }
  }
}, async (parsed) => {
  const boot = await bootstrap({ pluginsPath: parsed.flags.pluginsPath });

  Logger.log('Loaded plugins:', boot.plugins.plugins());

});
