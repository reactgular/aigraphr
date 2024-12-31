import {Outlet} from 'react-router';
import type {Route} from './+types/workspace';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <h1>Workspaces Editor</h1>
            <div>This page opens a workspace</div>
            <Outlet />
        </div>
    );
}
