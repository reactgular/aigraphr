import { command } from 'cleye';

export const init = command({
  name: 'init',
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
  }
}, async (parsed) => {
  // const boot = await bootstrap({
  //   pluginsPath: parsed.flags.pluginsPath,
  //   logging: parsed.flags.log
  // });
  //
  // Logger.log('Loaded plugins:', boot.plugins.plugins());
});
