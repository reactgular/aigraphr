import { command } from 'cleye';
import path from 'node:path';
import { AIGRAPHR_FOLDER } from '../config/aigraphr-folder';
import { getFileType } from '../config/file-type';
import { workspacePrompts } from '../workspaces/workspace-prompts';

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
    description: `Create ${AIGRAPHR_FOLDER} folder`,
    examples: [
      'aigraphr init',
      'aigraphr -i'
    ]
  }
}, async (parsed) => {

  // Things to do:
  // 1. Check if .aigraphr folder exists
  // 2. If so, load the workspace.json and let the user modify it.
  // 3. If not, create the .aigraphr folder and workspace.json file.

  const wpPath = path.resolve(process.cwd(), AIGRAPHR_FOLDER);
  const type = await getFileType(wpPath);

  if (type === 'directory') {
    // Read workspace.json file from wpPath and parse JSON using fs

  } else if (type === 'file') {
    // exists but is a file
  } else {
    await workspacePrompts();
  }

  // const boot = await bootstrap({
  //   pluginsPath: parsed.flags.pluginsPath,
  //   logging: parsed.flags.log
  // });
  //
  // Logger.log('Loaded plugins:', boot.plugins.plugins());
});
