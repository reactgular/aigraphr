import {createTRPCReact} from '@trpc/react-query';
import type {MainRouter} from '../../../../server/src/main.router';

export const trpc = createTRPCReact<MainRouter>();
