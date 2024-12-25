import {AppProviders} from '@/components/app/AppProviders';
import {SidebarInset, SidebarProvider} from '@/components/shadcn/ui/sidebar';
import {AppSideBar} from '@/components/sidebar/AppSideBar';
import {Outlet} from 'react-router';

export default function Layout() {
    return (
        <AppProviders>
            <SidebarProvider>
                <AppSideBar />
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </AppProviders>
    );
}
