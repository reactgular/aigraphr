import {Outlet} from 'react-router';
import type {Route} from './+types/index';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <h1>Databases Index</h1>
            <div>This page lists all databases under a project</div>
            <Outlet />
        </div>
    );
}
