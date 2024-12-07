import {trpc} from '@/trpc';
import {z} from 'zod';

export const MAIN_ROUTER_SYMBOL = Symbol('MAIN_ROUTER');

export const mainRouter = trpc.router({
    hello: trpc.procedure
        .input(
            z.object({
                name: z.string().optional()
            })
        )
        .query(({ctx, input}) => {
            const {name} = input;
            return {
                greeting: `Hello ${name ? name : `Bilbo`}`
            };
        })
});

export type MainRouter = typeof mainRouter;
