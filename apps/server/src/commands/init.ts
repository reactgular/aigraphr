import { command } from 'cleye';
import { bootstrap } from '../bootstrap/bootstrap';

export const init = command({
  name: 'init',
  alias: 'i',
  flags: {
    pluginsPath: {
      type: String,
      description: 'Path to the plugins directory'
    },
    log: {
      type: Boolean,
      alias: 'l',
      description: 'Enable logging'
    }
  },
  help: {
    description: `Create .aigraphr folder`,
    examples: [
      'aigraphr init',
      'aigraphr -i'
    ]
  }
}, async (parsed) => {
  const boot = await bootstrap({
    pluginsPath: parsed.flags.pluginsPath,
    logging: parsed.flags.log
  });
  await boot.workspaces.initialize();
});
