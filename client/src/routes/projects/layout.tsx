import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <div>PROJECT LAYOUT</div>
            <Outlet />
        </div>
    );
}
