import {trpc} from '@/components/hooks/trpc';
import {FC} from 'react';

export const AppHelloWorld: FC = () => {
    const {data, isLoading} = trpc.hello.useQuery(
        {name: 'World'},
        {select: (data) => data.greeting}
    );

    return <div>[{isLoading ? 'Loading' : data}]</div>;
};
