import {TrpcService} from '@/trpc/trpc.service';
import {Injectable} from '@nestjs/common';
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
}

export type AppRouter = TrpcRouter[`appRouter`];
