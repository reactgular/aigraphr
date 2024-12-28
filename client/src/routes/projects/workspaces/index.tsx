import {WorkspacesTable} from '@/components/workspaces/WorkspacesTable';
import {Outlet} from 'react-router';
import type {Route} from './+types/index';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div className="flex flex-col mx-auto w-full max-w-6xl py-10 gap-5">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Workspaces
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your workspaces for this project!
                    </p>
                </div>
            </div>
            <WorkspacesTable />
            <Outlet />
        </div>
    );
}
