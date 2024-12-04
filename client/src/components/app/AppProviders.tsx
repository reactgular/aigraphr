import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {FC, PropsWithChildren} from 'react';

const queryClient = new QueryClient({});

export const AppProviders: FC<PropsWithChildren> = ({children}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
