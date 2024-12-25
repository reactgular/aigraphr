import {AppProviders} from '@/components/app/AppProviders';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {AppSidebar} from '@/components/sidebar/AppSidebar';
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
