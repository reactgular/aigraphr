import {trpc} from '@/trpc';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {FC, PropsWithChildren, useState} from 'react';

export const AppProviders: FC<PropsWithChildren> = ({children}) => {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000/trpc',
                    async headers() {
                        return {
                            authorization: 'xxx'
                        };
                    }
                })
            ]
        })
    );

    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
