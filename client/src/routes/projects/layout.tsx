import {AppSidebar} from '@/components/app/AppSidebar';
import {SidebarInset} from '@/components/shadcn/ui/sidebar';
import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <>
            <AppSidebar projectId={1} />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </>
    );
}
