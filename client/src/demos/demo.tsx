import {AppHeader} from '@/components/app/AppHeader';
import {AppHelloWorld} from '@/components/app/AppHelloWorld';
import {AppPlaceholder} from '@/components/app/AppPlaceholder';
import {AppProviders} from '@/components/app/AppProviders';
import {AppSidebar} from '@/components/app/AppSidebar';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {FC, Suspense} from 'react';

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
                        <Suspense fallback={<div>LOADING</div>}>
                            <AppHelloWorld />
                            <AppPlaceholder />
                        </Suspense>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AppProviders>
    );
};
