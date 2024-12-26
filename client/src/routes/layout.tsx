import {AppProviders} from '@/components/app/AppProviders';
import {AppSidebar} from '@/components/app/AppSidebar';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <AppProviders>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </AppProviders>
    );
}
