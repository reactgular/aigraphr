import {createTRPCReact} from '@trpc/react-query';
import type {TrpcRouter} from '../../../../server/src/trpc/trpc.router';

export const trpc = createTRPCReact<TrpcRouter>();
