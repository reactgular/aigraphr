import {command} from 'cleye';
import {bootstrap} from '../bootstrap/bootstrap';

export const compile = command(
    {
        name: 'compile',
        alias: 'c',
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
            description: 'Compile the graph to source code.',
            examples: ['aigraphr compile', 'aigraphr -c']
        }
    },
    async (parsed) => {
        const boot = await bootstrap({
            pluginsPath: parsed.flags.pluginsPath,
            logging: parsed.flags.log
        });

        await boot.compiler.compile();
    }
);
