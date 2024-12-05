import {TRPCError} from '@trpc/server';
import {Query, Router} from 'nestjs-trpc';
import {z} from 'zod';

const TEST = false;

@Router()
export class AppRouter {
    @Query({output: z.string()})
    public async helloWorld(): Promise<string> {
        // wait 20 seconds
        await new Promise((resolve) => setTimeout(resolve, 3_000));

        if (TEST) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'This error is intentional'
            });
        }

        return 'Hello, World!';
    }
}
