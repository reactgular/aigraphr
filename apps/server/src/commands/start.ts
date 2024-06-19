import { command } from 'cleye';
import { bootstrap } from '../bootstrap';

export const start = command({
  name: 'start',
  flags: {
    pluginsPath: {
      type: String,
      description: 'Path to the plugins directory'
    }
  },
  help: {
    description: 'Start the server',
    examples: [
      'cli start'
    ]
  }
}, async (parsed) => {
  const start = await bootstrap({ pluginsPath: parsed.flags.pluginsPath });
  await start();
});
