import { command } from 'cleye';
import path from 'node:path';
import { AIGRAPHR_FOLDER } from '../config/aigraphr-folder';
import { FileType, getFileType } from '../config/file-type';

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

// Terminals with Unicode support:     ✔ Finished successfully!
// Terminals without Unicode support:  √ Finished successfully!

  const stat = await getFileType(path.join(process.cwd(), AIGRAPHR_FOLDER));
  if (stat === FileType.DIRECTORY) {
    // Load workspace.json
  } else if (stat === FileType.FILE) {
    // exists but is a file
  } else {
    // does not exist
  }

  // const boot = await bootstrap({
  //   pluginsPath: parsed.flags.pluginsPath,
  //   logging: parsed.flags.log
  // });
  //
  // Logger.log('Loaded plugins:', boot.plugins.plugins());
});
