import {Injectable} from '@nestjs/common';
import {initTRPC} from '@trpc/server';

@Injectable()
export class TrpcService {
    public readonly trpc = initTRPC.create();
    public readonly procedure = this.trpc.procedure;
    public readonly router = this.trpc.router;
    public readonly mergeRouters = this.trpc.mergeRouters;
}
