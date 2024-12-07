import {TrpcContext} from '@/trpc/trpc.context';
import {initTRPC} from '@trpc/server';

export const trpc = initTRPC.context<TrpcContext>().create();
