import {AppProviders} from '@/components/app/AppProviders';
import {Outlet} from 'react-router';
import type {Route} from './+types/layout';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <AppProviders>
            <Outlet />
        </AppProviders>
    );
}
