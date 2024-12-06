import {initTRPC} from '@trpc/server';
import {z} from 'zod';

const trpc = initTRPC.create();

export const mainRouter = trpc.router({
    hello: trpc.procedure
        .input(
            z.object({
                name: z.string().optional()
            })
        )
        .query(({input}) => {
            const {name} = input;
            return {
                greeting: `Hello ${name ? name : `Bilbo`}`
            };
        })
});

export type MainRouter = typeof mainRouter;
