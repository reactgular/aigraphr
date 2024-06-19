import { command } from 'cleye';
import { bootstrap } from '../bootstrap';

export const compile = command({
  name: 'compile',
  flags: {
    pluginsPath: {
      type: String,
      description: 'Path to the plugins directory'
    }
  },
  help: {
    description: 'Compile the graph to source code.',
    examples: [
      'cli compile'
    ]
  }
}, async (parsed) => {
  await bootstrap({ pluginsPath: parsed.flags.pluginsPath });
});
