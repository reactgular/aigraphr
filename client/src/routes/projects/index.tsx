import {UiBanner} from '@/components/ui/UiBanner';
import {UiContainer} from '@/components/ui/UiContainer';
import {Outlet} from 'react-router';
import type {Route} from './+types/index';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <UiContainer>
            <UiBanner
                title="Projects"
                description="Here's a list of your projects"
            />
            <div>This page lists all projects</div>
            <Outlet />
        </UiContainer>
    );
}
