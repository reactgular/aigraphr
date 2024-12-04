import {createTRPCReact} from '@trpc/react-query';
import type {AppRouter} from '../../server/src/@generated/server';

export const trpc = createTRPCReact<AppRouter>();
