import {aig} from '@/nodes/aig/aig';
import {z} from 'zod';

export const coreJsonObject = aig
    .node({
        type: 'object',
        description: 'An object'
    })
    .inputs((ctx) => ({
        object: ctx
            .object({
                key: z.string(),
                value: z.string()
            })
            .describe('The object to use')
    }));
