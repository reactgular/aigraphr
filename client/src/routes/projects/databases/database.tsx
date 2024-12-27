import {Outlet} from 'react-router';
import type {Route} from './+types/database';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <h1>Database Editor</h1>
            <div>This page opens a database</div>
            <Outlet />
        </div>
    );
}
