import {AppHeader} from '@/components/app/AppHeader.tsx';
import {AppPlaceholder} from '@/components/app/AppPlaceholder.tsx';
import {AppProviders} from '@/components/app/AppProviders.tsx';
import {AppSidebar} from '@/components/app/AppSidebar.tsx';
import {
    SidebarInset,
    SidebarProvider
} from '@/components/shadcn/ui/sidebar.tsx';
import {FC} from 'react';

/**
 * @deprecated
 */
export const Demo: FC = () => {
    return (
        <AppProviders>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppHeader />
                    <main className="flex flex-1 flex-col gap-4 p-4">
                        <AppPlaceholder />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AppProviders>
    );
};