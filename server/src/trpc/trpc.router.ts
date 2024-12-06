import {initTRPC} from '@trpc/server';
import {z} from 'zod';
import {TrpcContext} from './trpc.context';

const trpc = initTRPC.context<TrpcContext>().create();

export const TRPC_ROUTER_SYMBOL = Symbol('TRPC_ROUTER');

export const trpcRouter = trpc.router({
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

export type TrpcRouter = typeof trpcRouter;
