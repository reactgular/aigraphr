import {useQueryClient} from '@/components/hooks/useQueryClient';
import {SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {QueryClientProvider} from '@tanstack/react-query';
import type {FC, PropsWithChildren} from 'react';

export const AppProviders: FC<PropsWithChildren> = ({children}) => {
    const queryClient = useQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>{children}</SidebarProvider>
        </QueryClientProvider>
    );
};
