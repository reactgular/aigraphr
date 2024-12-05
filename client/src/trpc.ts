import type {AppRouter} from '@shared/trpc/server';
import {createTRPCReact} from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();
