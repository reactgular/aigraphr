import {SidebarInset} from '@/components/shadcn/ui/sidebar';
import {UserSidebar} from '@/components/user/UserSidebar';
import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <>
            <UserSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </>
    );
}
