import {TrpcService} from '@/trpc/trpc.service';
import {INestApplication, Injectable} from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import {z} from 'zod';

@Injectable()
export class TrpcRouter {
    public readonly appRouter = this.trpc.router({
        hello: this.trpc.procedure
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

    public constructor(private readonly trpc: TrpcService) {}

    public async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter
            })
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];
