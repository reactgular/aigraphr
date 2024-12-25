import {AppHeader} from '@/components/app/AppHeader';
import {AppHelloWorld} from '@/components/app/AppHelloWorld';
import {AppPlaceholder} from '@/components/app/AppPlaceholder';
import {AppProviders} from '@/components/app/AppProviders';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {AppSideBar} from '@/components/sidebar/AppSideBar';
import {FC, Suspense} from 'react';

/**
 * @deprecated
 */
export const Demo: FC = () => {
    return (
        <AppProviders>
            <SidebarProvider>
                <AppSideBar />
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
