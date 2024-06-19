import { command } from 'cleye';

export const compile = command({
  name: 'compile',
  help: {
    description: 'Compile the graph to source code.',
    examples: [
      'cli compile'
    ]
  }
}, async (parsed) => {
  // @todo Implement the command
});
