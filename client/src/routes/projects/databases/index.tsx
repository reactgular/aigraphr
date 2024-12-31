import {UiBanner} from '@/components/ui/UiBanner';
import {UiContainer} from '@/components/ui/UiContainer';
import type {Route} from './+types/index';

export default function Index({params}: Route.LoaderArgs) {
    return (
        <UiContainer>
            <UiBanner
                title="Databases"
                description="Here's a list of your databases for this project!"
            />
        </UiContainer>
    );
}
