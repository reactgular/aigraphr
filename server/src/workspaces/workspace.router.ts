import {trpc} from '@/trpc';
import {z} from 'zod';

export const workspaceRouter = trpc.router({
    get: trpc.procedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .query(({ctx: {main}, input: {id}}) => {
            return {
                name: `Workspace`
            };
        })
});
