import {AppProviders} from '@/components/app/AppProviders';
import {AppSidebar} from '@/components/shadcn/app-sidebar';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {Outlet} from 'react-router';

export default function Layout() {
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
