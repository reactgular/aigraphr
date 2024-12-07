import {useQueryClient} from '@/components/hooks/useQueryClient';
import {QueryClientProvider} from '@tanstack/react-query';
import {FC, PropsWithChildren} from 'react';

export const AppProviders: FC<PropsWithChildren> = ({children}) => {
    const queryClient = useQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
