import { command } from 'cleye';

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
  // @todo Implement the command
});
