import {trpc} from '@/trpc';
import {FC} from 'react';

export const AppHelloWorld: FC = () => {
    const state = trpc.appRouter.helloWorld.useQuery();

    // CORS error
    console.log(state);

    return <div>XX{state.data}XX</div>;
};
