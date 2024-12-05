import {useQueryClient} from '@/components/hooks/useQueryClient';
import {useTrpcClient} from '@/components/hooks/useTrpcClient';
import {trpc} from '@/trpc';
import {QueryClientProvider} from '@tanstack/react-query';
import {FC, PropsWithChildren} from 'react';

export const AppProviders: FC<PropsWithChildren> = ({children}) => {
    const queryClient = useQueryClient();
    const trpcClient = useTrpcClient();

    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
