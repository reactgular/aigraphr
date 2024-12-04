import {Query, Router} from 'nestjs-trpc';
import {z} from 'zod';

@Router()
export class AppRouter {
    @Query({output: z.string()})
    public async helloWorld(): Promise<string> {
        return 'Hello, World!';
    }
}
