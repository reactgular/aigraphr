import {Outlet} from 'react-router';
import type {Route} from './+types/dashboard';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <h1>Project Dashboard</h1>
            <div>This page shows the dashboard for a project</div>
            <Outlet />
        </div>
    );
}
