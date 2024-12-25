import {Demo} from '@/demos/demo';
import type {Route} from '../../../.react-router/types/src/routes/+types';

export function meta(args: Route.MetaArgs) {
    return [
        {title: 'New React Router App'},
        {name: 'description', content: 'Welcome to React Router!'}
    ];
}

export default function Index() {
    return <Demo />;
}
