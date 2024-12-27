import {Outlet} from 'react-router';
import type {Route} from './+types/media';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <div>
            <h1>Media Editor</h1>
            <div>This page opens a media</div>
            <Outlet />
        </div>
    );
}
