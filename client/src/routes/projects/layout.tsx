import {ProjectSidebar} from '@/components/projects/ProjectSidebar';
import {SidebarInset} from '@/components/shadcn/ui/sidebar';
import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <>
            <ProjectSidebar projectId={1} />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </>
    );
}
