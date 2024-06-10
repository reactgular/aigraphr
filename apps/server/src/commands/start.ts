import { command } from 'cleye';
import { bootstrap } from '../bootstrap';

export const start = command({
  name: 'start',
  help: {
    description: 'Start the server',
    examples: [
      'cli start'
    ]
  }
}, async (parsed) => {
  await bootstrap();
});
