import { cli } from 'cleye';
import { bootstrap } from './bootstrap/bootstrap';
import { compile } from './commands/compile';
import { info } from './commands/info';
import { init } from './commands/init';
import { start } from './commands/start';
import { getBrandConfig } from './config/brand.config';

const brand = getBrandConfig();

// @see: https://github.com/sindresorhus/ora for spinner
// @see: https://github.com/SamVerschueren/listr for task list
// @see: https://github.com/chalk/chalk-template for chalk template
// @see: https://github.com/sindresorhus/log-symbols for console icons
// @see: https://github.com/sindresorhus/figures for more console icons

cli({
  name: brand.name,
  version: brand.version,
  help: { version: brand.version, description: brand.description },
  commands: [start, compile, info, init],
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
  const [command] = parsed._;

  if (!command) {
    const boot = await bootstrap({
      pluginsPath: parsed.flags.pluginsPath,
      logging: parsed.flags.log
    });

    await boot.start();
  } else {
    // await p.text({
    //   message: `Unknown command: ${command}`
    // });
    // p.cancel(`Run ${brand.name} --help for usage information`);
  }
});

