import {command} from 'cleye';
import {bootstrap} from '../bootstrap/bootstrap';

export const start = command(
    {
        name: 'start',
        alias: 's',
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
            description: 'Start the server',
            examples: ['aigraphr start', 'aigraphr -s']
        }
    },
    async (parsed) => {
        const boot = await bootstrap({
            pluginsPath: parsed.flags.pluginsPath,
            logging: parsed.flags.log
        });

        await boot.start();
    }
);
