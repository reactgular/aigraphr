import {trpc} from '@/trpc';
import {FC} from 'react';

export const AppHelloWorld: FC = () => {
    const {data, isLoading} = trpc.appRouter.helloWorld.useQuery();

    return <div>[{isLoading ? 'Loading' : data}]</div>;
};
